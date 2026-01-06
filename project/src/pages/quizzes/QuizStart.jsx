import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../../App.css'

const QUIZ_QUESTIONS = [
  { id: 1, question: 'What is the capital of India?', options: ['Mumbai', 'New Delhi', 'Bangalore', 'Kolkata'], correct: 1 },
  { id: 2, question: 'Who is the first President of India?', options: ['Rajendra Prasad', 'Dr. Zakir Hussain', 'Varahagiri Venkataraman', 'Shankar Dayal Sharma'], correct: 0 },
  { id: 3, question: 'Which planet is closest to the sun?', options: ['Venus', 'Mercury', 'Earth', 'Mars'], correct: 1 },
  { id: 4, question: 'What is 15 + 8?', options: ['20', '22', '23', '25'], correct: 2 },
  { id: 5, question: 'Which country has the most population?', options: ['India', 'China', 'USA', 'Indonesia'], correct: 0 },
]

export default function QuizStart() {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') || 'practice'
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(mode === 'test' ? 180 : null)

  useEffect(() => {
    if (mode === 'test' && timeLeft !== null && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      calculateScore()
    }
  }, [timeLeft, mode])

  const handleAnswer = (optionIndex) => {
    if (isSubmitted) return
    setAnswered({ ...answered, [currentQ]: optionIndex })
  }

  const calculateScore = () => {
    let correctCount = 0
    Object.keys(answered).forEach(qIndex => {
      if (answered[qIndex] === QUIZ_QUESTIONS[qIndex].correct) correctCount++
    })
    setScore(Math.round((correctCount / QUIZ_QUESTIONS.length) * 100))
    setIsSubmitted(true)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  if (isSubmitted) {
    return (
      <div className="section-container">
        <div className="result-card">
          <div className="result-header">
            <h1>🎉 Quiz Completed!</h1>
            <p className="result-score">{score}%</p>
            <p className="result-text">You scored {Object.keys(answered).filter(q => answered[q] === QUIZ_QUESTIONS[q].correct).length} out of {QUIZ_QUESTIONS.length} questions</p>
          </div>
          <div className="result-stats">
            <div className="result-stat">
              <span className="stat-label">Correct Answers</span>
              <span className="stat-value">{Object.keys(answered).filter(q => answered[q] === QUIZ_QUESTIONS[q].correct).length}</span>
            </div>
            <div className="result-stat">
              <span className="stat-label">Questions Attempted</span>
              <span className="stat-value">{Object.keys(answered).length}</span>
            </div>
            <div className="result-stat">
              <span className="stat-label">Mode</span>
              <span className="stat-value">{mode === 'test' ? 'Timed' : 'Practice'}</span>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    )
  }

  const q = QUIZ_QUESTIONS[currentQ]
  const selectedAnswer = answered[currentQ]

  return (
    <div className="section-container">
      <div className="quiz-header">
        <h2>Quiz {mode === 'test' ? '- Timed' : '- Practice'}</h2>
        <div className="quiz-info">
          <span>Question {currentQ + 1}/{QUIZ_QUESTIONS.length}</span>
          {mode === 'test' && <span className="timer">⏱️ {formatTime(timeLeft)}</span>}
        </div>
      </div>

      <div className="quiz-container">
        <h3>{q.question}</h3>
        <div className="options">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              className={`option ${selectedAnswer === idx ? 'selected' : ''}`}
              onClick={() => handleAnswer(idx)}
              disabled={isSubmitted}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="quiz-navigation">
          <button className="btn" disabled={currentQ === 0} onClick={() => setCurrentQ(currentQ - 1)}>
            ← Previous
          </button>
          {currentQ < QUIZ_QUESTIONS.length - 1 ? (
            <button className="btn" onClick={() => setCurrentQ(currentQ + 1)}>
              Next →
            </button>
          ) : (
            <button className="btn btn-primary" onClick={calculateScore}>
              Submit Quiz
            </button>
          )}
        </div>

        <div className="question-tracker">
          {QUIZ_QUESTIONS.map((_, idx) => (
            <button
              key={idx}
              className={`tracker-dot ${idx === currentQ ? 'active' : ''} ${answered[idx] !== undefined ? 'answered' : ''}`}
              onClick={() => setCurrentQ(idx)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
