import React, { useState, useEffect } from 'react';
import { mockInterviewQuestions } from '../data/mockData';

export default function Interview() {
  const [questions, setQuestions] = useState(mockInterviewQuestions);
  const [category, setCategory] = useState('All');
  const [expandedId, setExpandedId] = useState('iq_1');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/api/questions');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) setQuestions(data);
        }
      } catch (err) {
        console.warn('Using local mock interview questions:', err.message);
      }
    };
    fetchQuestions();
  }, []);

  const categories = ['All', 'HR', 'DBMS', 'Operating Systems', 'Computer Networks'];

  const filtered = questions.filter((q) => {
    return category === 'All' || q.category === category;
  });

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Interview Question Bank</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Frequently asked HR behavioral and core technical interview questions
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn-outline ${category === cat ? 'active' : ''}`}
            style={{
              background: category === cat ? 'var(--primary)' : 'transparent',
              color: category === cat ? '#ffffff' : 'var(--text-muted)',
              borderColor: category === cat ? 'var(--primary)' : 'var(--border)'
            }}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map((q) => {
          const isExpanded = expandedId === q._id;
          return (
            <div key={q._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge badge-primary">{q.category}</span>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : q._id)}
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  {isExpanded ? 'Collapse ▲' : 'View Answer ▼'}
                </button>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>{q.title}</h3>

              {q.strategy && (
                <div style={{ background: '#fdf2f8', borderLeft: '4px solid #ec4899', padding: '0.65rem 0.85rem', borderRadius: '0 6px 6px 0', fontSize: '0.85rem', color: '#9d174d', marginBottom: '0.75rem' }}>
                  🎯 <strong>Recommended Strategy:</strong> {q.strategy}
                </div>
              )}

              {isExpanded && (
                <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem', fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '0.35rem' }}>
                    💬 Model Answer:
                  </div>
                  {q.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
