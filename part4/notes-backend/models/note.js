const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

noteSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret._id
    delete ret.__v
    return ret
  }
})

module.exports = mongoose.model('Note', noteSchema)
