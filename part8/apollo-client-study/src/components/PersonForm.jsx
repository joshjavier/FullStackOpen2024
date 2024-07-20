/* eslint-disable react/prop-types */
import { useMutation } from "@apollo/client"
import { CREATE_PERSON } from "../queries"
import Field from './Field'

const PersonForm = ({ setError }) => {
  const [ createPerson ] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
    }
  })

  const onSubmit = event => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    createPerson({
      variables: {
        name: formData.get('name'),
        phone: formData.get('phone').length > 0 ? formData.get('phone') : undefined,
        street: formData.get('street'),
        city: formData.get('city')
      }
    })

    form.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <Field label='name' />
        <Field label='phone' />
        <Field label='street' />
        <Field label='city' />
        <button>submit</button>
      </form>
    </div>
  )
}

export default PersonForm
