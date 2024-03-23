import { Link, useLocation } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

const Navigation = () => {
  const { pathname } = useLocation()

  return (
    <Nav variant="underline" activeKey={pathname}>
      <Nav.Link as={Link} to="/" eventKey="/">
        blogs
      </Nav.Link>
      <Nav.Link as={Link} to="/users" eventKey="/users">
        users
      </Nav.Link>
    </Nav>
  )
}

export default Navigation
