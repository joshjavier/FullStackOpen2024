const { User, Note, Team } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Note,
        attributes: { exclude: ['userId'] },
      },
      {
        model: Team,
        through: { attributes: [] },
      },
    ],
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Note,
        attributes: { exclude: ['userId'] },
      },
      {
        model: Note,
        as: 'marked_notes',
        attributes: { exclude: ['userId'] },
        through: { attributes: [] },
        include: {
          model: User,
          attributes: ['name'],
        },
      },
      {
        model: Team,
        through: { attributes: [] },
      },
    ],
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user.admin) {
    return res.status(401).json({ error: 'operation not allowed' })
  }
  next()
}

router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({ where: { username } })
  if (user) {
    user.disabled = req.body.disabled
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
