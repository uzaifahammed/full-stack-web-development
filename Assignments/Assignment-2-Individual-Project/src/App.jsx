import React, { useState, useEffect } from 'react';
import data from './data.json';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';
import CompanyTracks from './components/CompanyTracks.jsx';
import DsaPractice from './components/DsaPractice.jsx';
import AptitudeQuiz from './components/AptitudeQuiz.jsx';
import CoreSubjects from './components/CoreSubjects.jsx';
import InterviewGuide from './components/InterviewGuide.jsx';
import ChecklistTracker from './components/ChecklistTracker.jsx';
import QuestionModal from './components/QuestionModal.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Completed DSA questions state
  const [completedDsaIds, setCompletedDsaIds] = useState(() => {
    try {
      const saved = localStorage.getItem('preppulse_dsa_completed');
      return saved ? JSON.parse(saved) : [1, 3, 5];
    } catch {
      return [1, 3, 5];
    }
  });

  // Checklist state
  const [checklist, setChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem('preppulse_checklist');
      return saved ? JSON.parse(saved) : data.checklist;
    } catch {
      return data.checklist;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('preppulse_dsa_completed', JSON.stringify(completedDsaIds));
    } catch (e) {
      console.warn(e);
    }
  }, [completedDsaIds]);

  useEffect(() => {
    try {
      localStorage.setItem('preppulse_checklist', JSON.stringify(checklist));
    } catch (e) {
      console.warn(e);
    }
  }, [checklist]);

  const handleToggleDsa = (id) => {
    setCompletedDsaIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleChecklist = (id) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  // Calculate dynamic readiness score
  const totalDsa = data.dsaQuestions.length;
  const completedDsaCount = completedDsaIds.length;
  const totalChecklist = checklist.length;
  const completedChecklistCount = checklist.filter((c) => c.done).length;

  const dsaRatio = totalDsa > 0 ? completedDsaCount / totalDsa : 0;
  const checklistRatio = totalChecklist > 0 ? completedChecklistCount / totalChecklist : 0;
  const readinessScore = Math.min(100, Math.round((dsaRatio * 50) + (checklistRatio * 50)));

  return (
    <div className="app-wrapper">
      <Navbar
        portalInfo={data.portalInfo}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard
            portalInfo={data.portalInfo}
            stats={data.stats}
            readinessScore={readinessScore}
            completedDsaCount={completedDsaCount}
            completedChecklistCount={completedChecklistCount}
            totalChecklistCount={totalChecklist}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'companies' && (
          <CompanyTracks companies={data.companies} />
        )}

        {activeTab === 'dsa' && (
          <DsaPractice
            questions={data.dsaQuestions}
            completedIds={completedDsaIds}
            onToggleComplete={handleToggleDsa}
            onSelectQuestion={(q) => setSelectedQuestion(q)}
          />
        )}

        {activeTab === 'aptitude' && (
          <AptitudeQuiz quizzes={data.quizzes} />
        )}

        {activeTab === 'core' && (
          <CoreSubjects subjects={data.coreSubjects} />
        )}

        {activeTab === 'interview' && (
          <InterviewGuide questions={data.interviewQuestions} />
        )}

        {activeTab === 'checklist' && (
          <ChecklistTracker
            checklist={checklist}
            onToggleItem={handleToggleChecklist}
            completedCount={completedChecklistCount}
            totalCount={totalChecklist}
          />
        )}
      </main>

      {selectedQuestion && (
        <QuestionModal
          question={selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
        />
      )}

      <footer className="footer">
        <p>
          <strong>{data.portalInfo.title}</strong> — {data.portalInfo.tagline} • Developed by{' '}
          {data.portalInfo.studentName} ({data.portalInfo.studentId})
        </p>
        <p style={{ marginTop: '0.25rem', color: 'var(--text-light)', fontSize: '0.75rem' }}>
          Assignment 2 Individual Project • React.js + CSS + Dummy JSON Data
        </p>
      </footer>
    </div>
  );
}
