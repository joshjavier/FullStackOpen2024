const BlogForm = ({ onChange, onCreate, title, author, url }) => {
  return (
    <div>
      <h2>create new</h2>
      <div>
        <label htmlFor="input-title">title:</label>
        {' '}
        <input
          type="text"
          id="input-title"
          name="title"
          value={title}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="input-author">author:</label>
        {' '}
        <input
          type="text"
          id="input-author"
          name="author"
          value={author}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="input-url">url:</label>
        {' '}
        <input
          type="text"
          id="input-url"
          name="url"
          value={url}
          onChange={onChange}
        />
      </div>
      <button onClick={onCreate}>create</button>
    </div>
  )
}

export default BlogForm
