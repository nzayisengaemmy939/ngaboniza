const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Path to Excel file
const EXCEL_FILE_PATH = path.join(__dirname, 'assignment1-data.xlsx');

// Initialize Excel file if it doesn't exist
function initializeExcelFile() {
  if (!fs.existsSync(EXCEL_FILE_PATH)) {
    const sampleData = [
      {
        'Question Number': 1,
        'Question': 'What is a web service?',
        'Answer': 'A web service is a software system designed to support interoperable machine-to-machine interaction over a network.',
        'Resources': 'Course notes, W3C documentation'
      },
      {
        'Question Number': 2,
        'Question': 'What is REST?',
        'Answer': 'REST (Representational State Transfer) is an architectural style for designing networked applications.',
        'Resources': 'REST API Tutorial'
      },
      {
        'Question Number': 3,
        'Question': 'What is SOAP?',
        'Answer': 'SOAP (Simple Object Access Protocol) is a protocol for exchanging structured information in web services.',
        'Resources': 'SOAP specification'
      },
      {
        'Question Number': 4,
        'Question': 'What is JSON?',
        'Answer': 'JSON (JavaScript Object Notation) is a lightweight data interchange format.',
        'Resources': 'JSON.org'
      },
      {
        'Question Number': 5,
        'Question': 'What is XML?',
        'Answer': 'XML (eXtensible Markup Language) is a markup language for encoding documents.',
        'Resources': 'W3Schools XML Tutorial'
      }
    ];

    const worksheet = xlsx.utils.json_to_sheet(sampleData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Assignment1');
    xlsx.writeFile(workbook, EXCEL_FILE_PATH);
    console.log('Excel file initialized with sample data');
  }
}

// Read data from Excel
function readExcelData() {
  try {
    const workbook = xlsx.readFile(EXCEL_FILE_PATH);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    return data;
  } catch (error) {
    console.error('Error reading Excel file:', error);
    throw error;
  }
}

// Write data to Excel
function writeExcelData(data) {
  try {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Assignment1');
    xlsx.writeFile(workbook, EXCEL_FILE_PATH);
    return true;
  } catch (error) {
    console.error('Error writing Excel file:', error);
    throw error;
  }
}

// Routes
app.get('/assignment1/data', (req, res) => {
  try {
    const data = readExcelData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read Excel data' });
  }
});

app.post('/assignment1/update', (req, res) => {
  try {
    const updatedData = req.body;
    writeExcelData(updatedData);
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Excel data' });
  }
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email address is required' });
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nzayisengaemmy2001@gmail.com',
        pass: 'cgye gtpc codv xzhg' // Gmail App Password
      }
    });

    // Prepare attachments
    const attachments = [];

    // Add README files from different directories
    const readmeFiles = [
      { path: path.join(__dirname, '../frontend/README.md'), filename: 'frontend-readme.md' },
      { path: path.join(__dirname, 'README.md'), filename: 'backend-one-readme.md' },
      { path: path.join(__dirname, '../backend-two/README.md'), filename: 'backend-two-readme.md' },
      { path: path.join(__dirname, '../README.md'), filename: 'combined-readme.md' }
    ];

    readmeFiles.forEach(file => {
      if (fs.existsSync(file.path)) {
        attachments.push({
          filename: file.filename,
          path: file.path
        });
      }
    });

    // Email content
    const mailOptions = {
      from: 'nzayisengaemmy2001@gmail.com',
      to: email,
      subject: 'NGABONZIZA ZEPHYRIN - M05284/2026 - Web Services Assignment',
      html: `
        <h2>Web Services and Service-Oriented Architecture Assignment</h2>
        
        <h3>Student Information</h3>
        <p><strong>Full Name:</strong> NGABONZIZA ZEPHYRIN</p>
        <p><strong>Registration Number:</strong> M05284/2026</p>
        
        <h3>About Me</h3>
        <p>
          I am NGABONZIZA ZEPHYRIN, a student in the Web Services and Service-Oriented Architecture course, 
          learning how to build modern web applications with multiple backend services. I am passionate 
          about software development and eager to apply these concepts in real-world applications.
        </p>
        
        <h3>What I Have Learned</h3>
        <p>
          Throughout this course, I have gained comprehensive knowledge about web services 
          and service-oriented architecture. I have learned how to design and implement 
          RESTful APIs that enable communication between different systems and applications. 
          The course has taught me the importance of separating concerns by creating 
          independent backend services that can work together to serve a frontend application.
        </p>
        <p>
          Additionally, I have learned practical skills such as reading and writing Excel 
          files programmatically, which is valuable for data management in business applications. 
          The course has also covered important concepts like CORS, API endpoints design, 
          and how to structure a full-stack application with multiple backend services. 
          I have gained hands-on experience with file handling, email integration, and 
          serving static files through web services.
        </p>
        
        <p style="margin-top: 20px;">
          <em>Please find the attached README files for detailed documentation.</em>
        </p>
      `,
      attachments: attachments
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ 
      message: 'Email sent successfully with attachments!',
      attachmentCount: attachments.length
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend Service One is running', port: PORT });
});

// Initialize and start server
initializeExcelFile();

app.listen(PORT, () => {
  console.log(`Backend Service One running on http://localhost:${PORT}`);
});


// Export for Vercel
module.exports = app;
