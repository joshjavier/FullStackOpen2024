import { useEffect, useState } from 'react'
import AddNewEntry from './components/AddNewEntry'
import DiaryEntries from './components/DiaryEntries'
import { EntryFormValues, NonSensitiveDiaryEntry } from './types'
import * as diaryService from './services/diary'

function App() {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>([])

  useEffect(() => {
    void diaryService.getAll().then((data) => setDiaryEntries(data))
  }, [])

  const addEntry = async (object: EntryFormValues) => {
    const newEntry = await diaryService.addEntry(object)
    setDiaryEntries(diaryEntries.concat(newEntry))
  }

  if (!diaryEntries.length) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Ilari's flight diaries</h1>
      <AddNewEntry addEntry={addEntry} />
      <DiaryEntries data={diaryEntries} />
    </div>
  )
}

export default App
