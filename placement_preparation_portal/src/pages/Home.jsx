import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function Home() {
  const navigate = useNavigate()
  const [counters, setCounters] = useState({ students: 0, problems: 0, success: 0, companies: 0 })
  const [hasScrolled, setHasScrolled] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // load logged-in student (if any)
    try {
      const stored = localStorage.getItem('user')
      if (stored) setUser(JSON.parse(stored))
    } catch (e) {
      setUser(null)
    }
  }, [])

  // Animate counters when stats section comes into view
  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.querySelector('.stats-section')
      if (statsSection && !hasScrolled) {
        const rect = statsSection.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.75) {
          setHasScrolled(true)
          animateCounters()
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasScrolled])

  const animateCounters = () => {
    const targets = { students: 500, problems: 5000, success: 95, companies: 50 }
    const duration = 2000
    const startTime = Date.now()

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      setCounters({
        students: Math.floor(targets.students * progress),
        problems: Math.floor(targets.problems * progress),
        success: Math.floor(targets.success * progress),
        companies: Math.floor(targets.companies * progress)
      })

      if (progress === 1) clearInterval(interval)
    }, 50)
  }

  const handleCardHover = (cardIndex) => {
    setHoveredCard(cardIndex)
  }

  const goToProfile = () => {
    if (user && user.email) navigate('/profile')
    else navigate('/login')
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Ace Your Placement</h1>
          <p className="hero-subtitle">Master aptitude, coding, and interviews with our comprehensive preparation platform</p>
          <div className="hero-buttons">
            <button className="btn btn-auth" onClick={() => navigate('/register')} title="Start learning now">Get Started Free</button>
            <button className="btn btn-secondary btn-outline" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} title="Learn more about our features">Learn More</button>
            <button className="btn btn-secondary" onClick={goToProfile} title="Go to Profile">{user ? 'My Profile' : 'Login / Profile'}</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          {[
            { icon: '📊', title: 'Aptitude Training', desc: 'Master quantitative, logical, and verbal reasoning with expert tips and practice tests.' },
            { icon: '💻', title: 'Coding Practice', desc: 'Solve real interview problems with our online code editor and instant feedback.' },
            { icon: '🎤', title: 'Mock Interviews', desc: 'Practice with HR and technical interviews with AI-powered feedback before the real deal.' },
            { icon: '📚', title: 'Resources', desc: 'Resume tips, interview guides, and company-specific patterns from industry experts.' }
          ].map((feature, idx) => (
            <div 
              key={idx} 
              className="feature-card hover-scale"
              onMouseEnter={() => handleCardHover(idx)}
              onMouseLeave={() => handleCardHover(null)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">{counters.students}+</div>
            <div className="stat-label">Active Students</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{counters.problems}+</div>
            <div className="stat-label">Practice Problems</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{counters.success}%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{counters.companies}+</div>
            <div className="stat-label">Partner Companies</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          {[
            { num: '1', title: 'Create Account', desc: 'Sign up and get instant access to all practice materials and resources.' },
            { num: '2', title: 'Choose Your Track', desc: 'Select from Aptitude, Coding, or Interview preparation based on your needs.' },
            { num: '3', title: 'Practice & Learn', desc: 'Solve problems, take tests, and learn from detailed solutions and feedback.' },
            { num: '4', title: 'Track Progress', desc: 'Monitor your improvement with detailed analytics and performance reports.' }
          ].map((step, idx) => (
            <div key={idx} className="step" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="step-number">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2>What Students Say</h2>
        <div className="testimonials-grid">
          {[
            { text: '"PlacePrepPortal helped me crack interviews at Google and Amazon. The mock interview feature was incredibly realistic!"', name: 'Raj Kumar', company: 'Software Engineer @ Google' },
            { text: '"The aptitude training was comprehensive. I improved my score by 40% in just 2 months of consistent practice."', name: 'Priya Singh', company: 'Data Analyst @ Amazon' },
            { text: '"Coding problems are well-curated and difficulty levels are perfect for interview prep. Highly recommended!"', name: 'Arjun Patel', company: 'Full Stack Developer @ Microsoft' }
          ].map((testimonial, idx) => (
            <div key={idx} className="testimonial-card hover-scale">
              <div className="testimonial-text">{testimonial.text}</div>
              <div className="testimonial-author">
                <div className="author-name">{testimonial.name}</div>
                <div className="author-company">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>Join thousands of students preparing for their dream jobs. Start for free today!</p>
        <button className="btn btn-auth hover-scale" onClick={() => navigate('/register')} title="Begin your placement preparation">Register Now</button>
      </section>
    </>
  )
}
