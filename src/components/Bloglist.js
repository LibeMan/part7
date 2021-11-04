import { useSelector } from "react-redux"
import React from 'react'
import Togglable from '../components/Togglable'
import { useDispatch } from "react-redux"
import { setLikes, deleteBlog } from "../reducers/blogReducer"
import { Link } from "react-router-dom"
import { setOneBlog } from "../reducers/oneBlogReducer"
import { Table } from 'react-bootstrap'

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
            <Table striped>
                {blogs.map(blog =>
                    <tr key={blog.id}>
                        <td>
                            
                            <div> <Link to={`/blog/${blog.id}`} onClick={() => dispatch(setOneBlog(blog))}> Blog Title - {blog.title} - Author: {blog.author} </Link></div>
                            <br/>

                        </td>
                    
                    </tr>
                )}
            </Table>
        </div>
    )
}

export default BlogList

/* Gammal kod inne i return:
<Togglable buttonLabel='show' buttonLabel2='hide'>
                        Url: {blog.url} <br/>
                        Likes: {blog.likes} 
                        <button onClick={() => likes(blog.id, blog)}>Like</button>
                        <button onClick={() => delBlog(blog.id)}>Delete</button>
                        <br/>
                    </Togglable>

*/