import axios from 'axios'

const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
const appid = import.meta.env.VITE_APPID

const get = ({ lat, lon }) => {
  const params = new URLSearchParams({ lat, lon, appid, units: 'metric' })
  return axios.get(`${baseURL}?${params}`)
}

export default { get }
