const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

console.log('Connecting to the database...')
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB!')
  })
  .catch(error => {
    console.log(error)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
