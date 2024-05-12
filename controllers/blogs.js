// This file is a separate piece of middleware
// which specifies the details of the routes for Blog objects.
// To do so, this file defines and exports a notesRouter
// which is to be used in the app.js file (Where its relative
// path/ route is defined.)
// The route pathways defined here are RELATIVE pathways
// to the pathway which is defined when this router is 
// being used in the app.js file

// Import statements
const blogsRouter = require('express').Router()
const Blog = require('../models/blog') // Import Blog object to use for MongoDB

// ROUTES ------

// Get all blogs
blogsRouter.get('/', (request, response) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs)
        })
})

// Get an existing blog
blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error)) // Pass any errors down the line
})

// Add a new blog
blogsRouter.post('/', (request, response, next) => {
    // Check if the title or url of the blog is missing.
    if (!request.body.title || !request.body.url){
        return response.status(400).json({ error: 'Title and URL are required' });
    }

    // Create new Blog object
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes ?? 0 //Set likes to 0 if no value is given
    })

    // Save new blog object to DB
    blog.save()
        .then(savedBlog => {
            response.status(201).json(savedBlog)
        })
        .catch(error => next(error))
})

// DELETE a blog
blogsRouter.delete('/:id', async (request, response, next) => {
     const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
        if (deletedBlog) {
            response.status(204).end()
        } else {
            response.status(404).end()
        }
})


// Update a blog
blogsRouter.put('/:id', async (request, response, next) => {
  
    // Create blog object to replace existing one
    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }
    // Update the DB with the new Blog object
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true })
    response.json(updatedBlog)
  })

// Export statements
module.exports = blogsRouter