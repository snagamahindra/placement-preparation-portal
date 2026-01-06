import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminPanel.css'

export default function ViewReports() {
  const [reportType, setReportType] = useState('overview')
  const navigate = useNavigate()

  const stats = {
    totalStudents: JSON.parse(localStorage.getItem('users') || '[]').filter(u => u.role === 'student').length,
    totalQuestions: JSON.parse(localStorage.getItem('questions') || '[]').length,
    activeUsers: 45,
    avgScore: 72.5
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>View Reports</h1>
        <button onClick={() => navigate('/admin-dashboard')} className="btn-back">Back</button>
      </div>

      <div className="reports-container">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Students</h3>
            <p className="stat-number">{stats.totalStudents}</p>
          </div>
          <div className="stat-card">
            <h3>Total Questions</h3>
            <p className="stat-number">{stats.totalQuestions}</p>
          </div>
          <div className="stat-card">
            <h3>Active Users</h3>
            <p className="stat-number">{stats.activeUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Average Score</h3>
            <p className="stat-number">{stats.avgScore}%</p>
          </div>
        </div>

        <div className="report-tabs">
          <button 
            className={reportType === 'overview' ? 'active' : ''} 
            onClick={() => setReportType('overview')}
          >
            Overview
          </button>
          <button 
            className={reportType === 'performance' ? 'active' : ''} 
            onClick={() => setReportType('performance')}
          >
            Performance
          </button>
        </div>

        <div className="report-content">
          {reportType === 'overview' && (
            <div className="report-section">
              <h2>System Overview</h2>
              <p>Total registered students: {stats.totalStudents}</p>
              <p>Questions in database: {stats.totalQuestions}</p>
              <p>Average student performance: {stats.avgScore}%</p>
            </div>
          )}

          {reportType === 'performance' && (
            <div className="report-section">
              <h2>Student Performance Analytics</h2>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Avg Score</th>
                    <th>Attempts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Quantitative</td><td>75%</td><td>234</td></tr>
                  <tr><td>Logical Reasoning</td><td>70%</td><td>189</td></tr>
                  <tr><td>Verbal</td><td>72%</td><td>156</td></tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
