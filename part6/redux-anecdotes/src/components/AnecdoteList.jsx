import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          callback={() => dispatch(voteAnecdote(anecdote.id))}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
