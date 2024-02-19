const express = require('express')
const app = express()
const port = 3001

const persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
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

app.listen(port, () => {
  console.log(`Phonebook backend listening on port ${port}`)
})
