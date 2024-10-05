const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

router.get('/search', async (req, res) => {
    try {
        const query = req.query.query;
        const searchRegex = new RegExp(query, 'i'); // Case-insensitive regex search
        const posts = await Post.find({
            $or: [{ title: searchRegex }, { content: searchRegex }]
        });
        res.json({ posts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to search posts' });
    }
});

module.exports = router;
