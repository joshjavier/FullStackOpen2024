import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = async () => {
  const response = await axios.get(`${baseURL}/all`)
  return response.data
}

const getOne = async (name) => {
  const response = await axios.get(`${baseURL}/name/${name}`)
  return response.data
}

export default {
  getAll,
  getOne,
}
