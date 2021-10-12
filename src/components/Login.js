import LoginForm from "./LoginForm"
import { useState, useEffect } from "react"
import setLogin from "../reducers/loginReducer"
import { useDispatch, useSelector } from "react-redux"
import blogService from "../services/blogs"
import loginService from "../services/login"


const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginVisible, setLoginVisible] = useState(false)

    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    const dispatch = useDispatch()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          // setUser(user)
          dispatch(setLogin(user))
          blogService.setToken(user.token)
        }
    })

    const user = useSelector(({user}) => {
        return user
    })

    //Handle login
    const handleLogin = async (event) => {
        event.preventDefault()

        const user = {
            username, 
            password
        }

        window.localStorage.setItem(
            'loggedNoteappUser', JSON.stringify(user)
        )
        console.log("YOYO", user)
        dispatch(setLogin(user))
        setUsername('')
        setPassword('')
        
    }
    
    return (
        /*
      <div>
        
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          

          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>  
      </div>
    */
      <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />)
}

export default Login