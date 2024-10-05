const fs = require('fs');
const path = require('path');
const Post = require('../models/Post');

//const logFilePath = path.join(__dirname, '../logs/posts.log');
const logToFile = require('../utils/logToFile');  // Ensure you import your logToFile utility
const Reply = require('../models/Reply');  // Make sure to import the Reply model

// const logToFile = (message) => {
//     const timeStamp = new Date().toISOString();
//     fs.appendFileSync(logFilePath, `${timeStamp} - ${message}\n`, 'utf8');
// };

exports.createPost = async (req, res) => {
    try {
        // logToFile(`Creating post by user: ${req.user.id}, content: ${req.body.content}`);
        const post = await Post.create({ ...req.body, author: req.user.id });
        // logToFile(`Post created with ID: ${post._id}`);
        res.status(201).json({ post });
    } catch (error) {
        // logToFile(`Failed to create post: ${error.message}`);
        res.status(400).json({ error: 'Failed to create post' });
    }
};


// exports.getPosts = async (req, res) => {
//     try {
//         logToFile(`Fetching posts`);
//         const posts = await Post.find().populate('author');
//         logToFile(`Fetched ${posts.length} posts`);
//         res.json({ posts });
//     } catch (error) {
//         logToFile(`Failed to fetch posts: ${error.message}`);
//         res.status(400).json({ error: 'Failed to fetch posts' });
//     }
// };

//post order latest 1st

// exports.getPosts = async (req, res) => {
//     try {
//         // Sort posts by the `createdAt` field in descending order (latest first)
//         const posts = await Post.find().populate('author').sort({ createdAt: -1 });
//         res.json({ posts });
//     } catch (error) {
//         res.status(400).json({ error: 'Failed to fetch posts' });
//     }
// };

exports.getPosts = async (req, res) => {
    try {
        // Sort posts by the `createdAt` field in descending order (latest first)
        const posts = await Post.find().populate('author').sort({ createdAt: -1 });
        res.json({ posts });
    } catch (error) {
        // Log a relevant error message to the log file
        logToFile(`Failed to fetch posts: ${error.message}`);

        // Send an error response to the client
        res.status(400).json({ error: 'Failed to fetch posts' });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author');
        if (!post) {
            logToFile(`Post not found: ${req.params.id}`);
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ post });
    } catch (error) {
        logToFile(`Failed to fetch post: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
};


// //edit delete admin
// exports.updatePost = async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);

//         if (!post) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         post.title = req.body.title || post.title;
//         post.content = req.body.content || post.content;
//         await post.save();

//         res.json({ post });
//     } catch (error) {
//         res.status(400).json({ error: 'Failed to update post' });
//     }
// };

// // Delete a post
// exports.deletePost = async (req, res) => {
//     try {
//         logToFile(`Attempting to delete post with ID: ${req.params.id}`);

//         const post = await Post.findById(req.params.id);
//         if (!post) {
//             logToFile(`Post with ID: ${req.params.id} not found`);
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         // Use deleteOne to remove the post
//         await Post.deleteOne({ _id: req.params.id });
//         logToFile(`Post with ID: ${req.params.id} successfully deleted`);
//         res.json({ message: 'Post removed' });
//     } catch (error) {
//         logToFile(`Failed to delete post: ${error.message}`);
//         res.status(400).json({ error: 'Failed to delete post' });
//     }
// };

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            // logToFile(`Update failed. Post with ID: ${req.params.id} not found.`);
            return res.status(404).json({ error: 'Post not found' });
        }

        // Ensure the user is the author of the post
        if (post.author.toString() !== req.user.id && req.user.role !== 'Admin') {
            // logToFile(`User ID: ${req.user.id} not authorized to update post with ID: ${req.params.id}`);
            return res.status(403).json({ error: 'Not authorized to edit this post' });
        }

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        await post.save();
        // logToFile(`Post with ID: ${req.params.id} updated by user: ${req.user.id}`);
        res.json({ post });
    } catch (error) {
        // logToFile(`Failed to update post with ID: ${req.params.id}. Error: ${error.message}`);
        res.status(400).json({ error: 'Failed to update post' });
    }
};

// exports.deletePost = async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);

//         if (!post) {
//             logToFile(`Delete failed. Post with ID: ${req.params.id} not found.`);
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         // Ensure the user is the author of the post
//         if (post.author.toString() !== req.user.id && req.user.role !== 'Admin') {
//             logToFile(`User ID: ${req.user.id} not authorized to delete post with ID: ${req.params.id}`);
//             return res.status(403).json({ error: 'Not authorized to delete this post' });
//         }

//         await Post.deleteOne({ _id: req.params.id });
//         logToFile(`Post with ID: ${req.params.id} successfully deleted by user: ${req.user.id}`);
//         res.json({ message: 'Post removed' });
//     } catch (error) {
//         logToFile(`Failed to delete post with ID: ${req.params.id}. Error: ${error.message}`);
//         res.status(400).json({ error: 'Failed to delete post' });
//     }
// };

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            // logToFile(`Delete failed. Post with ID: ${req.params.id} not found.`);
            return res.status(404).json({ error: 'Post not found' });
        }

        // Ensure the user is the author of the post or an admin
        if (post.author.toString() !== req.user.id && req.user.role !== 'Admin') {
            // logToFile(`User ID: ${req.user.id} not authorized to delete post with ID: ${req.params.id}`);
            return res.status(403).json({ error: 'Not authorized to delete this post' });
        }

        await Post.deleteOne({ _id: req.params.id });
        // logToFile(`Post with ID: ${req.params.id} successfully deleted by user: ${req.user.id}`);
        res.json({ message: 'Post removed' });
    } catch (error) {
        // logToFile(`Failed to delete post with ID: ${req.params.id}. Error: ${error.message}`);
        res.status(400).json({ error: 'Failed to delete post' });
    }
};

exports.generateReport = async (req, res) => {
    try {
        console.log('Generating report...');  // Log start of function
        const postsByUser = await Post.aggregate([
            { $group: { _id: "$author", postCount: { $sum: 1 } } },
            { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "author" } },
            { $unwind: "$author" },
            { $project: { _id: 0, username: "$author.username", postCount: 1 } }
        ]);
        console.log('Fetched posts by user...');

        const mostVotedReply = await Reply.find().sort({ votes: -1 }).limit(1).populate('author').exec();
        console.log('Fetched most voted reply...');

        const report = {
            postsByUser,
            mostVotedReply: mostVotedReply.length > 0 ? mostVotedReply[0] : null,
        };
        console.log('Report generated successfully');
        res.json({ report });
    } catch (error) {
        console.error(`Failed to generate report: ${error.message}`);
        res.status(500).json({ error: 'Failed to generate report' });
    }
};
