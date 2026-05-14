import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Assignment1Page from './pages/Assignment1Page'
import Assignment2Page from './pages/Assignment2Page'
import CombinedPage from './pages/CombinedPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">🎓 Web Services</div>
          <div className="nav-links">
            <Link to="/" className="nav-link">🏠 Home</Link>
            <Link to="/assignment1" className="nav-link">📊 Assignment 1</Link>
            <Link to="/assignment2" className="nav-link">🚀 Assignment 2</Link>
            <Link to="/combined" className="nav-link">📧 Combined</Link>
          </div>
        </nav>
        
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assignment1" element={<Assignment1Page />} />
            <Route path="/assignment2" element={<Assignment2Page />} />
            <Route path="/combined" element={<CombinedPage />} />
          </Routes>
        </div>

        <footer className="footer">
          <p>© 2026 Web Services Assignment | Built with ❤️ using React & Node.js</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
