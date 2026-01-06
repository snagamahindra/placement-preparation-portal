import React from 'react'
import '../App.css'

export default function About() {
  return (
    <section className="page about-page">
      <div className="container about-card">
        <header className="about-hero">
          <h1>About PlacePrepPortal</h1>
          <p>Your partner in placement preparation — curated practice, mock interviews, and resources.</p>
        </header>

        <div className="about-grid">
          <div className="about-section">
            <h3>Our Mission</h3>
            <p>We aim to make placement prep structured, measurable, and accessible to every student.</p>
          </div>
          <div className="about-section">
            <h3>What We Offer</h3>
            <ul>
              <li>Curated aptitude tests</li>
              <li>Live coding challenges</li>
              <li>Mock interviews with feedback</li>
              <li>Company-wise patterns and resources</li>
            </ul>
          </div>
          <div className="about-stats">
            <div className="stat-item"><strong>10K+</strong><span>Students</span></div>
            <div className="stat-item"><strong>500+</strong><span>Problems</span></div>
            <div className="stat-item"><strong>95%</strong><span>Success Rate</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
