import React, { useState } from 'react';

export default function InterviewGuide({ questions }) {
  const [expandedId, setExpandedId] = useState(1);

  return (
    <div className="interview-guide-view">
      <div className="section-header">
        <h2>HR & Behavioral Interview Preparation</h2>
        <p>Master situational and behavioral questions using the STAR framework with sample model responses</p>
      </div>

      <div className="interview-guide-grid">
        {questions.map((q) => {
          const isExpanded = expandedId === q.id;
          return (
            <div key={q.id} className="interview-card">
              <div className="interview-card-header">
                <span className="interview-category">{q.category}</span>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  {isExpanded ? 'Collapse ▲' : 'Expand Sample Answer ▼'}
                </button>
              </div>

              <h3>{q.question}</h3>

              <div className="strategy-box">
                🎯 <strong>Recommended Answering Strategy:</strong> {q.strategy}
              </div>

              {isExpanded && (
                <div className="sample-answer-box">
                  <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: 'var(--primary)' }}>
                    💬 Sample Model Answer:
                  </div>
                  <p>{q.sampleAnswer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
