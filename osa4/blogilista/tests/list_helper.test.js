const { test, describe } = require('@jest/globals')
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

describe('favoriteBlog', () => {
    test('returns the blog with the most likes', () => {
        const blogs = [
            { title: 'Blog 1', author: 'Author 1', likes: 10 },
            { title: 'Blog 2', author: 'Author 2', likes: 20 },
            { title: 'Blog 3', author: 'Author 3', likes: 30 }
        ]
    
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, { title: 'Blog 3', author: 'Author 3', likes: 30 })
    })

    test('returns the first blog if all have the same amount of likes', () => {
        const blogs = [
            { title: 'Blog 1', author: 'Author 1', likes: 10 },
            { title: 'Blog 2', author: 'Author 2', likes: 10 },
            { title: 'Blog 3', author: 'Author 3', likes: 10 }
        ]
    
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, { title: 'Blog 1', author: 'Author 1', likes: 10 })
    })
})

describe('mostBlogs', () => {
    test('returns the author with the most blogs and the number of blogs', () => {
        const blogs = [
            { title: 'Blog 1', author: 'Author 1', likes: 10 },
            { title: 'Blog 2', author: 'Author 2', likes: 20 },
            { title: 'Blog 3', author: 'Author 3', likes: 30 },
            { title: 'Blog 4', author: 'Author 1', likes: 40 },
            { title: 'Blog 5', author: 'Author 2', likes: 50 },
            { title: 'Blog 6', author: 'Author 1', likes: 60 }
        ]
    
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, { author: 'Author 1', blogs: 3 })
    })

    test('returns the first author if all have the same amount of blogs', () => {
        const blogs = [
            { title: 'Blog 1', author: 'Author 1', likes: 10 },
            { title: 'Blog 2', author: 'Author 2', likes: 20 },
            { title: 'Blog 3', author: 'Author 3', likes: 30 }
        ]
    
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, { author: 'Author 1', blogs: 1 })
    })
})

describe('mostLikes', () => {
    test('returns the author with the most likes and the number of likes', () => {
        const blogs = [
            { title: 'Blog 1', author: 'Author 1', likes: 10 },
            { title: 'Blog 2', author: 'Author 2', likes: 20 },
            { title: 'Blog 3', author: 'Author 3', likes: 30 },
            { title: 'Blog 4', author: 'Author 1', likes: 40 },
            { title: 'Blog 5', author: 'Author 2', likes: 50 },
            { title: 'Blog 6', author: 'Author 1', likes: 60 }
        ]
    
        const result = listHelper.mostLikes(blogs)
        assert.deepStrictEqual(result, { author: 'Author 1', likes: 110 })
    })

    test('returns the first author if all have the same amount of likes', () => {
        const blogs = [
            { title: 'Blog 1', author: 'Author 1', likes: 10 },
            { title: 'Blog 2', author: 'Author 2', likes: 10 },
            { title: 'Blog 3', author: 'Author 3', likes: 10 }
        ]
    
        const result = listHelper.mostLikes(blogs)
        assert.deepStrictEqual(result, { author: 'Author 1', likes: 10 })
    })
})