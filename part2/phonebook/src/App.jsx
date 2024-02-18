import { useEffect, useState } from "react"
import phonebookService from './services/phonebook'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Persons from "./components/Persons"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  useEffect(() => {
    if (errorMsg === '' && successMsg === '') return

    const timeoutID = setTimeout(() => {
      if (errorMsg !== '') setErrorMsg('')
      if (successMsg !== '') setSuccessMsg('')
    }, 5000);

    return () => clearTimeout(timeoutID)
  }, [successMsg, errorMsg])

  const onSubmit = (e) => {
    e.preventDefault()

    // only add new names if they're not in the phonebook
    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        alert(`${newName} is already added to the phonebook`)
        return
      }

      // offer to change the number of an existing person
      if (confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        phonebookService
          .update(existingPerson.id, updatedPerson)
          .then(updatedPerson => {
            setPersons(persons => persons.map(person => (
              person.id !== updatedPerson.id ? person : updatedPerson
            )))
            setNewName('')
            setNewNumber('')
            setSuccessMsg(`Updated number for ${updatedPerson.name}`)
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }

      phonebookService
        .create(newPerson)
        .then(newPerson => {
          setPersons(persons => [...persons, newPerson])
          setNewName('')
          setNewNumber('')
          setSuccessMsg(`Added ${newPerson.name}`)
        })
    }
  }

  const handleDelete = (id) => {
    phonebookService
      .delete(id)
      .then(response => {
        if (response.status === 200) {
          setPersons(persons => persons.filter(p => p.id != response.data.id))
          setSuccessMsg(`${response.data.name} has been removed from the phonebook`)
        } else {
          setErrorMsg('Something went wrong.')
        }
      })
  }

  const personsToShow = filter.trim() === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMsg} type="success" />
      <Notification message={errorMsg} type="error" />
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
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
