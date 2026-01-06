import { useState, useEffect } from 'react'
import './Profile.css'

function Profile() {
  const [profile, setProfile] = useState({
    name: 'Guest User',
    email: '',
    phone: '',
    college: '',
    branch: '',
    cgpa: '',
    bio: '',
    skills: [],
    joinDate: new Date().toLocaleDateString()
  })
  const [isEditing, setIsEditing] = useState(false)
  const [newSkill, setNewSkill] = useState('')

  useEffect(() => {
    // load session user and saved profile if present, do NOT redirect
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const savedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}')

    setProfile(prev => ({
      ...prev,
      email: user.email || prev.email,
      name: user.name || savedProfile.name || prev.name,
      phone: savedProfile.phone || prev.phone,
      college: savedProfile.college || prev.college,
      branch: savedProfile.branch || prev.branch,
      cgpa: savedProfile.cgpa || prev.cgpa,
      bio: savedProfile.bio || prev.bio,
      skills: savedProfile.skills || prev.skills,
      joinDate: savedProfile.joinDate || prev.joinDate
    }))
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile))
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setProfile(prev => ({ ...prev, skills: [...prev.skills, newSkill] }))
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (index) => {
    setProfile(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }))
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    // optional: do not force navigation; user can stay on guest view
    setProfile(prev => ({ ...prev, name: 'Guest User', email: '' }))
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-header-content">
            <h1>My Profile</h1>
            <p className="profile-subtitle">Manage your account information</p>
          </div>
          <div className="profile-actions">
            {!isEditing && (
              <button className="btn-edit" onClick={() => setIsEditing(true)}>
                ✎ Edit Profile
              </button>
            )}
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {/* Avatar Section */}
          <div className="profile-avatar-section">
            <div className="avatar-circle">
              {profile.name ? profile.name.charAt(0).toUpperCase() : 'G'}
            </div>
            <div className="avatar-info">
              <h2>{profile.name}</h2>
              <p>{profile.email || 'Not logged in'}</p>
              <p className="join-date">Member since {profile.joinDate}</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="profile-grid">
            {/* Left Column - Basic Info */}
            <div className="profile-column left-column">
              <div className="profile-section">
                <h3 className="section-title">Basic Information</h3>
                
                <div className="form-group">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="field-value">{profile.name}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <p className="field-value">{profile.email}</p>
                  <span className="field-note">Email cannot be changed</span>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <p className="field-value">{profile.phone || 'Not provided'}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself"
                      rows="4"
                    />
                  ) : (
                    <p className="field-value">{profile.bio || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Academic Info */}
            <div className="profile-column right-column">
              <div className="profile-section">
                <h3 className="section-title">Academic Information</h3>
                
                <div className="form-group">
                  <label>College/University</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="college"
                      value={profile.college}
                      onChange={handleInputChange}
                      placeholder="Enter your college name"
                    />
                  ) : (
                    <p className="field-value">{profile.college || 'Not provided'}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Branch</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="branch"
                      value={profile.branch}
                      onChange={handleInputChange}
                      placeholder="Enter your branch"
                    />
                  ) : (
                    <p className="field-value">{profile.branch || 'Not provided'}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>CGPA</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="cgpa"
                      step="0.01"
                      min="0"
                      max="10"
                      value={profile.cgpa}
                      onChange={handleInputChange}
                      placeholder="Enter your CGPA"
                    />
                  ) : (
                    <p className="field-value">{profile.cgpa || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="profile-section skills-section">
            <h3 className="section-title">Skills</h3>
            
            {isEditing && (
              <div className="skill-input-group">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill (e.g., Python, JavaScript, etc.)"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <button className="btn-add-skill" onClick={handleAddSkill}>
                  Add Skill
                </button>
              </div>
            )}

            <div className="skills-list">
              {profile.skills.length > 0 ? (
                profile.skills.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    <span>{skill}</span>
                    {isEditing && (
                      <button
                        className="skill-remove"
                        onClick={() => handleRemoveSkill(index)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="no-skills">No skills added yet</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="profile-actions-footer">
              <button className="btn-save" onClick={handleSaveProfile}>
                Save Changes
              </button>
              <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
