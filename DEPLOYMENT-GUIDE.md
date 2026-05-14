# 🚀 Deployment Guide - Vercel

## 📋 Overview

This guide will help you deploy your Web Services Assignment to Vercel.

**Student:** NGABONZIZA ZEPHYRIN  
**Registration:** M05284/2026

---

## 🎯 Deployment Strategy

You'll deploy **3 separate projects** on Vercel:

1. **Frontend** - React application
2. **Backend Service One** - Excel & Email service
3. **Backend Service Two** - Separate service

---

## 📦 Step 1: Push to GitHub

### Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Web Services Assignment"

# Set main branch
git branch -M main

# Add remote
git remote add origin https://github.com/nzayisengaemmy939/ngaboniza.git

# Push to GitHub
git push -u origin main
```

---

## 🌐 Step 2: Deploy Backend Service One

### 2.1 Create New Project on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `backend-one`
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)

### 2.2 Environment Variables

Add these environment variables in Vercel:

```
EMAIL_USER=nzayisengaemmy2001@gmail.com
EMAIL_PASS=cgye gtpc codv xzhg
PORT=5001
```

### 2.3 Deploy

Click "Deploy" and wait for deployment to complete.

**Save the URL:** `https://your-backend-one.vercel.app`

---

## 🌐 Step 3: Deploy Backend Service Two

### 3.1 Create New Project on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import the same GitHub repository
4. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `backend-two`
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)

### 3.2 Deploy

Click "Deploy" and wait for deployment to complete.

**Save the URL:** `https://your-backend-two.vercel.app`

---

## 🌐 Step 4: Deploy Frontend

### 4.1 Update Frontend Configuration

Before deploying frontend, update the API URLs:

**Option A: Update vite.config.js**

```javascript
// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api/service1': {
        target: 'https://your-backend-one.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/service1/, '')
      },
      '/api/service2': {
        target: 'https://your-backend-two.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/service2/, '')
      }
    }
  }
})
```

**Option B: Create Environment Variables**

Create `frontend/.env.production`:

```env
VITE_API_SERVICE1=https://your-backend-one.vercel.app
VITE_API_SERVICE2=https://your-backend-two.vercel.app
```

Then update API calls in your components to use these variables.

### 4.2 Create New Project on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import the same GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 4.3 Environment Variables (if using Option B)

Add these in Vercel:

```
VITE_API_SERVICE1=https://your-backend-one.vercel.app
VITE_API_SERVICE2=https://your-backend-two.vercel.app
```

### 4.4 Deploy

Click "Deploy" and wait for deployment to complete.

**Your app URL:** `https://your-frontend.vercel.app`

---

## 🔧 Alternative: Simple Deployment Method

### Deploy All at Once (Monorepo)

If you want to deploy everything together:

1. Keep the root `vercel.json` file
2. Deploy from root directory
3. Vercel will handle all three services

**Note:** This is more complex and may have limitations with Excel file storage.

---

## ⚠️ Important Notes

### 1. Excel File Storage

Vercel's serverless functions are **stateless**. Excel files won't persist between requests.

**Solutions:**

**Option A: Use a Database**
- Replace Excel with MongoDB, PostgreSQL, or Firebase
- Store data in a persistent database

**Option B: Use Vercel Blob Storage**
```bash
npm install @vercel/blob
```

**Option C: Use External Storage**
- AWS S3
- Google Cloud Storage
- Cloudinary

### 2. Email Configuration

For production, use environment variables:

