const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const logFilePath = path.join(__dirname, '../logs/auth.log');

const logToFile = (message) => {
    const timeStamp = new Date().toISOString();
    fs.appendFileSync(logFilePath, `${timeStamp} - ${message}\n`, 'utf8');
};

exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        logToFile(`Register attempt for username: ${username}, email: ${email}`);

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            logToFile(`Username already in use: ${username}`);
            return res.status(400).json({ error: 'Username already in use' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            logToFile(`Email already in use: ${email}`);
            return res.status(400).json({ error: 'Email already in use' });
        }

        if (password.length < 6) {
            logToFile(`Password too short for username: ${username}`);
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        const newUser = new User({ username, email, password, role });
        await newUser.save();

        logToFile(`User registered successfully: ${username}`);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        logToFile(`Registration error for username: ${username}, error: ${err.message}`);
        res.status(500).json({ error: 'Registration failed. Please try again later.' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        logToFile(`Login attempt for username: ${username}`);

        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            logToFile(`Login failed for username: ${username}`);
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
        logToFile(`Login successful for username: ${username}, token generated`);

        // Return the token along with user information
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
    } catch (err) {
        logToFile(`Login error for username: ${username}, error: ${err.message}`);
        res.status(500).json({ error: 'Login failed. Please try again later.' });
    }
};
