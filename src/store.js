/* eslint-disable no-undef */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import blogService from './services/blogs'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
    //notifications: notificationReducer,
    blogs: blogReducer,
    user: loginReducer
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

export default store