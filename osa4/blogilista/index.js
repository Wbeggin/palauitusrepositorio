const http = require('http')
const express = require('express')
const app = express()
const tokenExtractor = require('./middleware/tokenExtractor')
const userExtractor = require('./middleware/userExtractor')
app.use(tokenExtractor)
app.use(userExtractor)
const cors = require('cors')
app.use(cors())
app.use(express.json())
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)
app.use('/api/users', require('./controllers/users'))
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
const loginRouter = require('./controllers/login')
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  console.log('test mode')
  const testingRouter = require('./controllers/tests')
  app.use('/api/testing', testingRouter)
}

const PORT = config.PORT
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app