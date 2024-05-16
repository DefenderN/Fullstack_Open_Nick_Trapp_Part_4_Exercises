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
const User = require('../models/user') // Import User object to use for MongoDB

// ROUTES ------

// Get all blogs
blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user')
        response.json(blogs)
    } catch (error) {
        next(error)
    }
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
blogsRouter.post('/', async (request, response, next) => {
    // Check if the title or url of the blog is missing.
    if (!request.body.title || !request.body.url){
        return response.status(400).json({ error: 'Title and URL are required' });
    }

    try {
        // Get DUMMY User to put as user to the new blog 
        // TODO: Change this later for the ACTUAL User
        const users = await User.find({})
        const dummyUser = users[0]
        const dummyUserID = users[0].id

        // Create new Blog object
        const blog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes ?? 0, //Set likes to 0 if no value is given
            user: dummyUserID
        })

        // Save new blog object to DB
        const savedBlog = await blog.save()

        // Update the blogs array of the user
        const updatedUser = await User.findByIdAndUpdate(dummyUserID, { $push: { blogs: savedBlog.id } }, { new: true, runValidators: true });

        // Set response to be the savedBlog
        response.status(201).json(savedBlog)
    } catch (error) {
        next(error)
    }
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