import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useNotificationDispatch, setNotification, clearNotification } from "./NotificationContext";
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })

  const queryClient = useQueryClient()

  const [dispatch, timeoutID] = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map(anecdote => {
        return anecdote.id === updatedAnecdote.id
          ? updatedAnecdote
          : anecdote
      })
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)

      // Display success notification
      clearTimeout(timeoutID.current)
      dispatch(setNotification(`anecdote '${updatedAnecdote.content}' voted`))
      timeoutID.current = setTimeout(() => {
        dispatch(clearNotification())
      }, 5000);
    }
  })

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    updateAnecdoteMutation.mutate(updatedAnecdote)
  }

  const anecdotes = data

  if (isPending) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
