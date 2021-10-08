const simpleNotes = [
    'This is the message',
    'That is not a message',
    ''
]

const initialState = simpleNotes[0]

const notificationReducer = (state = simpleNotes, action) => {
  switch (action.type) {
    case 'FIRST':
      return state[0]
  
    case 'SECOND':
      return state[1]
  }

  return state[2]
}

export const doMessage = (yo) => {
  if (yo === 0){
    return {
      type:'FIRST'
    }
  } else{
    return {
      type:'SECOND'
    }
  }
  
}


export default notificationReducer


/* setTimeout(() => {
      initialState = simpleNotes[2]
    }, 5000) */