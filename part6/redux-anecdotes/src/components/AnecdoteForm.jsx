import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const onSubmit = (evt) => {
    evt.preventDefault()
    const content = evt.target.anecdote.value
    evt.target.anecdote.value = ''

    dispatch(createAnecdote(content))
    dispatch(updateNotification(`you added '${content}'`))
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
