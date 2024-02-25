const { after, beforeEach, describe, it } = require('node:test')
const assert = require('node:assert/strict')
const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = request(app)

beforeEach(async () => {
  // clear test database
  await Blog.deleteMany({})

  // add sample data
  const blogs = helper.initialBlogs.map(blog => new Blog(blog))
  const saveBlogsToDb = blogs.map(blog => blog.save())
  await Promise.all(saveBlogsToDb)
})

describe('blog list app', () => {
  it('returns the correct number of blog posts in JSON', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  it('defines id prop for each blog post', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    assert('id' in blog)
  })
})

describe('POST /api/blogs', () => {
  const blog = {
    title: 'Don\'t Make a Blog, Make a Brain Dump',
    author: 'Bradley Taunt',
    url: 'https://btxx.org/posts/dump/',
    likes: 0,
  }

  it('returns the created blog in JSON', async () => {
    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const createdBlog = response.body
    assert.deepStrictEqual(createdBlog, { ...blog, id: createdBlog.id })
  })

  it('increases the number of blog posts by one', async () => {
    await api.post('/api/blogs').send(blog)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})
