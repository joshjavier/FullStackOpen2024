import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'
import { notify } from '../reducers/notificationReducer'
import storage from '../services/storage'

const Blog = () => {
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
    }
  }

  const handleVote = async (blog) => {
    console.log('updating', blog)
    dispatch(likeBlog(blog))
    dispatch(notify(`You liked ${blog.title} by ${blog.author}`))
  }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes {blog.likes}
          <button style={{ marginLeft: 3 }} onClick={() => handleVote(blog)}>
            like
          </button>
        </div>
        <div>added by {nameOfUser}</div>
        {canRemove && (
          <button onClick={() => handleDelete(blog)}>remove</button>
        )}
      </div>

      {blog.comments.length > 0 && (
        <div>
          <h3>comments</h3>
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Blog
