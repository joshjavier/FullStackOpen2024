import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateNew = ({ addNew }) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    addNew({
      content,
      author,
      info,
      votes: 0,
    })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="content-input">content</label>
          <input id="content-input" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          <label htmlFor="author-input">author</label>
          <input id="author-input" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          <label htmlFor="url-input">url for more info</label>
          <input id="url-input" name="info" value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default CreateNew
