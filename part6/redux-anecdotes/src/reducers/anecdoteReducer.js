import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote: (state, action) => {
      return state.map(anecdote => anecdote.id === action.payload.id
        ? action.payload
        : anecdote)
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
  updateAnecdote,
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

export const voteAnecdote = (id) => async (dispatch, getState) => {
  const anecdote = getState().anecdotes.find(a => a.id === id)
  const updatedAnecdote = await anecdoteService.update(id, {
    ...anecdote,
    votes: anecdote.votes + 1,
  })
  dispatch(updateAnecdote(updatedAnecdote))
}

export default anecdoteSlice.reducer
