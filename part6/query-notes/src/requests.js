import axios from 'axios'

export const getNotes = () => {
  return axios.get(baseURL).then(res => res.data)
}
