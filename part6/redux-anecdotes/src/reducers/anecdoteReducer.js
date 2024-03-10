import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      return state.map(anecdote => anecdote.id === action.payload ? (
        { ...anecdote, votes: anecdote.votes + 1 }
      ) : anecdote)
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    },
  },
})

export const {
  voteAnecdote,
  appendAnecdote,
  setAnecdotes,
} = anecdoteSlice.actions

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const createAnecdote = (content) => async (dispatch) => {
  const anecdote = await anecdoteService.createNew(content)
  dispatch(appendAnecdote(anecdote))
}

export default anecdoteSlice.reducer
