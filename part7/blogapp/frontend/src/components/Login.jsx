import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { login } from '../reducers/userReducer'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

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
      dispatch(notify('Wrong credentials', 'danger'))
      setPassword('')
    }
  }

  return (
    <Form onSubmit={onLogin}>
      <Form.Group as={Row} className="mb-3" controlId="username">
        <Form.Label column sm={3} md={2}>
          Username:
        </Form.Label>
        <Col sm={9} md={10}>
          <Form.Control
            type="text"
            data-testid="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="password">
        <Form.Label column sm={3} md={2}>
          Password:
        </Form.Label>
        <Col sm={9} md={10}>
          <Form.Control
            type="password"
            data-testid="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Button variant="primary" type="submit">
        Log in
      </Button>
    </Form>
  )
}

export default Login
