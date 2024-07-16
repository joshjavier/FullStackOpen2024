/* eslint-disable react/prop-types */
const Field = ({ label, type = 'text' }) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type={type} id={label} name={label} />
    </div>
  )
}

export default Field
