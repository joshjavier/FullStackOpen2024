import Entry from './Entry'

type Props = {
  data: {
    id: number
    date: string
    visibility: string
    weather: string
  }[]
}

function DiaryEntries({ data }: Props) {
  return (
    <>
      <h2>Diary entries</h2>
      {data.map((entry) => (
        <Entry
          key={entry.id}
          date={entry.date}
          visibility={entry.visibility}
          weather={entry.weather}
        />
      ))}
    </>
  )
}

export default DiaryEntries
