import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../../App.css'

const QUESTIONS = [
  { id: 1, question: 'Complete the series: 2, 4, 8, 16, ?', options: ['24', '32', '30', '28'], correct: 1, explanation: 'Each number is doubled: 2→4→8→16→32' },
  { id: 2, question: 'If all cats are animals, and Tom is a cat, then Tom is an ?', options: ['cat', 'animal', 'dog', 'bird'], correct: 1, explanation: 'Since Tom is a cat and all cats are animals, Tom must be an animal.' },
  { id: 3, question: 'Which number is odd one out: 2, 4, 6, 9, 10?', options: ['2', '4', '9', '10'], correct: 2, explanation: '9 is odd, while 2, 4, 6, 10 are all even numbers.' },
  { id: 4, question: 'What comes next: A, D, G, J, ?', options: ['M', 'K', 'L', 'N'], correct: 0, explanation: 'Pattern increases by 3 positions in alphabet: A→D→G→J→M' },
  { id: 5, question: 'If ABCD is written as ZYXW, how is PQRS written?', options: ['IJKL', 'KLIJ', 'LKJI', 'JKLI'], correct: 2, explanation: 'The alphabet is reversed: A↔Z, B↔Y, C↔X, D↔W. So P↔K, Q↔L, R↔J, S↔I = LKJI' },
  { id: 6, question: 'Complete: 1, 1, 2, 3, 5, 8, 13, ?', options: ['18', '20', '21', '25'], correct: 2, explanation: 'Fibonacci sequence where each number is sum of previous two: 5+8=13, 8+13=21' },
  { id: 7, question: 'If South is opposite of North, then Down is opposite of ?', options: ['Up', 'Left', 'West', 'Ground'], correct: 0, explanation: 'Down and Up are spatial opposites, just like North-South.' },
  { id: 8, question: 'What is missing: 3, 6, 12, 24, 48, ?', options: ['56', '72', '96', '84'], correct: 2, explanation: 'Each number is multiplied by 2: 48×2=96' },
  { id: 9, question: 'Odd one out: Circle, Square, Triangle, Rainbow', options: ['Circle', 'Square', 'Triangle', 'Rainbow'], correct: 3, explanation: 'Rainbow is not a geometric shape; the others are basic geometric figures.' },
  { id: 10, question: 'If Red means Stop and Green means Go, then Yellow means ?', options: ['Fast', 'Caution', 'Wait', 'Slow'], correct: 1, explanation: 'In traffic signals, Yellow indicates caution or prepare to stop.' },
]

export default function Logical() {
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
            <h3>📋 Review Your Answers</h3>
            {QUESTIONS.map((q, idx) => (
              <div key={idx} className={`answer-item ${answered[idx] === q.correct ? 'correct' : 'incorrect'}`}>
                <div className="answer-question">
                  <strong>Q{idx + 1}: {q.question}</strong>
                </div>
                <div className="answer-options">
                  <p><strong>Your Answer:</strong> {answered[idx] !== undefined ? q.options[answered[idx]] : 'Not answered'}</p>
                  <p><strong>Correct Answer:</strong> {q.options[q.correct]}</p>
                  <p className="answer-explanation"><strong>Explanation:</strong> {q.explanation}</p>
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
        <h2>Logical Reasoning {mode === 'test' ? '- Timed' : '- Practice'}</h2>
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
