import '../css/entry.css'

type Props = {
  date: string
  visibility: string
  weather: string
}

function Entry({ date, visibility, weather }: Props) {
  return (
    <div className="entry">
      <h3>{date}</h3>
      <p>visibility: {visibility}</p>
      <p>weather: {weather}</p>
    </div>
  )
}

export default Entry
