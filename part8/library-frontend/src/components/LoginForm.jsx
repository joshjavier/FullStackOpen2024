import { useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"
import Field from "./Field"

const LoginForm = ({ show, callback }) => {
  const [login, { data }] = useMutation(LOGIN)

  useEffect(() => {
    if (data) {
      callback(data.login.value)
    }
  }, [data, callback])

  if (!show) return

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
