import { useEffect, useState } from "react"
import axios from 'axios'

const Country = ({ country }) => {
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
    </div>
  )
}

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [matches, setMatches] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const onSearch = (e) => {
    e.preventDefault()

    const q = query.trim().toLowerCase()
    if (q === '') return

    setMatches(countries.filter(({ name }) => name.common.toLowerCase().includes(q)))
  }

  return (
    <div>
      <h1 className="visually-hidden">Countries</h1>
      <form onSubmit={onSearch}>
        <label htmlFor="country-input">find countries</label>{" "}
        <input
          type="text"
          id="country-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {matches.length === 1 ? (
        <Country country={matches[0]} />
      ) : matches.length <= 10 ? (
        <ul>
          {matches.map(({ name }) => name.common).map(name => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      ) : matches.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : null}
    </div>
  )
}

export default App
