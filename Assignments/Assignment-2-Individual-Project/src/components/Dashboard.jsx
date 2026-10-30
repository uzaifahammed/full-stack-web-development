import React from 'react';

export default function Dashboard({
  portalInfo,
  stats,
  readinessScore,
  completedDsaCount,
  completedChecklistCount,
  totalChecklistCount,
  setActiveTab
}) {
  return (
    <div className="dashboard-view">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <span className="hero-badge">Campus Recruitment Season {portalInfo.academicYear}</span>
          <h2 className="hero-title">Crack Your Dream Placement with PrepPulse</h2>
          <p className="hero-subtitle">
            Curated preparation paths for product engineering and service leaders. Master Data Structures,
            ace Aptitude tests, revise Core CS fundamentals, and prepare for HR interviews.
          </p>
          <div className="hero-stats-grid">
            <div className="hero-stat-card">
              <div className="hero-stat-number">{stats.totalProblems}+</div>
              <div className="hero-stat-label">Coding Challenges</div>
            </div>
            <div className="hero-stat-card">
              <div className="hero-stat-number">{stats.companyTracks}</div>
              <div className="hero-stat-label">Company Roadmaps</div>
            </div>
            <div className="hero-stat-card">
              <div className="hero-stat-number">{stats.coreSubjects}</div>
              <div className="hero-stat-label">Core Subjects</div>
            </div>
            <div className="hero-stat-card">
              <div className="hero-stat-number">{stats.aptitudeQuestions}</div>
              <div className="hero-stat-label">Practice Tests</div>
            </div>
          </div>
        </div>
      </div>

      {/* Placement Readiness Card */}
      <div className="readiness-card">
        <div className="readiness-info">
          <h3>Your Placement Readiness Score</h3>
          <p>
            Based on {completedDsaCount} DSA solved & {completedChecklistCount} of {totalChecklistCount} milestones completed.
          </p>
        </div>
        <div className="readiness-progress-wrapper">
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${readinessScore}%` }}
            ></div>
          </div>
          <span className="readiness-percentage">{readinessScore}%</span>
        </div>
      </div>

      {/* Section Header */}
      <div className="section-header">
        <h2>Quick Access Modules</h2>
        <p>Jump directly into high-impact preparation domains</p>
      </div>

      {/* Quick Action Cards Grid */}
      <div className="quick-cards-grid">
        <div className="quick-card" onClick={() => setActiveTab('companies')}>
          <div className="quick-card-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            🏢
          </div>
          <h4>Target Company Tracks</h4>
          <p>Explore recruitment rounds, CTC brackets, and top patterns for Amazon, Google, Microsoft, TCS, and more.</p>
          <span className="quick-card-link">View Company Guides →</span>
        </div>

        <div className="quick-card" onClick={() => setActiveTab('dsa')}>
          <div className="quick-card-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            💻
          </div>
          <h4>DSA & Coding Drills</h4>
          <p>Practice frequently asked interview problems with hints, problem statements, and complete solution code.</p>
          <span className="quick-card-link">Start Coding →</span>
        </div>

        <div className="quick-card" onClick={() => setActiveTab('aptitude')}>
          <div className="quick-card-icon" style={{ background: '#dcfce7', color: '#16a34a' }}>
            📝
          </div>
          <h4>Interactive Aptitude Quiz</h4>
          <p>Timed practice tests covering Quantitative Aptitude, Logical Reasoning, and Technical MCQs with instant scoring.</p>
          <span className="quick-card-link">Take Quiz →</span>
        </div>

        <div className="quick-card" onClick={() => setActiveTab('core')}>
          <div className="quick-card-icon" style={{ background: '#ede9fe', color: '#7c3aed' }}>
            📚
          </div>
          <h4>Core CS Flashcards</h4>
          <p>Rapid revision for DBMS (ACID, Normalization), OS (Deadlocks, Paging), Networks (TCP/UDP), and OOPs.</p>
          <span className="quick-card-link">Revise Fundamentals →</span>
        </div>

        <div className="quick-card" onClick={() => setActiveTab('interview')}>
          <div className="quick-card-icon" style={{ background: '#fce7f3', color: '#db2777' }}>
            🎙️
          </div>
          <h4>HR & Behavioral Prep</h4>
          <p>Master the STAR method for behavioral rounds, sample responses to tricky questions, and interviewer tips.</p>
          <span className="quick-card-link">Read Interview Prep →</span>
        </div>

        <div className="quick-card" onClick={() => setActiveTab('checklist')}>
          <div className="quick-card-icon" style={{ background: '#f1f5f9', color: '#475569' }}>
            ✅
          </div>
          <h4>Placement Checklist</h4>
          <p>Stay organized with an interactive tracker for resumes, project deployments, and technical milestones.</p>
          <span className="quick-card-link">Track Checklist →</span>
        </div>
      </div>
    </div>
  );
}
