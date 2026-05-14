import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Assignment2Page() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessage()
  }, [])

  const fetchMessage = async () => {
    try {
      const response = await axios.get('/api/service2/message')
      setMessage(response.data.message)
    } catch (err) {
      setMessage('Failed to connect to Backend Service Two')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h1>🚀 Assignment 2</h1>
      
      {loading ? (
        <div className="loading">Loading</div>
      ) : (
        <div className="service-message">
          <h2>🔌 Backend Service Information</h2>
          <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>{message}</p>
          <p style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#555' }}>
            ✨ This page is served by <strong>Backend Service Two</strong>, which is completely separate 
            from Backend Service One used in Assignment 1.
          </p>
        </div>
      )}

      <div style={{ marginTop: '2rem', background: '#f8f9ff', padding: '1.2rem', borderRadius: '12px' }}>
        <h2>🏗️ Architecture Overview</h2>
        <ul style={{ lineHeight: '2', marginLeft: '2rem', marginTop: '1rem' }}>
          <li><strong>🎨 Frontend:</strong> React application running on port 3000</li>
          <li><strong>⚙️ Backend Service One:</strong> Handles Assignment 1 (Excel operations) on port 5001</li>
          <li><strong>🔧 Backend Service Two:</strong> Handles Assignment 2 (this page) on port 5002</li>
        </ul>
      </div>
    </div>
  )
}

export default Assignment2Page
