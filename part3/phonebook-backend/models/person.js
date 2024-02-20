const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('Connecting to the database...')

mongoose
  .connect(url)
  .then(response => {
    console.log('Connected to MongoDB!')
  })
  .catch(error => {
    console.log(error)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id
    delete ret.__v
    return ret
  }
})

module.exports = mongoose.model('Person', personSchema)
