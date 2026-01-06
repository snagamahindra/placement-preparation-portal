import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'

export default function Header({ isNavOpen, setIsNavOpen, onNavigate }) {
  const navigate = useNavigate()

  const handleNavClick = (path) => {
    navigate(path)
    setIsNavOpen(false)
  }

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="brand">
          <Link to="/" onClick={() => setIsNavOpen(false)}>
            <span className="brand-name" style={{ color: '#ffffff' }}>🎓 PlacePrepPortal</span>
          </Link>
        </div>
        <button className="hamburger" onClick={() => setIsNavOpen(!isNavOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`nav-links ${isNavOpen ? 'mobile-open' : ''}`}>
          <Link to="/" onClick={() => setIsNavOpen(false)}>Home</Link>
          <Link to="/aptitude" onClick={() => setIsNavOpen(false)}>Aptitude</Link>
          <Link to="/coding" onClick={() => setIsNavOpen(false)}>Coding</Link>
          <Link to="/mock-interview" onClick={() => setIsNavOpen(false)}>Interviews</Link>
          <Link to="/quizzes" onClick={() => setIsNavOpen(false)}>Quizzes</Link>
          <Link to="/resources" onClick={() => setIsNavOpen(false)}>Resources</Link>
          <Link to="/login" className="nav-auth" onClick={() => setIsNavOpen(false)}>Login</Link>
          <Link to="/register" className="nav-auth nav-signup" onClick={() => setIsNavOpen(false)}>Sign Up</Link>
        </nav>
      </div>
    </header>
  )
}
