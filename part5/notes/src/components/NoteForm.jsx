const NoteForm = ({ onSubmit, newNote, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="note"
        value={newNote}
        onChange={onChange}
      />
      <button>save</button>
    </form>
  )
}

export default NoteForm
