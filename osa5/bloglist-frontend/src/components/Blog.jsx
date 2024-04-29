import React, { useState } from 'react'
import { useEffect } from 'react'

const Blog = ({ blog, onLike, loggedUser, onDelete }) => {
  const [showInfo, setShowInfo] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    if (loggedUser && loggedUser.username === blog.user.username) {
      setShowDelete(true)
    } else {
      setShowDelete(false)
    }
  }, [loggedUser, blog.user.username])

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

  const handleDelete = () => {
    onDelete(blog)
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
          {showDelete && <button onClick={handleDelete}>Delete</button>}
        </div>
      )}
    </div>
  )
}

export default Blog