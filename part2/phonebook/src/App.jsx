import { useState } from "react"

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

  const personsToShow = filter.trim() === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <label htmlFor="filter-input">filter shown with </label>
        <input
          type="text"
          id="filter-input"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <h2>Add a new</h2>
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
        {personsToShow.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App
