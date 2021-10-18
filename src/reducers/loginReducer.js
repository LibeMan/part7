
import blogService from "../services/blogs"
import loginService from "../services/login"
const user = null

const loginReducer = (state = user, action) => {
    switch (action.type) {
        case 'LOGIN':
            if (action.user === null){
                return null
            } else {
                const user = action.user
                return user
            }
            
        default:
            return state
    }
}

export const setLogin = user => {
    return async dispatch => {
        //blogService.setToken(user.token)
        //const newUser = await loginService.login(user)
        dispatch({
          type:'LOGIN',
          user
        })
    }
}

export default loginReducer