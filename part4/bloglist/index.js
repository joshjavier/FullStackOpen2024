const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

const mongoUrl = process.env.MONGODB_URI
console.log('Connecting to the database...')
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB!')
  })
  .catch(error => {
    console.log(error)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
