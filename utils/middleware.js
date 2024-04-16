// In this file, custom middleware for the express application
// is being put.

// Import statements
const logger = require('./logger')

// Middleware for logging requests
const requestLogger = (request, response, next) => {
    logger.info('Method', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
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
    }
  
    next(error) //Forward the error to the next middleware
  }

// Export statements
module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}
