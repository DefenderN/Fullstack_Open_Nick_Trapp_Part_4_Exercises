// Import statements
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

// Routes ---

// Login
loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    // get user from DB by providing the username
    const user = await User.findOne({ username })
    // Check password validity with bcrypt
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)
    
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }
  
    const userForToken = {
      username: user.username,
      id: user._id,
    }
    // Create token
    const token = jwt.sign(userForToken, process.env.SECRET)
  
    // Return token
    response
      .status(200)
      .json({ token, username: user.username, name: user.name })
  })
  
  module.exports = loginRouter