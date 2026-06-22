# Deployment Guide — Nafa (Equilibrium)

This is a **monorepo** with:
- `frontend/` → Deploy to **Vercel**
- `backend/` → Deploy to **Render**
- Database → **MongoDB Atlas** (free tier)

---

## Step 1 — Set Up MongoDB Atlas (Database)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) → Create free account
2. Create a **Free Cluster** (M0)
3. Under **Database Access** → Add a database user (username + password)
4. Under **Network Access** → Add IP `0.0.0.0/0` (allow all — required for Render)
5. Click **Connect** → **Drivers** → Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/nafa?retryWrites=true&w=majority
   ```
   Replace `<username>` and `<password>` with your actual credentials.

---

## Step 2 — Push to GitHub

Push the **entire project folder** to one GitHub repository (monorepo):

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

> ⚠️ Make sure `.env` files are NOT committed (they are in `.gitignore`).

---

## Step 3 — Deploy Backend to Render

1. Go to [render.com](https://render.com) → New → **Web Service**
2. Connect your GitHub repo
3. Configure:
   | Setting | Value |
   |---|---|
   | **Root Directory** | `backend` |
   | **Runtime** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `node index.js` |
   | **Plan** | Free |

4. Under **Environment Variables**, add:
   | Key | Value |
   |---|---|
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | A long random string (e.g. `openssl rand -hex 32`) |
   | `CLIENT_URL` | Your Vercel URL (add after Step 4, e.g. `https://nafa.vercel.app`) |
   | `PORT` | `10000` |

5. Click **Create Web Service** → Wait for deployment (~2 mins)
6. Copy your Render URL: `https://equilibrium-backend.onrender.com`

---

## Step 4 — Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project → Import GitHub repo
2. Configure:
   | Setting | Value |
   |---|---|
   | **Root Directory** | `frontend` |
   | **Framework Preset** | `Vite` |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `dist` |

3. Under **Environment Variables**, add:
   | Key | Value |
   |---|---|
   | `VITE_API_URL` | `https://your-backend.onrender.com/api` |

4. Click **Deploy** → Wait for deployment
5. Copy your Vercel URL (e.g. `https://nafa.vercel.app`)

---

## Step 5 — Connect Frontend ↔ Backend

1. Go back to **Render** → Your backend service → **Environment**
2. Update `CLIENT_URL` to your Vercel URL: `https://nafa.vercel.app`
3. Click **Save Changes** → Render will redeploy automatically

---

## Step 6 — Test Everything

- Visit your Vercel URL → homepage should load ✅
- Click **Sign Up** → create an account ✅
- Login → dashboard should show ✅
- Check Render logs for any backend errors ✅

---

## Environment Variables Summary

### Backend (Render)
| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `CLIENT_URL` | Your Vercel frontend URL (for CORS) |
| `PORT` | `10000` (Render default) |

### Frontend (Vercel)
| Variable | Description |
|---|---|
| `VITE_API_URL` | Your Render backend URL + `/api` |

---

## Common Issues & Fixes

| Issue | Fix |
|---|---|
| **CORS error** | Make sure `CLIENT_URL` in Render matches your exact Vercel URL |
| **MongoDB timeout** | Add `0.0.0.0/0` to Atlas Network Access |
| **Page not found on refresh** | `vercel.json` rewrites handle this (already configured) |
| **Render cold start slow** | Free tier sleeps after inactivity — first request takes ~30s |
| **Build fails on Vercel** | Check `VITE_API_URL` is set in Vercel environment variables |

---

## Local Development

```bash
# Terminal 1 — Backend
cd backend
npm install
npm run dev   # runs on http://localhost:4000

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev   # runs on http://localhost:5175
```

Frontend `.env`:
```env
VITE_API_URL=http://localhost:4000/api
```

Backend `.env`:
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret
PORT=4000
CLIENT_URL=http://localhost:5175
```
