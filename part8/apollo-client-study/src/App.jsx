/* eslint-disable react/prop-types */
import { useCallback, useRef, useState } from "react";
import { useQuery } from "@apollo/client"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import PhoneForm from "./components/PhoneForm"
import { ALL_PERSONS } from "./queries"

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const { loading, data } = useQuery(ALL_PERSONS)
  const errorTimeout = useRef(null)

  const notify = useCallback((message) => {
    clearTimeout(errorTimeout.current)
    setErrorMessage(message)
    errorTimeout.current = setTimeout(() => {
      setErrorMessage(null)
    }, 10000);
  }, [errorTimeout, setErrorMessage])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
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