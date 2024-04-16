// Thsi file defines the mongoose schema
// to use the MongoDB for the Blogs collection
// and exports a Blog object

// Import statements
const mongoose = require('mongoose')

// Define Mongoose schema
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
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