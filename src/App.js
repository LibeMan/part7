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
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [user, setUser] = useState(null)

  
  const blogFormRef = useRef()

  
  const dispatch = useDispatch()
  

  

 

  

  
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
        <Login /> :
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