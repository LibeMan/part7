
import blogService from "../services/blogs"
import loginService from "../services/login"
const user = {}

const loginReducer = (state = user, action) => {
    switch (action.type) {
        case 'LOGIN':
            const user = action.data
            return user
        default:
            return state
    }
}

export const setLogin = user => {
    return async dispatch => {
        blogService.setToken(user.token)
        const newUser = await loginService.login(user)
        dispatch({
          type:'LOGIN',
          data:newUser,
        })
    }
}

export default loginReducer