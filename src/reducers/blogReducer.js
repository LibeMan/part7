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
            const rightBlog = state.find(n => n.id === id)
            const newBlog = {
                ...rightBlog,
                likes: rightBlog.likes + 1
            }
            return state.map(blog => 
                blog.id !== id ? blog : newBlog)
        default:
            return state
       
    }
}

export const initializeBlogs = (blogs) => {
    return {
      type: 'INIT_BLOGS',
      data: blogs,
    }
  }


export const createBlog = (newObject) => {
    return async dispatch => {
        const newBlog = await blogService.create(newObject)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const setLikes = (id, blog) => {
    return async dispatch => {
      const likes = await blogService.update(id, blog)
      dispatch({
        type: 'LIKE',
        id: 'id',
        data: likes
      })
    }
  }


export default blogReducer