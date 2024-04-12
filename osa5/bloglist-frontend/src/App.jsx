import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)    
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

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
    } catch (exception) {
      console.log(exception)
      console.log('Wrong credentials')
    }
  }

  // ...

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

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      }
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const blogForm = () => (
    <form onSubmit={handleAddBlog}>
      <div>
        title:
        <input
          type="text"
          value={newBlogTitle}
          name="title"
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>

      <div>
        author:
        <input
          type="text"
          value={newBlogAuthor}
          name="author"
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>

      <div>
        url:
        <input
          type="text"
          value={newBlogUrl}
          name="url"
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
        
      </div>
      <button type="submit">create</button>
    </form>
  )


  return (
    <div>
      {!user && loginForm()}
      {user && <div>
         <p>{user.name} logged in</p>

        <button onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser')
          setUser(null)
        }}>logout</button>

        <h2>create new</h2>
        {blogForm()}

         <h2>blogs</h2>
         {blogs.map(blog =>
           <Blog key={blog.id} blog={blog} />
         )}
        </div>
      } 
    </div>
  )
}

export default App