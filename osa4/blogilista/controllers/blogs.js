const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
      const blogs = await Blog.find({});
      response.json(blogs);
})
  
blogsRouter.post('/', async (request, response) => {
  console.log(request.body)
  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).end();
    return;
  }
  if (request.body.likes === undefined) {
    request.body.likes = 0;  
  }
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
})

module.exports = blogsRouter