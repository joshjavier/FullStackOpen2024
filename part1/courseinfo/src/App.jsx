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

const Total = ({ exercises }) => {
  return <p>Number of exercises {exercises.reduce((sum, val) => sum + val, 0)}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total exercises={[part1, part2, part3].map(p => p.exercises)} />
    </div>
  )
}

export default App
