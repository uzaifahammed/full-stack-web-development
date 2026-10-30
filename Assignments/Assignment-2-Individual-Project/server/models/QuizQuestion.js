const mongoose = require('mongoose');

const quizQuestionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Technical']
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctIndex: {
    type: Number,
    required: true
  },
  explanation: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('QuizQuestion', quizQuestionSchema);
