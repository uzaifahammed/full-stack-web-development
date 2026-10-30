const express = require('express');
const router = express.Router();
const QuizQuestion = require('../models/QuizQuestion');
const QuizAttempt = require('../models/QuizAttempt');
const authMiddleware = require('../middleware/auth');

// GET /api/quiz/questions
router.get('/questions', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};
    const questions = await QuizQuestion.find(filter);
    res.json(questions);
  } catch (error) {
    console.error('Quiz questions error:', error);
    res.status(500).json({ message: 'Server error loading quiz questions' });
  }
});

// POST /api/quiz/submit
router.post('/submit', authMiddleware, async (req, res) => {
  try {
    const { category, answers } = req.body;
    // answers is an object: { [questionId]: selectedOptionIndex }

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ message: 'Answers object is required' });
    }

    const questionIds = Object.keys(answers);
    const questions = await QuizQuestion.find({ _id: { $in: questionIds } });

    let score = 0;
    const review = [];

    questions.forEach((q) => {
      const userSelected = answers[q._id.toString()];
      const isCorrect = userSelected === q.correctIndex;
      if (isCorrect) score++;

      review.push({
        questionId: q._id,
        question: q.question,
        options: q.options,
        userSelected,
        correctIndex: q.correctIndex,
        isCorrect,
        explanation: q.explanation
      });
    });

    const totalQuestions = questions.length || 1;
    const percentage = Math.round((score / totalQuestions) * 100);

    const attempt = new QuizAttempt({
      user: req.user.id,
      category: category || 'Mixed Assessment',
      score,
      totalQuestions,
      percentage
    });

    await attempt.save();

    res.json({
      message: 'Quiz evaluated successfully',
      score,
      totalQuestions,
      percentage,
      review
    });
  } catch (error) {
    console.error('Quiz submit error:', error);
    res.status(500).json({ message: 'Server error evaluating quiz' });
  }
});

// GET /api/quiz/history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const history = await QuizAttempt.find({ user: req.user.id }).sort({ completedAt: -1 });
    res.json(history);
  } catch (error) {
    console.error('Quiz history error:', error);
    res.status(500).json({ message: 'Server error fetching quiz history' });
  }
});

module.exports = router;
