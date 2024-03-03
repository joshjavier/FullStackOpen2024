import axios from 'axios'
const baseURL = '/api/blogs'

let token

const setToken = (newToken) => {
  token = newToken
}

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const response = await axios.post(baseURL, newBlog, config)
  return response.data
}

export default {
  getAll,
  create,
  setToken,
}
