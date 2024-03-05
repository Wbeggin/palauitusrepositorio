const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('totallikes', () => {
    test(' returns the sum of likes from all blogs', () => {
        const blogs = [
            { title: 'Blog 1', author: 'Author 1', likes: 10 },
            { title: 'Blog 2', author: 'Author 2', likes: 20 },
            { title: 'Blog 3', author: 'Author 3', likes: 30 }
        ]
    
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 60)
    })

    test(' returns 0 if no blogs', () => {
        const blogs = []
    
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })
})
