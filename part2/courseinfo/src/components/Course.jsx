const Header = ({ course }) => {
  return <h2>{course}</h2>
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
  const total = parts
    .map(p => p.exercises)
    .reduce((sum, val) => sum + val, 0)

  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
