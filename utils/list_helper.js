// This is a dummy file

// First dumm ý function
const dummy = (blogs) => {
    return 1
  }

/**
 * The function returns the total sum of likes of a list of blog posts.
 * @param blogs - A list of blog posts
 * @returns The total sum of likes of all of the blog posts
 */
const totalLikes = (blogs) => {
    return blogs.reduce(
        (totalSum, blog, currentIndex, array) => {
        return totalSum + blog.likes
        }, 0)

}

module.exports = {
dummy, totalLikes
}