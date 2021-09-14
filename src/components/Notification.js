import React from 'react'

const Notification = ({ message, color }) => {
  if (!message) {

    return null
  }

  if (color === 'red'){
    return (
      <div className="error">
        {message}
      </div>
    )
  } else {
    return (
      <div className="notification">
        {message}
      </div>
    )
  }

}


export default Notification