// Mongoose schema for users in the MongoDB

// Import statements
const mongoose = require('mongoose')

// Define Mongoose schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // this ensures the uniqueness of username
    },
    name: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
})

// Modify toJSON method to NOT include __v, Object_ID and passwordHash
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})

// Create User object to handle DB requests
const User = mongoose.model('User', userSchema)

// Export statement
module.exports = User