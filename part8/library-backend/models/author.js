import { Schema, model } from "mongoose"
import { deleteId } from "../utils/index.js"

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  born: Number,
})

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: deleteId,
})

export const Author = model('Author', schema)
