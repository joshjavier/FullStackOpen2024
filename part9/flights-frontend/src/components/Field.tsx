import '../css/field.css'

type Props = {
  label: string
  type?: string
}

function Field({ label, type = 'text' }: Props) {
  const id = `${label}-field`

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input type={type} name={label} id={id} />
    </div>
  )
}

export default Field
