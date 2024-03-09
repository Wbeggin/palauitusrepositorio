const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
      const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
      response.json(blogs);
})
  
blogsRouter.post('/', async (request, response) => {
  console.log(request.body)
  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).end()
    return;
  }
  if (request.body.likes === undefined) {
    request.body.likes = 0
  }
  const user = await User.findOne({})
  request.body.user = user._id
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog);
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