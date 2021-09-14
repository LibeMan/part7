import React from 'react'
import Togglable from './Togglable'



const Blog = ({ blog, likes, user, deleteBlog }) => {
  const addLike = (event) => {
    event.preventDefault()
    // setNewLikes(blog.likes + 1)
    console.log(blog.title)
    console.log(blog.author)
    console.log(blog.url)
    console.log(blog.likes)
    console.log(user)
    console.log(blog.id)
    likes
    // eslint-disable-next-line no-unexpected-multiline
    (blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes +1,
      user: user
    })
  }

  const deleteB = (event) => {
    event.preventDefault()
    deleteBlog(blog.id)
  }


  return(
    <div className="blog">
      {blog.title} {blog.author}

      <Togglable buttonLabel='View' buttonLabel2='cancel' >
      Likes: {blog.likes}
        <button onClick={addLike}>Like</button>
        <br/>
      Url: {blog.url}   <br/>
        <button onClick={deleteB}>remove</button>
      </Togglable>

    </div>
  )

}

export default Blog