import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorColor, setErrorColor] = useState("")

  const [newBlogTitle, setNewBlogTitle] = useState("")
  const [newBlogAuthor, setNewBlogAuthor] = useState("")
  const [newBlogUrl, setNewBlogUrl] = useState("")

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //Add blog
  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = await blogService.create ({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })
    setBlogs(blogs.concat(blogObject))
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    setErrorColor("Green")
    setErrorMessage(
      `Added a new blog: '${newBlogTitle}'. By '${newBlogAuthor}'.`
    ) 
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
  }

  //Handle TITLE
  const handleTitleChange = (event) => {
      console.log(event.target.value)
      setNewBlogTitle(event.target.value)
  }

  //Handle AUTHOR
  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewBlogAuthor(event.target.value)
  }
  //Handle URL
  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewBlogUrl(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setErrorColor("red")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

  const blogForm = () => (
    <form onSubmit={addBlog}>
      Title:<input value={newBlogTitle} onChange={handleTitleChange}/> <br/>
      Author:<input value={newBlogAuthor} onChange={handleAuthorChange}/> <br/>
      Url:<input value={newBlogUrl} onChange={handleUrlChange}/> <br/>

      <button type="submit">save</button>
    </form>  
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} color={errorColor} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          {blogForm()}
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
      )}
        </div>
      }
    </div>
  )
}

export default App