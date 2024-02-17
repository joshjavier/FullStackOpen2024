const Person = ({ person, handleDelete }) => {
  const onClick = () => {
    if (confirm(`Delete ${person.name}?`)) {
      handleDelete(person.id)
    }
  }

  return (
    <li>
      <span>{person.name} {person.number}</span>{" "}
      <button onClick={onClick}>delete</button>
    </li>
  )
}

const Persons = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map(person =>
        <Person
          key={person.name}
          person={person}
          handleDelete={handleDelete}
        />
      )}
    </ul>
  )
}

export default Persons
