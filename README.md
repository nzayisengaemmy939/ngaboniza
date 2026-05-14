# Web Services and Service-Oriented Architecture - Assignment 2

## Student Information
- **Full Name:** [Your Full Name Here]
- **Registration Number:** [Your Registration Number]
- **Course:** Web Services and Service-Oriented Architecture

## Project Overview
This project demonstrates a complete web services architecture with:
- **Frontend:** React application (Port 3000)
- **Backend Service One:** Excel operations and email service (Port 5001)
- **Backend Service Two:** Independent service demonstration (Port 5002)

## What I Have Learned

Throughout this course, I have gained comprehensive knowledge about web services and service-oriented architecture. I have learned how to design and implement RESTful APIs that enable communication between different systems and applications. The course has taught me the importance of separating concerns by creating independent backend services that can work together to serve a frontend application. I now understand how to handle HTTP requests and responses, work with different data formats like JSON and XML, and implement proper error handling in web services.

Additionally, I have learned practical skills such as reading and writing Excel files programmatically, which is valuable for data management in business applications. The course has also covered important concepts like CORS (Cross-Origin Resource Sharing), API endpoints design, and how to structure a full-stack application with multiple backend services. I have gained hands-on experience with file handling, email integration, and serving static files through web services. These skills are essential for building modern, scalable web applications that follow industry best practices and service-oriented architecture principles.

## Project Structure

```
web-services-assignment/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── Assignment1Page.jsx
│   │   │   ├── Assignment2Page.jsx
│   │   │   └── CombinedPage.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── backend-one/                 # Backend Service One
│   ├── server.js
│   ├── package.json
│   ├── assignment1-data.xlsx    # Auto-generated
│   └── README.md
│
├── backend-two/                 # Backend Service Two
│   ├── server.js
│   ├── package.json
│   └── README.md
│
└── README.md                    # This file
```

## Features Implemented

### 1. Home Page
- Displays student name and registration number
- Shows course information
- Contains two paragraphs explaining course learnings
- Lists clickable links to all assignments

### 2. Assignment 1 Page
- Reads data from Excel file
- Displays data in HTML table format
- Allows editing of "Answer" and "Resources" columns
- Saves changes back to Excel file
- Demonstrates CRUD operations with Excel as database

### 3. Assignment 2 Page
- Displays message from Backend Service Two
- Clearly shows it's served by a separate backend service
- Demonstrates service-oriented architecture

### 4. Combined Assignments Page
- Shows both Assignment 1 and Assignment 2 data together
- Includes email form with validation
- Sends email with 4 README file attachments:
  - frontend-readme.md
  - backend-one-readme.md
  - backend-two-readme.md
  - combined-readme.md
- Email includes student information and course learnings

## Technology Stack

### Frontend
- React 18.2.0
- React Router DOM 6.20.0
- Axios 1.6.2
- Vite 5.0.8

### Backend Service One
- Express 4.18.2
- CORS 2.8.5
- xlsx 0.18.5 (Excel operations)
- nodemailer 6.9.7 (Email sending)

### Backend Service Two
- Express 4.18.2
- CORS 2.8.5

## Installation and Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm package manager
- Gmail account (for email functionality)

### Step 1: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 2: Install Backend Service One Dependencies
```bash
cd backend-one
npm install
```

### Step 3: Install Backend Service Two Dependencies
```bash
cd backend-two
npm install
```

### Step 4: Configure Email (Backend Service One)
Edit `backend-one/server.js` and update email configuration:
```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',      // Your Gmail address
    pass: 'your-app-password'          // Your Gmail app password
  }
});
```

**To get Gmail app password:**
1. Enable 2-Step Verification in Google Account
2. Go to Security → 2-Step Verification → App passwords
3. Generate password for "Mail"
4. Use this password in the configuration

### Step 5: Update Student Information
Update the following files with your information:
- `frontend/src/pages/HomePage.jsx` - Your name and registration number
- `backend-one/server.js` - Email subject and body
- `README.md` - This file

## Running the Application

You need to run all three services simultaneously in separate terminal windows:

### Terminal 1: Start Backend Service One
```bash
cd backend-one
npm start
```
Service will run on: http://localhost:5001

### Terminal 2: Start Backend Service Two
```bash
cd backend-two
npm start
```
Service will run on: http://localhost:5002

### Terminal 3: Start Frontend
```bash
cd frontend
npm run dev
```
Application will run on: http://localhost:3000

## API Endpoints

### Backend Service One (Port 5001)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /assignment1/data | Get all Excel data |
| POST | /assignment1/update | Update Excel data |
| POST | /send-email | Send email with attachments |
| GET | /health | Health check |

### Backend Service Two (Port 5002)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /message | Get service message |
| GET | /health | Health check |

## Architecture Diagram

