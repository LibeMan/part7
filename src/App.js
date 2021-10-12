import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch} from 'react-redux'
import { doMessage } from './reducers/notificationReducer'
import BlogList from './components/Bloglist'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()

  
  const dispatch = useDispatch()
  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

 

  //Handle login
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      /*
      setErrorMessage('Wrong credentials')
      setErrorColor('red')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000) */
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
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />

          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  //Add blog
  /*
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        //refreshPage()
      })
  }*/
  /*
  const blogForm = () => (
    <Togglable buttonLabel='new blog' buttonLabel2='cancel' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} user={user}/>
    </Togglable>
  )*/

  

  



  //Return the app
  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          <BlogForm />
        </div>
      }
      <div id="blogs">
        <BlogList />
        
      </div>
    </div>
  )
}

export default App