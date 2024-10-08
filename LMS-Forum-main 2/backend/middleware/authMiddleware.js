const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ error: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ error: 'Not authorized' });
    }
};

//edit delete admin
exports.admin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ error: 'Not authorized as admin' });
    }
};
