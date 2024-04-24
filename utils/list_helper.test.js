const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require("./list_helper")

// The test function essentially waits for an error to occur when executing the function
// which is passed as the second argument.
// When no error occurs, the test is regarded to be successful.
test("Dummy is 1", () => {
    // Define test data
    const blogs = []

    // collect result of tested function
    const result = listHelper.dummy(blogs)

    // compare function result to expected result
    assert.strictEqual(result , 1)
})

// define a test suite to test the totalLikes function properly
describe("total likes", () => {

    test("of an empty list of blogs is 0", () => {
        // Define test data
        const emptyBlogsList = []
        // collect result of tested code function
        const result = listHelper.totalLikes(emptyBlogsList)
        // compare result to expected value
        assert.strictEqual(result, 0)
    })

    test("when list has only one blog, equals the likes of that", () => {
        // Define test data
        const listWithOneBlog = [
            {
              _id: '5a422aa71b54a676234d17f8',
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
              likes: 5,
              __v: 0
            }
          ]

        // collect result of tested code function
        const result = listHelper.totalLikes(listWithOneBlog)
        // compare result to expected value
        assert.strictEqual(result, 5)
    })

    test("of a bigger list is calculated right", () => {
        
        // Define test data
        const biggerList = [
            {
              _id: '5a422aa71b54a676234d17f8',
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
              likes: 5,
              __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 10,
                __v: 0
              },
              {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 20,
                __v: 0
              }
          ]
        // collect result of tested code function
        const result = listHelper.totalLikes(biggerList)
        // compare result to expected value
        assert.strictEqual(result, 35)
    })
})

// define a test suite to test the favoriteBlog function properly
describe("favorite blog", () => {
  
  test("of a list with multiple blogs", () => {
    // Define test data
    const theFavoriteBlog = {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 20,
      __v: 0
    }
    const anotherBlog = {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }

    const anotherBlog2 = {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 10,
      __v: 0
    }

    // Blogs-Array with multiple blogs
    const blogs = [theFavoriteBlog, anotherBlog, anotherBlog2]
    // collect result of tested function
    const result = listHelper.favoriteBlog(blogs)
    // compare function result to expected result
    assert.deepStrictEqual(result, theFavoriteBlog)
  })

  test("of a list with only one blog", () => {
    // Define test data
    const theFavoriteBlog = {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 20,
      __v: 0
    }
    // Blogs-Array with one blog only
    const blogs = [theFavoriteBlog]
    // collect result of tested function
    const result = listHelper.favoriteBlog(blogs)
    // compare function result to expected result
    assert.deepStrictEqual(result, theFavoriteBlog)
  })

  test("of a list with no blogs", () => {
    // Define test data
    // Empty blogs-array 
    const blogs = []
    // collect result of tested function
    const result = listHelper.favoriteBlog(blogs)
    // compare function result to expected result
    assert.deepStrictEqual(result, null)
  })
})