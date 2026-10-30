import React, { useState } from 'react';

export default function QuestionModal({ question, onClose }) {
  const [showHint, setShowHint] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!question) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(question.solutionCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>{question.title}</h3>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
              <span className={`difficulty-badge difficulty-${question.difficulty}`}>
                {question.difficulty}
              </span>
              <span className="category-badge">{question.category}</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h5>Problem Statement</h5>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{question.description}</p>
          </div>

          <div className="modal-section">
            <button
              onClick={() => setShowHint(!showHint)}
              style={{
                background: '#fef3c7',
                border: '1px solid #fde68a',
                color: '#b45309',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '0.5rem'
              }}
            >
              {showHint ? '🙈 Hide Hint' : '💡 Need a Hint? Click Here'}
            </button>
            {showHint && <div className="modal-hint-box">{question.hint}</div>}
          </div>

          <div className="modal-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h5>Optimal Solution (JavaScript / ES6)</h5>
              <button
                onClick={handleCopy}
                style={{
                  background: 'none',
                  border: '1px solid var(--border)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                {copied ? '✓ Copied' : '📋 Copy Code'}
              </button>
            </div>
            <pre className="code-container">
              <code>{question.solutionCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
