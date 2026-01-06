import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'

export default function CompanyPatterns() {
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <section className="hero-section">
        <h1>Company Recruitment Patterns</h1>
        <p>Understand how different companies recruit</p>
      </section>
      <section className="section-container">
        <button onClick={() => navigate('/resources')} className="btn btn-secondary" style={{ marginBottom: '2rem' }}>
          ← Back to Resources
        </button>
        <div className="tips-container">
          <div className="tip-card">
            <h3>Tech Giants (Google, Amazon, Microsoft)</h3>
            <ul>
              <li>Online Assessment: 90 mins with 2-3 problems</li>
              <li>Technical Round 1: Data structures & algorithms</li>
              <li>Technical Round 2: System design</li>
              <li>HR Round: Behavioral questions</li>\n              <li>Package: 30-50 LPA for freshers</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3>Product Companies (Flipkart, Paytm)</h3>
            <ul>
              <li>Online Assessment: 60-90 mins</li>
              <li>Technical Round 1: Coding problems</li>
              <li>Technical Round 2: Design or optimization</li>
              <li>HR Round: Expectations & negotiation</li>
              <li>Package: 20-35 LPA for freshers</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3>Consulting Firms (Deloitte, Accenture)</h3>
            <ul>
              <li>Aptitude test: Quantitative & logical</li>
              <li>Technical assessment: Language-specific</li>
              <li>Technical Round: Project experience</li>
              <li>HR Round: Cultural alignment</li>
              <li>Package: 10-15 LPA for freshers</li>
            </ul>
          </div>
        </div>
        <div className="resource-cta">
          <h3>📚 Study Materials</h3>
          <p>Data Structures | Algorithms | System Design | Aptitude</p>
          <button className="btn btn-primary" onClick={() => navigate('/aptitude')}>Start Aptitude Practice</button>
          <button className="btn btn-primary" onClick={() => navigate('/coding')} style={{ marginLeft: '1rem' }}>Start Coding</button>
        </div>
      </section>
    </div>
  )
}
