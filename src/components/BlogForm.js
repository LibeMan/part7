/* eslint-disable no-unexpected-multiline */
/*const BlogForm = ({ onSubmit, handleTitleChange, title, handleAuthorChange, author, handleUrlChange, url}) => {



    return (
      <div>
        <h2>Create a new blog</h2>

        <form onSubmit={onSubmit}>
          Title: <input
            title={title}
            onChange={handleTitleChange}
          /> <br/>
          Author: <input
            author={author}
            onChange={handleAuthorChange}
          /> <br/>
          Url: <input
            url={url}
            onChange={handleUrlChange}
          /><br/>
          <button type="submit">save</button>
        </form>
      </div>
    )
  }

export default BlogForm */

import React, { useState } from 'react'
// import Notification from '../components/Error'


const BlogForm = ({ createBlog , user }) => {

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
    createBlog
    // await blogService.create
    ({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0,
      user: user,
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
            title: <input value={newBlogTitle} onChange={handleBlogTitleChange}/> <br/>
            author: <input value={newBlogAuthor} onChange={handleBlogAuthorChange}/> <br/>
            url: <input value={newBlogUrl} onChange={handleBlogUrlChange}/> <br/>
        <button type="submit">create new blog</button>
      </form>
    </div>
  )
}

export default BlogForm