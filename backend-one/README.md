# Backend Service One - Excel Operations and Email Service

## Overview
Backend Service One is a Node.js Express server that handles Excel file operations for Assignment 1 and email functionality for the combined assignments page. This service demonstrates RESTful API design, file operations, and email integration.

## Technology Stack
- **Express 4.18.2** - Web framework for Node.js
- **CORS 2.8.5** - Cross-Origin Resource Sharing middleware
- **xlsx 0.18.5** - Library for reading and writing Excel files
- **nodemailer 6.9.7** - Email sending library
- **Node.js** - JavaScript runtime environment

## Project Structure
```
backend-one/
├── server.js              # Main server file with all routes and logic
├── package.json           # Dependencies and scripts
├── assignment1-data.xlsx  # Excel file (auto-generated)
└── README.md             # This file
```

## Development Process

### Step 1: Project Setup
I initialized a Node.js project and installed the necessary dependencies:
- Express for creating the web server
- CORS for handling cross-origin requests
- xlsx for Excel file operations
- nodemailer for sending emails

### Step 2: Server Configuration
Created an Express server listening on port 5001. This port was chosen to be different from:
- Frontend (port 3000)
- Backend Service Two (port 5002)

This demonstrates the concept of multiple independent services in a service-oriented architecture.

### Step 3: Excel File Operations

#### Reading Excel Files
I implemented the `readExcelData()` function that:
1. Uses `xlsx.readFile()` to read the Excel file
2. Gets the first worksheet from the workbook
3. Converts the worksheet to JSON format using `xlsx.utils.sheet_to_json()`
4. Returns the data as a JavaScript array of objects

#### Writing Excel Files
I implemented the `writeExcelData()` function that:
1. Converts JSON data to a worksheet using `xlsx.utils.json_to_sheet()`
2. Creates a new workbook
3. Appends the worksheet to the workbook
4. Writes the workbook to a file using `xlsx.writeFile()`

#### Initialization
The `initializeExcelFile()` function creates a sample Excel file if it doesn't exist. This includes:
- Question Number
- Question
- Answer
- Resources

Sample data includes questions about web services, REST, SOAP, JSON, and XML.

### Step 4: API Endpoints

#### GET /assignment1/data
**Purpose:** Retrieve all data from the Excel file

**Process:**
1. Call `readExcelData()` to read the Excel file
2. Return the data as JSON
3. Handle errors with appropriate status codes

**Response Example:**
```json
[
  {
    "Question Number": 1,
    "Question": "What is a web service?",
    "Answer": "A web service is...",
    "Resources": "Course notes"
  }
]
```

#### POST /assignment1/update
**Purpose:** Update the Excel file with new data

**Process:**
1. Receive updated data from the request body
2. Call `writeExcelData()` to write to the Excel file
3. Return success message
4. Handle errors appropriately

**Request Body:**
```json
[
  {
    "Question Number": 1,
    "Question": "What is a web service?",
    "Answer": "Updated answer",
    "Resources": "Updated resources"
  }
]
```

#### POST /send-email
**Purpose:** Send email with README file attachments

**Process:**
1. Validate email address from request body
2. Configure nodemailer transporter with email credentials
3. Locate README files from different directories:
   - frontend/README.md → frontend-readme.md
   - backend-one/README.md → backend-one-readme.md
   - backend-two/README.md → backend-two-readme.md
   - README.md → combined-readme.md
4. Prepare email with HTML content including:
   - Student information
   - Course learnings
   - Introduction
5. Attach all README files
6. Send email using nodemailer
7. Return success or error response

**Request Body:**
```json
{
  "email": "recipient@example.com"
}
```

**Response:**
```json
{
  "message": "Email sent successfully with attachments!",
  "attachmentCount": 4
}
```

#### GET /health
**Purpose:** Health check endpoint to verify service is running

**Response:**
```json
{
  "status": "Backend Service One is running",
  "port": 5001
}
```

### Step 5: CORS Configuration
Enabled CORS to allow the frontend (running on port 3000) to make requests to this backend service. This is essential for frontend-backend communication in development.

### Step 6: Error Handling
Implemented try-catch blocks for all operations to handle:
- File read/write errors
- Email sending failures
- Invalid requests

