import axios from 'axios'

const baseURL = 'http://localhost:3000/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (content) => {
  const anecdote = { content, votes: 0 }
  const response = await axios.post(baseURL, anecdote)
  return response.data
}

const update = async (id, updatedAnecdote) => {
  const response = await axios.put(`${baseURL}/${id}`, updatedAnecdote)
  return response.data
}

export default {
  getAll,
  createNew,
  update,
}
