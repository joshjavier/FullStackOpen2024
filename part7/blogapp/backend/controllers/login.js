const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (req, res, next) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  try {
    const match = !user || !password
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if (!match) {
      return res.status(401).json({ error: 'invalid username or password' })
    }

    const payload = {
      username: user.username,
      id: user.id,
    }

    const token = jwt.sign(payload, process.env.SECRET)

    res.json({
      token,
      username: user.username,
      name: user.name,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
