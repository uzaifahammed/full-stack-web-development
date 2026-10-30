import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockDashboard } from '../data/mockData';

export default function Dashboard() {
  const { user, token } = useAuth();
  const [data, setData] = useState(mockDashboard);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('/api/user/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.warn('Using local mock dashboard data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  const stats = data.stats || mockDashboard.stats;
  const attempts = data.recentAttempts || mockDashboard.recentAttempts;

  return (
    <div>
      {/* Hero Welcome */}
      <div className="hero-header">
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          🎓 Campus Recruitment Portal
        </div>
        <h1 className="hero-title">Welcome back, {user?.name || 'Student'}!</h1>
        <p className="hero-sub">
          Track your placement preparation, practice coding problems, and master your technical and HR rounds.
        </p>

        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-num">{stats.solvedProblemsCount} / {stats.totalProblems}</div>
            <div className="stat-label">Problems Solved</div>
          </div>
          <div className="stat-box">
            <div className="stat-num">{stats.totalQuizAttempts}</div>
            <div className="stat-label">Quiz Attempts</div>
          </div>
          <div className="stat-box">
            <div className="stat-num">{stats.averageQuizScore}%</div>
            <div className="stat-label">Avg Quiz Score</div>
          </div>
          <div className="stat-box">
            <div className="stat-num">{stats.readinessScore}%</div>
            <div className="stat-label">Readiness Score</div>
          </div>
        </div>
      </div>

      {/* Placement Readiness Progress Bar */}
      <div className="card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.25rem' }}>Placement Readiness Gauge</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Calculated from coding problems solved and aptitude quiz performance.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '260px' }}>
          <div style={{ flex: 1, height: '12px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: `${stats.readinessScore}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}></div>
          </div>
          <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.2rem' }}>{stats.readinessScore}%</span>
        </div>
      </div>

      {/* Quick Access Grid */}
      <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem' }}>Preparation Modules</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <Link to="/aptitude" className="card" style={{ transition: 'all 0.2s', cursor: 'pointer' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📝</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>Aptitude Practice</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Timed quantitative, logical reasoning, and technical MCQs with instant scoring and explanations.
          </p>
        </Link>

        <Link to="/coding" className="card" style={{ transition: 'all 0.2s', cursor: 'pointer' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>💻</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>Coding Practice</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Solve top interview DSA challenges tagged by Amazon, Google, Microsoft, and TCS.
          </p>
        </Link>

        <Link to="/interview" className="card" style={{ transition: 'all 0.2s', cursor: 'pointer' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🎙️</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>Interview Questions</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Review high-yield questions for HR, DBMS, Operating Systems, Networks, and OOPs.
          </p>
        </Link>
      </div>

      {/* Recent Quiz Attempts */}
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>Recent Quiz Attempts</h3>
        {attempts && attempts.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Category</th>
                  <th style={{ padding: '0.75rem' }}>Score</th>
                  <th style={{ padding: '0.75rem' }}>Percentage</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((att, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>{att.category}</td>
                    <td style={{ padding: '0.75rem' }}>{att.score} / {att.totalQuestions}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 700 }}>{att.percentage}%</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${att.percentage >= 70 ? 'badge-easy' : 'badge-hard'}`}>
                        {att.percentage >= 70 ? 'Passed' : 'Needs Practice'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No quiz attempts yet. Start an aptitude test today!</p>
        )}
      </div>
    </div>
  );
}
