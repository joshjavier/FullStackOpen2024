import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'
import { notify } from '../reducers/notificationReducer'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  const byLikes = (a, b) => b.likes - a.likes

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

export default BlogList
