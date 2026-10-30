import React, { useState } from 'react';

export default function DsaPractice({
  questions,
  completedIds,
  onToggleComplete,
  onSelectQuestion
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const categories = ['All', 'Arrays', 'Strings', 'Linked Lists', 'Trees', 'Dynamic Programming', 'Sorting & Searching'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.companies.some((comp) => comp.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="dsa-practice-view">
      <div className="section-header">
        <h2>Data Structures & Algorithm Drills</h2>
        <p>Curated problems frequently encountered in campus coding rounds & technical interviews</p>
      </div>

      <div className="dsa-controls">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search problems by title or company (e.g. Amazon, Kadane)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="filter-buttons">
          {difficulties.map((diff) => (
            <button
              key={diff}
              className={`filter-btn ${selectedDifficulty === diff ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty(diff)}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="problems-list">
        {filteredQuestions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No coding problems match your current search and filter criteria.
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isCompleted = completedIds.includes(q.id);
            return (
              <div
                key={q.id}
                className={`problem-card ${isCompleted ? 'completed' : ''}`}
              >
                <div className="problem-left">
                  <div
                    className={`checkbox-round ${isCompleted ? 'checked' : ''}`}
                    onClick={() => onToggleComplete(q.id)}
                    title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
                  >
                    {isCompleted ? '✓' : ''}
                  </div>
                  <div className="problem-details">
                    <h4>{q.title}</h4>
                    <div className="problem-tags">
                      <span className={`difficulty-badge difficulty-${q.difficulty}`}>
                        {q.difficulty}
                      </span>
                      <span className="category-badge">{q.category}</span>
                      {q.companies.map((c, i) => (
                        <span key={i} className="topic-tag">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  className="view-solution-btn"
                  onClick={() => onSelectQuestion(q)}
                >
                  View Solution & Code
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
