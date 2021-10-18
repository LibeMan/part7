import userService from '../services/users'

//Reducer
const userReducer = (state = [], action) => {
    switch (action.type) {
        case 'USERS':
            return action.data
        case 'NEW_USER':
            return state.concat(action.data)
        default:
            return state
    }
}

//Give users
export const goUsers = (users) => {
    return {
        type: 'USERS',
        data: users
    }
}

//Create user
export const createUser = (users) => {
    return async dispatch => {
        const newUser = await userService.getAllUsers(users)
        dispatch({
            type:'NEW_USER',
            data: newUser
        })
    }
}


export default userReducer