
import React, { useState } from 'react'



const BlogForm = ({ createBlog , user }) => {

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
            title: <input id='title' value={newBlogTitle} onChange={handleBlogTitleChange}/> <br/>
            author: <input id='author' value={newBlogAuthor} onChange={handleBlogAuthorChange}/> <br/>
            url: <input id='url' value={newBlogUrl} onChange={handleBlogUrlChange}/> <br/>
        <button type="submit">create new blog</button>
      </form>
    </div>
  )
}

export default BlogForm