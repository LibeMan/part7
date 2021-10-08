


const blogReducer = (state, action) =>{
    switch (action.type) {
        case "newBlog":
            
            return [...state, action.data]
    
       
    }
    return state
}


export const createBlog = (content, author, url) => {
    return {
        type: 'NewBlog',
        data: {
            content,
            author,
            url,
            votes: 0
        }
    }
}


export default blogReducer