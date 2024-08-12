import { FormEvent } from 'react'
import Field from './Field'

function AddNewEntry() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    console.log(formData)
  }

  return (
    <>
      <h2>Add new entry</h2>
      <div className="error"></div>
      <form onSubmit={onSubmit}>
        <Field label="date" />
        <Field label="visibility" />
        <Field label="weather" />
        <Field label="comment" />
        <button>add</button>
      </form>
    </>
  )
}

export default AddNewEntry
