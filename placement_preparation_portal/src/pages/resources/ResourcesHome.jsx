import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'

export default function ResourcesHome() {
  const resources = [
    {
      id: 1,
      title: 'Resume Tips',
      description: 'Learn how to build an impressive resume that stands out to recruiters',
      icon: '📄',
      link: '/resources/resume-tips'
    },
    {
      id: 2,
      title: 'Interview Tips',
      description: 'Master interview techniques and ace your placements',
      icon: '🎤',
      link: '/resources/interview-tips'
    },
    {
      id: 3,
      title: 'Placement Guidelines',
      description: 'Complete guide to placement process and requirements',
      icon: '📋',
      link: '/resources/placement-guidelines'
    },
    {
      id: 4,
      title: 'Company Patterns',
      description: 'Explore recruitment patterns of top companies',
      icon: '🏢',
      link: '/resources/company-patterns'
    }
  ]

  return (
    <div className="page-container">
      <section className="hero-section">
        <h1>Placement Resources</h1>
        <p>Everything you need to succeed in your placement journey</p>
      </section>

      <section className="section-container">
        <div className="resources-grid">
          {resources.map(resource => (
            <Link to={resource.link} key={resource.id} className="resource-card">
              <div className="resource-icon">{resource.icon}</div>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <button className="btn btn-primary">Learn More</button>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
