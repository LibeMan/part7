import { useSelector } from "react-redux"
import React from 'react'
import Togglable from '../components/Togglable'
import { useDispatch } from "react-redux"
import { setLikes, deleteBlog } from "../reducers/blogReducer"


const BlogList = () => {
    
    //Refresh page
    function refreshPage(){
        window.location.reload()
    }

    //Push blogs
    const dispatch = useDispatch()

    //Take all blogs
    const blogs = useSelector(({blogs}) => {
        return blogs
    })

    //Sort blogs
    const sort = (blogs) => {
        blogs.sort(function (a, b) {
            return b.likes - a.likes
        })
    }

    //Add like
    const likes = (id, blogObject) => {
        const newObject = blogObject
        dispatch(setLikes(id, newObject))
        //notification här
        
        console.log('Jooooooo', id)
    }

    //Delete blog
    const delBlog = (id) => {
        dispatch(deleteBlog(id))
    }
        


    return(
        <div>
            {sort(blogs)}
            {blogs.map(blog =>
                <div className='blog' key={blog.id}>
                    <div>Title: {blog.title}, Author: {blog.author}</div>
                    <Togglable buttonLabel='show' buttonLabel2='hide'>
                        Url: {blog.url} <br/>
                        Likes: {blog.likes} 
                        <button onClick={() => likes(blog.id, blog)}>Like</button>
                        <button onClick={() => delBlog(blog.id)}>Delete</button>
                        <br/>
                    </Togglable>
                  <br/>
                </div>
            )}
        </div>
    )
}

export default BlogList