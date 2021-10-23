import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector} from 'react-redux'
import { doMessage } from './reducers/notificationReducer'
import BlogList from './components/Bloglist'
import { setLogin } from './reducers/loginReducer'
import User from './components/User'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory
} from "react-router-dom"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)


  
  const blogFormRef = useRef()

  
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // setUser(user)
      dispatch(setLogin(user))
      blogService.setToken(user.token)
    }
},[dispatch])

const user = useSelector(({user}) => {
  console.log("HEj token här:", user)
    return user
})

//Handle login
const handleLogin = async (event) => {
    event.preventDefault()
    
    try
    {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setLogin(user))
      // setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
    }
    
}
  

  //loginform
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return(
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
 


  //Return the app
  return (
    <Router>
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
          <User/>
        </div>
      </div>
    </Router>
    
  )
}

export default App