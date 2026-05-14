# Frontend - Web Services Assignment

## Overview
This is the frontend application for the Web Services and Service-Oriented Architecture assignment. It is built using React and Vite, providing a modern and responsive user interface.

## Technology Stack
- **React 18.2.0** - JavaScript library for building user interfaces
- **React Router DOM 6.20.0** - For client-side routing and navigation
- **Axios 1.6.2** - HTTP client for making API requests
- **Vite 5.0.8** - Fast build tool and development server

## Project Structure
```
frontend/
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx          # Main landing page
│   │   ├── Assignment1Page.jsx   # Excel data management page
│   │   ├── Assignment2Page.jsx   # Backend Service Two demo
│   │   └── CombinedPage.jsx      # Combined view with email functionality
│   ├── App.jsx                   # Main application component with routing
│   ├── App.css                   # Application styles
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global styles
├── index.html                    # HTML template
├── vite.config.js                # Vite configuration with proxy setup
└── package.json                  # Dependencies and scripts
```

## Development Process

### Step 1: Project Initialization
I started by creating a React application using Vite as the build tool. Vite was chosen because it provides:
- Fast Hot Module Replacement (HMR)
- Optimized build process
- Simple configuration

### Step 2: Setting Up Routing
I implemented React Router to create multiple pages:
- **Home Page** - Displays student information and course learnings
- **Assignment 1 Page** - Shows Excel data in an HTML table with edit functionality
- **Assignment 2 Page** - Demonstrates connection to Backend Service Two
- **Combined Page** - Shows both assignments and email functionality

### Step 3: Creating Components
Each page was created as a separate component:

**HomePage.jsx:**
- Displays student name and registration number
- Shows two paragraphs about course learnings
- Lists clickable links to all assignments

**Assignment1Page.jsx:**
- Fetches data from Backend Service One
- Displays data in an HTML table
- Allows editing of "Answer" and "Resources" columns
- Sends updated data back to the backend to update the Excel file

**Assignment2Page.jsx:**
- Fetches a message from Backend Service Two
- Demonstrates that it's using a different backend service
- Shows architecture overview

**CombinedPage.jsx:**
- Displays both Assignment 1 and Assignment 2 data
- Includes an email form
- Sends email with README attachments when submitted

### Step 4: API Communication
I used Axios for all HTTP requests because it provides:
- Promise-based API
- Automatic JSON transformation
- Easy error handling

### Step 5: Proxy Configuration
In `vite.config.js`, I configured proxy rules to route API requests:
- `/api/service1/*` → Backend Service One (port 5001)
- `/api/service2/*` → Backend Service Two (port 5002)

This solves CORS issues during development and demonstrates proper API gateway patterns.

### Step 6: Styling
I created CSS files to style the application:
- Clean, professional design
- Responsive tables for Excel data
- Form styling for email input
- Navigation bar for easy page switching

## Key Concepts Learned

### 1. Component-Based Architecture
Breaking the UI into reusable components makes the code more maintainable and easier to understand.

### 2. Client-Side Routing
Using React Router allows creating a single-page application (SPA) with multiple views without page reloads.

### 3. API Integration
Making HTTP requests to backend services and handling responses demonstrates frontend-backend communication.

### 4. State Management
Using React hooks (useState, useEffect) to manage component state and side effects.

### 5. Proxy Configuration
Understanding how to configure proxies to communicate with multiple backend services.

## Installation and Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. The application will be available at: `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## API Endpoints Used

### Backend Service One (Assignment 1)
- `GET /api/service1/assignment1/data` - Fetch Excel data
- `POST /api/service1/assignment1/update` - Update Excel data
- `POST /api/service1/send-email` - Send email with attachments

### Backend Service Two (Assignment 2)
- `GET /api/service2/message` - Get service message

## Features Implemented

1. **Home Page**
   - Student information display
   - Course learning summary
   - Assignment navigation links

2. **Assignment 1 Page**
   - Display Excel data in HTML table
   - Editable Answer and Resources columns
   - Save changes back to Excel file

3. **Assignment 2 Page**
   - Display message from separate backend service
   - Architecture information

4. **Combined Page**
   - Show both assignments together
   - Email form with validation
   - Send email with README attachments

## Challenges and Solutions

### Challenge 1: CORS Issues
**Problem:** Browser blocked requests to backend services
**Solution:** Configured Vite proxy to route requests through the development server

### Challenge 2: Managing Multiple Backend Services
**Problem:** Need to communicate with two different backend services
**Solution:** Used different API prefixes (/api/service1 and /api/service2) with proxy configuration

### Challenge 3: State Management for Editable Table
**Problem:** Tracking changes in table cells before saving
**Solution:** Used a separate state object to store edited values, only updating on save

## Future Improvements
- Add authentication and authorization
- Implement loading states and better error handling
- Add form validation
- Improve responsive design for mobile devices
- Add unit tests for components

## Conclusion
This frontend application demonstrates modern web development practices including component-based architecture, API integration, routing, and communication with multiple backend services. It showcases the practical application of concepts learned in the Web Services and Service-Oriented Architecture course.
