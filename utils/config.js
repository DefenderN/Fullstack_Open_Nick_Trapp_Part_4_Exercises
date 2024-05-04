// This config.js file currently handles environment variables
// for this backend at a centralized location (this file)

require('dotenv').config() // import dotenv library to handle environment variables

// Environment variables
const PORT = process.env.PORT
const APP_STATUS = process.env.NODE_ENV
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

// Export statement
module.exports = {
  MONGODB_URI,
  PORT,
  APP_STATUS
}