import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    // only add new names if they're not in the phonebook
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const newPerson = { name: newName, number: newNumber }
    setPersons(persons => [...persons, newPerson])
    setNewName('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name-input">name: </label>
          <input
            id="name-input"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="number-input">number: </label>
          <input
            id="number-input"
            type="text"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App
