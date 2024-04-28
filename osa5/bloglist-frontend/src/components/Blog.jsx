import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, onLike }) => {
  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleToggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleLike = () => {
    onLike(blog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleToggleInfo}>
        {showInfo ? 'hide' : 'view'}
      </button>
      {showInfo && (
        <div>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes} <button onClick={handleLike}>Like</button></p>
          <p>Name: {blog.user.name}</p>            
        </div>
      )}
    </div>
  )
}

export default Blog