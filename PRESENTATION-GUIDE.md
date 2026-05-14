# Presentation Guide - May 17, 2026

## 🎯 What the Professor Will Check

The professor mentioned: *"I will check each student individually to see how they implemented the assignment. Everyone should understand their own code in their own machines and be able to explain it."*

## 📋 Preparation Checklist (Do This Before Class)

### 1. Update Your Information
- [ ] Your name in `frontend/src/pages/HomePage.jsx`
- [ ] Your registration number in `frontend/src/pages/HomePage.jsx`
- [ ] Your email credentials in `backend-one/server.js`
- [ ] Your information in email subject and body

### 2. Test Everything Works
- [ ] All three services start without errors
- [ ] Home page displays correctly
- [ ] Assignment 1 loads and saves data
- [ ] Assignment 2 shows Backend Service Two message
- [ ] Combined page works
- [ ] Email sends successfully with attachments

### 3. Have These Ready
- [ ] Three terminal windows open
- [ ] Browser ready at http://localhost:3000
- [ ] Code editor open (VS Code, etc.)
- [ ] All README files accessible

---

## 🗣️ How to Explain Your Work

### Opening Statement (30 seconds)
*"I have created a web services application with service-oriented architecture. It consists of a React frontend and two independent backend services. The application demonstrates Excel file operations, email integration, and communication between multiple services."*

### Architecture Explanation (1 minute)
*"The architecture has three main components:*
1. *Frontend on port 3000 - built with React and Vite*
2. *Backend Service One on port 5001 - handles Excel operations and email*
3. *Backend Service Two on port 5002 - demonstrates service separation*

*The frontend communicates with both backends through proxy configuration, which solves CORS issues and demonstrates proper API gateway patterns."*

### Demonstration Flow (3-5 minutes)

#### 1. Show Home Page
- Point out your name and registration number
- Mention the two paragraphs about course learnings
- Show the assignment links

#### 2. Show Assignment 1
- Explain: *"This page reads data from an Excel file using the xlsx library"*
- Show the table with data
- Edit an Answer field
- Edit a Resources field
- Click Save
- Explain: *"When I click save, it sends a POST request to Backend Service One, which writes the data back to the Excel file"*
- Refresh the page to show data persisted

#### 3. Show Assignment 2
- Explain: *"This page is served by Backend Service Two, which is completely separate from Backend Service One"*
- Point out the message stating it's from a different service
- Explain: *"This demonstrates service-oriented architecture where different services handle different responsibilities"*

#### 4. Show Combined Page
- Explain: *"This page displays both assignments together"*
- Scroll to show both Assignment 1 and Assignment 2 data
- Show the email form
- Enter an email address
- Click Send
- Explain: *"This sends an email with 4 README file attachments. The files are picked up from different directories and renamed programmatically before sending"*

#### 5. Show Backend Services Running
- Switch to terminal windows
- Show Backend Service One running on port 5001
- Show Backend Service Two running on port 5002
- Explain: *"Both services are running independently and can be deployed separately"*

---

## 💡 Key Points to Emphasize

### 1. Service-Oriented Architecture
*"I implemented service-oriented architecture by creating two independent backend services. Each service has its own responsibilities and can be deployed, scaled, and maintained separately."*

### 2. Excel as Database
*"For Assignment 1, I used Excel as the database. The xlsx library allows me to read the Excel file, convert it to JSON, display it in HTML tables, and write changes back to the Excel file."*

### 3. Email Integration
*"I used nodemailer to send emails. The system locates README files from different directories, renames them programmatically, and attaches them to the email."*

### 4. Frontend-Backend Communication
*"The frontend uses Axios to make HTTP requests to the backend services. Vite's proxy configuration routes requests to the appropriate backend service based on the URL path."*

### 5. RESTful API Design
*"I designed RESTful APIs with proper HTTP methods - GET for reading data, POST for updating data - and return JSON responses with appropriate status codes."*

---

## 🤔 Expected Questions and Answers

### Q: "Why did you use two separate backend services?"
**A:** *"To demonstrate service-oriented architecture. In real-world applications, different services handle different responsibilities. This allows for independent deployment, scaling, and maintenance. For example, if Backend Service Two needs to be updated, it won't affect Backend Service One or require redeploying the entire application."*

### Q: "How does the frontend communicate with two different backends?"
**A:** *"I configured Vite's proxy in vite.config.js. Requests to /api/service1/* are routed to port 5001, and requests to /api/service2/* are routed to port 5002. This solves CORS issues and demonstrates an API gateway pattern."*

### Q: "How do you read and write Excel files?"
**A:** *"I use the xlsx library. To read, I use xlsx.readFile() to load the workbook, then xlsx.utils.sheet_to_json() to convert it to JavaScript objects. To write, I use xlsx.utils.json_to_sheet() to create a worksheet, then xlsx.writeFile() to save it."*

### Q: "How does the email functionality work?"
**A:** *"I use nodemailer with Gmail SMTP. I configure a transporter with my Gmail credentials, prepare the email content with HTML, locate the README files using Node.js path module, attach them with custom filenames, and send using transporter.sendMail()."*

### Q: "What is CORS and how did you handle it?"
**A:** *"CORS (Cross-Origin Resource Sharing) is a security feature that blocks requests from different origins. I handled it by using the cors middleware in Express, which adds the necessary headers to allow the frontend to make requests to the backend."*

### Q: "How do you ensure data persists after editing?"
**A:** *"When the user clicks Save, the frontend sends a POST request with the updated data to Backend Service One. The backend receives this data and writes it to the Excel file using xlsx.writeFile(). When the page is refreshed, it reads from the Excel file again, showing the persisted changes."*

### Q: "What did you learn from this assignment?"
**A:** *"I learned how to build a full-stack application with service-oriented architecture. I gained practical experience with RESTful API design, file operations, email integration, and frontend-backend communication. I also learned the importance of separating concerns and creating independent services that can work together."*

---

## 🛠️ If Something Goes Wrong

### If a service won't start:
1. Check if the port is already in use
2. Run `npm install` again in that directory
3. Check for error messages in the console

### If Excel data doesn't load:
1. Check Backend Service One is running
2. Check the console for errors
3. Verify the Excel file exists in backend-one directory

### If email doesn't send:
1. Verify Gmail credentials are correct
2. Check you're using app password, not regular password
3. Verify 2-Step Verification is enabled

### If you get CORS errors:
1. Verify both backend services are running
2. Check CORS is enabled in both backend services
3. Verify proxy configuration in vite.config.js

---

## 📝 Code Sections to Know Well

### 1. Frontend Routing (App.jsx)
```jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/assignment1" element={<Assignment1Page />} />
  <Route path="/assignment2" element={<Assignment2Page />} />
  <Route path="/combined" element={<CombinedPage />} />
</Routes>
```

### 2. Excel Reading (backend-one/server.js)
```javascript
function readExcelData() {
  const workbook = xlsx.readFile(EXCEL_FILE_PATH);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);
  return data;
}
```

### 3. Excel Writing (backend-one/server.js)
```javascript
function writeExcelData(data) {
  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Assignment1');
  xlsx.writeFile(workbook, EXCEL_FILE_PATH);
}
```

### 4. Email Sending (backend-one/server.js)
```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

await transporter.sendMail(mailOptions);
```

### 5. Proxy Configuration (frontend/vite.config.js)
```javascript
proxy: {
  '/api/service1': {
    target: 'http://localhost:5001',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/service1/, '')
  },
  '/api/service2': {
    target: 'http://localhost:5002',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/service2/, '')
  }
}
```

---

## ⏱️ Time Management

- **Setup (if needed):** 1-2 minutes
- **Demonstration:** 3-5 minutes
- **Explanation:** 2-3 minutes
- **Questions:** 2-3 minutes
- **Total:** ~10 minutes per student

---

## ✅ Final Checklist (Day of Presentation)

Morning of May 17, 2026:

- [ ] Laptop fully charged
- [ ] All dependencies installed
- [ ] Test all three services start correctly
- [ ] Test all features work
- [ ] Have terminals ready
- [ ] Have browser ready
- [ ] Have code editor ready
- [ ] Review this guide one more time
- [ ] Be confident - you built this!

---

## 🎓 Confidence Boosters

Remember:
1. ✅ You have a complete, working application
2. ✅ You have comprehensive documentation
3. ✅ You understand the concepts
4. ✅ You can explain your code
5. ✅ You followed all requirements

**You've got this! Good luck! 🚀**

---

## 📞 Quick Reference

**Ports:**
- Frontend: 3000
- Backend One: 5001
- Backend Two: 5002

**Start Commands:**
```bash
cd backend-one && npm start
cd backend-two && npm start
cd frontend && npm run dev
```

**URL:** http://localhost:3000

**Key Technologies:**
- React, Vite, React Router, Axios
- Node.js, Express, CORS
- xlsx (Excel operations)
- nodemailer (Email sending)
