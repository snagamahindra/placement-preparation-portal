import React from 'react'
import '../App.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <a className="nav-brand" href="#">Placement Portal</a>
      <div className="nav-items">
        <a href="#">Home</a>
        <a href="#">Aptitude</a>
        <a href="#">Coding</a>
        <a href="#">Mock Interview</a>
      </div>
    </nav>
  )
}
