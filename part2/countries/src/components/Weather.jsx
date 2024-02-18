const Weather = ({ weather, city }) => {
  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>temperature: {weather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        width={100}
        height={100}
      />
      <p>wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
