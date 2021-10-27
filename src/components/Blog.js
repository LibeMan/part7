import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import { setLikes } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { useState } from 'react'
import { setBlogComments } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {

  const dispatch = useDispatch()
  const [newComment, setNewComment] = useState('')

  //Add like
  const likes = (id, blogObject) => {
    const newObject = blogObject
    dispatch(setLikes(id, newObject))
    //notification här
    dispatch(setNotification(`You liked ${newObject.title}`, 20))
    console.log('Jooooooo', id)
  }

  //Delete blog
  const delBlog = (id) => {
    dispatch(deleteBlog(id))
  }

  //Add comment
  const addComment = () => {
    const newObject = oneBlog
    newObject.comments = newObject.comments.concat(newComment)
    console.log('kommentaren är gjord', newComment);
    dispatch(setBlogComments(oneBlog.id, newObject))
    dispatch(setNotification(`you commented on ${oneBlog.title}`, 100))
  }
  const handleComment = (event) => {
    setNewComment(event.target.value)
  }

  /*
  const deleteB = (event) => {
    event.preventDefault()
    deleteBlog(blog.id)
  }*/

  const oneBlog = useSelector(({oneBlog}) => {
    return oneBlog
  })
  if(!oneBlog){
    return null
  } else {

    return(
      <div className="blog">
        <h1>{oneBlog.title}</h1>
        Author: {oneBlog.author}
        Likes: <div id="likes">{oneBlog.likes}</div>
        <button id="likeBut" onClick={() => likes(oneBlog.id, oneBlog)}>Like</button>
        <br/>
        Url: {oneBlog.url}   <br/>
        <h3>Comments</h3>
        {oneBlog.comments.map(comment =>
          <p key = {comment}>{comment}</p>)}
        <form onSubmit={addComment}>
          <input value={newComment} onChange={handleComment}/>
          <button type="submit">comment</button>
        </form>
        <button onClick={() => delBlog(oneBlog.id)}>remove</button>
  
      </div>
    )
  
  }
  }


  

export default Blog
