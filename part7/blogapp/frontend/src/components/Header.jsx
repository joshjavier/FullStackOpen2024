import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { logout } from '../reducers/userReducer'
import Navigation from './Navigation'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(notify(`Bye, ${user.name}`))
  }

  return (
    <Navbar className="mb-4">
      <Navigation />
      <div className="ms-auto d-flex gap-2">
        <Navbar.Text className="d-none d-sm-block">
          {user.name} logged in
        </Navbar.Text>
        <Button variant="secondary" onClick={handleLogout}>
          log out
        </Button>
      </div>
    </Navbar>
  )
}

export default Header
