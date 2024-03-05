const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return likes
}

const favoriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    const favorite = blogs.find(blog => blog.likes === maxLikes)
    return favorite
}

const mostBlogs = (blogs) => {
    const authors = blogs.reduce((authors, blog) => {
        if (authors[blog.author]) {
            authors[blog.author]++
        } else {
            authors[blog.author] = 1
        }
        return authors
    }, {})
    const maxBlogs = Math.max(...Object.values(authors))
    const author = Object.keys(authors).find(author => authors[author] === maxBlogs)
    return { author, blogs: maxBlogs }
}

const mostLikes = (blogs) => {
    const authors = blogs.reduce((authors, blog) => {
        if (authors[blog.author]) {
            authors[blog.author] += blog.likes
        } else {
            authors[blog.author] = blog.likes
        }
        return authors
    }, {})
    const maxLikes = Math.max(...Object.values(authors))
    const author = Object.keys(authors).find(author => authors[author] === maxLikes)
    return { author, likes: maxLikes }
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }