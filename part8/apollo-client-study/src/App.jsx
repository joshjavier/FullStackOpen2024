/* eslint-disable react/prop-types */
import { gql, useQuery } from "@apollo/client"

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`

const Persons = ({ persons }) => {
  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p => (
        <div key={p.id}>
          {p.name} {p.phone}
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const { loading, data } = useQuery(ALL_PERSONS)

  if (loading) return <div>Loading...</div>

  return (
    <Persons persons={data.allPersons} />
  )
}

export default App
