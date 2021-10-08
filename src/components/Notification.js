import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notifications)
  const dispatch = useDispatch()
  const test = "yoyoyo"
  const color = "red"
  
  if (!notification) {

    return test
  }

  if (color === 'red'){
    return (
      <div className="error">
        {notification}
      </div>
    )
  } else {
    return (
      <div className="notification">
        {notification}
      </div>
    )
  }

}


export default Notification