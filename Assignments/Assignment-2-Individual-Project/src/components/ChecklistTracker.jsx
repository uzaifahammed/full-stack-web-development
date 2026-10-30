import React from 'react';

export default function ChecklistTracker({
  checklist,
  onToggleItem,
  completedCount,
  totalCount
}) {
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="checklist-wrapper">
      <div className="section-header" style={{ textAlign: 'center' }}>
        <h2>Placement Preparation Checklist</h2>
        <p>Track your essential milestones from resume building to final mock interviews</p>
      </div>

      <div className="checklist-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Milestone Progress</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {completedCount} of {totalCount} tasks completed
            </span>
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
            {percentage}%
          </span>
        </div>

        <div className="progress-bar-container" style={{ marginBottom: '1.5rem', height: '10px' }}>
          <div
            className="progress-bar-fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className="checklist-items">
          {checklist.map((item) => (
            <div
              key={item.id}
              className={`checklist-item ${item.done ? 'checked' : ''}`}
              onClick={() => onToggleItem(item.id)}
            >
              <div className="checklist-item-left">
                <div
                  className={`checkbox-round ${item.done ? 'checked' : ''}`}
                  style={{ width: '22px', height: '22px' }}
                >
                  {item.done ? '✓' : ''}
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>
                  {item.task}
                </span>
              </div>
              <span className="checklist-category-badge">{item.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
