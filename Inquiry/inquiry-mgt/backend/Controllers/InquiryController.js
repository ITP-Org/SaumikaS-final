const mongoose = require('mongoose');
const Inquiry = require('../Models/InquiryModel');

const addInquiry = async (req, res) => {
    const { fullName, subject, email, phone, message } = req.body;

    try {
        const inquiry = new Inquiry({ fullName, subject, email, phone, message });
        await inquiry.save();
        return res.status(201).json({ inquiry });
    }
    catch (err) {
        console.error("Error adding inquiry:", err);
        return res.status(500).json({ message: "Server error occurred while adding inquiry." });
    }
}

const getInquiries = async (req, res) => {
    try {
        let inquiries = await Inquiry.find();

        // Automatically set status to "completed" if replies exist
        inquiries = inquiries.map(inquiry => {
            if (inquiry.replies.length > 0 && inquiry.status !== "completed") {
                inquiry.status = "completed";
                inquiry.save(); // Save the updated status in the database
            }
            return inquiry;
        });

        return res.status(200).json({ inquiries });
    }
    catch (err) {
        console.error("Error retrieving inquiries:", err);
        return res.status(500).json({ message: "Server error occurred while retrieving inquiries.", error: err.message });
    }
}

const getInquiryById = async (req, res) => {
    const inquiryId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(inquiryId)) {
        return res.status(400).json({ message: "Invalid inquiry ID format." });
    }

    try {
        const inquiry = await Inquiry.findById(inquiryId);
        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry details not found." });
        }
        return res.status(200).json({ inquiry });
    }
    catch (err) {
        console.error("Error retrieving inquiry:", err);
        return res.status(500).json({ message: "Server error occurred while retrieving inquiry.", error: err.message });
    }
}

const updateInquiry = async (req, res) => {
    const inquiryId = req.params.id;
    const { fullName, subject, email, phone, message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(inquiryId)) {
        return res.status(400).json({ message: "Invalid inquiry ID format." });
    }

    try {
        const updatedInquiry = { fullName, subject, email, phone, message };
        const inquiry = await Inquiry.findByIdAndUpdate(inquiryId, updatedInquiry, { new: true });
        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry details not found." });
        }
        return res.status(200).json({ inquiry });
    }
    catch (err) {
        console.error("Error updating inquiry:", err);
        return res.status(500).json({ message: "Server error occurred while updating inquiry.", error: err.message });
    }
}

const deleteInquiry = async (req, res) => {
    const inquiryId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(inquiryId)) {
        return res.status(400).json({ message: "Invalid inquiry ID format." });
    }

    try {
        const inquiry = await Inquiry.findByIdAndDelete(inquiryId);
        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry details not found." });
        }
        return res.status(200).json({ message: "Inquiry deleted successfully." });
    }
    catch (err) {
        console.error("Error deleting inquiry:", err);
        return res.status(500).json({ message: "Server error occurred while deleting inquiry.", error: err.message });
    }
}

const addReply = async (req, res) => {
    const inquiryId = req.params.id;
    const { reply } = req.body;

    if (!mongoose.Types.ObjectId.isValid(inquiryId)) {
        return res.status(400).json({ message: "Invalid inquiry ID format." });
    }

    try {
        const inquiry = await Inquiry.findByIdAndUpdate(
            inquiryId,
            { 
                $push: { replies: reply }, // Push reply to the replies array
                status: "completed" // Set status to "completed"
            },
            { new: true }
        );
        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry details not found." });
        }
        return res.status(200).json({ inquiry });
    } catch (err) {
        console.error("Error updating inquiry with reply:", err);
        return res.status(500).json({ message: "Server error occurred while updating inquiry.", error: err.message });
    }
};


const updateReply = async (req, res) => {
    const inquiryId = req.params.id;
    const { replyIndex, newReply } = req.body;

    if (!mongoose.Types.ObjectId.isValid(inquiryId)) {
        return res.status(400).json({ message: "Invalid inquiry ID format." });
    }

    try {
        const inquiry = await Inquiry.findOneAndUpdate(
            { "_id": inquiryId, "replies": { $exists: true } },
            { $set: { [`replies.${replyIndex}`]: newReply } },
            { new: true }
        );
        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry details not found." });
        }
        return res.status(200).json({ inquiry });
    } catch (err) {
        console.error("Error updating reply:", err);
        return res.status(500).json({ message: "Server error occurred while updating reply.", error: err.message });
    }
};

const deleteReply = async (req, res) => {
    const inquiryId = req.params.id;
    const { replyIndex } = req.body;

    if (!mongoose.Types.ObjectId.isValid(inquiryId)) {
        return res.status(400).json({ message: "Invalid inquiry ID format." });
    }

    try {
        const inquiry = await Inquiry.findById(inquiryId);

        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry details not found." });
        }

        inquiry.replies.splice(replyIndex, 1); // Remove the reply at the specified index

        // If no replies are left, set status to "pending"
        if (inquiry.replies.length === 0) {
            inquiry.status = "pending";
        }

        await inquiry.save(); // Save the updated inquiry

        return res.status(200).json({ inquiry });
    } catch (err) {
        console.error("Error deleting reply:", err);
        return res.status(500).json({ message: "Server error occurred while deleting reply.", error: err.message });
    }
};

module.exports = {
    addInquiry,
    getInquiries,
    getInquiryById,
    updateInquiry,
    deleteInquiry,
    addReply,
    updateReply,
    deleteReply
};
