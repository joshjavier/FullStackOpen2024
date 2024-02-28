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

  it('fails when username or password is missing', async () => {
    const usernameOnly = { username: 'username' }
    const passwordOnly = { password: 'password' }

    const resUsernameOnly = await api.post('/api/users').send(usernameOnly).expect(400)
    const resPasswordOnly = await api.post('/api/users').send(passwordOnly).expect(400)

    assert(resUsernameOnly.body.error.includes('required'))
    assert(resPasswordOnly.body.error.includes('required'))
  })

  it('fails when username is less than 3 characters', async () => {
    const user = {
      username: 'hi',
      password: 'welcome123',
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(response.body.error.includes('User validation failed'))
  })

  it('fails when password is less than 3 characters', async () => {
    const user = {
      username: 'claptrap',
      password: 'hi',
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(response.body.error.includes('password must be at least 3 characters'))
  })

  it('fails when username is not unique', async () => {
    const user = {
      username: 'root',
      password: 'root',
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(response.body.error.includes('username must be unique'))
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
