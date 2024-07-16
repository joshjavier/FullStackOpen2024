import mongoose from "mongoose"
import { Author, Book } from "./models/index.js"
import * as data from "./data.js"

const uri = process.env.MONGODB_URI
const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
}

init().catch(console.dir)

async function init() {
  await mongoose.connect(uri, clientOptions)
  await mongoose.connection.db.admin().ping()
  console.log('Pinged your deployment. Successfully connected to MongoDB!')

  // Start with a blank slate
  await clearCollections()
  await initializeDb()
}

async function clearCollections() {
  await Author.deleteMany({})
  await Book.deleteMany({})
}

async function initializeDb() {
  let authors = await Author.insertMany(data.authors)
  let books = await Book.insertMany(data.books.map((book) => {
    const author = authors.find(a => a.name === book.author)
    return { ...book, author: author.id }
  }))
  console.log(`Database initialized with ${authors.length} authors and ${books.length} books`)
}
