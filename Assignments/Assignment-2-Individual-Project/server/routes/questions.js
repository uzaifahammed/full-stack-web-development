const express = require('express');
const router = express.Router();
const InterviewQuestion = require('../models/InterviewQuestion');

// GET /api/questions
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const questions = await InterviewQuestion.find(filter);
    res.json(questions);
  } catch (error) {
    console.error('Interview questions error:', error);
    res.status(500).json({ message: 'Server error loading interview questions' });
  }
});

// GET /api/questions/:id
router.get('/:id', async (req, res) => {
  try {
    const question = await InterviewQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    console.error('Interview question detail error:', error);
    res.status(500).json({ message: 'Server error loading question detail' });
  }
});

module.exports = router;
