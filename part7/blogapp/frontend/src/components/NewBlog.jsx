import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlog = ({ create }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const onTitleChange = (e) => setTitle(e.target.value)
  const onUrlChange = (e) => setUrl(e.target.value)
  const onAuthorChange = (e) => setAuthor(e.target.value)

  const onSubmit = (evt) => {
    evt.preventDefault()
    create({ title, url, author })
    setAuthor('')
    setTitle('')
    setUrl('')
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
  create: PropTypes.func.isRequired,
}

export default NewBlog
