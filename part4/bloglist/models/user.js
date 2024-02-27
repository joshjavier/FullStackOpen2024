const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  name: String,
})

userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id
    delete ret.__v
    delete ret.passwordHash
    return ret
  }
})

module.exports = new mongoose.model('User', userSchema)
