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

/**
 * The function finds out which blog in a blogs array has the most likes.
 * It returns the respective blog object.
 * @param {array} blogs - A list of blog posts
 * @returns {object|null} - The blog post object with the most likes,
 *                          or null if the array is empty.
 */   
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null; // Return null if the array is empty
  } else {
  return blogs.reduce((previousBlog, currentBlog) => {
    // Assess likes count
    const previousLikes = previousBlog.likes || 0;
    const currentLikes = currentBlog.likes || 0;
    // Compare it to the previous blogs likes count of the iteration
    // and return the blog object with the higher likes count
    return currentLikes > previousLikes ? currentBlog : previousBlog;
  }, {likes: 0})}
}

module.exports = {
dummy, totalLikes, favoriteBlog
}