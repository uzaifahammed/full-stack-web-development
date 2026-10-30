import React from 'react';

export default function Navbar({ portalInfo, activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'companies', label: 'Company Tracks', icon: '🏢' },
    { id: 'dsa', label: 'DSA Practice', icon: '💻' },
    { id: 'aptitude', label: 'Aptitude Quiz', icon: '📝' },
    { id: 'core', label: 'Core CS Notes', icon: '📚' },
    { id: 'interview', label: 'Interview Prep', icon: '🎙️' },
    { id: 'checklist', label: 'Checklist', icon: '✅' }
  ];

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <div className="nav-container">
          <div className="brand-section">
            <div className="brand-icon">P</div>
            <div className="brand-text">
              <h1>{portalInfo.title}</h1>
              <span>{portalInfo.tagline}</span>
            </div>
          </div>
          <div className="nav-user-badge">
            <span>👤 {portalInfo.studentName}</span>
            <span>•</span>
            <span>{portalInfo.studentId}</span>
          </div>
        </div>
      </nav>

      <div className="nav-tabs">
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
