const CountryItem = ({ country, handleShow }) => {
  return (
    <li>
      {country.name.common}{" "}
      <button onClick={() => handleShow(country)}>show</button>
    </li>
  )
}

const CountryList = ({ matches, handleShow }) => {
  return (
    <ul>
      {matches.map((country) => (
        <CountryItem key={country.cca2} country={country} handleShow={handleShow} />
      ))}
    </ul>
  )
}

export default CountryList
