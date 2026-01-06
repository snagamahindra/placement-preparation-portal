import React, { useState } from 'react'
import '../App.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState(null)

  const validate = () => {
    const e = {}
    if (!form.name) e.name = 'Name required'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message) e.message = 'Message required'
    return e
  }

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const eobj = validate()
    setErrors(eobj)
    if (Object.keys(eobj).length === 0) {
      setNotice({ type: 'success', message: 'Message sent (demo).' })
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setNotice(null), 3000)
    }
  }

  return (
    <section className="page contact-page">
      <div className="container contact-card">
        <h1>Contact Us</h1>
        {notice && <div className={`notification notification-${notice.type}`}>{notice.message}</div>}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} className={`form-input ${errors.name ? 'error' : ''}`} />
            {errors.name && <div className="validation-message error-message">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} className={`form-input ${errors.email ? 'error' : ''}`} />
            {errors.email && <div className="validation-message error-message">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} className={`form-input ${errors.message ? 'error' : ''}`} rows={6} />
            {errors.message && <div className="validation-message error-message">{errors.message}</div>}
          </div>
          <div className="form-actions">
            <button className="btn btn-auth" type="submit">Send Message</button>
          </div>
        </form>
        <div className="contact-info">
          <h3>Support</h3>
          <p>Email us at <a href="mailto:support@placeprepportal.com">support@placeprepportal.com</a></p>
        </div>
      </div>
    </section>
  )
}

