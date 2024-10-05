const Reply = require('../models/Reply');

const logToFile = require('../utils/logToFile'); // Import the logging utility

exports.createReply = async (req, res) => {
    try {
        const reply = await Reply.create({ ...req.body, author: req.user.id });
        res.status(201).json({ reply });
    } catch (error) {
        res.status(400).json({ error: 'Failed to create reply' });
    }
};

exports.voteReply = async (req, res) => {
    try {
        const reply = await Reply.findById(req.params.id);
        reply.votes += 1;
        await reply.save();
        res.json({ reply });
    } catch (error) {
        res.status(400).json({ error: 'Failed to vote' });
    }
};

exports.getReplies = async (req, res) => {
    try {
        const replies = await Reply.find({ post: req.query.post }).populate('author');
        res.json({ replies });
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch replies' });
    }
};

//reply order latest 1st

exports.getReplies = async (req, res) => {
    try {
        // Sort replies by the `createdAt` field in descending order (latest first)
        const replies = await Reply.find({ post: req.query.post }).populate('author').sort({ createdAt: -1 });
        res.json({ replies });
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch replies' });
    }
};

// //edit delete admin

// exports.updateReply = async (req, res) => {
//     try {
//         const reply = await Reply.findById(req.params.id);

//         if (!reply) {
//             return res.status(404).json({ error: 'Reply not found' });
//         }

//         reply.content = req.body.content || reply.content;
//         await reply.save();

//         res.json({ reply });
//     } catch (error) {
//         res.status(400).json({ error: 'Failed to update reply' });
//     }
// };


// exports.deleteReply = async (req, res) => {
//     try {
//         logToFile(`Attempting to delete reply with ID: ${req.params.id}`);

//         const reply = await Reply.findById(req.params.id);
//         if (!reply) {
//             logToFile(`Reply with ID: ${req.params.id} not found`);
//             return res.status(404).json({ error: 'Reply not found' });
//         }

//         logToFile(`Reply found: ${JSON.stringify(reply)}`);

//         // Use deleteOne to remove the reply
//         await Reply.deleteOne({ _id: req.params.id });
//         logToFile(`Reply with ID: ${req.params.id} successfully deleted`);
//         res.json({ message: 'Reply removed' });
//     } catch (error) {
//         logToFile(`Error during reply deletion: ${error.message}`);
//         res.status(400).json({ error: 'Failed to delete reply' });
//     }
// };



exports.updateReply = async (req, res) => {
    try {
        const reply = await Reply.findById(req.params.id);

        if (!reply) {
            return res.status(404).json({ error: 'Reply not found' });
        }

        // Ensure the user is the author of the reply
        if (reply.author.toString() !== req.user.id && req.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Not authorized to edit this reply' });
        }

        reply.content = req.body.content || reply.content;
        await reply.save();

        res.json({ reply });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update reply' });
    }
};

// exports.deleteReply = async (req, res) => {
//     try {
//         const reply = await Reply.findById(req.params.id);

//         if (!reply) {
//             logToFile(`Delete failed. Reply with ID: ${req.params.id} not found.`);
//             return res.status(404).json({ error: 'Reply not found' });
//         }

//         // Ensure the user is the author of the reply or admin
//         if (reply.author.toString() !== req.user.id && req.user.role !== 'Admin') {
//             logToFile(`User ID: ${req.user.id} not authorized to delete reply with ID: ${req.params.id}`);
//             return res.status(403).json({ error: 'Not authorized to delete this reply' });
//         }

//         await Reply.deleteOne({ _id: req.params.id });
//         logToFile(`Reply with ID: ${req.params.id} successfully deleted by user: ${req.user.id}`);
//         res.json({ message: 'Reply removed' });
//     } catch (error) {  // <-- Make sure `error` is defined here
//         logToFile(`Error during reply deletion: ${error.message}`);
//         res.status(400).json({ error: 'Failed to delete reply' });
//     }
// };

exports.deleteReply = async (req, res) => {
    try {
        const reply = await Reply.findById(req.params.id);

        if (!reply) {
            logToFile(`Delete failed. Reply with ID: ${req.params.id} not found.`);
            return res.status(404).json({ error: 'Reply not found' });
        }

        // Ensure the user is the author of the reply or an admin
        if (reply.author.toString() !== req.user.id && req.user.role !== 'Admin') {
            logToFile(`User ID: ${req.user.id} not authorized to delete reply with ID: ${req.params.id}`);
            return res.status(403).json({ error: 'Not authorized to delete this reply' });
        }

        await Reply.deleteOne({ _id: req.params.id });
        logToFile(`Reply with ID: ${req.params.id} successfully deleted by user: ${req.user.id}`);
        res.json({ message: 'Reply removed' });
    } catch (error) {
        logToFile(`Error during reply deletion: ${error.message}`);
        res.status(400).json({ error: 'Failed to delete reply' });
    }
};





