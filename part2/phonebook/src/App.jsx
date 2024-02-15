import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    // only add new names if they're not in the phonebook
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const newPerson = { name: newName }
    setPersons(persons => [...persons, newPerson])
    setNewName('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={onSubmit}>
        <label>
          name:
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </label>
        <div>
          <button>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}>{person.name}</li>
        )}
      </ul>
    </div>
  )
}

export default App
