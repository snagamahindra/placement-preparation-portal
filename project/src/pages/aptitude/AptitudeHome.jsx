import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'

export default function AptitudeHome() {
  const navigate = useNavigate()
  const [stats] = useState({
    totalAttempts: 45,
    averageScore: 78,
    bestScore: 92
  })

  return (
    <div className="section-container">
      <div className="section-header">
        <h1>📊 Aptitude Training</h1>
        <p>Master quantitative, logical, and verbal reasoning</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalAttempts}</h3>
          <p>Total Attempts</p>
        </div>
        <div className="stat-card">
          <h3>{stats.averageScore}%</h3>
          <p>Average Score</p>
        </div>
        <div className="stat-card">
          <h3>{stats.bestScore}%</h3>
          <p>Best Score</p>
        </div>
      </div>

      <div className="section-content">
        <h2>Select Category</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon">🔢</div>
            <h3>Quantitative Aptitude</h3>
            <p>Numbers, percentages, algebra, geometry & more</p>
            <div className="category-actions">
              <button className="btn btn-secondary" onClick={() => navigate('/aptitude/quantitative?mode=practice')}>
                Practice (No Limit)
              </button>
              <button className="btn btn-primary" onClick={() => navigate('/aptitude/quantitative?mode=test')}>
                Test (Timed)
              </button>
            </div>
          </div>

          <div className="category-card">
            <div className="category-icon">🧩</div>
            <h3>Logical Reasoning</h3>
            <p>Puzzles, patterns, sequences & critical thinking</p>
            <div className="category-actions">
              <button className="btn btn-secondary" onClick={() => navigate('/aptitude/logical?mode=practice')}>
                Practice (No Limit)
              </button>
              <button className="btn btn-primary" onClick={() => navigate('/aptitude/logical?mode=test')}>
                Test (Timed)
              </button>
            </div>
          </div>

          <div className="category-card">
            <div className="category-icon">📖</div>
            <h3>Verbal Ability</h3>
            <p>Reading comprehension, grammar & vocabulary</p>
            <div className="category-actions">
              <button className="btn btn-secondary" onClick={() => navigate('/aptitude/verbal?mode=practice')}>
                Practice (No Limit)
              </button>
              <button className="btn btn-primary" onClick={() => navigate('/aptitude/verbal?mode=test')}>
                Test (Timed)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
