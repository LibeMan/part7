import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notifications)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const styleNull = {
    border: "white",
  }

  if (notification == '') {
    return (
      <div style = {styleNull}>
        {notification}
      </div>
    )
  } else {
    return (
      <div style = {style}>
        {notification}
      </div>
    )
  }
  

}


export default Notification