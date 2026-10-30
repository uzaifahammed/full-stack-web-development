import React, { useState } from 'react';

export default function CoreSubjects({ subjects }) {
  const [activeSubject, setActiveSubject] = useState('all');

  const filteredSubjects = subjects.filter((s) => {
    if (activeSubject === 'all') return true;
    return s.id === activeSubject;
  });

  return (
    <div className="core-subjects-view">
      <div className="section-header">
        <h2>Core Computer Science Fundamentals</h2>
        <p>Essential theoretical revision for DBMS, Operating Systems, Computer Networks, and OOPs</p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className={`filter-btn ${activeSubject === 'all' ? 'active' : ''}`}
          onClick={() => setActiveSubject('all')}
        >
          All Subjects
        </button>
        {subjects.map((s) => (
          <button
            key={s.id}
            className={`filter-btn ${activeSubject === s.id ? 'active' : ''}`}
            onClick={() => setActiveSubject(s.id)}
          >
            {s.name.split('(')[0]}
          </button>
        ))}
      </div>

      <div className="subjects-container">
        {filteredSubjects.map((s) => (
          <div key={s.id} className="subject-block">
            <div className="subject-header">
              <div
                className="subject-color-bar"
                style={{ background: s.color }}
              ></div>
              <h3>{s.name}</h3>
            </div>

            <div className="concepts-grid">
              {s.concepts.map((c, i) => (
                <div key={i} className="concept-card">
                  <h4>{c.title}</h4>
                  <p>{c.summary}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
