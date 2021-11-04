
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from "react-redux"
import { createBlog } from '../reducers/blogReducer'
import { Button } from 'react-bootstrap'

const BlogForm = () => {

  const dispatch = useDispatch()

  //Dehä ska veks
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')


  const handleBlogTitleChange = (event) => {
    console.log(event.target.value)
    setNewBlogTitle(event.target.value)
  }


  const handleBlogAuthorChange = (event) => {
    console.log(event.target.value)
    setNewBlogAuthor(event.target.value)
  }


  const handleBlogUrlChange = (event) => {
    console.log(event.target.value)
    setNewBlogUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0
    }
    dispatch(createBlog(newObject))
    console.log("Hej hej här e objekte:",newObject)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>
            title: <Form.Control id='title' value={newBlogTitle} onChange={handleBlogTitleChange}/> 
          </Form.Label>
          <br/>
          <Form.Label>
            author: <Form.Control id='author' value={newBlogAuthor} onChange={handleBlogAuthorChange}/> 
          </Form.Label>
          <br/>
          <Form.Label>
            url: <Form.Control id='url' value={newBlogUrl} onChange={handleBlogUrlChange}/> 
          </Form.Label>
          <br/>
        <Button variant="primary" type="submit">create new blog</Button>
        </Form.Group>
      </Form>
      <br/>
    </div>
  )
}

export default BlogForm