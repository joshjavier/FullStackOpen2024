const PersonForm = ({
  newName,
  newNumber,
  handleChangeName,
  handleChangeNumber,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name-input">name: </label>
        <input
          id="name-input"
          type="text"
          value={newName}
          onChange={handleChangeName}
        />
      </div>
      <div>
        <label htmlFor="number-input">number: </label>
        <input
          id="number-input"
          type="text"
          value={newNumber}
          onChange={handleChangeNumber}
        />
      </div>
      <div>
        <button>add</button>
      </div>
    </form>
  )
}

export default PersonForm
