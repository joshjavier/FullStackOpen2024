import { useEffect, useState } from "react"
import countriesService from './services/countries'
import weatherService from './services/weather'
import Country from "./components/Country"
import CountryList from "./components/CountryList"

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [matches, setMatches] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countriesService
      .getAll()
      .then(countries => {
        setCountries(countries)
      })
  }, [])

  useEffect(() => {
    if (!country) return

    const [lat, lon] = country.capitalInfo.latlng
    weatherService
      .get({ lat, lon })
      .then(response => {
        setWeather(response.data)
      })
  }, [country])

  const onSearch = (e) => {
    e.preventDefault()

    const q = query.trim().toLowerCase()
    if (q === '') return

    setMatches(() => {
      const matches = countries.filter(({ name }) => name.common.toLowerCase().includes(q))
      if (matches.length === 1) {
        setCountry(matches[0])
      } else {
        setCountry(null)
      }
      return matches
    })
    setWeather(null)
  }

  const handleShow = (country) => {
    setCountry(country)
    setQuery(country.name.common)
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
      {country ? (
        <Country country={country} weather={weather} />
      ) : (matches.length > 1 && matches.length <= 10) ? (
        <CountryList matches={matches} handleShow={handleShow} />
      ) : matches.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : null}
    </div>
  )
}

export default App
