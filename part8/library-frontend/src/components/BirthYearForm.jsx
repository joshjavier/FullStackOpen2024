import { useMutation } from "@apollo/client"
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries"
import Field from "./Field"
import Select from "./Select"

const BirthYearForm = ({ options }) => {
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const onSubmit = event => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    editAuthor({
      variables: {
        name: formData.get('name'),
        setBornTo: Number(formData.get('born')),
      }
    })

    form.reset()
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={onSubmit}>
        <Select label="name" options={options} />
        <Field label="born" />
        <button>update author</button>
      </form>
    </div>
  )
}

export default BirthYearForm
