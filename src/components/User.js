import React from "react";
import { useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch, Route, Link, useParams, useHistory
  } from "react-router-dom"

const User = () => {
    const users = useSelector(({users}) => {
        console.log("loggggin here",users)
        return users
    })

    return(
            <div>
                <h1>Users:</h1>
                {users.map(user =>
                    <div key={user.id}>
                        <Link to='/user'>{user.username}, Blogs created: {user.blogs.length}</Link>
                    </div>    
                )}
            </div>
        
    )
}

export default User