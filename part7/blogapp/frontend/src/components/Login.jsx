import { useState } from 'react'
import PropTypes from 'prop-types'

const Login = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = (evt) => {
    evt.preventDefault()
    login({ username, password })
    setUsername('')
    setPassword('')
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
}

export default Login
