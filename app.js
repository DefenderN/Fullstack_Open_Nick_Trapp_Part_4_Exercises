// Import statements
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger') // Import centralized logging module
const config = require('./utils/config') // Import centralized config module, e.g. handling environment variables
const middleware = require('./utils/middleware') // Import custom middleware
const blogsRouter = require('./controllers/blogs') // Import Route controller for blogs in the DB
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

// Settings
mongoose.set('strictQuery', false)
// Connect to MongoDB
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(result => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

// Middleware BEFORE Routes
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

// Routers
app.use('/api/blogs', blogsRouter)
app.use('/api/users',usersRouter)
app.use('/api/login', loginRouter)

// Middleware AFTER Routes
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// Export statement
module.exports = app