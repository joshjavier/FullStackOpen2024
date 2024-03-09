import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      return state.map(anecdote => anecdote.id === action.payload ? (
        { ...anecdote, votes: anecdote.votes + 1 }
      ) : anecdote)
    },
    createAnecdote: (state, action) => {
      const anecdote = asObject(action.payload)
      state.push(anecdote)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    },
  },
})

export const {
  voteAnecdote,
  createAnecdote,
  setAnecdotes,
} = anecdoteSlice.actions
export default anecdoteSlice.reducer