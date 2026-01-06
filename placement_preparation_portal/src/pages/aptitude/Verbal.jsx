import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../../App.css'

const QUESTIONS = [
  { id: 1, question: 'What is a synonym for "benevolent"?', options: ['Cruel', 'Kind', 'Angry', 'Sad'], correct: 1, explanation: 'Benevolent means kind and generous. Kind is the closest synonym.' },
  { id: 2, question: 'Fill in: She is __ to accept the challenge.', options: ['afraid', 'ready', 'unwilling', 'reluctant'], correct: 1, explanation: 'Ready is the correct choice, meaning she is prepared or willing to accept.' },
  { id: 3, question: 'What does "meticulous" mean?', options: ['Careless', 'Careful', 'Lazy', 'Hasty'], correct: 1, explanation: 'Meticulous means very careful and precise in one\'s work.' },
  { id: 4, question: 'Choose correct spelling:', options: ['occassion', 'occasion', 'ocasion', 'occation'], correct: 1, explanation: 'The correct spelling is "occasion" - double c, single s.' },
  { id: 5, question: 'What is the opposite of "verbose"?', options: ['Talkative', 'Concise', 'Loud', 'Silent'], correct: 1, explanation: 'Verbose means using too many words. Concise is the opposite - using few words.' },
  { id: 6, question: 'Fill in: The __ of the situation was clear to everyone.', options: ['graffiti', 'gravity', 'gravy', 'grammar'], correct: 1, explanation: 'Gravity means seriousness or importance. It fits the context of understanding the situation.' },
  { id: 7, question: 'Which word is NOT a synonym of "happy"?', options: ['Cheerful', 'Joyful', 'Melancholy', 'Delighted'], correct: 2, explanation: 'Melancholy means sad or gloomy, which is opposite to happy.' },
  { id: 8, question: 'What does "pragmatic" mean?', options: ['Theoretical', 'Practical', 'Pessimistic', 'Optimistic'], correct: 1, explanation: 'Pragmatic means dealing with things in a practical, realistic way.' },
  { id: 9, question: 'Choose the correct homophone: "Their" vs "There" vs "They\'re"', options: ['Their books', 'There books', 'They\'re books', 'None'], correct: 0, explanation: '"Their" is possessive (their books), "there" is location, "they\'re" is contraction of "they are".' },
  { id: 10, question: 'What is an antonym of "augment"?', options: ['Increase', 'Diminish', 'Improve', 'Enhance'], correct: 1, explanation: 'Augment means to increase or make larger. Diminish means to decrease, which is the opposite.' },
]

export default function Verbal() {
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
        <h2>Verbal Ability {mode === 'test' ? '- Timed' : '- Practice'}</h2>
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
