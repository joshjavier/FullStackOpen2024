import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const byLikes = (a, b) => b.likes - a.likes

  return (
    <ListGroup>
      {blogs.toSorted(byLikes).map((blog) => (
        <ListGroup.Item key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default BlogList
