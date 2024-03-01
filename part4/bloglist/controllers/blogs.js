const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', '-blogs')
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  try {
    const auth = req.get('Authorization')
    const token = auth ? auth.replace('Bearer ', '') : null
    const payload = jwt.verify(token, process.env.SECRET)

    const { title, author, url, likes } = req.body

    const user = await User.findById(payload.id)

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user.id,
    })

    const createdBlog = await blog.save()
    user.blogs = user.blogs.concat(createdBlog.id)
    await user.save()

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
