import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminPanel.css'

export default function ManageStudents() {
  const [students, setStudents] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    setStudents(users.filter(u => u.role === 'student'))
  }, [])

  const handleDeleteStudent = (email) => {
    if (confirm('Are you sure you want to delete this student?')) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const updated = users.filter(u => u.email !== email)
      localStorage.setItem('users', JSON.stringify(updated))
      setStudents(updated.filter(u => u.role === 'student'))
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Manage Students</h1>
        <button onClick={() => navigate('/admin-dashboard')} className="btn-back">Back</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, idx) => (
                <tr key={idx}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td><span className="status-active">Active</span></td>
                  <td>
                    <button className="btn-view">View Profile</button>
                    <button className="btn-delete" onClick={() => handleDeleteStudent(student.email)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4">No students registered yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
