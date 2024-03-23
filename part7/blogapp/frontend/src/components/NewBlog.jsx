import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { notify } from '../reducers/notificationReducer'

const NewBlog = (props) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const onTitleChange = (e) => setTitle(e.target.value)
  const onUrlChange = (e) => setUrl(e.target.value)
  const onAuthorChange = (e) => setAuthor(e.target.value)

  const onSubmit = async (evt) => {
    evt.preventDefault()
    const blog = { title, url, author }

    try {
      dispatch(createBlog(blog))
      dispatch(notify(`Blog created: ${blog.title} by ${blog.author}`))
      setAuthor('')
      setTitle('')
      setUrl('')

      if (props.toggle) {
        props.toggle()
      }
    } catch (error) {
      dispatch(notify(error.response.data.error))
    }
  }

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            data-testid="title"
            value={title}
            onChange={onTitleChange}
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            data-testid="url"
            value={url}
            onChange={onUrlChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            data-testid="author"
            value={author}
            onChange={onAuthorChange}
          />
        </div>
        <button>Create</button>
      </form>
    </div>
  )
}

NewBlog.propTypes = {
  toggle: PropTypes.func,
}

export default NewBlog
