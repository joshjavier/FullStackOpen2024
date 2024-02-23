const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

notesRouter.get('/:id', async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id)
    if (note) {
      res.json(note)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/', async (req, res, next) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  try {
    const savedNote = await note.save()
    res.json(savedNote)
  } catch (error) {
    next(error)
  }
})

notesRouter.delete('/:id', async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', async (req, res, next) => {
  const { content, important } = req.body

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { content, important },
      { new: true, runValidators: true }
    )
    res.json(updatedNote)
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter
