import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch, setNotification, clearNotification } from "../NotificationContext";

const AnecdoteForm = () => {
  const [dispatch, timeoutID] = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))

      // Display success notification
      clearTimeout(timeoutID.current)
      dispatch(setNotification(`anecdote '${newAnecdote.content}' created`))
      timeoutID.current = setTimeout(() => {
        dispatch(clearNotification())
      }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
