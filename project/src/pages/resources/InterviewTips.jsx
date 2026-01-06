import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'

export default function InterviewTips() {
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <section className="hero-section">
        <h1>Interview Tips & Techniques</h1>
        <p>Learn how to ace your placement interviews</p>
      </section>
      <section className="section-container">
        <button onClick={() => navigate('/resources')} className="btn btn-secondary" style={{ marginBottom: '2rem' }}>
          ← Back to Resources
        </button>
        <div className="tips-container">
          <div className="tip-card">
            <h3>Before the Interview</h3>
            <ul>
              <li>Research the company thoroughly</li>
              <li>Understand the job description</li>
              <li>Practice common questions</li>
              <li>Prepare questions to ask</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3>During the Interview</h3>
            <ul>
              <li>Dress professionally</li>
              <li>Maintain eye contact</li>
              <li>Use STAR method for answers</li>
              <li>Provide specific examples</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3>Common Questions</h3>
            <ul>
              <li>Tell me about yourself</li>
              <li>Why this company?</li>
              <li>Describe a challenge you overcame</li>
              <li>What are your strengths?</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3>After Interview</h3>
            <ul>
              <li>Send thank-you email in 24 hours</li>
              <li>Reiterate your interest</li>
              <li>Keep email professional</li>
              <li>Follow up if needed</li>
            </ul>
          </div>
        </div>
        <div className="resource-cta">
          <button className="btn btn-primary" onClick={() => navigate('/mock-interview')}>Start Mock Interview</button>
        </div>
      </section>
    </div>
  )
}
