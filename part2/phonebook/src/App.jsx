import { useEffect, useState } from "react"
import phonebookService from './services/phonebook'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()

    // only add new names if they're not in the phonebook
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const newPerson = { name: newName, number: newNumber }

    phonebookService
      .create(newPerson)
      .then(newPerson => {
        setPersons(persons => [...persons, newPerson])
        setNewName('')
        setNewNumber('')
      })
  }

  const personsToShow = filter.trim() === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleChange={(e) => setFilter(e.target.value)} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleChangeName={(e) => setNewName(e.target.value)}
        handleChangeNumber={(e) => setNewNumber(e.target.value)}
        handleSubmit={onSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
