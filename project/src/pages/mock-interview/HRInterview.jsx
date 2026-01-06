import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../../App.css'

const HR_QUESTIONS = [
  'Tell me about yourself',
  'Why do you want to join our company?',
  'What are your strengths and weaknesses?',
  'Describe a challenging situation you handled',
  'Where do you see yourself in 5 years?'
]

export default function HRInterview() {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') || 'practice'
  const [currentQ, setCurrentQ] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [answered, setAnswered] = useState({})
  const [timeLeft, setTimeLeft] = useState(mode === 'test' ? 300 : null)

  useEffect(() => {
    if (mode === 'test' && timeLeft !== null && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, mode])

  const handleSubmitAnswer = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setAnswered({ ...answered, [currentQ]: true })
      setFeedback('✓ Great answer! Good communication and clarity.')
      setIsSubmitting(false)
    }, 1000)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const q = HR_QUESTIONS[currentQ]

  return (
    <div className="section-container">
      <div className="quiz-header">
        <h2>HR Interview {mode === 'test' ? '- Timed' : '- Practice'}</h2>
        <div className="quiz-info">
          <span>Question {currentQ + 1}/{HR_QUESTIONS.length}</span>
          {mode === 'test' && <span className="timer">⏱️ {formatTime(timeLeft)}</span>}
        </div>
      </div>

      <div className="interview-container">
        <div className="question-box">
          <h3>{q}</h3>
        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="answer-textarea"
          placeholder="Type your answer here..."
          rows="8"
        />

        {feedback && <div className="feedback-box">{feedback}</div>}

        <div className="interview-buttons">
          <button className="btn" disabled={currentQ === 0} onClick={() => { setCurrentQ(currentQ - 1); setAnswer(''); setFeedback(''); }}>
            ← Previous
          </button>
          <button className="btn btn-primary" onClick={handleSubmitAnswer} disabled={!answer.trim() || isSubmitting}>
            {isSubmitting ? '⏳ Analyzing...' : '✓ Submit Answer'}
          </button>
          {currentQ < HR_QUESTIONS.length - 1 && (
            <button className="btn" onClick={() => { setCurrentQ(currentQ + 1); setAnswer(''); setFeedback(''); }}>
              Next →
            </button>
          )}
        </div>

        <div className="question-tracker">
          {HR_QUESTIONS.map((_, idx) => (
            <button
              key={idx}
              className={`tracker-dot ${idx === currentQ ? 'active' : ''} ${answered[idx] ? 'answered' : ''}`}
              onClick={() => { setCurrentQ(idx); setAnswer(''); setFeedback(''); }}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
