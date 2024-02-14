import { useState } from "react"

const StatisticLine = ({ text, value }) => {
  return <li>{text} {value}</li>
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral
  const average = (all / 3).toFixed(2)
  const positive = (good / all * 100).toFixed(2)

  return all === 0 ? <p>No feedback given</p> : (
    <div>
      <h2>statistics</h2>
      <ul>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
      </ul>
      <ul>
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </ul>
    </div>
  )
}

const Button = ({ label, handleClick }) => {
  return <button onClick={handleClick}>{label}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button label="good" handleClick={() => setGood(c => c + 1)} />
      <Button label="neutral" handleClick={() => setNeutral(c => c + 1)} />
      <Button label="bad" handleClick={() => setBad(c => c + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
