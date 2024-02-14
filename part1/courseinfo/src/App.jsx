const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}

const Content = ({ parts }) => {
  return (
    <>
      {Array(parts.length).fill(0).map((_, i) => (
        <Part key={parts[i].name} part={parts[i]} />
      ))}
    </>
  )
}

const Total = ({ parts }) => {
  return (
    <p>Number of exercises {parts
      .map(p => p.exercises)
      .reduce((sum, val) => sum + val, 0)
    }</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
