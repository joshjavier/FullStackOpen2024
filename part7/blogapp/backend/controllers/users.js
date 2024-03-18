const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  if (!password) {
    return res.status(400).json({ error: 'password missing' })
  } else if (password.length < 3) {
    return res.status(400).json({ error: 'password must be at least 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  try {
    const user = new User({ username, name, passwordHash })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', 'url title author')
  res.json(users)
})

module.exports = router
