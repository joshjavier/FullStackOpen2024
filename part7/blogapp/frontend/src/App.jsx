import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { checkLoggedInUser, login, logout } from './reducers/userReducer'
import { Route, Routes } from 'react-router-dom'

import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(checkLoggedInUser())
  }, [dispatch])

  const handleLogin = async (credentials) => {
    try {
      const user = await dispatch(login(credentials))
      dispatch(notify(`Welcome back, ${user.name}`))
    } catch (error) {
      dispatch(notify('Wrong credentials', 'error'))
    }
  }

  const handleCreate = async (blog) => {
    dispatch(createBlog(blog))
    dispatch(notify(`Blog created: ${blog.title} by ${blog.author}`))
    blogFormRef.current.toggleVisibility()
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(notify(`Bye, ${user.name}`))
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <Login login={handleLogin} />
      </div>
    )
  }

  const Main = () => {
    return (
      <div>
        <Toggleable buttonLabel="create new blog" ref={blogFormRef}>
          <NewBlog create={handleCreate} />
        </Toggleable>
        <BlogList />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </div>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  )
}

export default App
