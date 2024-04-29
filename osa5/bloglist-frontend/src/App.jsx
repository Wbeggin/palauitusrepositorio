import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')
  const [notificationVisible, setNotificationVisible] = useState(true)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
      setUser(user)
      blogService.setToken(user.token)
      showSuccess('Logged in')
    } catch (exception) {
      console.log('Wrong credentials')
      showError('Wrong credentials')
    }
  }

  const showError = (errorMessage) => {
    setNotificationMessage(null)
    setNotificationType('error')
    setNotificationMessage(errorMessage)
    setNotificationVisible(true)
    setTimeout(() => {
      setNotificationVisible(false)
    }, 3000)
  }

  const showSuccess = (successMessage) => {
    setNotificationMessage(null)
    setNotificationType('success')
    setNotificationMessage(successMessage)
    setNotificationVisible(true)
    setTimeout(() => {
      setNotificationVisible(false)
    }, 3000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleAddBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      showSuccess(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setBlogFormVisible(false)
    } catch (exception) {
      console.log(exception.message)
      showError('Failed to add blog')
    }
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <h2>create new</h2>
          <BlogForm createBlog={handleAddBlog}

          />
        </div>
      </div>
    )
  }

  const handleLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const backUpUser = blog.user
    await blogService.updateBlog(updatedBlog)
    updatedBlog.user = backUpUser
    setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      showSuccess(`Blog ${blog.title} by ${blog.author} deleted`)
    }
  }

  return (
    <div>
      <Notification message={notificationMessage} type={notificationType} visible={notificationVisible} />
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>

        <button onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser')
          setUser(null)
          showSuccess('Logged out')
        }}>logout</button>


        {blogForm()}

        <h2>blogs</h2>
        {blogs.sort((first, second) => second.likes - first.likes).map(blog =>
          <Blog key={blog.id} blog={blog} onLike={handleLike} loggedUser={user} onDelete={handleDelete} />
        )}
      </div>
      }
    </div>
  )
}

export default App