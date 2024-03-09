import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, callback }) => {
  const onClick = () => callback()

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        <span>has {anecdote.votes}</span>
        <button onClick={onClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return filter
      ? anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      : anecdotes.toSorted((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const handleVote = (anecdote) => () => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(updateNotification(`you voted '${anecdote.content}'`))
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          callback={handleVote(anecdote)}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
