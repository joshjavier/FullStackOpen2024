const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (req, res) => {
  const notes = await Note
    .find({})
    .populate('user', {
      username: 1,
      name: 1,
    })
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

  const user = await User.findById(body.userId)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id,
  })

  try {
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote.id)
    await user.save()

    res.status(201).json(savedNote)
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
