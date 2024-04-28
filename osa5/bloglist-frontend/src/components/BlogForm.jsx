import React, { useState } from 'react';



const BlogForm = ({createBlog}) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  
  const handleAddBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <form onSubmit={handleAddBlog}>
      <div>
        title:
        <input
          type="text"
          value={newBlogTitle}
          name="title"
          onChange={event => setNewBlogTitle(event.target.value)}
        />
      </div>

      <div>
        <label>
        author:
        <input
          type="text"
          value={newBlogAuthor}
          name="author"
          onChange={event => setNewBlogAuthor(event.target.value)}
        />
        </label>
      </div>

      <div>
        url:
        <input
          type="text"
          value={newBlogUrl}
          name="url"
          onChange={event => setNewBlogUrl(event.target.value)}

        />   
      </div>

      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm