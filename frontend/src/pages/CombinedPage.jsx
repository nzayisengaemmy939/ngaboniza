import React, { useState, useEffect } from 'react'
import axios from 'axios'

function CombinedPage() {
  const [assignment1Data, setAssignment1Data] = useState([])
  const [assignment2Message, setAssignment2Message] = useState('')
  const [email, setEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchBothAssignments()
  }, [])

  const fetchBothAssignments = async () => {
    try {
      const [response1, response2] = await Promise.all([
        axios.get('/api/service1/assignment1/data'),
        axios.get('/api/service2/message')
      ])
      setAssignment1Data(response1.data)
      setAssignment2Message(response2.data.message)
    } catch (err) {
      console.error('Failed to fetch data:', err)
    }
  }

  const handleSendEmail = async (e) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setEmailStatus({ type: 'error', text: 'Please enter a valid email address' })
      return
    }

    setLoading(true)
    setEmailStatus(null)

    try {
      const response = await axios.post('/api/service1/send-email', { email })
      setEmailStatus({ 
        type: 'success', 
        text: response.data.message || 'Email sent successfully with all attachments!' 
      })
      setEmail('')
    } catch (err) {
      setEmailStatus({ 
        type: 'error', 
        text: 'Failed to send email: ' + (err.response?.data?.error || err.message)
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h1>📧 Combined Assignments Page</h1>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>
        🎯 This page displays both Assignment 1 and Assignment 2 together.
      </p>

      <div className="combined-container">
        {/* Assignment 1 Section */}
        <div className="assignment-section">
          <h2>📊 Assignment 1 - Excel Data</h2>
          {assignment1Data.length > 0 ? (
            <div className="table-wrapper">
              <table className="excel-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Resources</th>
                  </tr>
                </thead>
                <tbody>
                  {assignment1Data.slice(0, 5).map((row, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: 'bold', color: '#667eea' }}>{row.questionNumber || row['Question Number'] || ''}</td>
                      <td>{row.question || row['Question'] || ''}</td>
                      <td>{row.answer || row['Answer'] || ''}</td>
                      <td>{row.resources || row['Resources'] || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {assignment1Data.length > 5 && (
                <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#666', fontSize: '0.9rem' }}>
                  📌 Showing first 5 rows. Total: {assignment1Data.length} rows.
                </p>
              )}
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>

        {/* Assignment 2 Section */}
        <div className="assignment-section">
          <h2>🚀 Assignment 2 - Backend Service Two</h2>
          <div className="service-message">
            <p>{assignment2Message || 'Loading...'}</p>
          </div>
        </div>

        {/* Email Form Section */}
        <div className="email-form">
          <h2>📬 Send Assignment Files via Email</h2>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            ✉️ Enter an email address to receive all README files and assignment documentation.
          </p>
          
          <form onSubmit={handleSendEmail}>
            <div className="form-group">
              <label htmlFor="email">📧 Email Address:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? '📤 Sending...' : '📨 Send Email with Attachments'}
            </button>
          </form>

          {emailStatus && (
            <div className={`message ${emailStatus.type}`}>
              {emailStatus.text}
            </div>
          )}

          <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#666', background: 'white', padding: '1rem', borderRadius: '10px' }}>
            <p><strong>📎 Email will include:</strong></p>
            <ul style={{ marginLeft: '2rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
              <li>📄 frontend-readme.pdf</li>
              <li>📄 backend-one-readme.pdf</li>
              <li>📄 backend-two-readme.pdf</li>
              <li>📄 combined-readme.pdf</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CombinedPage
