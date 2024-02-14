const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Part = ({ part, exercises }) => {
  return <p>{part} {exercises}</p>
}

const Content = ({ parts, exercises }) => {
  return (
    <>
      {Array(parts.length).fill(0).map((_, i) => (
        <Part key={i} part={parts[i]} exercises={exercises[i]} />
      ))}
    </>
  )
}

const Total = ({ exercises }) => {
  return <p>Number of exercises {exercises.reduce((sum, val) => sum + val, 0)}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[part1, part2, part3]}
        exercises={[exercises1, exercises2, exercises3]}
      />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App
