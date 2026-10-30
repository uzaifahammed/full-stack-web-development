const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  college: {
    type: String,
    default: 'Engineering College'
  },
  graduationYear: {
    type: String,
    default: '2026'
  },
  solvedProblems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CodingProblem'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
