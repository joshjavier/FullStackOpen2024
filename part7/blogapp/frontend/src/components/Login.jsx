import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { login } from '../reducers/userReducer'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async (evt) => {
    evt.preventDefault()

    try {
      const user = await dispatch(login({ username, password }))
      dispatch(notify(`Welcome back, ${user.name}`))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(notify('Wrong credentials', 'error'))
      setPassword('')
    }
  }

  return (
    <form onSubmit={onLogin}>
      <label style={{ display: 'block' }}>
        Username:
        <input
          type="text"
          data-testid="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label style={{ display: 'block' }}>
        Password:
        <input
          type="password"
          data-testid="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button>Log in</button>
    </form>
  )
}

export default Login
