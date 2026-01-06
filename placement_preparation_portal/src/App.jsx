import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminLogin from './pages/admin/AdminLogin'
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddQuestions from './pages/admin/AddQuestions'
import ManageStudents from './pages/admin/ManageStudents'
import ViewReports from './pages/admin/ViewReports'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'

// Aptitude pages
import AptitudeHome from './pages/aptitude/AptitudeHome'
import Quantitative from './pages/aptitude/Quantitative'
import Logical from './pages/aptitude/Logical'
import Verbal from './pages/aptitude/Verbal'

// Coding pages
import CodingHome from './pages/coding/CodingHome'
import CodeEditor from './pages/coding/CodeEditor'

// Mock Interview pages
import MockHome from './pages/mock-interview/MockHome'
import HRInterview from './pages/mock-interview/HRInterview'

// Quiz pages
import QuizHome from './pages/quizzes/QuizHome'
import QuizStart from './pages/quizzes/QuizStart'

// Resources pages
import ResourcesHome from './pages/resources/ResourcesHome'
import ResumeTips from './pages/resources/ResumeTips'
import InterviewTips from './pages/resources/InterviewTips'
import PlacementGuidelines from './pages/resources/PlacementGuidelines'
import CompanyPatterns from './pages/resources/CompanyPatterns'

// add DB service import
import db from './services/db'

function AppContent() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const navigate = useNavigate()

  // initialize lightweight DB once
  useEffect(() => {
    db.initDB().catch(err => console.error('DB init failed:', err))
  }, [])

  const handleNavClick = (path) => {
    navigate(path)
    setIsNavOpen(false)
  }

  return (
    <>
      <Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} onNavigate={handleNavClick} />
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/super-admin" element={<SuperAdminDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-questions" element={<AddQuestions />} />
          <Route path="/admin/manage-students" element={<ManageStudents />} />
          <Route path="/admin/view-reports" element={<ViewReports />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          
          {/* Aptitude routes */}
          <Route path="/aptitude" element={<AptitudeHome />} />
          <Route path="/aptitude/quantitative" element={<Quantitative />} />
          <Route path="/aptitude/logical" element={<Logical />} />
          <Route path="/aptitude/verbal" element={<Verbal />} />
          
          {/* Coding routes */}
          <Route path="/coding" element={<CodingHome />} />
          <Route path="/coding/editor" element={<CodeEditor />} />
          
          {/* Mock Interview routes */}
          <Route path="/mock-interview" element={<MockHome />} />
          <Route path="/mock-interview/hr" element={<HRInterview />} />
          
          {/* Quiz routes */}
          <Route path="/quizzes" element={<QuizHome />} />
          <Route path="/quizzes/start" element={<QuizStart />} />
          
          {/* Resources routes */}
          <Route path="/resources" element={<ResourcesHome />} />
          <Route path="/resources/resume-tips" element={<ResumeTips />} />
          <Route path="/resources/interview-tips" element={<InterviewTips />} />
          <Route path="/resources/placement-guidelines" element={<PlacementGuidelines />} />
          <Route path="/resources/company-patterns" element={<CompanyPatterns />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
