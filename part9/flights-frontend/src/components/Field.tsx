import '../css/field.css'

type Props = {
  label: string
  type?: string
  name?: string
  value?: string
}

function Field({ label, type = 'text', name, value }: Props) {
  const id = `${label}-field`

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name || label}
        id={id}
        value={value}
      />
    </div>
  )
}

export default Field
