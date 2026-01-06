import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'

export default function ResumeTips() {
  const navigate = useNavigate()
  const tips = ['Clear and Concise Format', 'Content Organization', 'Action Verbs', 'Key Sections']

  return (
    <div className="page-container">
      <section className="hero-section">
        <h1>Resume Tips & Guidelines</h1>
        <p>Master the art of creating a compelling resume</p>
      </section>
      <section className="section-container">
        <button onClick={() => navigate('/resources')} className="btn btn-secondary" style={{ marginBottom: '2rem' }}>
          ← Back to Resources
        </button>
        <div className="tips-container">
          <div className="tip-card">
            <h3>Clear and Concise Format</h3>
            <ul>
              <li>Use a clean, professional template</li>
              <li>Limit to 1 page for freshers</li>
              <li>Use consistent fonts and formatting</li>
              <li>Maintain proper margins (1-inch)</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3>Content Organization</h3>
            <ul>
              <li>Contact information and LinkedIn profile</li>
              <li>Professional summary (2-3 lines)</li>
              <li>Technical and soft skills</li>
              <li>Projects and achievements</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3>Action Verbs & Achievements</h3>
            <ul>
              <li>Use strong verbs: Developed, Implemented, Optimized</li>
              <li>Quantify achievements: \"Improved by 30%\"</li>
              <li>Focus on impact not just tasks</li>\n              <li>Include metrics and results</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3>Do's and Don'ts</h3>
            <ul>
              <li>✓ Keep ATS-friendly format</li>
              <li>✓ Use industry keywords</li>
              <li>✗ Avoid fancy graphics</li>
              <li>✗ Don't exceed 1 page</li>
            </ul>
          </div>
        </div>
        <div className="resource-cta">
          <button className="btn btn-primary" onClick={() => navigate('/resources')}>Explore Other Resources</button>
        </div>
      </section>
    </div>
  )
}
