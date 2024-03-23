import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addComment, deleteBlog, likeBlog } from '../reducers/blogsReducer'
import { notify } from '../reducers/notificationReducer'
import storage from '../services/storage'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'

const Blog = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const blog = useSelector((state) => {
    return state.blogs.find((blog) => blog.id === id)
  })
  const dispatch = useDispatch()

  if (!blog) return

  const nameOfUser = blog.user ? blog.user.name : 'anonymous'

  const canRemove = blog.user ? blog.user.username === storage.me() : true

  console.log(blog.user, storage.me(), canRemove)

  const handleDelete = async (blog) => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
      dispatch(notify(`Blog ${blog.title} by ${blog.author} removed`))
      navigate('/')
    }
  }

  const handleVote = async (blog) => {
    console.log('updating', blog)
    dispatch(likeBlog(blog))
    dispatch(notify(`You liked ${blog.title} by ${blog.author}`))
  }

  const onAddComment = async (evt) => {
    try {
      evt.preventDefault()
      await dispatch(addComment(blog.id, evt.target.comment.value))
      evt.target.reset()
    } catch (error) {
      dispatch(notify('Cannot add empty comment', 'danger'))
    }
  }

  return (
    <div className="my-3">
      <Card>
        <Card.Body>
          <Card.Title>
            {blog.title} by {blog.author}
          </Card.Title>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <a href={blog.url} target="_blank">
              {blog.url}
            </a>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex gap-2 align-items-center">
            likes {blog.likes}
            <Button onClick={() => handleVote(blog)}>like</Button>
          </ListGroup.Item>
          <ListGroup.Item>added by {nameOfUser}</ListGroup.Item>
        </ListGroup>
        {canRemove && (
          <Card.Footer className="d-flex justify-content-center">
            <Button
              variant="danger"
              onClick={() => handleDelete(blog)}
              className="text-center"
            >
              remove
            </Button>
          </Card.Footer>
        )}
      </Card>

      <div className="mt-5">
        <h3>comments</h3>
        <Form
          onSubmit={onAddComment}
          className="mb-3"
          style={{ maxWidth: 400 }}
        >
          <InputGroup>
            <Form.Control type="text" name="comment" />
            <Button variant="dark" type="submit">
              add comment
            </Button>
          </InputGroup>
        </Form>
        {blog.comments.length > 0 && (
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Blog
