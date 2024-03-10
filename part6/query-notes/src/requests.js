import axios from 'axios'

const baseURL = 'http://localhost:3000/notes'

export const getNotes = () => {
  return axios.get(baseURL).then(res => res.data)
}

export const createNote = (newNote) => {
  return axios.post(baseURL, newNote).then(res => res.data)
}
