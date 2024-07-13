/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import { ALL_PERSONS } from "./queries";

const App = () => {
  const { loading, data } = useQuery(ALL_PERSONS)

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <PersonForm />
      <Persons persons={data.allPersons} />
    </div>
  )
}

export default App
