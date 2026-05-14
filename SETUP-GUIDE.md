# Quick Setup Guide

## Prerequisites
- Node.js 16+ installed
- npm package manager
- Gmail account for email functionality

## Quick Start (5 minutes)

### 1. Install All Dependencies
Run these commands in separate terminals or run them sequentially:

```bash
# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend-one dependencies
cd backend-one && npm install && cd ..

# Install backend-two dependencies
cd backend-two && npm install && cd ..
```

### 2. Configure Email (Important!)
Edit `backend-one/server.js` line 67-72:

```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR-EMAIL@gmail.com',      // ← Change this
    pass: 'YOUR-APP-PASSWORD'          // ← Change this
  }
});
```

**How to get Gmail App Password:**
1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification"
3. Go to "App passwords"
4. Generate password for "Mail"
5. Copy the 16-character password
6. Paste it in the code above

### 3. Update Your Information
Edit `frontend/src/pages/HomePage.jsx` lines 9-11:
```jsx
<strong>Full Name:</strong> [Your Full Name Here]  // ← Change this
<strong>Registration Number:</strong> [Your Registration Number]  // ← Change this
```

Also update `backend-one/server.js` line 76 and 80 with your information.

### 4. Run All Services

**Terminal 1 - Backend Service One:**
```bash
cd backend-one
npm start
```
Wait for: "Backend Service One running on http://localhost:5001"

**Terminal 2 - Backend Service Two:**
```bash
cd backend-two
npm start
```
Wait for: "Backend Service Two running on http://localhost:5002"

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```
Wait for: "Local: http://localhost:3000"

### 5. Open Application
Open your browser and go to: **http://localhost:3000**

## Testing Checklist

- [ ] Home page shows your name and registration number
- [ ] Can navigate to Assignment 1 page
- [ ] Assignment 1 shows Excel data in a table
- [ ] Can edit Answer and Resources columns
- [ ] Can save changes (they persist after refresh)
- [ ] Assignment 2 page shows message from Backend Service Two
- [ ] Combined page shows both assignments
- [ ] Can enter email and send (check your inbox!)

## Common Issues

### "Port already in use"
**Solution:** Another program is using the port. Either:
- Close the other program
- Or change the port in the code

### "Cannot find module"
**Solution:** Run `npm install` in that directory

### "Email not sending"
**Solution:** 
- Check Gmail credentials are correct
- Use App Password, not regular password
- Enable 2-Step Verification first

### "CORS error"
**Solution:** Make sure both backend services are running

## File Structure Overview

```
├── frontend/           → React app (Port 3000)
├── backend-one/        → Excel & Email service (Port 5001)
├── backend-two/        → Separate service (Port 5002)
└── README.md          → Full documentation
```

## Need Help?

1. Read the full README.md in each directory
2. Check the console for error messages
3. Verify all three services are running
4. Make sure ports 3000, 5001, and 5002 are available

## Before Presentation (May 17, 2026)

- [ ] Update all [Your Name] placeholders
- [ ] Update all [Your Registration Number] placeholders
- [ ] Configure email with your Gmail
- [ ] Test all features work
- [ ] Read all README files to understand the code
- [ ] Be ready to explain how each part works

Good luck! 🚀
