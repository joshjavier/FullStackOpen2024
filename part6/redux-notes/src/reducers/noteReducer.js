const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    return state.concat(action.payload)
  }

  switch (action.type) {
    case 'NEW_NOTE':
      return state.concat(action.payload)
    case 'TOGGLE_IMPORTANCE': {
      const id = action.payload.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note => note.id === id ? changedNote : note)
    }
    default:
      return state
  }
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => ({
  type: 'NEW_NOTE',
  payload: {
    content,
    important: false,
    id: generateId()
  }
})

export const toggleImportanceOf = (id) => ({
  type: 'TOGGLE_IMPORTANCE',
  payload: { id }
})

export default noteReducer
