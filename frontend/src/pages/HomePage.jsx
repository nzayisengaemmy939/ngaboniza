import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="page-container">
      <h1>🎓 Web Services and Service-Oriented Architecture</h1>
      
      <div className="info-section">
        <div className="info-item">
          <strong>👤 Full Name:</strong> <span>NGABONZIZA ZEPHYRIN</span>
        </div>
        <div className="info-item">
          <strong>🎫 Registration Number:</strong> <span>M05284/2026</span>
        </div>
        <div className="info-item">
          <strong>📚 Course:</strong> <span>Web Services and Service-Oriented Architecture</span>
        </div>
      </div>

      <div className="learning-section">
        <h2>💡 What I Have Learned So Far</h2>
        <p>
          Throughout this course, I have gained comprehensive knowledge about web services 
          and service-oriented architecture. I have learned how to design and implement 
          RESTful APIs that enable communication between different systems and applications. 
          The course has taught me the importance of separating concerns by creating 
          independent backend services that can work together to serve a frontend application. 
          I now understand how to handle HTTP requests and responses, work with different 
          data formats like JSON and XML, and implement proper error handling in web services.
        </p>
        <p>
          Additionally, I have learned practical skills such as reading and writing Excel 
          files programmatically, which is valuable for data management in business applications. 
          The course has also covered important concepts like CORS (Cross-Origin Resource Sharing), 
          API endpoints design, and how to structure a full-stack application with multiple 
          backend services. I have gained hands-on experience with file handling, email 
          integration, and serving static files through web services. These skills are 
          essential for building modern, scalable web applications that follow industry 
          best practices and service-oriented architecture principles.
        </p>
      </div>

      <div className="info-section">
        <h2>📝 Assignments</h2>
        <ul className="assignments-list">
          <li>
            <Link to="/assignment1">📊 Assignment 1 - Excel Data Management</Link>
          </li>
          <li>
            <Link to="/assignment2">🚀 Assignment 2 - Separate Backend Service</Link>
          </li>
          <li>
            <Link to="/combined">📧 Combined Assignments - Email Integration</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HomePage
