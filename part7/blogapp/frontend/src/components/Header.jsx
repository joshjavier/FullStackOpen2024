import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { logout } from '../reducers/userReducer'
import Navigation from './Navigation'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const style = {
    backgroundColor: '#ddd',
    padding: 8,
    display: 'flex',
    gap: 8,
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(notify(`Bye, ${user.name}`))
  }

  return (
    <header style={style}>
      <Navigation />
      <div>{user.name} logged in</div>
      <button onClick={handleLogout}>log out</button>
    </header>
  )
}

export default Header
