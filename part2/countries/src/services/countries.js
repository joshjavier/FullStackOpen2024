import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
  const response = axios.get(`${baseURL}/all`)
  return response.then(response => response.data)
}

export default { getAll }
