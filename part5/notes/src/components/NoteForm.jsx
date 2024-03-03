const NoteForm = ({ onSubmit, value, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="note"
        value={value}
        onChange={onChange}
      />
      <button>save</button>
    </form>
  )
}

export default NoteForm
