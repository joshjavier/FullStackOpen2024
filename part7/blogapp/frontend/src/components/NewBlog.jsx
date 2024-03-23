import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { notify } from '../reducers/notificationReducer'

const EMPTY = { title: '', url: '', author: '' }

const NewBlog = (props) => {
  const dispatch = useDispatch()
  const [blog, setBlog] = useState(EMPTY)

  const onChange = (evt) => {
    setBlog((value) => ({
      ...value,
      [evt.target.name]: evt.target.value,
    }))
  }

  const onSubmit = async (evt) => {
    evt.preventDefault()
    console.log(blog)

    try {
      dispatch(createBlog(blog))
      dispatch(notify(`Blog created: ${blog.title} by ${blog.author}`))
      setBlog(EMPTY)

      if (props.toggleVisibility) {
        props.toggleVisibility()
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
            name="title"
            id="title"
            data-testid="title"
            value={blog.title}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            name="url"
            id="url"
            data-testid="url"
            value={blog.url}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            name="author"
            id="author"
            data-testid="author"
            value={blog.author}
            onChange={onChange}
          />
        </div>
        <button>Create</button>
      </form>
    </div>
  )
}

NewBlog.propTypes = {
  toggleVisibility: PropTypes.func,
}

export default NewBlog
