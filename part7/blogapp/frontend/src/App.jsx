import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from './reducers/blogsReducer'
import { checkLoggedInUser, login, logout } from './reducers/userReducer'

import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const byLikes = (a, b) => b.likes - a.likes

  useEffect(() => {
    dispatch(initializeBlogs())
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

  const handleVote = async (blog) => {
    console.log('updating', blog)
    dispatch(likeBlog(blog))
    dispatch(notify(`You liked ${blog.title} by ${blog.author}`))
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(notify(`Bye, ${user.name}`))
  }

  const handleDelete = async (blog) => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
      dispatch(notify(`Blog ${blog.title} by ${blog.author} removed`))
    }
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

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </div>
      <Toggleable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog create={handleCreate} />
      </Toggleable>
      {blogs.toSorted(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export default App
