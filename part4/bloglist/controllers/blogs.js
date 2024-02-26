const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  const { title, author, url, likes } = req.body
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0
  })

  try {
    const createdBlog = await blog.save()
    res.status(201).json(createdBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    await Blog.findByIdAndDelete(id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  const { title, author, url, likes } = req.body
  const blog = {
    title,
    author,
    url,
    likes: likes || 0
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      blog,
      { new: true, runValidators: true },
    )
    res.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
