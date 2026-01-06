const LS = {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || 'null')
    } catch {
      return null
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

async function initDB() {
  // ensure collections exist
  if (!LS.get('users')) {
    // seed dummy students
    LS.set('users', [
      { id: 1, name: 'Raj Kumar', email: 'raj.kumar@email.com', password: 'pass123', role: 'student', createdAt: '2024-01-10', college: 'IIT Delhi', branch: 'CSE', cgpa: 8.5 },
      { id: 2, name: 'Priya Singh', email: 'priya.singh@email.com', password: 'pass123', role: 'student', createdAt: '2024-01-12', college: 'NIT Bangalore', branch: 'ECE', cgpa: 8.2 },
      { id: 3, name: 'Arjun Patel', email: 'arjun.patel@email.com', password: 'pass123', role: 'student', createdAt: '2024-01-15', college: 'BITS Pilani', branch: 'CSE', cgpa: 9.1 },
      { id: 4, name: 'Anjali Sharma', email: 'anjali.sharma@email.com', password: 'pass123', role: 'student', createdAt: '2024-01-18', college: 'IIT Bombay', branch: 'IT', cgpa: 8.8 },
      { id: 5, name: 'Vikram Singh', email: 'vikram.singh@email.com', password: 'pass123', role: 'student', createdAt: '2024-01-20', college: 'DTU', branch: 'CSE', cgpa: 7.9 }
    ])
  }

  if (!LS.get('admins')) {
    // default super/admin for testing
    LS.set('admins', [
      { id: 1, name: 'SuperAdmin', email: 'admin@placementapp.com', password: 'admin123', role: 'admin', createdAt: new Date().toISOString() },
      { id: 2, name: 'John Admin', email: 'john.admin@placementapp.com', password: 'admin123', role: 'admin', createdAt: '2024-01-05' }
    ])
  }

  if (!LS.get('questions')) {
    // seed dummy questions
    LS.set('questions', [
      { id: 1, category: 'quantitative', difficulty: 'easy', question: 'What is 2 + 2?', optionA: '3', optionB: '4', optionC: '5', optionD: '6', correctAnswer: 'B', createdAt: '2024-01-01' },
      { id: 2, category: 'logical', difficulty: 'medium', question: 'If A > B and B > C, then A > C?', optionA: 'True', optionB: 'False', optionC: 'Cannot determine', optionD: 'None', correctAnswer: 'A', createdAt: '2024-01-02' },
      { id: 3, category: 'verbal', difficulty: 'easy', question: 'Choose the correct spelling', optionA: 'Occassion', optionB: 'Ocassion', optionC: 'Occasion', optionD: 'Ocasion', correctAnswer: 'C', createdAt: '2024-01-03' }
    ])
  }

  // add results/scoreboard collection
  if (!LS.get('results')) {
    LS.set('results', [
      // sample detailed scoreboard entries
      { id: 1, userId: 1, name: 'Raj Kumar', testType: 'aptitude', category: 'quantitative', score: 85, total: 100, correct: 17, wrong: 3, accuracy: 85, timeTakenSec: 900, createdAt: '2024-01-20' },
      { id: 2, userId: 2, name: 'Priya Singh', testType: 'coding', category: 'algorithms', score: 92, total: 100, correct: 23, wrong: 2, accuracy: 92, timeTakenSec: 1200, createdAt: '2024-01-21' }
    ])
  }

  return Promise.resolve(true)
}

function getUsers() {
  return LS.get('users') || []
}
function saveUser(user) {
  const users = getUsers()
  users.push(user)
  LS.set('users', users)
  return user
}

function getAdmins() {
  return LS.get('admins') || []
}
function saveAdmin(admin) {
  const admins = getAdmins()
  admins.push(admin)
  LS.set('admins', admins)
  return admin
}

function getQuestions() {
  return LS.get('questions') || []
}
function saveQuestion(q) {
  const questions = getQuestions()
  questions.push(q)
  LS.set('questions', questions)
  return q
}

// new: results accessors and leaderboard helpers
function getResults() {
  return LS.get('results') || []
}
function saveResult(result) {
  const results = getResults()
  results.push(result)
  LS.set('results', results)
  return result
}
function getUserResults(userId) {
  return getResults().filter(r => r.userId === userId)
}
function getLeaderboard({ testType, category, topN = 10 } = {}) {
  let list = getResults()
  if (testType) list = list.filter(r => r.testType === testType)
  if (category) list = list.filter(r => r.category === category)
  list = list.slice().sort((a, b) => {
    if ((b.score || 0) !== (a.score || 0)) return (b.score || 0) - (a.score || 0)
    if ((b.accuracy || 0) !== (a.accuracy || 0)) return (b.accuracy || 0) - (a.accuracy || 0)
    return (a.timeTakenSec || 0) - (b.timeTakenSec || 0) // lower time is better
  })
  return list.slice(0, topN)
}

function clearAll() {
  localStorage.removeItem('users')
  localStorage.removeItem('admins')
  localStorage.removeItem('questions')
  localStorage.removeItem('results')
  localStorage.removeItem('userProfile')
  localStorage.removeItem('user')
  localStorage.removeItem('admin')
}

export default {
  initDB,
  getUsers,
  saveUser,
  getAdmins,
  saveAdmin,
  getQuestions,
  saveQuestion,
  getResults,
  saveResult,
  getUserResults,
  getLeaderboard,
  clearAll
}

/* 
  Notes:
  - This is a frontend localStorage "database" for quick testing.
  - Replace with a real backend (REST / GraphQL / Firebase) when ready.
*/