```javascript
// backend-one/server.js
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

### 3. CORS Configuration

Update CORS to allow your Vercel domains:

```javascript
// backend-one/server.js
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend.vercel.app'
  ]
}));
```

---

## 📝 Deployment Checklist

### Before Deployment

- [ ] All code committed to GitHub
- [ ] Dependencies installed locally
- [ ] Environment variables identified
- [ ] API URLs noted
- [ ] Email credentials ready

### Backend One Deployment

- [ ] Project created on Vercel
- [ ] Root directory set to `backend-one`
- [ ] Environment variables added
- [ ] Deployed successfully
- [ ] URL saved
- [ ] Test `/health` endpoint

### Backend Two Deployment

- [ ] Project created on Vercel
- [ ] Root directory set to `backend-two`
- [ ] Deployed successfully
- [ ] URL saved
- [ ] Test `/health` endpoint

### Frontend Deployment

- [ ] Backend URLs updated in config
- [ ] Project created on Vercel
- [ ] Root directory set to `frontend`
- [ ] Build command set
- [ ] Environment variables added (if needed)
- [ ] Deployed successfully
- [ ] Test all pages

### Post-Deployment Testing

- [ ] Home page loads
- [ ] Assignment 1 page loads
- [ ] Assignment 2 page loads
- [ ] Combined page loads
- [ ] Navigation works
- [ ] API calls work
- [ ] Email sending works (test carefully)

---

## 🔍 Testing Deployed Services

### Test Backend One

```bash
curl https://your-backend-one.vercel.app/health
```

Expected response:
```json
{
  "status": "Backend Service One is running",
  "port": 5001
}
```

### Test Backend Two

```bash
curl https://your-backend-two.vercel.app/health
```

Expected response:
```json
{
  "status": "Backend Service Two is running",
  "port": 5002
}
```

### Test Frontend

Open in browser:
```
https://your-frontend.vercel.app
```

---

## 🐛 Troubleshooting

### Issue: "Module not found"

**Solution:** Make sure all dependencies are in `package.json`

```bash
cd backend-one
npm install
cd ../backend-two
npm install
cd ../frontend
npm install
```

### Issue: "CORS Error"

**Solution:** Update CORS configuration to include Vercel URLs

```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app']
}));
```

### Issue: "Excel file not found"

**Solution:** Vercel serverless functions are stateless. Use a database or external storage.

### Issue: "Email not sending"

**Solution:** 
1. Check environment variables are set
2. Verify Gmail app password is correct
3. Check Vercel function logs

### Issue: "Build failed"

**Solution:**
1. Check build logs in Vercel
2. Verify `package.json` scripts
3. Test build locally: `npm run build`

---

## 📊 Vercel Dashboard

### View Logs

1. Go to your project in Vercel
2. Click "Deployments"
3. Click on a deployment
4. Click "Functions" to see logs

### Environment Variables

1. Go to project settings
2. Click "Environment Variables"
3. Add/edit variables
4. Redeploy for changes to take effect

### Custom Domain (Optional)

1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

---

## 🎯 Recommended Approach for Presentation

### For May 17, 2026 Presentation:

**Option 1: Local Demonstration**
- Run all services locally
- More reliable for presentation
- No internet dependency
- Full control

**Option 2: Hybrid Approach**
- Deploy to Vercel for showcase
- Have local backup ready
- Show both versions

**Option 3: Full Cloud**
- Deploy everything to Vercel
- Show live production app
- Demonstrate cloud deployment skills

---

## 🔐 Security Best Practices

### 1. Environment Variables

Never commit sensitive data:
- Email passwords
- API keys
- Database credentials

### 2. .gitignore

Make sure these are ignored:
```
.env
.env.local
.env.production
*.xlsx
node_modules/
```

### 3. CORS

Only allow specific origins:
```javascript
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000'
}));
```

---

## 📚 Additional Resources

### Vercel Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Deploying Node.js](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)
- [Deploying Vite](https://vercel.com/docs/frameworks/vite)

### Alternative Hosting
- **Frontend:** Netlify, GitHub Pages, Cloudflare Pages
- **Backend:** Heroku, Railway, Render, AWS Lambda

---

## ✅ Quick Deploy Commands

```bash
# 1. Commit and push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Install Vercel CLI (optional)
npm install -g vercel

# 3. Deploy from CLI (optional)
cd backend-one
vercel

cd ../backend-two
vercel

cd ../frontend
vercel
```

---

## 🎉 Success!

Once deployed, you'll have:

✅ **Frontend:** `https://your-frontend.vercel.app`  
✅ **Backend One:** `https://your-backend-one.vercel.app`  
✅ **Backend Two:** `https://your-backend-two.vercel.app`

Share these URLs in your presentation to showcase your deployed application!

---

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Review error messages
3. Test locally first
4. Check environment variables
5. Verify API URLs

---

**Student:** NGABONZIZA ZEPHYRIN  
**Registration:** M05284/2026  
**Deployment Date:** May 14, 2026  
**Presentation:** May 17, 2026

**Good luck with your deployment!** 🚀
