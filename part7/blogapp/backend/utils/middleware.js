const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const logger = require('./logger')

const User = require('../models/user')

morgan.token('request-body', (req) => JSON.stringify(req.body))
const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :request-body',
  {
    skip: () => process.env.NODE_ENV === 'test',
  }
)

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: err.message })
  }

  next(err)
}

const getTokenFrom = (request) => {
  const auth = request.get('Authorization')
  return auth && auth.startsWith('Bearer')
    ? auth.replace('Bearer ', '')
    : null
}

const userExtractor = async (req, res, next) => {
  const token = getTokenFrom(req)

  try {
    const payload = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(payload.id)

    req.user = user

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
}
