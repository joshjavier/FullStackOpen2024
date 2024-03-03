import { useEffect, useState } from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import Note from './components/Note'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const LoginForm = ({ onSubmit, username, password, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="input-username">username</label>{" "}
        <input
          type="text"
          id='input-username'
          name='username'
          value={username}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="input-password">password</label>{" "}
        <input
          type="password"
          id='input-password'
          name='password'
          value={password}
          onChange={onChange}
        />
      </div>
      <button>login</button>
    </form>
  )
}

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

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes => notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(`Note '${note.content}' was already removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNotes(notes => notes.filter(n => n.id !== id))
      })
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes => [...notes, returnedNote])
        setNewNote('')
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const onLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const onChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value)
    }

    if (event.target.name === 'password') {
      setPassword(event.target.value)
    }

    if (event.target.name === 'note') {
      setNewNote(event.target.value)
    }
  }

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {user ? (
        <div>
          <p>Hello {user.name}!</p>
          <NoteForm
            onSubmit={addNote}
            newNote={newNote}
            onChange={onChange}
          />
        </div>
      ) : (
        <LoginForm
          onSubmit={onLogin}
          username={username}
          password={password}
          onChange={onChange}
        />
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <Footer />
    </div>
  )
}

export default App
