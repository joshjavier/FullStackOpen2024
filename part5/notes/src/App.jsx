import { useEffect, useRef, useState } from 'react'

import noteService from './services/notes'
import loginService from './services/login'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Toggleable from './components/Toggleable'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef(null)

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes => notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage(`Note '${note.content}' was already removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes => notes.filter(n => n.id !== id))
      })
  }

  const createNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then((createdNote) => {
        setNotes(notes.concat(createdNote))
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const onLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const onChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value)
    }

    if (event.target.name === 'password') {
      setPassword(event.target.value)
    }
  }

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {user ? (
        <div>
          <p>Hello {user.name}!</p>

          <Toggleable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm createNote={createNote} />
          </Toggleable>
        </div>
      ) : (
        <Toggleable buttonLabel="login">
          <LoginForm
            onSubmit={onLogin}
            username={username}
            password={password}
            onChange={onChange}
          />
        </Toggleable>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <Footer />
    </div>
  )
}

export default App
