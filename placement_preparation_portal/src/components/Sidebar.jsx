import React from 'react'
import '../App.css'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Quizzes</a></li>
        <li><a href="#">Resources</a></li>
        <li><a href="#">Profile</a></li>
      </ul>
    </aside>
  )
}
