const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    subject: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    Date: { type: Date, default: Date.now },
    replies: [{ type: String }],
    status: { type: String, default: 'Pending' } 
});

const Inquiry = mongoose.model('inquiries', inquirySchema);

module.exports = Inquiry;
