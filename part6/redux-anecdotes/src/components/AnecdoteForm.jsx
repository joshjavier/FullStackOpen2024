import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const onSubmit = (evt) => {
    evt.preventDefault()
    const content = evt.target.anecdote.value
    evt.target.anecdote.value = ''

    anecdoteService
      .createNew(content)
      .then((anecdote) => {
        dispatch(createAnecdote(anecdote))
        dispatch(updateNotification(`you added '${anecdote.content}'`))
      })
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div><input type='text' name='anecdote' /></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
