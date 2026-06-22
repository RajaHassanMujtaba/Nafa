import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from './models/User.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret'
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

const localUsers = new Map()
let useMongo = false

if (!MONGODB_URI) {
  console.warn('Missing MONGODB_URI in .env. Backend will run with in-memory auth fallback only.')
} else {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB Atlas')
      useMongo = true
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message)
      console.warn('Continuing with in-memory auth fallback. Set a valid MONGODB_URI to use MongoDB Atlas.')
    })
}

const allowedOrigins = [
  CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))
app.use(express.json())

function createToken(user) {
  const userId = user._id?.toString?.() || user.id || ''
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' })
}

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token missing' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const userId = typeof decoded === 'object' && decoded !== null ? decoded.id : null
    if (!userId) {
      return res.status(401).json({ error: 'Invalid token payload' })
    }

    let user = null
    if (useMongo) {
      user = await User.findById(userId).select('-password')
    } else {
      user = localUsers.get(userId)
      if (user) {
        const { password, ...publicUser } = user
        user = publicUser
      }
    }

    if (!user) return res.status(401).json({ error: 'Invalid token' })
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/signup', async (req, res) => {
  const {
    full_name,
    email,
    password,
    phone,
    country,
    province,
    city,
    cnic,
    trading_experience,
    profession,
  } = req.body

  if (!full_name || !email || !password) {
    return res.status(400).json({ error: 'Full name, email, and password are required.' })
  }

  const normalizedEmail = email.toLowerCase().trim()
  if (useMongo) {
    const existing = await User.findOne({ email: normalizedEmail })
    if (existing) {
      return res.status(400).json({ error: 'Email is already registered.' })
    }
  } else {
    for (const localUser of localUsers.values()) {
      if (localUser.email === normalizedEmail) {
        return res.status(400).json({ error: 'Email is already registered.' })
      }
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const userData = {
    full_name,
    email: normalizedEmail,
    password: hashedPassword,
    phone: phone || '',
    country: country || '',
    province: province || '',
    city: city || '',
    cnic: cnic || '',
    trading_experience: trading_experience || '',
    profession: profession || '',
    is_paid: false,
    createdAt: new Date(),
  }

  let user
  if (useMongo) {
    user = new User(userData)
    await user.save()
  } else {
    const userId = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    user = { id: userId, ...userData }
    localUsers.set(userId, user)
  }

  const token = createToken(user)
  const responseUser = {
    id: user._id?.toString?.() || user.id,
    full_name: user.full_name,
    email: user.email,
    phone: user.phone,
    country: user.country,
    province: user.province,
    city: user.city,
    cnic: user.cnic,
    trading_experience: user.trading_experience,
    profession: user.profession,
    is_paid: user.is_paid || false,
    created_at: user.createdAt,
  }

  return res.json({ data: { token, user: responseUser } })
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  const normalizedEmail = email.toLowerCase().trim()
  let user = null

  if (useMongo) {
    user = await User.findOne({ email: normalizedEmail })
  } else {
    for (const localUser of localUsers.values()) {
      if (localUser.email === normalizedEmail) {
        user = localUser
        break
      }
    }
  }

  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password.' })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return res.status(400).json({ error: 'Invalid email or password.' })
  }

  const token = createToken(user)
  const responseUser = {
    id: user._id?.toString?.() || user.id,
    full_name: user.full_name,
    email: user.email,
    phone: user.phone,
    country: user.country,
    province: user.province,
    city: user.city,
    cnic: user.cnic,
    trading_experience: user.trading_experience,
    profession: user.profession,
    is_paid: user.is_paid || false,
    created_at: user.createdAt,
  }

  return res.json({ data: { token, user: responseUser } })
})

app.get('/api/profile', authMiddleware, async (req, res) => {
  const u = req.user
  return res.json({
    data: {
      id: u._id?.toString?.() || u.id,
      full_name: u.full_name,
      email: u.email,
      phone: u.phone,
      country: u.country,
      province: u.province,
      city: u.city,
      cnic: u.cnic,
      trading_experience: u.trading_experience,
      profession: u.profession,
      is_paid: u.is_paid || false,
      created_at: u.createdAt || u.created_at,
    }
  })
})

// Admin endpoint to mark user as paid (use with caution)
app.post('/api/mark-paid', authMiddleware, async (req, res) => {
  const { userId, paid } = req.body
  if (useMongo) {
    await User.findByIdAndUpdate(userId || req.user._id, { is_paid: paid !== false })
    return res.json({ success: true })
  } else {
    const u = localUsers.get(userId || req.user.id)
    if (u) { u.is_paid = paid !== false; localUsers.set(u.id, u) }
    return res.json({ success: true })
  }
})

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})

// Global error handlers to prevent crashes
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason)
})
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message)
})
