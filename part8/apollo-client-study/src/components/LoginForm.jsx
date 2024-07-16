/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries";
import Field from "./Field"

const LoginForm = ({ setError, setToken }) => {
  const [login, result] = useMutation(LOGIN, {
    onError: error => setError(error.graphQLErrors[0].message)
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('phonenumbers-user-token', token)
    }
  }, [result.data, setToken])

  const onSubmit = event => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    login({
      variables: {
        username: formData.get('username'),
        password: formData.get('password'),
      }
    })

    form.reset()
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Field label="username" />
        <Field label="password" type="password" />
        <button>login</button>
      </form>
    </div>
  )
}

export default LoginForm
