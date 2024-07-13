/* eslint-disable react/prop-types */
const Field = ({ label }) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type="text" id={label} name={label} />
    </div>
  )
}

export default Field
