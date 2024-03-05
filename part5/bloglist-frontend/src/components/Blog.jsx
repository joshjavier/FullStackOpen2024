import { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    padding: 10,
    border: '1px solid',
    marginBottom: 5,
  }

  const onLike = () => likeBlog(blog)

  return (
    <div style={blogStyle}>
      {blog.title}
      {' '}
      {blog.author}
      {' '}
      <button
        onClick={() => setVisible(!visible)}
        aria-expanded={visible}
        aria-controls="blog-details"
      >
        {visible ? 'hide' : 'show'}
      </button>
      <div id="blog-details" style={{ display: visible ? '' : 'none' }}>
        <ul>
          <li>{blog.url}</li>
          <li>
            likes
            {' '}
            {blog.likes}
            {' '}
            <button onClick={onLike}>like</button>
          </li>
          <li>{blog.user && blog.user.name}</li>
        </ul>
      </div>
    </div>
  )
}

export default Blog
