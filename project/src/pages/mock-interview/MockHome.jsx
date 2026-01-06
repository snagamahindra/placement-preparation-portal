import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'

export default function MockHome() {
  const navigate = useNavigate()
  const [stats] = useState({
    interviewsTaken: 12,
    averageScore: 82,
    bestScore: 95
  })

  return (
    <div className="section-container">
      <div className="section-header">
        <h1>🎤 Mock Interviews</h1>
        <p>Practice with HR and Technical interviews</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.interviewsTaken}</h3>
          <p>Interviews Taken</p>
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
        <h2>Select Interview Type</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon">💼</div>
            <h3>HR Interview</h3>
            <p>Practice common HR questions and behavioral patterns</p>
            <div className="category-actions">
              <button className="btn btn-secondary" onClick={() => navigate('/mock-interview/hr?mode=practice')}>
                Practice (No Limit)
              </button>
              <button className="btn btn-primary" onClick={() => navigate('/mock-interview/hr?mode=test')}>
                Test (Timed)
              </button>
            </div>
          </div>

          <div className="category-card">
            <div className="category-icon">🔧</div>
            <h3>Technical Interview</h3>
            <p>Practice technical questions and problem-solving</p>
            <div className="category-actions">
              <button className="btn btn-secondary" onClick={() => navigate('/mock-interview/technical?mode=practice')}>
                Practice (No Limit)
              </button>
              <button className="btn btn-primary" onClick={() => navigate('/mock-interview/technical?mode=test')}>
                Test (Timed)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
