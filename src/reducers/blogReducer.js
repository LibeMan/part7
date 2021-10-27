/* eslint-disable default-case */
import blogService from '../services/blogs'


const blogReducer = (state = [], action) =>{
    switch (action.type) {
        case "NEW_BLOG":
            
            return state.concat(action.data)
        
        case "INIT_BLOGS":
            return action.data
        case "LIKE":
            const id = action.id
            console.log("Id:",id)
            const rightBlog = state.find(n => n.id === id)
            console.log("Här e ", rightBlog)
            const newBlog = {
                ...rightBlog,
                likes: rightBlog.likes + 1
            }
            return state.map(blog => 
                blog.id !== id ? blog : newBlog)
        case "DELETE":
            return refreshPage()
        case 'COMMENT':
            const idComment = action.id
            const blogToComment = state.find(n => n.id === idComment)
            const changedBlogComment = { 
                ...blogToComment, 
                comments: blogToComment.comments.concat(action.comment)
            }
            return state.map(blog =>
                blog.id !== idComment ? blog : changedBlogComment 
            )
            
        default:
            return state
       
    }
}

//Refresh page
function refreshPage(){
  window.location.reload()
}

//Initialize blogs
export const initializeBlogs = (blogs) => {
    return {
      type: 'INIT_BLOGS',
      data: blogs,
    }
  }

//Create blog
export const createBlog = (newObject) => {
    return async dispatch => {
        const newBlog = await blogService.create(newObject)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

//Set likes
export const setLikes = (id, blog) => {
    return async dispatch => {
      const newBlog = await blogService.update(id, blog)
      console.log("Snille:",newBlog.id)
      dispatch({
        type: 'LIKE',
        id: id,
        data: newBlog
      })
    }
  }

//Delete blog
export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService
    .deleteObj(id)
    dispatch({
      type:'DELETE'
    })
  }
  
}

//Set comments
export const setBlogComments = (id, newObject) => {
  return async dispatch => {
    const newComment = await blogService.update(id, newObject)
    dispatch({
      type: 'COMMENT',
      id: id,
      data: newComment
    })
  }
}


export default blogReducer