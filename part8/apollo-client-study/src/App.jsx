/* eslint-disable react/prop-types */
import { useCallback, useRef, useState } from "react";
import { useQuery, useApolloClient } from "@apollo/client"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import PhoneForm from "./components/PhoneForm"
import LoginForm from "./components/LoginForm"
import { ALL_PERSONS } from "./queries"

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const { loading, data } = useQuery(ALL_PERSONS)
  const client = useApolloClient()
  const errorTimeout = useRef(null)

  const notify = useCallback((message) => {
    clearTimeout(errorTimeout.current)
    setErrorMessage(message)
    errorTimeout.current = setTimeout(() => {
      setErrorMessage(null)
    }, 10000);
  }, [errorTimeout, setErrorMessage])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (loading) return <div>Loading...</div>

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
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
