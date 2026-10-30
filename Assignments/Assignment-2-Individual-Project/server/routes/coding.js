const express = require('express');
const router = express.Router();
const CodingProblem = require('../models/CodingProblem');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// GET /api/coding
router.get('/', async (req, res) => {
  try {
    const { difficulty, category, search } = req.query;
    const filter = {};

    if (difficulty && difficulty !== 'All') {
      filter.difficulty = difficulty;
    }
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { companies: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const problems = await CodingProblem.find(filter);
    res.json(problems);
  } catch (error) {
    console.error('Coding problems error:', error);
    res.status(500).json({ message: 'Server error loading coding problems' });
  }
});

// GET /api/coding/:id
router.get('/:id', async (req, res) => {
  try {
    const problem = await CodingProblem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(problem);
  } catch (error) {
    console.error('Coding problem detail error:', error);
    res.status(500).json({ message: 'Server error loading problem details' });
  }
});

// POST /api/coding/:id/toggle-solve
router.post('/:id/toggle-solve', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const problemId = req.params.id;

    const index = user.solvedProblems.indexOf(problemId);
    let isSolved = false;

    if (index > -1) {
      user.solvedProblems.splice(index, 1);
      isSolved = false;
    } else {
      user.solvedProblems.push(problemId);
      isSolved = true;
    }

    await user.save();

    res.json({
      message: isSolved ? 'Problem marked as solved' : 'Problem marked as unsolved',
      isSolved,
      solvedCount: user.solvedProblems.length
    });
  } catch (error) {
    console.error('Toggle solve error:', error);
    res.status(500).json({ message: 'Server error toggling solve status' });
  }
});

module.exports = router;
