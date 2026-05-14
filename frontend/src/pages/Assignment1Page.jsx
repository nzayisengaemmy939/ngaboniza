import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Assignment1Page() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [editedData, setEditedData] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/service1/assignment1/data')
      setData(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to load data: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (index, field, value) => {
    setEditedData({
      ...editedData,
      [index]: {
        ...editedData[index],
        [field]: value
      }
    })
  }

  const handleSave = async () => {
    try {
      setMessage(null)
      const updatedData = data.map((row, index) => ({
        ...row,
        ...editedData[index]
      }))

      await axios.post('/api/service1/assignment1/update', updatedData)
      setMessage({ type: 'success', text: 'Data saved successfully!' })
      setEditedData({})
      fetchData()
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save data: ' + err.message })
    }
  }

  if (loading) {
    return <div className="page-container"><div className="loading">Loading...</div></div>
  }

  if (error) {
    return <div className="page-container"><div className="error-message">{error}</div></div>
  }

  return (
    <div className="page-container">
      <h1>📊 Assignment 1 - Excel Data Management</h1>
      <p style={{ color: '#666', marginBottom: '1rem' }}>
        💾 This page displays data from an Excel file. You can edit the <strong>Answer</strong> and <strong>Resources</strong> columns.
      </p>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="table-wrapper">
        <table className="excel-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Answer (Editable)</th>
              <th>Resources (Editable)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td style={{ fontWeight: 'bold', color: '#667eea' }}>{row.questionNumber || row['Question Number'] || ''}</td>
                <td>{row.question || row['Question'] || ''}</td>
                <td>
                  <textarea
                    value={editedData[index]?.answer ?? (row.answer || row['Answer'] || '')}
                    onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
                    placeholder="Enter answer"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editedData[index]?.resources ?? (row.resources || row['Resources'] || '')}
                    onChange={(e) => handleInputChange(index, 'resources', e.target.value)}
                    placeholder="Enter resources"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button 
        className="btn" 
        onClick={handleSave}
        disabled={Object.keys(editedData).length === 0}
      >
        💾 Save Changes
      </button>
    </div>
  )
}

export default Assignment1Page
