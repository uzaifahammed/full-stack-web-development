const mongoose = require('mongoose');

const codingProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Dynamic Programming', 'Sorting & Searching']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  companies: [{
    type: String
  }],
  description: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    default: ''
  },
  sampleInput: {
    type: String,
    default: ''
  },
  sampleOutput: {
    type: String,
    default: ''
  },
  solutionCode: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('CodingProblem', codingProblemSchema);
