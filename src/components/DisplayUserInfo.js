import React from 'react'
import { useSelector } from 'react-redux'


const DisplayUserInfo = () => {

    const userInfo = useSelector(({userInfo}) => {
        console.log("display works",userInfo);
        return userInfo
    })

    if (!userInfo) {
        return null
    } else {
        return(
            <div>
                <h2>{userInfo.name}</h2>
                <h3> added blogs </h3>
                    <div>
                        {userInfo.blogs.map(blog => 
                            <div key={blog.id}>
                                {blog.title}
                            </div>
                        )}
                    </div>
            </div>
        )
      }
}

export default DisplayUserInfo