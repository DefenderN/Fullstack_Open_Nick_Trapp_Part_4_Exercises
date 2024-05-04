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
describe("When it comes to API calls", () => {
    // Clean up and initialize the database before each test
    beforeEach(async () => {
        await Blog.deleteMany({});
        
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
    });

    // Test to verify the the blogs are returned in json format
    test('blogs are returned in JSON format', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });

    // Test to verify the correct amount of blogs is returned
    test('blogs are properly added to the DB', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)  
        
        // Verify response length 
        assert.strictEqual(response.body.length, 6)
    });

    // Test to verify that the returned blog objects from the db contain
    // an id field and not a _id field
    test("blogs have an id field and not an _id field", async () => {
        const response = await api
                            .get('/api/blogs')
                            .expect(200)

        const hasIdFieldName = response.body[0].hasOwnProperty("id")
        assert.strictEqual(hasIdFieldName, true)
        // assert.strictEqual(idFieldName, "_id")
    })

    test("a blog POST request returns status code 200", async () => {
        // Setup dummy data to insert
        const newBlog = {
            title: "New Blog",
            author: "New Author",
            url: "http://newblog.com",
            likes: 10
        }

        // POST newBlog to DB
        const response = await api
                            .post('/api/blogs')
                            .send(newBlog)
                            .expect(201)

        const responseBlog = response.body
        assert.strictEqual(responseBlog.author, "New Author")
        assert.strictEqual(responseBlog.url, "http://newblog.com")
        assert.strictEqual(responseBlog.likes, 10)
    })

    test("the likes property defaults to zero if it is missing", async () => {

        // Create dummyBlog with no likes property
        const blogWithoutLikes = {
            title: "New Blog",
            author: "New Author",
            url: "http://newblog.com"
        }
        // Post dummyBlog to DB
        const response = await api
                            .post('/api/blogs')
                            .send(blogWithoutLikes)
                            .expect(201)

        // Evaluate that the likes property of the response body
        // was changed to 0
        const responseBlog = response.body
        assert.strictEqual(responseBlog.hasOwnProperty("likes"), true)
        assert.strictEqual(responseBlog.likes, 0)
    })

    test("a missing title or url property results in status code 400 Bad Request", async () => {

        /**
         * Create 3 dummy blogs:
         *   #  title? url?
         *   1  NO     YES
         *   2  YES    NO
         *   3  NO     NO
         */

        const maliciousBlogs = [
            {
                author: "Another Author",
                url: "http://newblog.com",
                likes: 0
            },
            {
                title: "New Blog",
                author: "New Author",
                likes: 0
            },
            {
                author: "New Author",
                likes: 0
            }]

        // Post each dummy blog to the DB
        // Assert that every POST Request returns a 400 code
        for (const blog of maliciousBlogs) {
            const response = await api
                .post('/api/blogs')
                .send(blog)
                .expect(400);
        }
    })

    // Close DB connections after testing
    after(async () => {
        await mongoose.connection.close()
    })
})