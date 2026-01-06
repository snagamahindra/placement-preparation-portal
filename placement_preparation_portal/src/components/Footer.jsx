import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <h5>About</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Practice</h5>
            <ul>
              <li><Link to="/aptitude">Aptitude</Link></li>
              <li><Link to="/coding">Coding</Link></li>
              <li><Link to="/mock-interview">Interviews</Link></li>
              <li><Link to="/quizzes">Quizzes</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Resources</h5>
            <ul>
              <li><Link to="/resources/resume-tips">Resume Tips</Link></li>
              <li><Link to="/resources/interview-tips">Interview Tips</Link></li>
              <li><Link to="/resources/placement-guidelines">Guidelines</Link></li>
              <li><Link to="/resources/company-patterns">Company Patterns</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Account</h5>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-divider"></div>
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} PlacePrepPortal. All rights reserved.</p>
          <div className="footer-social">
            <a href="#" title="Facebook">f</a>
            <a href="#" title="Twitter">𝕏</a>
            <a href="#" title="LinkedIn">in</a>
            <a href="#" title="YouTube">▶</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
