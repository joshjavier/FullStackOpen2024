import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
    })
  }, [])

  const onChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value)
    }

    if (event.target.name === 'password') {
      setPassword(event.target.value)
    }
  }

  const onLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div>
      <h2>blogs</h2>

      {user ? (
        <p>
          {user.name}
          {' '}
          logged in
        </p>
      ) : (
        <LoginForm
          onSubmit={onLogin}
          onChange={onChange}
          username={username}
          password={password}
        />
      )}

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
