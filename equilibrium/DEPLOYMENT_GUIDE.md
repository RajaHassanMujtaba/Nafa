# Deployment Guide

This guide covers deploying **Equilibrium** to Vercel (frontend) and Render (backend).

## Project Structure

```
equilibrium/
├── frontend/          # React + Vite app (deploy to Vercel)
│   ├── src/
│   ├── dist/          # Built app
│   ├── .env           # Local frontend env
│   ├── .env.example   # Template
│   └── vercel.json    # Vercel config
├── backend/           # Node.js + Express API (deploy to Render)
│   ├── index.js       # Entry point
│   ├── models/
│   ├── .env           # Local backend env
│   ├── .env.example   # Template
│   └── render.yaml    # Render config
└── README.md
```

---

## 1. Frontend Deployment (Vercel)

### Setup
1. Push your `frontend/` folder to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **Add New Project**
4. Select your GitHub repository
5. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Environment Variables
In Vercel Project Settings → **Environment Variables**:

```
VITE_API_URL = https://your-render-backend-url/api
```

Replace `https://your-render-backend-url` with your Render backend domain (e.g., `https://equilibrium-backend.onrender.com`).

### Deploy
Click **Deploy**. Vercel will automatically build and deploy on every push to main.

---

## 2. Backend Deployment (Render)

### Setup
1. Push your `backend/` folder to GitHub
2. Go to [render.com](https://render.com) and sign in
3. Click **New +** → **Web Service**
4. Select your GitHub repository (or connect it)
5. Choose the `backend/` directory as the root

### Configuration

**Build & Deploy Settings:**
- **Build Command**: `npm install`
- **Start Command**: `node index.js`
- **Instance Type**: Free (or paid for production)

**Environment Variables:**
In Render settings, add:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/equilibrium?retryWrites=true&w=majority
JWT_SECRET = your_strong_secret_key_here
PORT = 4000
CLIENT_URL = https://your-vercel-frontend-url.vercel.app
```

### Get Your Backend URL
After deployment, Render will provide a URL like:
```
https://equilibrium-backend.onrender.com
```

Copy this URL and set it as `VITE_API_URL` in Vercel (see step 1).

---

## 3. Database Setup (MongoDB Atlas)

### Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up and create a free cluster
3. Create a database user with a strong password
4. Get the connection string:
   ```
   mongodb+srv://username:password@cluster0.mongodb.net/equilibrium?retryWrites=true&w=majority
   ```
5. Replace `username` and `password` with your credentials

### Add to Backend `.env`
```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/equilibrium?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
```

---

## 4. CORS Configuration

The backend CORS is set to accept requests from the `CLIENT_URL` environment variable.

**For production**, make sure:
- Backend `CLIENT_URL` = your Vercel frontend URL
- Frontend `VITE_API_URL` = your Render backend URL

---

## 5. Local Development

### Terminal 1 — Backend
```bash
cd backend
npm install
node index.js
```

### Terminal 2 — Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5175`

---

## 6. Testing Auth Flow

### Sign Up
1. Click **Begin Now** → **Create account**
2. Fill form and submit
3. Token stored in localStorage

### Log In
1. Click **Log in**
2. Enter credentials
3. Redirected to Dashboard if successful

---

## 7. Troubleshooting

### Frontend shows "Cannot POST /api/signup"
- Check `VITE_API_URL` points to correct backend
- Backend not running? Start it first

### Backend returns CORS error
- Check `CLIENT_URL` matches frontend origin
- Update `backend/.env` if frontend URL changed

### Database connection fails
- Verify `MONGODB_URI` is correct
- Ensure IP whitelist in MongoDB Atlas includes Render's IPs
- Check username/password are correct

---

## 8. Environment Variables Checklist

### Frontend (`frontend/.env`)
- [ ] `VITE_API_URL` set to backend URL

### Backend (`backend/.env`)
- [ ] `MONGODB_URI` set to MongoDB Atlas connection string
- [ ] `JWT_SECRET` is a strong random string
- [ ] `CLIENT_URL` set to frontend URL
- [ ] `PORT=4000`

---

## 9. Production Readiness

- ✅ TypeScript builds successfully
- ✅ Auth context handles JWT tokens
- ✅ API routes secured with Bearer token
- ✅ Separate frontend/backend deployments
- ✅ Environment variables configured

Your app is **ready to deploy!** 🚀