```
                    ┌─────────────────────┐
                    │      Frontend       │
                    │   React + Vite      │
                    │    Port 3000        │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                │ Proxy Routes:               │
                │ /api/service1/* → 5001      │
                │ /api/service2/* → 5002      │
                │                             │
        ┌───────▼────────┐          ┌────────▼────────┐
        │ Backend Service│          │ Backend Service │
        │      One       │          │      Two        │
        │   Port 5001    │          │   Port 5002     │
        │                │          │                 │
        │ - Excel Ops    │          │ - Message API   │
        │ - Email Send   │          │ - SOA Demo      │
        └────────┬───────┘          └─────────────────┘
                 │
                 ▼
        ┌────────────────┐
        │ assignment1-   │
        │   data.xlsx    │
        └────────────────┘
```

## Key Concepts Demonstrated

### 1. Service-Oriented Architecture (SOA)
- Multiple independent backend services
- Each service has specific responsibilities
- Services communicate through APIs
- Can be deployed and scaled independently

### 2. RESTful API Design
- Proper HTTP methods (GET, POST)
- Meaningful endpoint names
- JSON data format
- Appropriate status codes

### 3. Frontend-Backend Communication
- Axios for HTTP requests
- Proxy configuration for CORS
- Async/await for asynchronous operations
- Error handling

### 4. File Operations
- Reading Excel files with xlsx library
- Writing data back to Excel
- Maintaining Excel format
- File system operations

### 5. Email Integration
- Configuring email transporter
- Sending HTML emails
- Attaching files from different directories
- Renaming files programmatically

### 6. React Development
- Component-based architecture
- React Router for navigation
- State management with hooks
- Form handling and validation

## Testing the Application

### Test 1: Home Page
1. Navigate to http://localhost:3000
2. Verify student information is displayed
3. Verify course learnings are shown
4. Click on assignment links to navigate

### Test 2: Assignment 1
1. Navigate to Assignment 1 page
2. Verify Excel data is displayed in table
3. Edit some Answer and Resources fields
4. Click "Save Changes"
5. Refresh page to verify changes persisted

### Test 3: Assignment 2
1. Navigate to Assignment 2 page
2. Verify message from Backend Service Two is displayed
3. Verify it mentions being a separate service

### Test 4: Combined Page
1. Navigate to Combined page
2. Verify both assignments are displayed
3. Enter an email address
4. Click "Send Email with Attachments"
5. Check email inbox for message with 4 attachments

### Test 5: Backend Services
```bash
# Test Backend Service One
curl http://localhost:5001/health

# Test Backend Service Two
curl http://localhost:5002/health
```

## Troubleshooting

### Issue: CORS Errors
**Solution:** Ensure both backend services are running and CORS is enabled

### Issue: Email Not Sending
**Solution:** 
- Verify Gmail credentials are correct
- Ensure app password is used (not regular password)
- Check 2-Step Verification is enabled

### Issue: Excel File Not Found
**Solution:** Backend Service One automatically creates the file on first run

### Issue: Port Already in Use
**Solution:** 
- Check if another service is using the port
- Kill the process or use a different port

### Issue: Frontend Can't Connect to Backend
**Solution:**
- Verify both backend services are running
- Check proxy configuration in vite.config.js
- Ensure ports match (5001 and 5002)

## Assignment Requirements Checklist

- ✅ Home Page with student information
- ✅ Two paragraphs explaining course learnings
- ✅ List of assignments with clickable links
- ✅ Assignment 1 page displaying Excel data in HTML table
- ✅ Editable Answer and Resources columns
- ✅ Save changes back to Excel file
- ✅ Assignment 2 page with separate backend service
- ✅ Clear message stating it's from Backend Service Two
- ✅ Combined page showing both assignments
- ✅ Email form with validation
- ✅ Send email with 4 README attachments
- ✅ Email subject with name and registration number
- ✅ Email body with introduction and learnings
- ✅ README files in all directories
- ✅ Separate directories for frontend, backend-one, backend-two

## Future Improvements

1. **Authentication & Authorization**
   - Add user login
   - Protect API endpoints
   - Role-based access control

2. **Database Integration**
   - Replace Excel with proper database (MongoDB, PostgreSQL)
   - Better data persistence
   - Query optimization

3. **Error Handling**
   - More comprehensive error messages
   - Logging system
   - Error monitoring

4. **Testing**
   - Unit tests for components
   - Integration tests for APIs
   - End-to-end tests

5. **Deployment**
   - Docker containers
   - CI/CD pipeline
   - Cloud deployment (AWS, Azure, Heroku)

6. **UI/UX Improvements**
   - Better responsive design
   - Loading indicators
   - Toast notifications
   - Form validation feedback

## Conclusion

This project successfully demonstrates the concepts learned in the Web Services and Service-Oriented Architecture course. It showcases:

- Building a full-stack application with React and Node.js
- Implementing service-oriented architecture with multiple backend services
- RESTful API design and implementation
- File operations with Excel
- Email integration
- Frontend-backend communication
- Proper project structure and documentation

The project provides hands-on experience with real-world web development practices and prepares students for building scalable, maintainable web applications in professional environments.

## Contact

For questions or issues, please contact:
- **Name:** [Your Full Name]
- **Registration Number:** [Your Registration Number]
- **Email:** [Your Email]

---

**Submission Date:** May 17, 2026
**Course:** Web Services and Service-Oriented Architecture
