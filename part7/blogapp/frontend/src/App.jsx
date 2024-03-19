import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from './reducers/blogsReducer'

import loginService from './services/login'
import storage from './services/storage'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const byLikes = (a, b) => b.likes - a.likes

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      setUser(user)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      storage.saveUser(user)
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
    setUser(null)
    storage.removeUser()
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
