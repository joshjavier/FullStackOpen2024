const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
const port = process.env.PORT

morgan.token('request-body', (req) => JSON.stringify(req.body))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))
app.use(express.static('dist'))

const generateId = () => {
  let id = 0
  do {
    id = Math.floor(Math.random() * 999)
  } while (persons.map(p => p.id).includes(id));

  return id
}

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number is missing'
    })
  } else if (persons.map(p => p.name).includes(body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }
  persons = persons.concat(person)
  res.status(200).json(person)
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

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.sendStatus(204)
})

app.listen(port, () => {
  console.log(`Phonebook backend listening on port ${port}`)
})