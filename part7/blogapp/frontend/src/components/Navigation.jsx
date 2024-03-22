import { Link } from 'react-router-dom'

const Navigation = () => {
  const style = {
    display: 'flex',
    gap: 'inherit',
  }

  return (
    <nav style={style}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
    </nav>
  )
}

export default Navigation
