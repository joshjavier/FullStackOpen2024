import axios from "axios"

const baseURL = 'http://localhost:3001/api/persons'

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

const updatePerson = (id, updatedPerson) => {
  const request = axios.put(`${baseURL}/${id}`, updatedPerson)
  return request.then(response => response.data)
}

export default {
  getAll,
  create: createPerson,
  delete: deletePerson,
  update: updatePerson,
}
