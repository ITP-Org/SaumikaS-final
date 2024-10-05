
const express = require('express');
const { createReply, voteReply, getReplies, updateReply, deleteReply } = require('../controllers/replyController');
// const { protect, admin } = require('../middleware/authMiddleware');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createReply);
router.post('/:id/vote', protect, voteReply);
router.get('/', getReplies);
// router.put('/:id', protect, admin, updateReply);
// router.delete('/:id', protect, admin, deleteReply); // Ensure this route exists
router.put('/:id', protect, updateReply); // Only `protect`, not `admin`
router.delete('/:id', protect, deleteReply); // Only `protect`, not `admin`

module.exports = router;

