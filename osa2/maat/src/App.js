import React, { useState, useEffect } from 'react';
import CountryList from './components/CountryList';
import Filter from './components/Filter';
import countryService from './services/countries';

function App() {
  const [ countries, setCountries ] = useState([])
  const [ show, setShow ] = useState('')
  const [ weather, setWeather ] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleShowChange = (event) => setShow(event.target.value)

  const fillCountry = (id) => {
    const toFill = countries.find(country => country.alpha2Code === id).name
    setShow(toFill)
  }

  const capitalWeather = (api_key, city) => {
    countryService
      .getWeather(api_key, city)
      .then(weather => {
        setWeather(weather)
      })
  }

  return (
    <div>
      <Filter inputValue={show} showChange={handleShowChange} />
      <CountryList
        countries={countries}
        show={show}
        onClick={fillCountry}
        capitalWeather={capitalWeather}
        weather={weather}
        api_key={api_key} />
    </div>
  )
}

export default App;
