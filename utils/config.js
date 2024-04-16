// This config.js file currently handles environment variables
// for this backend at a centralized location (this file)

require('dotenv').config() // import dotenv library to handle environment variables

// Environment variables
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

// Export statement
module.exports = {
  MONGODB_URI,
  PORT
}