import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminPanel.css'
import db from '../../services/db'

function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('students')
  const [admins, setAdmins] = useState([])
  const [students, setStudents] = useState([])
  const [questions, setQuestions] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Load data from database
    setAdmins(db.getAdmins())
    setStudents(db.getUsers().filter(u => u.role === 'student'))
    setQuestions(db.getQuestions())
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('superAdmin')
    navigate('/login')
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Super Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>

      <div className="tab-navigation">
        <button 
          className={activeTab === 'students' ? 'active' : ''} 
          onClick={() => setActiveTab('students')}
        >
          Students ({students.length})
        </button>
        <button 
          className={activeTab === 'admins' ? 'active' : ''} 
          onClick={() => setActiveTab('admins')}
        >
          Admins ({admins.length})
        </button>
        <button 
          className={activeTab === 'questions' ? 'active' : ''} 
          onClick={() => setActiveTab('questions')}
        >
          Questions ({questions.length})
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'students' && (
          <div className="table-container">
            <h2>All Students</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>College</th>
                  <th>Branch</th>
                  <th>CGPA</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map(student => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.college || 'N/A'}</td>
                      <td>{student.branch || 'N/A'}</td>
                      <td>{student.cgpa || 'N/A'}</td>
                      <td>{student.createdAt}</td>
                      <td>
                        <button className="btn-view">View</button>
                        <button className="btn-delete">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="8">No students found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'admins' && (
          <div className="table-container">
            <h2>All Admins</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.length > 0 ? (
                  admins.map(admin => (
                    <tr key={admin.id}>
                      <td>{admin.id}</td>
                      <td>{admin.name}</td>
                      <td>{admin.email}</td>
                      <td><span className="status-active">{admin.role}</span></td>
                      <td>{admin.createdAt}</td>
                      <td>
                        <button className="btn-edit">Edit</button>
                        <button className="btn-delete">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6">No admins found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="table-container">
            <h2>All Questions</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Question</th>
                  <th>Category</th>
                  <th>Difficulty</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.length > 0 ? (
                  questions.map(q => (
                    <tr key={q.id}>
                      <td>{q.id}</td>
                      <td>{q.question.substring(0, 50)}...</td>
                      <td>{q.category}</td>
                      <td><span className="difficulty-badge">{q.difficulty}</span></td>
                      <td>{q.createdAt}</td>
                      <td>
                        <button className="btn-view">View</button>
                        <button className="btn-delete">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6">No questions found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default SuperAdminDashboard
