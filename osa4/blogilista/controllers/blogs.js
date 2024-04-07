const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
      const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
      response.json(blogs);
})
  
blogsRouter.post('/', async (request, response) => {
  try {
    console.log(request.token)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).end()
    return;
  }
  if (request.body.likes === undefined) {
    request.body.likes = 0
  }
  const user = await User.findById(decodedToken.id)
  request.body.user = decodedToken.id
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog);
} catch (error) {
  console.log(error)
  response.status(401).json({ error: 'token invalid' })
}
})

blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndRemove(request.params.id);
  if (result) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})


blogsRouter.put('/:id', async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true});
  if (result) {
    response.status(200).json(result)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter