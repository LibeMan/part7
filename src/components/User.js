import React from "react";
import { useSelector } from "react-redux";

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
                    {user.username}, Blogs created: {user.blogs.length}
                </div>    
            )}
        </div>
    )
}

export default User