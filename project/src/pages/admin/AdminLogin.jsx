import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Auth.css'

function AdminLogin() {
  const [email, setEmail] = useState('admin@placementapp.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleAdminLogin = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate network delay
    setTimeout(() => {
      if (!email || !password) {
        setError('Please fill in all fields')
        setLoading(false)
        return
      }

      const adminCredentials = {
        email: 'admin@placementapp.com',
        password: 'admin123'
      }

      if (email.trim() === adminCredentials.email && password.trim() === adminCredentials.password) {
        try {
          localStorage.setItem('admin', JSON.stringify({ 
            email: email, 
            role: 'admin',
            loginTime: new Date().toISOString()
          }))
          localStorage.removeItem('user')
          setLoading(false)
          navigate('/admin-dashboard', { replace: true })
        } catch (err) {
          setError('Failed to save admin session. Please try again.')
          setLoading(false)
        }
      } else {
        setError('Invalid admin credentials. Please check your email and password.')
        setLoading(false)
      }
    }, 500)
  }

  const handleQuickLogin = (e) => {
    e.preventDefault()
    try {
      localStorage.setItem('admin', JSON.stringify({ 
        email: 'admin@placementapp.com', 
        role: 'admin',
        loginTime: new Date().toISOString()
      }))
      localStorage.removeItem('user')
      navigate('/admin-dashboard', { replace: true })
    } catch (err) {
      setError('Failed to initialize admin session.')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Admin Login</h2>
        <p className="subtitle">Secure admin access</p>

        <div className="admin-credentials-info">
          <p className="credentials-title">Demo Credentials:</p>
          <p>Email: <strong>admin@placementapp.com</strong></p>
          <p>Password: <strong>admin123</strong></p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleAdminLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>

        <div className="quick-login">
          <p>Quick access:</p>
          <button type="button" className="btn-demo" onClick={handleQuickLogin} disabled={loading}>
            Use Demo Credentials
          </button>
        </div>

        <p>
          <a href="/login">Back to Main Login</a>
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
