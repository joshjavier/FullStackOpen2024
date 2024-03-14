import { useEffect, useState } from "react";
import countryService from '../services/country'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return

    countryService
      .getOne(name)
      .then(country => {
        setCountry(country)
      })
      .catch(error => {
        setCountry(error.response.data)
      })
  }, [name])

  return country
}
