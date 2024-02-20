const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to database...')

mongoose
  .connect(url)
  .then(response => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id
    delete ret.__v
    return ret
  }
})

module.exports = mongoose.model('Note', noteSchema)
