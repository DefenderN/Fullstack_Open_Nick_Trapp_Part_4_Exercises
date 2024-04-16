// This file contains all the code for logging, e.g. server events
// or console.logs to handle at one place.
// Extracting logging into its own module is a good idea in several ways. 
// If we wanted to start writing logs to a file or send them to 
// an external logging service like graylog or papertrail we would only
//  have to make changes in one place.

// Handling regular logs
const info = (...params) => {
    console.log(...params)
  }
  
// Handle error logs
  const error = (...params) => {
    console.error(...params)
  }
  
  module.exports = {
    info, error
  }