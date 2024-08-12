import axios from 'axios'
import { DiaryEntry, EntryFormValues, NonSensitiveDiaryEntry } from '../types'

const baseUrl = 'http://localhost:3000/api'

export async function getAll() {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(`${baseUrl}/diaries`)
  return data
}

export async function addEntry(object: EntryFormValues) {
  const { data } = await axios.post<DiaryEntry>(
    `${baseUrl}/diaries`,
    object,
  )
  return data
}
