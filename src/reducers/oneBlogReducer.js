const oneBlog = null

const oneBlogReducer = (state = oneBlog, action) => {
    switch (action.type) {
      case 'SET_BLOG':
        return action.data
      default:
        return state
    }
  }
  
  export const setOneBlog = (oneBlog) => {
    return {
      type: 'SET_BLOG',
      data: oneBlog,
    }
  }
  
  export default oneBlogReducer