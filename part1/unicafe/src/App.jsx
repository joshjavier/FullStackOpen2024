import { useState } from "react"

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (e) => {
    switch (e.target.innerText) {
      case 'good':
        setGood(c => c + 1)
        break;
      case 'neutral':
        setNeutral(c => c + 1)
        break;
      case 'bad':
        setBad(c => c + 1)
        break;
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleClick}>good</button>
      <button onClick={handleClick}>neutral</button>
      <button onClick={handleClick}>bad</button>

      <h2>statistics</h2>
      <ul>
        <li>good {good}</li>
        <li>neutral {neutral}</li>
        <li>bad {bad}</li>
      </ul>
    </div>
  )
}

export default App
