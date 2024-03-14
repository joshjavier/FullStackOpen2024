import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addNew }) => {
  const { reset: contentReset, ...content } = useField('text')
  const { reset: authorReset, ...author } = useField('text')
  const { reset: infoReset, ...info } = useField('text')
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

  const onReset = () => {
    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="content-input">content</label>
          <input id="content-input" name="content" {...content} />
        </div>
        <div>
          <label htmlFor="author-input">author</label>
          <input id="author-input" name="author" {...author} />
        </div>
        <div>
          <label htmlFor="url-input">url for more info</label>
          <input id="url-input" name="info" {...info} />
        </div>
        <button>create</button>
        <button type="reset" onClick={onReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
