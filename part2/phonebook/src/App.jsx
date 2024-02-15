import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <label>
          name: <input type="text" />
        </label>
        <div>
          <button>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    </div>
  )
}

export default App
