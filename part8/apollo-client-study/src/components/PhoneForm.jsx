/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useMutation } from "@apollo/client"
import { EDIT_NUMBER } from "../queries"
import Field from "./Field"

const PhoneForm = ({ setError }) => {
  const [ changeNumber, { data } ] = useMutation(EDIT_NUMBER)

  const onSubmit = event => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    changeNumber({
      variables: {
        name: formData.get('name'),
        phone: formData.get('phone')
      }
    })

    form.reset()
  }

  useEffect(() => {
    if (data && data.editNumber === null) {
      setError('person not found')
    }
  }, [data, setError])

  return (
    <div>
      <h2>change number</h2>
      <form onSubmit={onSubmit}>
        <Field label='name' />
        <Field label='phone' />
        <button>change number</button>
      </form>
    </div>
  )
}

export default PhoneForm
