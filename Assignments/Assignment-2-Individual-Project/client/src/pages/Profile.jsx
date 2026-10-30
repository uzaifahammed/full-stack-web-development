import React from 'react';
import { useAuth } from '../context/AuthContext';
import { mockDashboard } from '../data/mockData';

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 800 }}>
          {user?.name ? user.name[0].toUpperCase() : 'U'}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{user?.name || 'S.Uzaif Ahamed'}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{user?.email || 'demo@placement.com'}</p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span>🏫 {user?.college || 'College of Engineering'}</span>
            <span>•</span>
            <span>🎓 Batch of {user?.graduationYear || '2026'}</span>
          </div>
        </div>
        <button onClick={logout} className="btn-outline" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
          Sign Out
        </button>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>Placement Preparation Summary</h3>
        <div className="stats-grid">
          <div className="stat-box" style={{ background: '#f8fafc', border: '1px solid var(--border)' }}>
            <div className="stat-num" style={{ color: 'var(--primary)' }}>{mockDashboard.stats.solvedProblemsCount}</div>
            <div className="stat-label" style={{ color: 'var(--text-muted)' }}>DSA Solved</div>
          </div>
          <div className="stat-box" style={{ background: '#f8fafc', border: '1px solid var(--border)' }}>
            <div className="stat-num" style={{ color: 'var(--primary)' }}>{mockDashboard.stats.totalQuizAttempts}</div>
            <div className="stat-label" style={{ color: 'var(--text-muted)' }}>Quizzes Taken</div>
          </div>
          <div className="stat-box" style={{ background: '#f8fafc', border: '1px solid var(--border)' }}>
            <div className="stat-num" style={{ color: 'var(--primary)' }}>{mockDashboard.stats.averageQuizScore}%</div>
            <div className="stat-label" style={{ color: 'var(--text-muted)' }}>Average Score</div>
          </div>
          <div className="stat-box" style={{ background: '#f8fafc', border: '1px solid var(--border)' }}>
            <div className="stat-num" style={{ color: 'var(--success)' }}>{mockDashboard.stats.readinessScore}%</div>
            <div className="stat-label" style={{ color: 'var(--text-muted)' }}>Readiness Gauge</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Account Details</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          This student account is active and verified for the 2025–2026 campus recruitment cycle.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Registration ID:</span>
            <strong>A24126552178</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Authentication Method:</span>
            <span className="badge badge-primary">JWT Token</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
            <span style={{ color: 'var(--text-muted)' }}>Database Status:</span>
            <span className="badge badge-easy">MongoDB Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
