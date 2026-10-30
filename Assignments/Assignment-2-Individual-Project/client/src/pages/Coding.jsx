import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockCodingProblems } from '../data/mockData';

export default function Coding() {
  const { token } = useAuth();
  const [problems, setProblems] = useState(mockCodingProblems);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [solvedIds, setSolvedIds] = useState(['prob_1', 'prob_3']);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch('/api/coding');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) setProblems(data);
        }
      } catch (err) {
        console.warn('Using local mock coding problems:', err.message);
      }
    };
    fetchProblems();
  }, []);

  const handleToggleSolve = async (id) => {
    if (solvedIds.includes(id)) {
      setSolvedIds(solvedIds.filter((item) => item !== id));
    } else {
      setSolvedIds([...solvedIds, id]);
    }

    try {
      await fetch(`/api/coding/${id}/toggle-solve`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (e) {
      console.warn('Updated solve status locally');
    }
  };

  const filtered = problems.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.companies.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchDiff = difficulty === 'All' || p.difficulty === difficulty;
    return matchSearch && matchDiff;
  });

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Coding Practice Problems</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Curated Data Structures & Algorithm challenges for campus tech rounds
        </p>
      </div>

      <div className="card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.5rem', padding: '1rem' }}>
        <input
          type="text"
          className="form-input"
          style={{ flex: 1, minWidth: '240px' }}
          placeholder="🔍 Search problem by name or company (e.g. Amazon, Kadane)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              className={`btn-outline ${difficulty === diff ? 'active' : ''}`}
              style={{
                background: difficulty === diff ? 'var(--primary)' : 'transparent',
                color: difficulty === diff ? '#ffffff' : 'var(--text-muted)',
                borderColor: difficulty === diff ? 'var(--primary)' : 'var(--border)'
              }}
              onClick={() => setDifficulty(diff)}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {filtered.map((prob) => {
          const isSolved = solvedIds.includes(prob._id);
          return (
            <div
              key={prob._id}
              className="card"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1rem 1.25rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  onClick={() => handleToggleSolve(prob._id)}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: `2px solid ${isSolved ? 'var(--success)' : '#cbd5e1'}`,
                    background: isSolved ? 'var(--success)' : 'transparent',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}
                  title={isSolved ? 'Mark unsolved' : 'Mark solved'}
                >
                  {isSolved && '✓'}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, textDecoration: isSolved ? 'line-through' : 'none', color: isSolved ? 'var(--text-light)' : 'var(--text-main)' }}>
                    {prob.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                    <span className={`badge badge-${prob.difficulty.toLowerCase()}`}>{prob.difficulty}</span>
                    <span className="badge badge-primary">{prob.category}</span>
                    {prob.companies.map((c, i) => (
                      <span key={i} style={{ fontSize: '0.75rem', background: '#f1f5f9', color: 'var(--text-muted)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button className="btn-primary" onClick={() => setSelectedProblem(prob)}>
                View Problem & Code
              </button>
            </div>
          );
        })}
      </div>

      {/* Problem Modal */}
      {selectedProblem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1.5rem' }} onClick={() => setSelectedProblem(null)}>
          <div className="card" style={{ width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{selectedProblem.title}</h2>
                <span className={`badge badge-${selectedProblem.difficulty.toLowerCase()}`} style={{ marginTop: '0.25rem' }}>
                  {selectedProblem.difficulty}
                </span>
              </div>
              <button onClick={() => setSelectedProblem(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>
                &times;
              </button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Problem Description</h4>
              <p style={{ lineHeight: 1.6, fontSize: '0.95rem' }}>{selectedProblem.description}</p>
            </div>

            {selectedProblem.hint && (
              <div style={{ background: 'var(--warning-light)', borderLeft: '4px solid var(--warning)', padding: '0.75rem 1rem', borderRadius: '0 6px 6px 0', marginBottom: '1rem', fontSize: '0.85rem', color: '#92400e' }}>
                💡 <strong>Hint:</strong> {selectedProblem.hint}
              </div>
            )}

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Solution (JavaScript)</h4>
                <button onClick={() => handleCopyCode(selectedProblem.solutionCode)} className="btn-outline" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                  {copied ? '✓ Copied' : '📋 Copy Code'}
                </button>
              </div>
              <pre style={{ background: '#0f172a', color: '#f8fafc', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', overflowX: 'auto', fontFamily: 'monospace' }}>
                <code>{selectedProblem.solutionCode}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
