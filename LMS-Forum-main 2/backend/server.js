// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const replyRoutes = require('./routes/replyRoutes');
const { MONGODB_URI } = require('./config/db');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/replies', replyRoutes);

app.use('/api', searchRoutes);  // Add this line

// Root route to prevent "Cannot GET /" error
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
