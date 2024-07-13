/* eslint-disable react/prop-types */
import { useMutation } from "@apollo/client"
import { CREATE_PERSON } from "../queries";

const Field = ({ label }) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type="text" id={label} name={label} />
    </div>
  )
}

const PersonForm = () => {
  const [ createPerson ] = useMutation(CREATE_PERSON)

  const onSubmit = event => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    createPerson({
      variables: {
        name: formData.get('name'),
        phone: formData.get('phone'),
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
