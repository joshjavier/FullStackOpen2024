import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { notify } from '../reducers/notificationReducer'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

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
      await dispatch(createBlog(blog))
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
    <div className="mb-2">
      <h2>Create a New Blog</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group as={Row} controlId="title" className="mb-2">
          <Form.Label column sm={2}>
            Title:
          </Form.Label>
          <Col xs={true} md={6}>
            <Form.Control
              type="text"
              data-testid="title"
              value={blog.title}
              onChange={onChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="url" className="mb-2">
          <Form.Label column sm={2}>
            URL:
          </Form.Label>
          <Col xs={true} md={6}>
            <Form.Control
              type="text"
              data-testid="url"
              value={blog.url}
              onChange={onChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="author" className="mb-2">
          <Form.Label column sm={2}>
            Author:
          </Form.Label>
          <Col xs={true} md={6}>
            <Form.Control
              type="text"
              data-testid="author"
              value={blog.author}
              onChange={onChange}
            />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  )
}

NewBlog.propTypes = {
  toggleVisibility: PropTypes.func,
}

export default NewBlog
