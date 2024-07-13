const Field = ({ label }) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type="text" name={label} id={label} />
    </div>
  )
}

export default Field
