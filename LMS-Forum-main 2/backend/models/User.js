
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {  // Added email field
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Pre-save hook to hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare a given password with the stored hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;

