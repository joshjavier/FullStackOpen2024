const Select = ({ options, label }) => {
  options = [
    { id: 0, name: 'Select an author' },
    ...options
  ]

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <select name={label} id={label}>
        {options.map(o => (
          <option key={o.id}>{o.name}</option>
        ))}
      </select>
    </div>
  )
}

export default Select
