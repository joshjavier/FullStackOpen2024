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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