## Key Concepts Learned

### 1. RESTful API Design
- Using appropriate HTTP methods (GET for reading, POST for updating)
- Returning proper status codes (200 for success, 400 for bad request, 500 for server error)
- Structuring endpoints logically

### 2. File Operations
- Reading and writing Excel files programmatically
- Converting between Excel format and JSON
- File system operations in Node.js

### 3. Email Integration
- Configuring email transporter
- Preparing email content with HTML
- Attaching files from different directories
- Renaming files programmatically before sending

### 4. Middleware
- Using Express middleware for CORS
- Using express.json() for parsing JSON request bodies

### 5. Service-Oriented Architecture
- Creating an independent service that can be deployed separately
- Exposing functionality through well-defined APIs
- Separating concerns (this service handles Excel and email, not other features)

## Installation and Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm package manager

### Installation Steps

1. Navigate to the backend-one directory:
```bash
cd backend-one
```

2. Install dependencies:
```bash
npm install
```

3. Configure email settings in server.js:
```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',      // Your email
    pass: 'your-app-password'          // Your app password
  }
});
```

**Important:** For Gmail, you need to:
- Enable 2-factor authentication
- Generate an app-specific password
- Use the app password in the configuration

4. Start the server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

5. The service will be available at: `http://localhost:5001`

## Available Scripts

- `npm start` - Start the server
- `npm run dev` - Start with nodemon for auto-restart on file changes

## Testing the API

### Test Excel Data Retrieval
```bash
curl http://localhost:5001/assignment1/data
```

### Test Excel Data Update
```bash
curl -X POST http://localhost:5001/assignment1/update \
  -H "Content-Type: application/json" \
  -d '[{"Question Number":1,"Question":"Test","Answer":"Test Answer","Resources":"Test Resources"}]'
```

### Test Email Sending
```bash
curl -X POST http://localhost:5001/send-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Test Health Check
```bash
curl http://localhost:5001/health
```

## Excel File Structure

The Excel file (`assignment1-data.xlsx`) has the following columns:
- **Question Number** - Integer identifier
- **Question** - The question text
- **Answer** - The answer (editable from frontend)
- **Resources** - Resource references (editable from frontend)

## Email Configuration

### Gmail Setup
1. Go to Google Account settings
2. Enable 2-Step Verification
3. Generate App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the generated password
4. Use this password in the server.js configuration

### Other Email Services
You can use other email services by changing the transporter configuration:

**Outlook:**
```javascript
{
  service: 'outlook',
  auth: {
    user: 'your-email@outlook.com',
    pass: 'your-password'
  }
}
```

**Custom SMTP:**
```javascript
{
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@example.com',
    pass: 'your-password'
  }
}
```

## Challenges and Solutions

### Challenge 1: Excel File Format
**Problem:** Need to maintain Excel format while allowing programmatic updates
**Solution:** Used the xlsx library which preserves Excel formatting and structure

### Challenge 2: File Path Resolution
**Problem:** Locating README files from different directories
**Solution:** Used Node.js path module with `path.join()` and `__dirname` for reliable path resolution

### Challenge 3: Email Attachments
**Problem:** Attaching files from different directories with custom names
**Solution:** Used nodemailer's attachment configuration with both `path` and `filename` properties

### Challenge 4: Asynchronous Operations
**Problem:** Email sending is asynchronous and needs proper error handling
**Solution:** Used async/await with try-catch blocks for clean error handling

## Security Considerations

1. **Email Credentials:** Never commit email credentials to version control. Use environment variables in production.

2. **Input Validation:** Validate email addresses before sending

3. **File Access:** Ensure only authorized files can be accessed

4. **CORS:** In production, configure CORS to only allow specific origins

## Future Improvements

- Add authentication and authorization
- Use environment variables for configuration
- Add input validation and sanitization
- Implement rate limiting for email sending
- Add logging for debugging and monitoring
- Add unit tests for all functions
- Implement database instead of Excel for better scalability

## Conclusion

Backend Service One demonstrates key concepts in web services including RESTful API design, file operations, email integration, and service-oriented architecture. It serves as a practical example of how to build a backend service that handles data persistence and external integrations.
