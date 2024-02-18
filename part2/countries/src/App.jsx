import { useEffect, useState } from "react"
import countriesService from './services/countries'
import Country from "./components/Country"

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [matches, setMatches] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(countries => {
        setCountries(countries)
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
