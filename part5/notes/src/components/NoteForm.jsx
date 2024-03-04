import { useState } from "react"

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()

    createNote({
      content: newNote,
      important: true,
    })

    setNewNote('')
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="note"
        value={newNote}
        onChange={e => setNewNote(e.target.value)}
      />
      <button>save</button>
    </form>
  )
}

export default NoteForm
