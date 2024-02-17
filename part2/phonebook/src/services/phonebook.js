import axios from "axios"

const baseURL = 'http://localhost:3000/persons'

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const createPerson = (newPerson) => {
  const request = axios.post(baseURL, newPerson)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseURL}/${id}`)
}

export default {
  getAll,
  create: createPerson,
  delete: deletePerson,
}
