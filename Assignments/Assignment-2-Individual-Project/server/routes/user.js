const express = require('express');
const router = express.Router();
const User = require('../models/User');
const QuizAttempt = require('../models/QuizAttempt');
const CodingProblem = require('../models/CodingProblem');
const authMiddleware = require('../middleware/auth');

// GET /api/user/dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('solvedProblems');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalProblems = await CodingProblem.countDocuments();
    const attempts = await QuizAttempt.find({ user: user._id }).sort({ completedAt: -1 }).limit(5);
    const totalAttempts = await QuizAttempt.countDocuments({ user: user._id });

    // Calculate average score
    const allAttempts = await QuizAttempt.find({ user: user._id });
    const avgScore = allAttempts.length > 0
      ? Math.round(allAttempts.reduce((acc, curr) => acc + curr.percentage, 0) / allAttempts.length)
      : 0;

    // Calculate placement readiness score
    const solvedCount = user.solvedProblems.length;
    const codingRatio = totalProblems > 0 ? (solvedCount / totalProblems) * 50 : 0;
    const quizRatio = (avgScore / 100) * 50;
    const readinessScore = Math.min(100, Math.round(codingRatio + quizRatio));

    res.json({
      user: {
        name: user.name,
        email: user.email,
        college: user.college,
        graduationYear: user.graduationYear
      },
      stats: {
        solvedProblemsCount: solvedCount,
        totalProblems,
        totalQuizAttempts: totalAttempts,
        averageQuizScore: avgScore,
        readinessScore
      },
      recentAttempts: attempts
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error loading dashboard' });
  }
});

module.exports = router;
