import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockQuizQuestions } from '../data/mockData';

export default function Aptitude() {
  const { token } = useAuth();
  const [questions, setQuestions] = useState(mockQuizQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [review, setReview] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/api/quiz/questions');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) setQuestions(data);
        }
      } catch (err) {
        console.warn('Using local mock quiz questions:', err.message);
      }
    };
    fetchQuestions();
  }, []);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ._id]: idx
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          category: 'Placement Mock Assessment',
          answers: selectedAnswers
        })
      });

      if (res.ok) {
        const data = await res.json();
        setScore(data.score);
        setReview(data.review);
        setIsSubmitted(true);
        return;
      }
    } catch (err) {
      console.warn('Evaluating quiz locally:', err.message);
    }

    // Local evaluation fallback
    let localScore = 0;
    const localReview = questions.map((q) => {
      const userSelected = selectedAnswers[q._id];
      const isCorrect = userSelected === q.correctIndex;
      if (isCorrect) localScore++;
      return {
        questionId: q._id,
        question: q.question,
        options: q.options,
        userSelected,
        correctIndex: q.correctIndex,
        isCorrect,
        explanation: q.explanation
      };
    });

    setScore(localScore);
    setReview(localReview);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
    setReview(null);
    setScore(0);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Aptitude & Technical Assessment</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Timed practice test for campus screening tests
        </p>
      </div>

      {!isSubmitted ? (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
            <span className="badge badge-primary">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {currentQ.category}
            </span>
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem', lineHeight: 1.4 }}>
            {currentQ.question}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentQ._id] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  style={{
                    background: isSelected ? 'var(--primary-light)' : '#ffffff',
                    border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                    color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                    fontWeight: isSelected ? 600 : 500,
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontWeight: 700, width: '22px' }}>{String.fromCharCode(65 + optIdx)}.</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              className="btn-outline"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
            >
              ← Previous
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                className="btn-primary"
                onClick={() => setCurrentIndex((prev) => prev + 1)}
              >
                Next →
              </button>
            ) : (
              <button
                className="btn-primary"
                style={{ background: 'var(--success)' }}
                onClick={handleSubmit}
              >
                Submit Assessment ✓
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 800, margin: '0 auto 1.25rem' }}>
            {score} / {questions.length}
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.25rem' }}>Assessment Completed!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            You scored {Math.round((score / questions.length) * 100)}% on this assessment.
          </p>

          <button onClick={handleReset} className="btn-primary" style={{ marginBottom: '2rem' }}>
            🔄 Retake Assessment
          </button>

          {review && (
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                Question Breakdown & Explanations:
              </h3>
              {review.map((item, idx) => (
                <div key={idx} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong>Q{idx + 1}. {item.question}</strong>
                    <span style={{ fontWeight: 700, color: item.isCorrect ? 'var(--success)' : 'var(--danger)' }}>
                      {item.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--success)', marginBottom: '0.4rem' }}>
                    Correct: <strong>{item.options[item.correctIndex]}</strong>
                  </div>
                  <div style={{ fontSize: '0.85rem', background: '#eef2ff', padding: '0.65rem 0.85rem', borderRadius: '6px', color: '#3730a3' }}>
                    💡 <strong>Explanation:</strong> {item.explanation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
