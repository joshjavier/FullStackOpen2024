import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
  return axios.get(baseURL).then(res => res.data)
}

export const createAnecdote = (content) => {
  const anecdote = { content, votes: 0 }
  return axios.post(baseURL, anecdote).then(res => res.data)
}
