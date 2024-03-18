const router = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

router.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', 'username name')
  res.json(blogs)
})

router.post('/', userExtractor, async (req, res) => {
  const blog = new Blog(req.body)

  const user = req.user

  if (!user) {
    return res.status(403).json({ error: 'user missing' })
  }

  if (!blog.title || !blog.url) {
    return res.status(400).json({ error: 'title or url missing' })
  }

  blog.likes = blog.likes | 0
  blog.user = user
  user.blogs = user.blogs.concat(blog.id)

  await user.save()

  const savedBlog = await blog.save()

  res.status(201).json(savedBlog)
})

router.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user

  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.sendStatus(204)
  }

  if (blog.user && user.id !== blog.user.toString()) {
    return res.status(403).json({ error: 'user not authorized' })
  }

  await blog.deleteOne()

  user.blogs = user.blogs.filter(b => b.id !== blog.id)

  await user.save()

  res.sendStatus(204)
})

router.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body

  const blog = { title, author, url, likes }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
  }).populate('user', 'username name')
  res.json(updatedBlog)
})

module.exports = router
