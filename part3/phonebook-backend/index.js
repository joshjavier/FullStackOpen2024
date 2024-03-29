const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
const port = process.env.PORT

app.use(express.static('dist'))
app.use(express.json())

morgan.token('request-body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

app.get('/api/persons', async (req, res) => {
  const persons = await Person.find({})
  res.json(persons)
})

app.post('/api/persons', async (req, res, next) => {
  try {
    const { name, number } = req.body
    const persons = await Person.find({})

    if (persons.map(p => p.name).includes(name)) {
      return res.status(400).json({ error: 'name must be unique' })
    }

    const person = new Person({ name, number })
    const savedPerson = await person.save()
    res.json(savedPerson)
  } catch (error) {
    next(error)
  }
})

app.get('/info', async (req, res) => {
  const persons = await Person.find({})
  const html = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>
  `
  res.send(html)
})

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id)
    if (person) {
      res.json(person)
    } else {
      res.status(404).json({ error: 'this person does not exist' })
    }
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    await Person.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const { name, number } = req.body
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { name, number },
      { new: true, runValidators: true },
    )
    res.json(updatedPerson)
  } catch (error) {
    next(error)
  }
})

app.use((err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformed id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
})

app.listen(port, () => {
  console.log(`Phonebook backend listening on port ${port}`)
})
