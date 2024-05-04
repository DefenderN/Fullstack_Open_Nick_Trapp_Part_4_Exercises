// Import statements
const {test, describe, beforeEach, after} = require("node:test")
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog'); 

// Assign the api variable the superagent, by passing the app object to the supertest function.
const api = supertest(app)

// Define test suite
describe.only("API tests", () => {
    // Clean up and initialize the database before each test
    beforeEach(async () => {
        await Blog.deleteMany({});
        console.log("DB has been deleted")
        // Create an array of dummy blog entries
        const blogEntries = [
            { title: "Blog 1", author: "Author 1", url: "http://example.com/1", likes: 10 },
            { title: "Blog 2", author: "Author 2", url: "http://example.com/2", likes: 20 },
            { title: "Blog 3", author: "Author 3", url: "http://example.com/3", likes: 30 },
            { title: "Blog 4", author: "Author 4", url: "http://example.com/4", likes: 40 },
            { title: "Blog 5", author: "Author 5", url: "http://example.com/5", likes: 50 },
            { title: "Blog 6", author: "Author 6", url: "http://example.com/6", likes: 60 },
        ];

    

        // Insert the dummy blogs into the database
        await Blog.insertMany(blogEntries);
        console.log("Many blogs were inserted")
    });

    // Test to verify the the blogs are returned in json format
    test('blogs are returned in JSON foramt', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });

    // Test to verify the correct amount of blogs is returned
    test('there are exactly 6 blogs', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)  
        
        // Verify response length 
        assert.strictEqual(response.body.length, 6)
    });

    // Test to verify that the returned blog objects from the db contain
    // an id field and not a _id field
    test.only("blogs have id field and not _id field", async () => {
        const response = await api
                            .get('/api/blogs')
                            .expect(200)

        const hasIdFieldName = response.body[0].hasOwnProperty("id")
        assert.equal(hasIdFieldName, true)
        // assert.strictEqual(idFieldName, "_id")
    })

    // Close DB connections after testing
    after(async () => {
        await mongoose.connection.close()
    })
})