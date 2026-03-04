const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// Create Express app
const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())

// Enable CORS for the frontend
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})
)


module.exports = app;