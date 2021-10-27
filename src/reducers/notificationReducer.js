/* eslint-disable default-case */
const simpleNotes = [
    ''
]

const notificationReducer = (state = simpleNotes, action) => {
  switch (action.type) {
    case 'NOTIFICATION_SHOW':
        const updatedNotification = ''.concat(action.text)
        console.log("Toimii tääl:",action.text)
        return updatedNotification
  
    case 'NOTIFICATION_HIDE':
        const hideNotification = ''
        console.log("Nyt hidaa")
        return hideNotification
    default:
        return state
  }
}

export const setNotification = (message, time) => {
  const t = time * 100

    return async dispatch => {
      dispatch({
        type: 'NOTIFICATION_SHOW',
        text: message
      })
      setTimeout(() => {
        dispatch({type: 'NOTIFICATION_HIDE'})
      }, t)
    }
  
}


export default notificationReducer


/* setTimeout(() => {
      initialState = simpleNotes[2]
    }, 5000) */