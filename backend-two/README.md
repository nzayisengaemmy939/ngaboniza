# Backend Service Two - Independent Service Demonstration

## Overview
Backend Service Two is a separate, independent Node.js Express server that demonstrates the concept of service-oriented architecture by providing services completely separate from Backend Service One. This service is intentionally simple to highlight the architectural pattern of having multiple independent backend services.

## Technology Stack
- **Express 4.18.2** - Web framework for Node.js
- **CORS 2.8.5** - Cross-Origin Resource Sharing middleware
- **Node.js** - JavaScript runtime environment

## Project Structure
```
backend-two/
├── server.js       # Main server file with routes
├── package.json    # Dependencies and scripts
└── README.md      # This file
```

## Development Process

### Step 1: Understanding the Requirement
The assignment requires demonstrating that Assignment 2 is served by a completely separate backend service. This teaches the important concept of **service-oriented architecture (SOA)** where:
- Different services handle different responsibilities
- Services are independent and can be deployed separately
- Services communicate through well-defined APIs
- Each service can use different technologies if needed

### Step 2: Project Initialization
I created a new Node.js project separate from Backend Service One:
1. Created a new directory `backend-two`
2. Initialized with `npm init`
3. Installed minimal dependencies (Express and CORS)
4. Kept it simple to demonstrate independence

### Step 3: Server Configuration
Created an Express server with the following characteristics:
- **Port 5002** - Different from Backend Service One (5001) and Frontend (3000)
- **Minimal dependencies** - Only what's needed for this service
- **Independent codebase** - No shared code with Backend Service One

This demonstrates that services can be completely independent.

### Step 4: API Endpoints

#### GET /message
**Purpose:** Provide a message that clearly states this is Backend Service Two

**Implementation:**
```javascript
app.get('/message', (req, res) => {
  res.json({
    message: 'This is Assignment 2 being served by Backend Service Two...',
    service: 'Backend Service Two',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});
```

**Response Example:**
```json
{
  "message": "This is Assignment 2 being served by Backend Service Two, which is completely separate from Backend Service One used in Assignment 1.",
  "service": "Backend Service Two",
  "port": 5002,
  "timestamp": "2026-05-14T10:30:00.000Z"
}
```

**Why this matters:**
- The message explicitly states it's from a different service
- The port number proves it's a different server
- The timestamp shows it's a live service responding to requests

#### GET /health
**Purpose:** Health check endpoint to verify the service is running

**Implementation:**
```javascript
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Backend Service Two is running', 
    port: PORT,
    description: 'This service demonstrates service-oriented architecture...'
  });
});
```

**Response Example:**
```json
{
  "status": "Backend Service Two is running",
  "port": 5002,
  "description": "This service demonstrates service-oriented architecture with multiple independent backend services"
}
```

### Step 5: CORS Configuration
Enabled CORS to allow the frontend to make requests to this service:
```javascript
app.use(cors());
```

This is essential because:
- Frontend runs on port 3000
- This service runs on port 5002
- Browsers block cross-origin requests by default
- CORS middleware allows these requests

### Step 6: Server Startup
The server starts with clear console messages:
```javascript
app.listen(PORT, () => {
  console.log(`Backend Service Two running on http://localhost:${PORT}`);
  console.log('This is a separate backend service from Backend Service One');
});
```

This helps during development to confirm the service is running.

## Key Concepts Learned

### 1. Service-Oriented Architecture (SOA)
**What it is:** An architectural pattern where applications are composed of multiple independent services that communicate through APIs.

**Why it matters:**
- **Scalability:** Each service can be scaled independently
- **Maintainability:** Changes to one service don't affect others
- **Technology flexibility:** Each service can use different technologies
- **Team organization:** Different teams can work on different services
- **Deployment:** Services can be deployed independently

**Real-world example:** Netflix uses hundreds of microservices. If the recommendation service goes down, you can still watch videos.

### 2. API Design
Creating simple, clear endpoints that:
- Return JSON data
- Use appropriate HTTP methods
- Provide meaningful responses
- Include metadata (service name, port, timestamp)

### 3. Independent Deployment
This service can be:
- Deployed to a different server
- Scaled independently
- Updated without affecting Backend Service One
- Developed by a different team

### 4. Service Communication
The frontend communicates with both services:
- Backend Service One for Excel operations
- Backend Service Two for Assignment 2
- Each through different API endpoints

### 5. Separation of Concerns
Each service has a specific responsibility:
- **Backend Service One:** Excel operations and email
- **Backend Service Two:** Assignment 2 demonstration
- **Frontend:** User interface and presentation

## Installation and Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm package manager

### Installation Steps

1. Navigate to the backend-two directory:
```bash
cd backend-two
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

