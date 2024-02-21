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

app.post('/api/persons', async (req, res) => {
  const body = req.body
  const persons = await Person.find({})

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number is missing'
    })
  } else if (persons.map(p => p.name).includes(body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  const savedPerson = await person.save()
  res.json(savedPerson)
})

app.get('/info', (req, res) => {
  const html = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>
  `
  res.send(html)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  if (!persons.map(p => p.id).includes(id)) {
    res.status(404).json({
      error: "this person does not exist"
    })
  }

  const person = persons.find(p => p.id === id)
  res.json(person)
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
      { new: true },
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
  }

  next(err)
})

app.listen(port, () => {
  console.log(`Phonebook backend listening on port ${port}`)
})
