import React, { useState } from 'react';

export default function AptitudeQuiz({ quizzes }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQ = quizzes[currentIndex];

  const handleSelectOption = (index) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: index
    });
  };

  const calculateScore = () => {
    let score = 0;
    quizzes.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
  };

  return (
    <div className="quiz-wrapper">
      <div className="section-header" style={{ textAlign: 'center' }}>
        <h2>Interactive Aptitude & Technical Quiz</h2>
        <p>Test your speed and accuracy in quantitative, logical, and core engineering questions</p>
      </div>

      {!isSubmitted ? (
        <div className="quiz-card">
          <div className="quiz-header">
            <span className="quiz-counter">
              Question {currentIndex + 1} of {quizzes.length}
            </span>
            <span className="quiz-category-tag">{currentQ.category}</span>
          </div>

          <h3 className="question-text">{currentQ.question}</h3>

          <div className="options-grid">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  className={`option-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(optIdx)}
                >
                  <span style={{ fontWeight: 700, width: '24px' }}>
                    {String.fromCharCode(65 + optIdx)}.
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="quiz-actions">
            <button
              className="primary-btn"
              style={{ background: '#f1f5f9', color: '#475569' }}
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
            >
              ← Previous
            </button>

            {currentIndex < quizzes.length - 1 ? (
              <button
                className="primary-btn"
                onClick={() => setCurrentIndex((prev) => prev + 1)}
              >
                Next →
              </button>
            ) : (
              <button
                className="primary-btn"
                style={{ background: 'var(--success)' }}
                onClick={() => setIsSubmitted(true)}
              >
                Submit Quiz ✓
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="quiz-card score-result-card">
          <div className="score-badge-circle">
            {calculateScore()} / {quizzes.length}
          </div>
          <h3>Quiz Completed!</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            You scored {Math.round((calculateScore() / quizzes.length) * 100)}% on this assessment.
          </p>

          <button
            className="primary-btn"
            style={{ marginBottom: '2rem' }}
            onClick={resetQuiz}
          >
            🔄 Retake Quiz
          </button>

          {/* Detailed Question Review */}
          <div style={{ textAlign: 'left', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontWeight: 700, borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              Answer Breakdown & Explanations:
            </h4>
            {quizzes.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isCorrect = userAns === q.correctIndex;
              return (
                <div key={q.id} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong>Q{idx + 1}. {q.question}</strong>
                    <span style={{ fontWeight: 700, color: isCorrect ? 'var(--success)' : 'var(--danger)' }}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Your answer: <span style={{ fontWeight: 600 }}>{userAns !== undefined ? q.options[userAns] : 'Not answered'}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--success)', marginBottom: '0.5rem' }}>
                    Correct answer: <span style={{ fontWeight: 600 }}>{q.options[q.correctIndex]}</span>
                  </div>
                  <div className="explanation-box">
                    💡 <strong>Explanation:</strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
