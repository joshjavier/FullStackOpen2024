const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  const { username, password, name } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ username, passwordHash, name })

  try {
    const createdUser = await user.save()
    res.status(201).json(createdUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

module.exports = usersRouter
