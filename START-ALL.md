# Start All Services Script

## Windows (PowerShell)

Create a file called `start-all.ps1`:

```powershell
# Start Backend Service One
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend-one; npm start"

# Wait 2 seconds
Start-Sleep -Seconds 2

# Start Backend Service Two
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend-two; npm start"

# Wait 2 seconds
Start-Sleep -Seconds 2

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "All services starting..."
Write-Host "Frontend: http://localhost:3000"
Write-Host "Backend One: http://localhost:5001"
Write-Host "Backend Two: http://localhost:5002"
```

Run with:
```powershell
.\start-all.ps1
```

## Windows (Command Prompt)

Create a file called `start-all.bat`:

```batch
@echo off
echo Starting all services...

start "Backend Service One" cmd /k "cd backend-one && npm start"
timeout /t 2 /nobreak

start "Backend Service Two" cmd /k "cd backend-two && npm start"
timeout /t 2 /nobreak

start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo All services starting...
echo Frontend: http://localhost:3000
echo Backend One: http://localhost:5001
echo Backend Two: http://localhost:5002
```

Run with:
```cmd
start-all.bat
```

## Linux/Mac (Bash)

Create a file called `start-all.sh`:

```bash
#!/bin/bash

echo "Starting all services..."

# Start Backend Service One
cd backend-one
npm start &
cd ..

sleep 2

# Start Backend Service Two
cd backend-two
npm start &
cd ..

sleep 2

# Start Frontend
cd frontend
npm run dev &
cd ..

echo ""
echo "All services starting..."
echo "Frontend: http://localhost:3000"
echo "Backend One: http://localhost:5001"
echo "Backend Two: http://localhost:5002"
echo ""
echo "Press Ctrl+C to stop all services"

wait
```

Make it executable and run:
```bash
chmod +x start-all.sh
./start-all.sh
```

## Using npm-run-all (Cross-platform)

Install in root directory:
```bash
npm install npm-run-all --save-dev
```

Create `package.json` in root:
```json
{
  "name": "web-services-assignment",
  "scripts": {
    "start:backend1": "cd backend-one && npm start",
    "start:backend2": "cd backend-two && npm start",
    "start:frontend": "cd frontend && npm run dev",
    "start:all": "npm-run-all --parallel start:backend1 start:backend2 start:frontend"
  },
  "devDependencies": {
    "npm-run-all": "^4.1.5"
  }
}
```

Then run:
```bash
npm run start:all
```

## Manual Start (Recommended for Presentation)

Open 3 separate terminals:

**Terminal 1:**
```bash
cd backend-one
npm start
```

**Terminal 2:**
```bash
cd backend-two
npm start
```

**Terminal 3:**
```bash
cd frontend
npm run dev
```

This way you can see logs from each service clearly.
