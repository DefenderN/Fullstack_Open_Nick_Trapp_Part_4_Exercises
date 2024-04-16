// Import statements
// require('dotenv').config() // import dotenv library to handle environment variables
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger') // Import centralized logging module
const config = require('./utils/config')


// Mongoose setup
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// Create Blog object to handle DB requests
const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(config.MONGODB_URI)
  .then(result => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

// Middleware
app.use(cors())
app.use(express.json())


// API Routes
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch((error) => logger.error("Error occurred: ", error))
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch((error) => logger.error("Error occurred: ", error))
})

// Running the server
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})