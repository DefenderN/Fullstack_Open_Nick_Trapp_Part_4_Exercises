// In this file, custom middleware for the express application
// is being put.

// Import statements
const logger = require('./logger')
const config = require('./config') // Import centralized config module, e.g. handling environment variables

// Middleware for logging requests
const requestLogger = (request, response, next) => {
  if (config.APP_STATUS === 'development'){
      logger.info('Method', request.method)
      logger.info('Path:  ', request.path)
      logger.info('Body:  ', request.body)
      logger.info('---')
    }
    next() // Forward the request to the next middleware
}

// Middleware to respond with an Unknown endpoint error
// when an invalid url is being requested
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' })
  }

// Middleware to handle any kind of errors,
// e.g. from the MongoDB such as "CastError" or "ValidationError"
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name === 'ReferenceError') {
      return response.status(400).json({ error: 'user is not defined' })
    }
  
    next(error) //Forward the error to the next middleware
  }

// Export statements
module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}

