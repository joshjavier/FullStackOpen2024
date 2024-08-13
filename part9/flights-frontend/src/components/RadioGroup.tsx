import Field from './Field'

type Props = {
  label: string
  options: string[]
}

function RadioGroup({ label, options }: Props) {
  return (
    <fieldset>
      <legend>{label}</legend>
      <div aria-hidden>{label}</div>
      {options.map((o) => (
        <Field key={o} label={o} type="radio" name={label} value={o} />
      ))}
    </fieldset>
  )
}

export default RadioGroup
