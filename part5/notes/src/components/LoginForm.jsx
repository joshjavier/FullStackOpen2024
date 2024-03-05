import PropTypes from 'prop-types'

const LoginForm = ({ onSubmit, username, password, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="input-username">username</label>{" "}
        <input
          type="text"
          id='input-username'
          name='username'
          value={username}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="input-password">password</label>{" "}
        <input
          type="password"
          id='input-password'
          name='password'
          value={password}
          onChange={onChange}
        />
      </div>
      <button>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
