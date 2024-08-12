import axios from 'axios'
import { NonSensitiveDiaryEntry } from '../types'

const baseUrl = 'http://localhost:3000/api'

export async function getAll() {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(`${baseUrl}/diaries`)
  return data
}
