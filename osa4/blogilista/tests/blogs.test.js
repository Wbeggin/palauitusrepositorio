const { test, describe, expect } = require('@jest/globals');
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)

describe('GET /api/blogs', () => {
    test('returns the correct number of blogs in JSON format', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(2)
    })
})
