import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { checkLoggedInUser } from './reducers/userReducer'
import { Route, Routes } from 'react-router-dom'

import Blog from './components/Blog'
import Header from './components/Header'
import Login from './components/Login'
import Main from './components/Main'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'

import Container from 'react-bootstrap/Container'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(checkLoggedInUser())
  }, [dispatch])

  if (!user) {
    return (
      <Container className="my-5 px-4">
        <h2 className="mb-4">log in to application</h2>
        <Notification />
        <Login />
      </Container>
    )
  }

  return (
    <Container>
      <Header />
      <h2>blogs</h2>
      <Notification />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </Container>
  )
}

export default App
