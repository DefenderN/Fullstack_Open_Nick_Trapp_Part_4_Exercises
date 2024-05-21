// In this file, custom middleware for the express application
// is being put.

// Import statements
const logger = require('./logger')
const config = require('./config') // Import centralized config module, e.g. handling environment variables
const User = require('../models/user')

// Middleware for logging requests
const requestLogger = (request, response, next) => {
  //if (config.APP_STATUS === 'development'){
      logger.info('Method', request.method)
      logger.info('Path:  ', request.path)
      logger.info('Body:  ', request.body)
      logger.info('---')
  //  }
    next() // Forward the request to the next middleware
}

// Middleware to copy token from the authorization header to the token field
// of a request.
// Example to access the token and verify it using jwt:
// const decodedToken = jwt.verify(request.token, process.env.SECRET)
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }
    next()
}

// Middleware to fill the request.user field
    const userExtractor = async (request, response, next) => {
    
    // Verify login token to be valid
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    // get user object
    const user = await User.findById(decodedToken.id)

    // append it to the request.user field
    request.user = user
    
    next()
}

// Middleware to respond with an Unknown endpoint error
// when an invalid url is being requested
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' })
  }

// Middleware to handle any kind of errors,
// e.g. from the MongoDB such as "CastError" or "ValidationError"
const errorHandler = (error, request, response, next) => {
    //if (config.APP_STATUS === 'development'){
      logger.error(error.name)  
      logger.error(error.message)
    //}
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
     else if (error.name === 'ValidationError' && error.message.includes('Username is required')) {
      return response.status(400).json({ error: 'Username is required'})
    }
    else if (error.name === 'ValidationError' && error.message.includes('Username must be at least 3 characters')) {
      return response.status(400).json({ error: 'Username must be at least 3 characters'})
    }
     else if (error.name === 'ValidationError' && error.message.includes('Name is required')) {
      return response.status(400).json({ error: 'Name is required'})
    }
     else if (error.message.includes('Password must be at least 3 characters long')) {
      return response.status(400).json({ error: 'Password must be at least 3 characters'})
    }
     else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
     else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({ error: 'expected `username` to be unique' })
    }
     else if (error.name === 'ReferenceError') {
      return response.status(400).json({ error: 'user is not defined' })
    }
     else if (error.message.includes('data and salt arguments required')) {
      return response.status(500).json({ error: 'Invalid input data provided for password hashing.' })
    } 
     else if (error.name ===  'JsonWebTokenError') {
      return response.status(401).json({ error: `${error.message}` })
    }
    else if (error.message.includes('Blog cannot be deleted by unauthorized user')) {
      return response.status(401).json({ error: `${error.message}` })
    }

    next(error) //Forward the error to the next middleware
  }

// Export statements
module.exports = {
    requestLogger,
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler
}

