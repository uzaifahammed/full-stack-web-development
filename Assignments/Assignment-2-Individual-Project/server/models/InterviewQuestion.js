const mongoose = require('mongoose');

const interviewQuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['HR', 'DBMS', 'Operating Systems', 'Computer Networks', 'OOPs']
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  strategy: {
    type: String,
    default: ''
  },
  answer: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }]
});

module.exports = mongoose.model('InterviewQuestion', interviewQuestionSchema);
