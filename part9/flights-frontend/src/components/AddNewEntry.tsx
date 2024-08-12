import { FormEvent, useState } from 'react'
import Field from './Field'
import { EntryFormValues } from '../types'
import { isAxiosError } from 'axios'

type Props = {
  addEntry: (object: EntryFormValues) => Promise<void>
}

function AddNewEntry({ addEntry }: Props) {
  const [error, setError] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    console.log(formData)

    addEntry({
      date: formData.get('date') as string,
      visibility: formData.get('visibility') as string,
      weather: formData.get('weather') as string,
      comment: formData.get('comment') as string,
    }).then(() => {
      setError('')
      form.reset()
    }).catch((e) => {
      if (isAxiosError(e)) {
        if (e.response?.data && typeof e.response.data === 'string') {
          console.log(e.response.data)
          const message = e.response.data.replace('Something went wrong. ', '')
          setError(message)
        }
      } else {
        console.log('Unknown error', e)
        setError('Unknown error')
      }
    })
  }

  return (
    <>
      <h2>Add new entry</h2>
      <p className="error">{error}</p>
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
