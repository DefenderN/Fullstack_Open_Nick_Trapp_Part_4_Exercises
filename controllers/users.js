/**
 * This file is a separate piece of MIDDLEWARE,
 * which specifies the details of the routes for USER OBJECTS.
 * 
 * It defines and exports a NOTESROUTER which is used in the APP.JS file as middleware.
 * 
 * The ROUTE PATHWAYS are RELATIVE PATHWAYS to the path defined when used in the APP.JS file.
 * 
 */

// Import statements
const bcrypt = require('bcrypt') // Used for creating the passwordHash
const usersRouter = require('express').Router()
const User = require('../models/user') // Import User object to use for MongoDB

// ROUTES ------

// POST a new user
usersRouter.post('/', async (request, response, next) => {
    try {
    // Extract relevant information from the request
    const { username, name, password } = request.body

    // Create passwordHash
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create new user object
    const user = new User({
      username,
      name,
      passwordHash
    })
    
    // Add user to MongoDb
    const savedUser = await user.save()
    // Response
    response.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }
})

// GET all users
usersRouter.get("/", async (request, response, next) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter