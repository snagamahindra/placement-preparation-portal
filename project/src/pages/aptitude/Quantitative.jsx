import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../../App.css'

const QUESTIONS = [
  { id: 1, question: 'What is 25% of 200?', options: ['25', '50', '75', '100'], correct: 1, explanation: '25% of 200 = 0.25 × 200 = 50' },
  { id: 2, question: 'If x + 5 = 12, what is x?', options: ['5', '7', '9', '12'], correct: 1, explanation: 'x = 12 - 5 = 7' },
  { id: 3, question: 'Find the average of 10, 20, 30, 40', options: ['20', '25', '30', '35'], correct: 2, explanation: 'Average = (10+20+30+40)/4 = 100/4 = 25' },
  { id: 4, question: 'What is 15² ?', options: ['200', '225', '250', '275'], correct: 1, explanation: '15 × 15 = 225' },
  { id: 5, question: 'If a triangle has sides 3, 4, 5, is it right-angled?', options: ['Yes', 'No', 'Maybe', 'Cannot determine'], correct: 0, explanation: '3² + 4² = 9 + 16 = 25 = 5², satisfies Pythagorean theorem' },
  { id: 6, question: 'What is 40% of 150?', options: ['50', '60', '70', '80'], correct: 1, explanation: '40% of 150 = 0.40 × 150 = 60' },
  { id: 7, question: 'If 2x - 3 = 7, what is x?', options: ['3', '4', '5', '6'], correct: 2, explanation: '2x = 7 + 3 = 10, so x = 5' },
  { id: 8, question: 'Find the area of a rectangle with length 8 and width 5', options: ['26', '30', '35', '40'], correct: 3, explanation: 'Area = length × width = 8 × 5 = 40' },
  { id: 9, question: 'What is the square root of 144?', options: ['10', '11', '12', '13'], correct: 2, explanation: '√144 = 12 (12 × 12 = 144)' },
  { id: 10, question: 'If the ratio of A:B is 3:5 and A = 9, what is B?', options: ['12', '15', '18', '20'], correct: 1, explanation: 'If A:B = 3:5 and A = 9, then 9/B = 3/5, so B = 45/3 = 15' },
]

export default function Quantitative() {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') || 'practice'
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(mode === 'test' ? 300 : null)

  useEffect(() => {
    if (mode === 'test' && timeLeft !== null && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setIsSubmitted(true)
    }
  }, [timeLeft, mode])

  const handleAnswer = (optionIndex) => {
    if (isSubmitted) return
    setAnswered({ ...answered, [currentQ]: optionIndex })
  }

  const handleSubmit = () => {
    let correctCount = 0
    Object.keys(answered).forEach(qIndex => {
      if (answered[qIndex] === QUESTIONS[qIndex].correct) correctCount++
    })
    setScore(Math.round((correctCount / QUESTIONS.length) * 100))
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
            <h1>🎉 Test Completed!</h1>
            <p className="result-score">{score}%</p>
            <p className="result-text">You scored {Object.keys(answered).filter(q => answered[q] === QUESTIONS[q].correct).length} out of {QUESTIONS.length} questions</p>
          </div>
          <div className="result-stats">
            <div className="result-stat">
              <span className="stat-label">Correct</span>
              <span className="stat-value">{Object.keys(answered).filter(q => answered[q] === QUESTIONS[q].correct).length}</span>
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
          
          <div className="answers-review">
            <h3>Review Your Answers</h3>
            {QUESTIONS.map((q, idx) => (
              <div key={idx} className={`answer-item ${answered[idx] === q.correct ? 'correct' : 'incorrect'}`}>
                <div className="answer-question">
                  <strong>Q{idx + 1}: {q.question}</strong>
                  <div className="answer-options">
                    <div className="your-answer">Your answer: <span className="highlight">{q.options[answered[idx]]}</span></div>
                    <div className="correct-answer">Correct answer: <span className="highlight">{q.options[q.correct]}</span></div>
                  </div>
                </div>
                <div className="answer-explanation">
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              </div>
            ))}
          </div>
          
          <button className="btn btn-primary" onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    )
  }

  const q = QUESTIONS[currentQ]
  const selectedAnswer = answered[currentQ]

  return (
    <div className="section-container">
      <div className="quiz-header">
        <h2>Quantitative Aptitude {mode === 'test' ? '- Timed' : '- Practice'}</h2>
        <div className="quiz-info">
          <span>Question {currentQ + 1}/{QUESTIONS.length}</span>
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
          {currentQ < QUESTIONS.length - 1 ? (
            <button className="btn" onClick={() => setCurrentQ(currentQ + 1)}>
              Next →
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>

        <div className="question-tracker">
          {QUESTIONS.map((_, idx) => (
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
