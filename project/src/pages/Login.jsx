import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showNotification, setShowNotification] = useState(null)
  const [userType, setUserType] = useState('student') // 'student' or 'admin'
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 6
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Real-time validation
    const newErrors = { ...errors }
    if (name === 'email' && touched.email) {
      if (!value) {
        newErrors.email = 'Email is required'
      } else if (!validateEmail(value)) {
        newErrors.email = 'Email is invalid'
      } else {
        delete newErrors.email
      }
    }
    if (name === 'password' && touched.password) {
      if (!value) {
        newErrors.password = 'Password is required'
      } else if (!validatePassword(value)) {
        newErrors.password = 'Password must be at least 6 characters'
      } else {
        delete newErrors.password
      }
    }
    setErrors(newErrors)
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    
    // Validate on blur
    const newErrors = { ...errors }
    if (name === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required'
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Email is invalid'
      } else {
        delete newErrors.email
      }
    }
    if (name === 'password') {
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (!validatePassword(formData.password)) {
        newErrors.password = 'Password must be at least 6 characters'
      } else {
        delete newErrors.password
      }
    }
    setErrors(newErrors)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!validateEmail(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 6 characters'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    setTouched({ email: true, password: true })
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      setTimeout(() => {
        setShowNotification({ type: 'success', message: '✓ Login successful! Welcome back!' })
        setIsSubmitting(false)
        setFormData({ email: '', password: '', rememberMe: false })
        setErrors({})
        setTouched({})
        setTimeout(() => setShowNotification(null), 3000)
      }, 1000)
    } else {
      setErrors(newErrors)
      setShowNotification({ type: 'error', message: '⚠ Please fix the errors above' })
      setTimeout(() => setShowNotification(null), 3000)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    // For student: accept any credentials, create user session and go to profile
    if (userType === 'student') {
      const nameFromEmail = formData.email.split('@')[0] || 'Student'
      const userObj = { email: formData.email, name: nameFromEmail, role: 'student' }
      localStorage.setItem('user', JSON.stringify(userObj))
      localStorage.removeItem('admin')
      navigate('/profile', { replace: true })
      return
    }

    // Admin flow unchanged: go to dedicated admin login page
    if (userType === 'admin') {
      navigate('/admin-login', { replace: true })
      return
    }

    // Super Admin: navigate to super admin page (e.g., view database)
    if (userType === 'super-admin') {
      navigate('/super-admin', { replace: true })
      return
    }
  }

  const getFieldStatus = (fieldName) => {
    if (!touched[fieldName]) return ''
    if (errors[fieldName]) return 'error'
    if (fieldName === 'email' && formData.email && validateEmail(formData.email)) return 'success'
    if (fieldName === 'password' && formData.password && validatePassword(formData.password)) return 'success'
    return ''
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {showNotification && (
          <div className={`notification notification-${showNotification.type} page-enter`}>
            {showNotification.message}
          </div>
        )}
        
        <div className="auth-card page-enter">
          <div className="auth-header">
            <h1>🎓 Welcome Back</h1>
            <p>Login to your PlacePrepPortal account</p>
          </div>

          <div className="user-type-toggle">
            <button 
              className={userType === 'student' ? 'active' : ''} 
              onClick={() => setUserType('student')}
            >
              Student Login
            </button>
            <button 
              className={userType === 'admin' ? 'active' : ''} 
              onClick={() => setUserType('admin')}
            >
              Admin Login
            </button>
            <button 
              className={userType === 'super-admin' ? 'active' : ''} 
              onClick={() => setUserType('super-admin')}
            >
              Super Admin
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {userType === 'admin' && (
            <div className="admin-credentials-info">
              <p className="credentials-title">Admin Credentials:</p>
              <p>Email: <strong>admin@placementapp.com</strong></p>
              <p>Password: <strong>admin123</strong></p>
            </div>
          )}

          {userType === 'student' ? (
            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="you@example.com"
                    className={`form-input ${getFieldStatus('email')}`}
                  />
                  {touched.email && !errors.email && formData.email && (
                    <span className="input-icon success-icon">✓</span>
                  )}
                  {errors.email && <span className="input-icon error-icon">✕</span>}
                </div>
                {errors.email && touched.email && (
                  <span className="validation-message error-message">
                    ✕ {errors.email}
                  </span>
                )}
                {!errors.email && touched.email && formData.email && (
                  <span className="validation-message success-message">
                    ✓ Email looks good!
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    className={`form-input ${getFieldStatus('password')}`}
                  />
                  {touched.password && !errors.password && formData.password && (
                    <span className="input-icon success-icon">✓</span>
                  )}
                  {errors.password && <span className="input-icon error-icon">✕</span>}
                </div>
                {errors.password && touched.password && (
                  <span className="validation-message error-message">
                    ✕ {errors.password}
                  </span>
                )}
                {!errors.password && touched.password && formData.password && (
                  <span className="validation-message success-message">
                    ✓ Password is valid!
                  </span>
                )}
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="forgot-link">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-auth" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner-inline"></span> Logging in...
                  </>
                ) : userType === 'student' ? 'Login as Student' : 'Login as Admin'}
              </button>
            </form>
          ) : userType === 'admin' ? (
            <div className="admin-section">
              <div className="admin-credentials-info">
                <p className="credentials-title">Admin Credentials:</p>
                <p>Email: <strong>admin@placementapp.com</strong></p>
                <p>Password: <strong>admin123</strong></p>
              </div>
              <button 
                type="button" 
                className="btn-primary" 
                onClick={() => navigate('/admin-login', { replace: true })}
              >
                Go to Admin Login
              </button>
            </div>
          ) : (
            <div className="super-admin-section">
              <div className="admin-credentials-info">
                <p className="credentials-title">Super Admin Access:</p>
                <p>Email: <strong>admin@placementapp.com</strong></p>
                <p>Password: <strong>admin123</strong></p>
              </div>
              <button 
                type="button" 
                className="btn-primary" 
                onClick={() => navigate('/super-admin', { replace: true })}
              >
                View Database & Students
              </button>
            </div>
          )}

          <div className="auth-footer">
            <p>Don't have an account? <a href="#register" className="link-highlight">Sign up here</a></p>
          </div>

          <div className="divider">OR</div>

          <div className="social-auth">
            <button type="button" className="social-btn hover-scale">
              <span>📘</span> Login with Facebook
            </button>
            <button type="button" className="social-btn hover-scale">
              <span>🔍</span> Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
