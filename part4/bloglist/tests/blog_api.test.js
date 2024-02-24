const { after, beforeEach, describe, it } = require('node:test')
const assert = require('node:assert/strict')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

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
    const result = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.length, helper.initialBlogs.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
