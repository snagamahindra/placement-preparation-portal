import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'

export default function PlacementGuidelines() {
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <section className="hero-section">
        <h1>Placement Guidelines</h1>
        <p>Everything you need to know about the placement process</p>
      </section>
      <section className="section-container">
        <button onClick={() => navigate('/resources')} className="btn btn-secondary" style={{ marginBottom: '2rem' }}>
          ← Back to Resources
        </button>
        <div className="tips-container">
          <div className="tip-card">
            <h3>Eligibility Criteria</h3>
            <ul>
              <li>Minimum CGPA: 6.5-7.0</li>
              <li>No active backlogs</li>
              <li>Full-time student status</li>
              <li>Eligible for graduation</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3>Registration Process</h3>
            <ul>
              <li>Register through placement portal</li>
              <li>Upload documents and resume</li>
              <li>Attend orientation session</li>
              <li>Complete mandatory workshops</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3>Placement Timeline</h3>
            <ul>
              <li>Eligibility check</li>
              <li>Company presentations</li>
              <li>Online assessments</li>
              <li>Technical & HR interviews</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3>Important Rules</h3>
            <ul>
              <li>Attend all interview rounds</li>
              <li>Be honest in applications</li>
              <li>Don't reject after accepting</li>
              <li>Maintain professional conduct</li>
            </ul>
          </div>
        </div>
        <div className="resource-cta">
          <button className="btn btn-primary" onClick={() => navigate('/resources')}>Back to Resources</button>
        </div>
      </section>
    </div>
  )
}
