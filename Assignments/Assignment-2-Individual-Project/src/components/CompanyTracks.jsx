import React, { useState } from 'react';

export default function CompanyTracks({ companies }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredCompanies = companies.filter((company) => {
    if (selectedDifficulty === 'All') return true;
    return company.difficulty === selectedDifficulty;
  });

  return (
    <div className="company-tracks-view">
      <div className="section-header">
        <h2>Company Recruitment Tracks</h2>
        <p>In-depth roadmaps, compensation tiers, and evaluation rounds for target hiring partners</p>
      </div>

      <div className="dsa-controls">
        <div style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Showing {filteredCompanies.length} of {companies.length} Companies
        </div>
        <div className="filter-buttons">
          {['All', 'Hard', 'Medium'].map((diff) => (
            <button
              key={diff}
              className={`filter-btn ${selectedDifficulty === diff ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty(diff)}
            >
              {diff === 'All' ? 'All Tiers' : `${diff} Tier`}
            </button>
          ))}
        </div>
      </div>

      <div className="companies-grid">
        {filteredCompanies.map((c) => (
          <div key={c.id} className="company-card">
            <div className="company-card-header">
              <div>
                <h3 className="company-name">{c.name}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.role}</span>
              </div>
              <span className="company-badge">{c.badge}</span>
            </div>

            <div className="company-meta">
              <div className="meta-row">
                <span className="meta-label">CTC Range:</span>
                <span className="meta-value" style={{ color: 'var(--success)' }}>{c.package}</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Evaluation Difficulty:</span>
                <span className={`difficulty-badge difficulty-${c.difficulty}`}>{c.difficulty}</span>
              </div>
            </div>

            <div className="company-rounds">
              <h5>Hiring Workflow ({c.rounds.length} Rounds)</h5>
              <div className="rounds-timeline">
                {c.rounds.map((r) => (
                  <div key={r.round} className="round-step">
                    <span className="round-num">{r.round}</span>
                    <div className="round-content">
                      <strong>{r.name}</strong>
                      <span>{r.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hot-topics-tags">
              {c.hotTopics.map((topic, i) => (
                <span key={i} className="topic-tag">#{topic}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
