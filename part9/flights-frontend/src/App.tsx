import AddNewEntry from './components/AddNewEntry'
import DiaryEntries from './components/DiaryEntries'

function App() {
  const initialData = [
    {
      id: 1,
      date: '2017-01-01',
      weather: 'rainy',
      visibility: 'poor',
    },
    {
      id: 2,
      date: '2017-04-01',
      weather: 'sunny',
      visibility: 'good',
    },
    {
      id: 3,
      date: '2017-04-15',
      weather: 'windy',
      visibility: 'good',
    },
    {
      id: 4,
      date: '2017-05-11',
      weather: 'cloudy',
      visibility: 'good',
    },
  ]

  return (
    <div>
      <h1>Ilari's flight diaries</h1>
      <AddNewEntry />
      <DiaryEntries data={initialData} />
    </div>
  )
}

export default App
