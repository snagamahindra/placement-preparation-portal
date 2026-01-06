import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'

export default function CodingHome() {
  const navigate = useNavigate()
  const [stats] = useState({
    problemsSolved: 28,
    successRate: 85,
    totalAttempts: 35
  })

  const problems = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', solved: true },
    { id: 2, title: 'Reverse String', difficulty: 'Easy', solved: true },
    { id: 3, title: 'Binary Search', difficulty: 'Medium', solved: false },
    { id: 4, title: 'Longest Substring', difficulty: 'Medium', solved: true },
    { id: 5, title: 'Merge K Lists', difficulty: 'Hard', solved: false },
    { id: 6, title: 'Median of Arrays', difficulty: 'Hard', solved: false },
  ]

  return (
    <div className="section-container">
      <div className="section-header">
        <h1>💻 Coding Practice</h1>
        <p>Solve real interview coding problems</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.problemsSolved}</h3>
          <p>Problems Solved</p>
        </div>
        <div className="stat-card">
          <h3>{stats.successRate}%</h3>
          <p>Success Rate</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalAttempts}</h3>
          <p>Total Attempts</p>
        </div>
      </div>

      <div className="section-content">
        <h2>Select Problem</h2>
        <div className="problems-list">
          {problems.map(problem => (
            <div key={problem.id} className="problem-card">
              <div className="problem-info">
                <h3>{problem.title}</h3>
                <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
              </div>
              <div className="problem-status">
                {problem.solved && <span className="solved">✓ Solved</span>}
              </div>
              <div className="problem-actions">
                <button className="btn btn-secondary" onClick={() => navigate(`/coding/editor?problem=${problem.id}&mode=practice`)}>
                  Practice
                </button>
                <button className="btn btn-primary" onClick={() => navigate(`/coding/editor?problem=${problem.id}&mode=test`)}>
                  Test (Submit)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