4. The service will be available at: `http://localhost:5002`

## Available Scripts

- `npm start` - Start the server
- `npm run dev` - Start with nodemon for auto-restart on file changes

## Testing the API

### Test Message Endpoint
```bash
curl http://localhost:5002/message
```

Expected response:
```json
{
  "message": "This is Assignment 2 being served by Backend Service Two, which is completely separate from Backend Service One used in Assignment 1.",
  "service": "Backend Service Two",
  "port": 5002,
  "timestamp": "2026-05-14T10:30:00.000Z"
}
```

### Test Health Check
```bash
curl http://localhost:5002/health
```

Expected response:
```json
{
  "status": "Backend Service Two is running",
  "port": 5002,
  "description": "This service demonstrates service-oriented architecture with multiple independent backend services"
}
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                       Frontend                          │
│                    (Port 3000)                          │
│                    React + Vite                         │
└────────────┬──────────────────────────┬─────────────────┘
             │                          │
             │ /api/service1/*          │ /api/service2/*
             │                          │
             ▼                          ▼
┌────────────────────────┐  ┌──────────────────────────┐
│  Backend Service One   │  │  Backend Service Two     │
│     (Port 5001)        │  │     (Port 5002)          │
│                        │  │                          │
│  - Excel operations    │  │  - Assignment 2 message  │
│  - Email sending       │  │  - Service demonstration │
│  - Assignment 1 data   │  │                          │
└────────────────────────┘  └──────────────────────────┘
```

## Why Keep This Service Simple?

This service is intentionally simple because:

1. **Focus on Architecture:** The goal is to demonstrate service separation, not complex functionality

2. **Clear Demonstration:** A simple service makes it obvious that it's independent

3. **Learning Objective:** Understanding the concept is more important than complex features

4. **Real-world Pattern:** In real applications, some services are simple (like a health check service or configuration service)

## Comparison with Backend Service One

| Aspect | Backend Service One | Backend Service Two |
|--------|-------------------|-------------------|
| Port | 5001 | 5002 |
| Dependencies | Express, CORS, xlsx, nodemailer | Express, CORS |
| Functionality | Excel operations, Email sending | Message serving |
| Complexity | More complex | Intentionally simple |
| Purpose | Data management | Architecture demonstration |

## Real-World Applications of SOA

### Example 1: E-commerce Platform
- **Product Service:** Manages product catalog
- **Order Service:** Handles orders
- **Payment Service:** Processes payments
- **Notification Service:** Sends emails/SMS
- **User Service:** Manages user accounts

Each service is independent and can be scaled based on demand.

### Example 2: Social Media Platform
- **Post Service:** Manages posts
- **Comment Service:** Handles comments
- **Like Service:** Manages likes
- **Notification Service:** Sends notifications
- **Media Service:** Handles image/video uploads

### Example 3: Banking Application
- **Account Service:** Manages accounts
- **Transaction Service:** Processes transactions
- **Authentication Service:** Handles login
- **Reporting Service:** Generates reports
- **Notification Service:** Sends alerts

## Challenges and Solutions

### Challenge 1: Port Management
**Problem:** Need to ensure services run on different ports
**Solution:** Explicitly configured different ports (5001 and 5002)

### Challenge 2: Service Discovery
**Problem:** Frontend needs to know where each service is
**Solution:** Used Vite proxy configuration to route requests to appropriate services

### Challenge 3: CORS
**Problem:** Browser blocks cross-origin requests
**Solution:** Enabled CORS middleware on both backend services

## Future Enhancements

While this service is intentionally simple, in a real-world scenario, Backend Service Two could:
- Have its own database
- Implement authentication
- Provide more complex business logic
- Use different technology (Python, Java, Go, etc.)
- Be deployed to a different cloud provider
- Have its own scaling rules

## Conclusion

Backend Service Two demonstrates the fundamental concept of service-oriented architecture by being a completely independent service from Backend Service One. This architectural pattern is essential in modern web development and is used by companies like Netflix, Amazon, Uber, and many others to build scalable, maintainable applications.

The key takeaway is not the complexity of this service, but understanding that:
1. Services can be independent
2. Services communicate through APIs
3. Services can be developed, deployed, and scaled separately
4. This architecture provides flexibility and scalability

This is a foundational concept in web services and service-oriented architecture that will be valuable throughout your career as a software developer.
