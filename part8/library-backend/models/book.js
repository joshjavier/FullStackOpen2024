import { Schema, model } from "mongoose"
import { deleteId } from "../utils/index.js"

const schema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  published: {
    type: Number,
    required: true,
  },
  genres: [
    {
      type: String,
      required: true,
    },
  ],
})

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: deleteId,
})

export const Book = model('Book', schema)
