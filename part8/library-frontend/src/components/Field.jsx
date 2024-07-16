const Field = ({ label, type = 'text' }) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type={type} name={label} id={label} />
    </div>
  )
}

export default Field
