const { after, beforeEach, describe, it,  } = require('node:test')
const assert = require('node:assert/strict')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = request(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('root', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})

describe('adding a new user', () => {
  it('returns 201 with the created user in JSON', async () => {
    const user = {
      username: 'joshjavier',
      password: 'swordfish',
      name: 'Josh Javier',
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
})

describe('getting the list of all users', () => {
  it('returns 200 with the list of all users in JSON', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})
