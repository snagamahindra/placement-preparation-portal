import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'

export default function QuizHome() {
  const navigate = useNavigate()
  const [scoreboard] = useState([
    { id: 1, name: 'Raj Kumar', score: 95, date: 'Today' },
    { id: 2, name: 'Priya Singh', score: 92, date: 'Today' },
    { id: 3, name: 'Amit Patel', score: 88, date: 'Yesterday' },
    { id: 4, name: 'Neha Gupta', score: 85, date: 'Yesterday' },
    { id: 5, name: 'You', score: 78, date: 'Today', isUser: true }
  ])

  const quizzes = [
    { id: 1, title: 'General Knowledge', questions: 20, difficulty: 'Easy' },
    { id: 2, title: 'Current Affairs', questions: 15, difficulty: 'Medium' },
    { id: 3, title: 'Speed & Accuracy', questions: 25, difficulty: 'Hard' },
  ]

  return (
    <div className="section-container">
      <div className="section-header">
        <h1>📚 Quizzes</h1>
        <p>Test your knowledge with timed quizzes</p>
      </div>

      <div className="scoreboard-section">
        <h2>🏆 Global Scoreboard</h2>
        <div className="scoreboard">
          {scoreboard.map((entry, idx) => (
            <div key={entry.id} className={`scoreboard-row ${entry.isUser ? 'user-row' : ''}`}>
              <span className="rank">#{idx + 1}</span>
              <span className="name">{entry.name}</span>
              <span className="score">{entry.score}%</span>
              <span className="date">{entry.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-content">
        <h2>Available Quizzes</h2>
        <div className="quizzes-grid">
          {quizzes.map(quiz => (
            <div key={quiz.id} className="quiz-card">
              <div className="quiz-header-info">
                <h3>{quiz.title}</h3>
                <span className={`difficulty ${quiz.difficulty.toLowerCase()}`}>{quiz.difficulty}</span>
              </div>
              <p>{quiz.questions} questions</p>
              <div className="quiz-actions">
                <button className="btn btn-secondary" onClick={() => navigate(`/quizzes/start?id=${quiz.id}&mode=practice`)}>
                  Practice
                </button>
                <button className="btn btn-primary" onClick={() => navigate(`/quizzes/start?id=${quiz.id}&mode=test`)}>
                  Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
