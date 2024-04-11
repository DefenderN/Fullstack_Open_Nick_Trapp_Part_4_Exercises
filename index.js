// Import statements
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


// Mongoose setup
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl)

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
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

// Running the server
const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})