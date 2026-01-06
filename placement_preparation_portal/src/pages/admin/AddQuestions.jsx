import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminPanel.css'
import '../../App.css'

export default function AddQuestions(){
  const [formData, setFormData] = useState({
    category: 'quantitative',
    difficulty: 'medium',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A'
  })
  const [questions, setQuestions] = useState(JSON.parse(localStorage.getItem('questions') || '[]'))
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddQuestion = (e) => {
    e.preventDefault()
    
    const newQuestion = { ...formData, id: Date.now() }
    const updatedQuestions = [...questions, newQuestion]
    
    setQuestions(updatedQuestions)
    localStorage.setItem('questions', JSON.stringify(updatedQuestions))
    
    // Reset form
    setFormData({
      category: 'quantitative',
      difficulty: 'medium',
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 'A'
    })
    alert('Question added successfully!')
  }

  return (
    <section className="page admin-add-questions">
      <div className="admin-panel">
        <div className="admin-header">
          <h1>Add Questions</h1>
          <button onClick={() => navigate('/admin-dashboard')} className="btn-back">Back</button>
        </div>

        <div className="form-container">
          <form onSubmit={handleAddQuestion}>
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="quantitative">Quantitative</option>
                <option value="logical">Logical Reasoning</option>
                <option value="verbal">Verbal</option>
              </select>
            </div>

            <div className="form-group">
              <label>Difficulty Level</label>
              <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="form-group">
              <label>Question</label>
              <textarea 
                name="question" 
                value={formData.question} 
                onChange={handleChange}
                placeholder="Enter the question"
                required
              />
            </div>

            <div className="options-group">
              <div className="form-group">
                <label>Option A</label>
                <input type="text" name="optionA" value={formData.optionA} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Option B</label>
                <input type="text" name="optionB" value={formData.optionB} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Option C</label>
                <input type="text" name="optionC" value={formData.optionC} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Option D</label>
                <input type="text" name="optionD" value={formData.optionD} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>Correct Answer</label>
              <select name="correctAnswer" value={formData.correctAnswer} onChange={handleChange}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>

            <button type="submit" className="btn-primary">Add Question</button>
          </form>
        </div>

        <div className="questions-list">
          <h2>Added Questions ({questions.length})</h2>
          {questions.map((q, idx) => (
            <div key={q.id} className="question-item">
              <p><strong>{idx + 1}. {q.question}</strong></p>
              <p className="meta">Category: {q.category} | Difficulty: {q.difficulty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
