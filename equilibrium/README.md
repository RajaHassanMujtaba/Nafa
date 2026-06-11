# Equilibrium

Professional trading platform with React frontend and Node.js backend.

**Structure:**
- `frontend/`: React + Vite web app → Deploy to **Vercel**
- `backend/`: Node.js + Express API → Deploy to **Render**
- Database: **MongoDB Atlas**

---

## Quick Start (Local Development)

### 1. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5175`

### 2. Backend (separate terminal)

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:4000`

### 3. Environment Files

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:4000/api
```

**Backend** (`backend/.env`):
```env
MONGODB_URI=
JWT_SECRET=your_super_secret_jwt_key_change_in_production
PORT=4000
CLIENT_URL=http://localhost:5175
```

---

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete step-by-step instructions.

**Quick Summary:**
1. Push to GitHub
2. Deploy `frontend/` to Vercel (automatic on git push)
3. Deploy `backend/` to Render (automatic on git push)
4. Set up MongoDB Atlas for database
5. Update environment variables in both platforms

---

## API Routes

- `POST /api/signup` — Register new user
- `POST /api/login` — Authenticate user
- `GET /api/profile` — Get logged-in user profile (requires Bearer token)
- `GET /api/health` — Health check

---

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- React Router (navigation)
- Tailwind CSS (styling)
- Lucide Icons

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT (authentication)
- CORS (cross-origin)
- bcryptjs (password hashing)

---

## File Structure

```
equilibrium/
├── frontend/
│   ├── src/
│   │   ├── pages/          # Login, Signup, Dashboard, etc.
│   │   ├── context/        # AuthContext for state
│   │   ├── lib/            # API helpers
│   │   └── components/
│   ├── dist/               # Production build
│   ├── vercel.json         # Vercel config
│   └── package.json
├── backend/
│   ├── index.js            # Express server
│   ├── models/             # MongoDB schemas
│   ├── render.yaml         # Render config
│   └── package.json
├── DEPLOYMENT_GUIDE.md     # Full deployment instructions
└── README.md
```

---

## Notes

- Backend has in-memory auth fallback when `MONGODB_URI` is empty (dev only)
- Production deployment **requires** MongoDB Atlas
- All sensitive data (JWT_SECRET, DB passwords) in `.env` (not committed)
- Frontend proxy routes `/api` to backend during development

## Notes

- `frontend/src/context/AuthContext.tsx` manages JWT auth
- `frontend/src/lib/api.ts` handles API requests and token storage
- `backend/index.js` connects to MongoDB Atlas and exposes auth routes
