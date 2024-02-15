const Filter = ({ filter, handleChange }) => {
  return (
    <div>
      <label htmlFor="filter-input">filter shown with </label>
      <input
        type="text"
        id="filter-input"
        value={filter}
        onChange={handleChange}
      />
    </div>
  )
}

export default Filter
