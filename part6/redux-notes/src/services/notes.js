import axios from 'axios'

const baseURL = 'http://localhost:3000/notes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

export default { getAll }
