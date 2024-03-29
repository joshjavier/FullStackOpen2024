import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Users = () => {
  const users = useSelector((state) => state.users)

  if (!users) return

  return (
    <div>
      <h2>Users</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.name || user.username}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
