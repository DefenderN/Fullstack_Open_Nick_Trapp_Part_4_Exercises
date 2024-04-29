// Import statements
const {test, describe, beforeEach, after} = require("node:test")
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

// Assign the api variable the superagent, by passing the app object to the supertest function.
const api = supertest(app)

describe("API tests",() => {

    /**
     * Use the SuperTest library for writing a test that makes an HTTP GET request 
     * to the /api/blogs URL. Verify that the blog list application returns the correct
     * amount of blog posts in the JSON format. 
     * 
     * Once the test is finished, refactor the route handler to use the async/await syntax 
     * instead of promises.
     */
    test('blogs are returned as json', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    // Close DB connections after testing
    after(async () => {
        await mongoose.connection.close()
    })
})