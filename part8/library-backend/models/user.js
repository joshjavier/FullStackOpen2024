import { Schema, model } from "mongoose"
import { deleteId } from "../utils/index.js"

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
})

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: deleteId,
})

export const User = model('User', schema)
