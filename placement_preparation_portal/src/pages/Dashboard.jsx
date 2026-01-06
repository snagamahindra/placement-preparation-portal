import React, { useState, useEffect } from 'react'
import '../App.css'

export default function Dashboard(){
  const [stats, setStats] = useState({
    totalAttempted: 0,
    correct: 0,
    accuracy: 0,
    streak: 0,
    level: 0
  })

  useEffect(() => {
    // Animate stats
    const targets = { totalAttempted: 42, correct: 35, accuracy: 83, streak: 7, level: 5 }
    const duration = 1500
    const startTime = Date.now()

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      setStats({
        totalAttempted: Math.floor(targets.totalAttempted * progress),
        correct: Math.floor(targets.correct * progress),
        accuracy: Math.floor(targets.accuracy * progress),
        streak: Math.floor(targets.streak * progress),
        level: Math.floor(targets.level * progress)
      })

      if (progress === 1) clearInterval(interval)
    }, 50)
  }, [])

  return (
    <section className="dashboard-container">
      <div className="dashboard-header">
        <h1>📊 Your Dashboard</h1>
        <p className="subtitle">Track your learning progress and achievement</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-dashboard-grid">
        <div className="stat-card hover-scale">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <div className="stat-value">{stats.correct}/{stats.totalAttempted}</div>
            <div className="stat-title">Questions Correct</div>
          </div>
          <div className="progress-indicator">
            <div className="progress-bar" style={{width: `${(stats.correct/stats.totalAttempted)*100}%`}}></div>
          </div>
        </div>

        <div className="stat-card hover-scale">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">{stats.accuracy}%</div>
            <div className="stat-title">Accuracy Rate</div>
          </div>
          <div className="progress-indicator">
            <div className="progress-bar" style={{width: `${stats.accuracy}%`, background: 'linear-gradient(90deg, #10b981, #06b6d4)'}}></div>
          </div>
        </div>

        <div className="stat-card hover-scale">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <div className="stat-value">{stats.streak}</div>
            <div className="stat-title">Day Streak</div>
          </div>
          <div className="progress-indicator">
            <div className="progress-bar" style={{width: `${(stats.streak/30)*100}%`, background: 'linear-gradient(90deg, #f59e0b, #f97316)'}}></div>
          </div>
        </div>

        <div className="stat-card hover-scale">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-value">Level {stats.level}</div>
            <div className="stat-title">Current Level</div>
          </div>
          <div className="progress-indicator">
            <div className="progress-bar" style={{width: `${(stats.level/10)*100}%`, background: 'linear-gradient(90deg, #a78bfa, #c4b5fd)'}}></div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dashboard-section">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {[
            { icon: '📝', title: 'Completed Quantitative Quiz', time: '2 hours ago', status: 'completed' },
            { icon: '💻', title: 'Solved Coding Problem - Arrays', time: '5 hours ago', status: 'completed' },
            { icon: '🎤', title: 'HR Mock Interview', time: '1 day ago', status: 'completed' },
            { icon: '📖', title: 'Read Interview Tips', time: '2 days ago', status: 'viewed' }
          ].map((activity, idx) => (
            <div key={idx} className="activity-item hover-scale" style={{animationDelay: `${idx * 0.1}s`}}>
              <div className="activity-icon">{activity.icon}</div>
              <div className="activity-content">
                <div className="activity-title">{activity.title}</div>
                <div className="activity-time">{activity.time}</div>
              </div>
              <div className={`activity-status ${activity.status}`}>{activity.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="dashboard-section">
        <h2>Quick Access</h2>
        <div className="quick-links-grid">
          {[
            { icon: '📊', title: 'Aptitude', link: '/aptitude', color: 'gradient-1' },
            { icon: '💻', title: 'Coding', link: '/coding', color: 'gradient-2' },
            { icon: '🎤', title: 'Interviews', link: '/mock-interview', color: 'gradient-3' },
            { icon: '📚', title: 'Resources', link: '/resources', color: 'gradient-4' },
            { icon: '📝', title: 'Quizzes', link: '/quizzes', color: 'gradient-5' },
            { icon: '👤', title: 'Profile', link: '/profile', color: 'gradient-6' }
          ].map((link, idx) => (
            <div key={idx} className={`quick-link-card hover-scale ${link.color}`}>
              <div className="link-icon">{link.icon}</div>
              <div className="link-title">{link.title}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .dashboard-container { padding: 3rem 1.5rem; max-width: 1200px; margin: 0 auto; }
        .dashboard-header { text-align: center; margin-bottom: 3rem; animation: fadeInUp 0.6s ease; }
        .dashboard-header h1 { font-size: 2.5rem; color: var(--primary); margin-bottom: 0.5rem; }
        .subtitle { font-size: 1.1rem; color: var(--text-light); }

        .stats-dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 3rem; }
        .stat-card { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.08); animation: fadeInUp 0.6s ease; display: flex; flex-direction: column; gap: 1rem; }
        .stat-card:nth-child(1) { animation-delay: 0.1s; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; }
        .stat-card:nth-child(4) { animation-delay: 0.4s; }
        
        .stat-icon { font-size: 2rem; }
        .stat-content { display: flex; flex-direction: column; }
        .stat-value { font-size: 1.8rem; font-weight: 700; color: var(--primary); }
        .stat-title { font-size: 0.95rem; color: var(--text-light); }
        .progress-indicator { height: 6px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }

        .dashboard-section { margin-bottom: 3rem; animation: fadeInUp 0.7s ease 0.1s both; }
        .dashboard-section h2 { font-size: 1.8rem; color: var(--primary); margin-bottom: 2rem; }

        .activity-list { display: flex; flex-direction: column; gap: 1rem; }
        .activity-item { display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem; background: var(--bg-light); border-radius: 10px; transition: all 0.3s ease; }
        .activity-item:hover { background: white; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .activity-icon { font-size: 2rem; }
        .activity-content { flex: 1; }
        .activity-title { font-weight: 600; color: var(--text-dark); margin-bottom: 0.3rem; }
        .activity-time { font-size: 0.9rem; color: var(--text-light); }
        .activity-status { padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600; }
        .activity-status.completed { background: #d1fae5; color: #047857; }
        .activity-status.viewed { background: #dbeafe; color: #1e40af; }

        .quick-links-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem; }
        .quick-link-card { padding: 2rem; border-radius: 12px; text-align: center; cursor: pointer; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; min-height: 150px; animation: fadeInUp 0.6s ease; }
        .link-icon { font-size: 2.5rem; }
        .link-title { font-weight: 600; font-size: 1.1rem; }
        
        .gradient-1 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .gradient-2 { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
        .gradient-3 { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
        .gradient-4 { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
        .gradient-5 { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
        .gradient-6 { background: linear-gradient(135deg, #30cfd0 0%, #330867 100%); }

        @media (max-width: 768px) {
          .dashboard-header h1 { font-size: 1.8rem; }
          .stats-dashboard-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
          .quick-links-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
          .quick-link-card { padding: 1.5rem; min-height: 120px; gap: 0.5rem; }
          .link-icon { font-size: 2rem; }
          .link-title { font-size: 0.95rem; }
        }
      `}</style>
    </section>
  )
}
