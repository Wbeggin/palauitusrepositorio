const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

app.use(cors())
app.use(express.json())

const PORT = config.PORT
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})