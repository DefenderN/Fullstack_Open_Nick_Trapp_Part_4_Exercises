// Mongoose schema to use the MongoDB for the Blogs collection

// Import statements
const mongoose = require('mongoose')

// Define Mongoose schema
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId, // This adds mongoose functionality to populate this field later on
        ref: 'User'                           // by using the ref: 'User' field
      }
  })

// Modify the schemas toJSON function to clear of the _id and __v properties
// for better readability
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// Create Blog object to handle DB requests
const Blog = mongoose.model('Blog', blogSchema)

// Export statement
module.exports = Blog