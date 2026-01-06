import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminPanel.css'

export default function AdminDashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    // Check if admin is logged in
    const admin = localStorage.getItem('admin')
    if (!admin) {
      navigate('/admin-login', { replace: true })
      return
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('admin')
    navigate('/login', { replace: true })
  }

  const menuItems = [
    {
      title: 'Add Questions',
      description: 'Create and add new questions for aptitude tests',
      icon: '📝',
      path: '/admin/add-questions'
    },
    {
      title: 'Manage Students',
      description: 'View and manage student accounts and progress',
      icon: '👥',
      path: '/admin/manage-students'
    },
    {
      title: 'View Reports',
      description: 'Check student performance and test analytics',
      icon: '📊',
      path: '/admin/view-reports'
    }
  ]

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>

      <div className="admin-menu">
        {menuItems.map((item, idx) => (
          <div 
            key={idx} 
            className="menu-card" 
            onClick={() => navigate(item.path)}
          >
            <div className="menu-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button className="btn-primary">Access</button>
          </div>
        ))}
      </div>
    </div>
  )
}
