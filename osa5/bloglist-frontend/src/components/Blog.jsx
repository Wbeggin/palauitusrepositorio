import React, { useState } from 'react'

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleToggleInfo}>
        {showInfo ? 'hide' : 'view'}
      </button>
      {showInfo && (
        <div>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes}</p> 
          <p>Username: {blog.user.username}</p>            
        </div>
      )}
    </div>
  )
}

export default Blog