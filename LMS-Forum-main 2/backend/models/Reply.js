const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Explicitly reference 'User'
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },  // Explicitly reference 'Post'
    votes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reply', replySchema);

