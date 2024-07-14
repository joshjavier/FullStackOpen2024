import mongoose from "mongoose"

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    }
  ],
})

export default mongoose.model('User', user)
