import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

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

  const [loginVisible, setLoginVisible] = useState(false)

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

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
        <Togglable buttonLabel='login'>
        <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
          
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm 
        onSubmit={addBlog} 
        title={newBlogTitle}
        handleChange1={handleTitleChange}
        author={newBlogAuthor}
        handleChange2={handleAuthorChange}
        url={newBlogUrl}
        handleChange3={handleUrlChange}
      />      
    </Togglable>
    
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