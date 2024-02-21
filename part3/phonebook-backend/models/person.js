const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('Connecting to the database...')

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB!')
  })
  .catch(error => {
    console.log(error)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: (val) => {
        return /^\d{2,3}-\d+$/.test(val)
      },
      message: 'Number should contain a single dash with 2-3 numbers on the left side (e.g. XXX-XXXX)'
    }
  },
})

personSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret._id
    delete ret.__v
    return ret
  }
})

module.exports = mongoose.model('Person', personSchema)
