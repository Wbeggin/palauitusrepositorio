const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)
const User = require('../models/user')

describe('User creation', () => {
    test('should not add user when password is less than 3 characters', async () => {
        const initialUsers = await User.find({})
        const initialUsersAmount = initialUsers.length
        const newUser = {
            username: 'user1',
            password: 'pw'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const users = await User.find({})
        expect(users).toHaveLength(initialUsersAmount)
    })

    test('should not add user when username is less than 3 characters', async () => {
        const initialUsers = await User.find({})
        const initialUsersAmount = initialUsers.length
        const newUser = {
            username: 'us',
            password: 'password123'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const users = await User.find({})
        expect(users).toHaveLength(initialUsersAmount)
    })
})
