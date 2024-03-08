const generateId = () => Number((Math.random() * 1000000).toFixed(0))

// Action creators

const createNote = (content) => ({
  type: 'NEW_NOTE',
  payload: {
    content,
    important: false,
    id: generateId()
  }
})

const toggleImportanceOf = (id) => ({
  type: 'TOGGLE_IMPORTANCE',
  payload: { id }
})

const App = ({ store }) => {
  const addNote = (event) => {
    event.preventDefault()

    const content = event.target.note.value
    event.target.note.value = ''

    store.dispatch(createNote(content))
  }

  const toggleImportance = (id) => {
    store.dispatch(toggleImportanceOf(id))
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input type="text" name="note" />
        <button>add</button>
      </form>
      <ul>
        {store.getState().map(note => (
          <li
            key={note.id}
            onClick={() => toggleImportance(note.id)}
          >
            {note.content} {note.important && <strong>important</strong>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
