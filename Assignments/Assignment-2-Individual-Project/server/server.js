require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const quizRoutes = require('./routes/quiz');
const codingRoutes = require('./routes/coding');
const questionRoutes = require('./routes/questions');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/placement_portal';

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/coding', codingRoutes);
app.use('/api/questions', questionRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Placement Preparation Portal API',
    timestamp: new Date().toISOString()
  });
});

// Database Connection & Server Start
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully to:', MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Placement Portal Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.warn('MongoDB connection failed. Starting server in memory/standalone mode:', err.message);
    app.listen(PORT, () => {
      console.log(`Placement Portal Server running on http://localhost:${PORT} (without active Mongo)`);
    });
  });

module.exports = app;
