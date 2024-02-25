const morgan = require('morgan')
const logger = require('./logger')

morgan.token('request-body', (req) => JSON.stringify(req.body))
const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :request-body',
  {
    skip: () => process.env.NODE_ENV === 'test',
  }
)

const unknownEndpoint = (req, res) => {
  return res.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
