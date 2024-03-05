const { test, describe, expect } = require('@jest/globals');
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index');
const Blog = require('../models/blog');
const api = supertest(app)

describe('GET /api/blogs', () => {
    test('returns the correct number of blogs in JSON format', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(19)
    })

    test('blogs have an id field', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        response.body.forEach(blog => {
            expect(blog.id).toBeDefined();
        })
    })

})

describe('POST /api/blogs', () => {
    
    test('blogs without title are not added', async () => {
        const newBlog = {
            author: 'Me Author',
            url: 'http://www.example.com',
            likes: 105
        }
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)
  
    })

    test('blogs without url are not added', async () => {
        const newBlog = {
            title: '1 Blog',
            author: 'Me Author',
            likes: 105
        }
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)

    })

    test('blogs can be added via HTTP POST request', async () => {

        const newBlog = {
            title: '2 Blog',
            author: 'Me Author',
            url: 'http://www.example.com',
            likes: 105
        }

        const initialBlogs = await api.get('/api/blogs')
        const initialBlogCount = initialBlogs.body.length
        console.log(newBlog)
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const updatedBlogCount = response.body.length

        expect(updatedBlogCount).toBe(initialBlogCount + 1)

        const addedBlog = response.body[response.body.length - 1]
        expect(addedBlog.author).toBe(newBlog.author)
        expect(addedBlog.url).toBe(newBlog.url)
        expect(addedBlog.likes).toBe(newBlog.likes)
        })

    test('likes default to 0 if not provided', async () => {
        const newBlog = {
            title: '3 Blog',
            author: 'Me Author',
            url: 'http://www.example.com'
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')    
        const addedBlog = response.body[response.body.length - 1]
        expect(addedBlog.likes).toBe(0)
        })
    })

afterAll(async () => {
    await mongoose.connection.close()
  })
