import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    agreeTerms: false
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showNotification, setShowNotification] = useState(null)
  const navigate = useNavigate()

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 8
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Real-time validation
    const newErrors = { ...errors }
    if (name === 'fullName' && touched.fullName) {
      if (!value) {
        newErrors.fullName = 'Full name is required'
      } else {
        delete newErrors.fullName
      }
    }
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
        newErrors.password = 'Password must be at least 8 characters'
      } else {
        delete newErrors.password
      }
    }
    if (name === 'confirmPassword' && touched.confirmPassword) {
      if (!value) {
        newErrors.confirmPassword = 'Confirm password is required'
      } else if (value !== formData.password) {
        newErrors.confirmPassword = 'Passwords do not match'
      } else {
        delete newErrors.confirmPassword
      }
    }
    setErrors(newErrors)
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    
    const newErrors = { ...errors }
    if (name === 'fullName') {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required'
      } else {
        delete newErrors.fullName
      }
    }
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
        newErrors.password = 'Password must be at least 8 characters'
      } else {
        delete newErrors.password
      }
    }
    if (name === 'confirmPassword') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required'
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Passwords do not match'
      } else {
        delete newErrors.confirmPassword
      }
    }
    setErrors(newErrors)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.fullName) newErrors.fullName = 'Full name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!validateEmail(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 8 characters'
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required'
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    setTouched({ fullName: true, email: true, password: true, confirmPassword: true })
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      setTimeout(() => {
        setShowNotification({ type: 'success', message: '✓ Registration successful! Welcome to PlacePrepPortal!' })
        setIsSubmitting(false)
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'student',
          agreeTerms: false
        })
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

  const getFieldStatus = (fieldName) => {
    if (!touched[fieldName]) return ''
    if (errors[fieldName]) return 'error'
    if (fieldName === 'fullName' && formData.fullName) return 'success'
    if (fieldName === 'email' && formData.email && validateEmail(formData.email)) return 'success'
    if (fieldName === 'password' && formData.password && validatePassword(formData.password)) return 'success'
    if (fieldName === 'confirmPassword' && formData.confirmPassword && formData.confirmPassword === formData.password) return 'success'
    return ''
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-container register-container">
        {showNotification && (
          <div className={`notification notification-${showNotification.type} page-enter`}>
            {showNotification.message}
          </div>
        )}
        
        <div className="auth-card page-enter">
          <div className="auth-header">
            <h1>🚀 Join PlacePrepPortal</h1>
            <p>Create your account and start preparing</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="John Doe"
                  className={`form-input ${getFieldStatus('fullName')}`}
                />
                {touched.fullName && !errors.fullName && formData.fullName && (
                  <span className="input-icon success-icon">✓</span>
                )}
                {errors.fullName && <span className="input-icon error-icon">✕</span>}
              </div>
              {errors.fullName && touched.fullName && (
                <span className="validation-message error-message">✕ {errors.fullName}</span>
              )}
              {!errors.fullName && touched.fullName && formData.fullName && (
                <span className="validation-message success-message">✓ Name looks good!</span>
              )}
            </div>

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
                <span className="validation-message error-message">✕ {errors.email}</span>
              )}
              {!errors.email && touched.email && formData.email && (
                <span className="validation-message success-message">✓ Email looks good!</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="role">I am a</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-select"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
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
                  placeholder="At least 8 characters"
                  className={`form-input ${getFieldStatus('password')}`}
                />
                {touched.password && !errors.password && formData.password && (
                  <span className="input-icon success-icon">✓</span>
                )}
                {errors.password && <span className="input-icon error-icon">✕</span>}
              </div>
              {errors.password && touched.password && (
                <span className="validation-message error-message">✕ {errors.password}</span>
              )}
              {!errors.password && touched.password && formData.password && (
                <span className="validation-message success-message">✓ Password is strong!</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm your password"
                  className={`form-input ${getFieldStatus('confirmPassword')}`}
                />
                {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && (
                  <span className="input-icon success-icon">✓</span>
                )}
                {errors.confirmPassword && <span className="input-icon error-icon">✕</span>}
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <span className="validation-message error-message">✕ {errors.confirmPassword}</span>
              )}
              {!errors.confirmPassword && touched.confirmPassword && formData.confirmPassword && (
                <span className="validation-message success-message">✓ Passwords match!</span>
              )}
            </div>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <span>I agree to the <a href="#terms" className="link-highlight">Terms & Conditions</a></span>
            </label>
            {errors.agreeTerms && <span className="validation-message error-message">✕ {errors.agreeTerms}</span>}

            <button type="submit" className="btn btn-auth" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner-inline"></span> Creating account...
                </>
              ) : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <a href="#login" className="link-highlight">Login here</a></p>
          </div>

          <div className="divider">OR</div>

          <div className="social-auth">
            <button type="button" className="social-btn hover-scale">
              <span>📘</span> Sign up with Facebook
            </button>
            <button type="button" className="social-btn hover-scale">
              <span>🔍</span> Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
