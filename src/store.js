/* eslint-disable no-undef */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import blogService from './services/blogs'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import userService from './services/users'

const reducer = combineReducers({
    //notifications: notificationReducer,
    blogs: blogReducer,
    user: loginReducer,
    users: userReducer
  })

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

blogService.getAll().then(blogs =>
  blogs.forEach(blog => {
    store.dispatch({type: 'NEW_BLOG', data: blog})
  })
)

userService.getAllUsers().then(users => 
  users.forEach(user => {
    store.dispatch({type: 'NEW_USER', data: user})
  }))

export default store