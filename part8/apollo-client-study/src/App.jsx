/* eslint-disable react/prop-types */
import { useState } from "react";
import { useQuery } from "@apollo/client"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import { ALL_PERSONS } from "./queries";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const { loading, data } = useQuery(ALL_PERSONS)

  if (loading) return <div>Loading...</div>

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000);
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <PersonForm setError={notify} />
      <Persons persons={data.allPersons} />
    </div>
  )
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) return

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

export default App
