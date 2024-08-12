import { useEffect, useState } from 'react'
import AddNewEntry from './components/AddNewEntry'
import DiaryEntries from './components/DiaryEntries'
import { NonSensitiveDiaryEntry } from './types'
import * as diaryService from './services/diary'

function App() {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>([])

  useEffect(() => {
    void diaryService.getAll().then((data) => setDiaryEntries(data))
  }, [])

  if (!diaryEntries.length) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Ilari's flight diaries</h1>
      <AddNewEntry />
      <DiaryEntries data={diaryEntries} />
    </div>
  )
}

export default App
