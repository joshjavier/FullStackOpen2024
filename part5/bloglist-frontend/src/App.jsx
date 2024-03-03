import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  let timeoutId

  const clearAlert = () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const userJSON = localStorage.getItem('bloglistUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const onChange = (event) => {
    switch (event.target.name) {
      case 'username':
        setUsername(event.target.value)
        break
      case 'password':
        setPassword(event.target.value)
        break
      case 'title':
        setTitle(event.target.value)
        break
      case 'author':
        setAuthor(event.target.value)
        break
      case 'url':
        setUrl(event.target.value)
        break
    }
  }

  const onLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      localStorage.setItem('bloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage({ body: error.response.data.error })
      clearAlert()
    }
  }

  const onLogout = () => {
    localStorage.removeItem('bloglistUser')
    setUser(null)
    blogService.setToken(null)
    setErrorMessage({
      success: true,
      body: 'you\'ve been logged out',
    })
    clearAlert()
  }

  const onCreate = async () => {
    try {
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')

      setErrorMessage({
        success: true,
        body: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      })
      clearAlert()
    } catch (error) {
      setErrorMessage({ body: error.response.data.error })
      clearAlert()
    }
  }

  return user ? (
    <div>
      <h2>blogs</h2>

      <Notification errorMessage={errorMessage} />

      <p>
        {user.name}
        {' '}
        logged in
        {' '}
        <button onClick={onLogout}>log out</button>
      </p>

      <BlogForm
        onChange={onChange}
        onCreate={onCreate}
        title={title}
        author={author}
        url={url}
      />

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  ) : (
    <div>
      <h2>log in to application</h2>

      <Notification errorMessage={errorMessage} />

      <LoginForm
        onSubmit={onLogin}
        onChange={onChange}
        username={username}
        password={password}
      />
    </div>
  )
}

export default App
