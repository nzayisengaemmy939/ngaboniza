const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/message', (req, res) => {
  res.json({
    message: 'This is Assignment 2 being served by Backend Service Two, which is completely separate from Backend Service One used in Assignment 1.',
    service: 'Backend Service Two',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'Backend Service Two is running', 
    port: PORT,
    description: 'This service demonstrates service-oriented architecture with multiple independent backend services'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend Service Two running on http://localhost:${PORT}`);
  console.log('This is a separate backend service from Backend Service One');
});

// Export for Vercel
module.exports = app;
