import Weather from "./Weather"

const Country = ({ country, weather }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital[0]}</p>
      <p>area: {new Intl.NumberFormat('en-US').format(country.area)}</p>
      <p><strong>languages:</strong></p>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />

      {weather ? (
        <Weather weather={weather} city={country.capital[0]} />
      ) : 'Loading...'}
    </div>
  )
}

export default Country
