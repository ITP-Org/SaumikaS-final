

const express = require('express');
const { createPost, getPosts, getPostById, updatePost, deletePost, generateReport } = require('../controllers/postController');

// Import both protect and admin middleware
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Define routes
router.post('/', protect, createPost);
router.get('/', getPosts);

// New route for fetching a post by ID
router.get('/:id', getPostById);

router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

// Admin-only route for generating reports
router.get('/admin/report', protect, admin, generateReport);

module.exports = router;
