const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0

  if (blogs.length === 1) return blogs[0].likes

  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs
      .toSorted((a, b) => b.likes - a.likes)
      .map(({ title, author, likes }) => ({ title, author, likes }))[0]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorBlogs = _.transform(_.countBy(blogs, 'author'), (result, value, key) => {
    result.push({ author: key, blogs: value })
  }, [])

  return _.maxBy(authorBlogs, 'blogs')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
