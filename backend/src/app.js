const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// Import routes
const authRoutes = require('./routes/auth.routes')
const songRoutes = require('./routes/song.routes')

// Create Express app
const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())

// Enable CORS for the frontend
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true
}));



// Routes
app.use('/api/auth', authRoutes)
app.use('/api/songs', songRoutes)

module.exports = app;