const { after, beforeEach, describe, it } = require('node:test')
const assert = require('node:assert/strict')
const bcrypt = require('bcrypt')
const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = request(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  // add initial user
  const passwordHash = await bcrypt.hash('root', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()

  // add initial data
  const blogs = helper.initialBlogs.map(blog => new Blog({ ...blog, user: user.id }))
  await Blog.insertMany(blogs)
  user.blogs = user.blogs.concat(blogs.map(blog => blog.id))
  await user.save()
})

describe('GET /api/blogs', () => {
  it('returns the correct number of blog posts in JSON', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  it('each blog post has an `id` prop', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    assert(blogs.every(blog => 'id' in blog))
  })

  it('each blog post has a `user` prop', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    assert(blogs.every(blog => 'user' in blog))
  })
})

describe('POST /api/blogs', () => {
  const testBlog = {
    title: 'Untitled',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 99,
  }

  it('returns the created blog in JSON', async () => {
    const user = await User.findOne()

    const response = await api
      .post('/api/blogs')
      .send({ ...testBlog, user: user.id })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const createdBlog = response.body
    assert.deepStrictEqual(createdBlog, { ...testBlog, id: createdBlog.id, user: user.id })
  })

  it('increases the number of blog posts by one', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const user = await User.findOne()
    await api.post('/api/blogs').send({ ...testBlog, user: user.id })
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)
  })

  it('`likes` prop defaults to 0 if missing from request body', async () => {
    const user = await User.findOne()

    const testBlogNoLikes = {
      title: 'This blog post has no likes',
      author: 'John Doe',
      url: 'https://example.com',
      user: user.id,
    }

    const response = await api
      .post('/api/blogs')
      .send(testBlogNoLikes)
      .expect(201)

    const createdBlog = response.body
    assert.strictEqual(createdBlog.likes, 0)
  })

  it('responds with 400 Bad Request when `title` prop is missing', async () => {
    const user = await User.findOne()
    const blogWithoutTitle = { author: 'author', url: 'url', user: user.id }
    await api.post('/api/blogs').send(blogWithoutTitle).expect(400)
  })

  it('responds with 400 Bad Request when `url` prop is missing', async () => {
    const user = await User.findOne()
    const blogWithoutURL = { title: 'title', author: 'author', user: user.id }
    await api.post('/api/blogs').send(blogWithoutURL).expect(400)
  })
})

describe('DELETE /api/blogs/:id', () => {
  beforeEach(async () => {
    const user = await User.findOne()

    const blog = {
      title: 'Marginalia: 3 Years',
      author: 'Viktor Lofgren',
      url: 'https://www.marginalia.nu/log/a_101_marginalia-3-years/',
      likes: 107,
      user: user.id,
    }
    await api.post('/api/blogs').send(blog).expect(201)
  })

  it('returns 204 No Content', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const id = blogsAtStart[blogsAtStart.length - 1].id

    await api.delete(`/api/blogs/${id}`).expect(204)
  })

  it('reduces the number of blog posts by one', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const id = blogsAtStart[blogsAtStart.length - 1].id

    await api.delete(`/api/blogs/${id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })
})

describe('PUT /api/blogs/:id', () => {
  beforeEach(async () => {
    const user = await User.findOne()

    const blog = {
      title: 'Write Dumb Code',
      author: 'Matthew Rocklin',
      url: 'https://matthewrocklin.com/write-dumb-code.html',
      user: user.id,
    }
    await api.post('/api/blogs').send(blog).expect(201)
  })

  const updatedBlog = {
    title: 'Write Dumb Code',
    author: 'Matthew Rocklin',
    url: 'https://matthewrocklin.com/write-dumb-code.html',
    likes: 49,
  }

  it('returns 200 OK with the updated blog in JSON', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[blogsAtStart.length - 1]
    const id = blogToUpdate.id
    const user = await User.findOne()

    await api
      .put(`/api/blogs/${id}`)
      .send({ ...updatedBlog, user: user.id })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  it('does not increase the number of blog posts', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const id = blogsAtStart[blogsAtStart.length - 1].id
    const user = await User.findOne()

    await api.put(`/api/blogs/${id}`).send({ ...updatedBlog, user: user.id })

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
