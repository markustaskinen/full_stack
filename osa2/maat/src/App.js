import React, { useState, useEffect } from 'react';
import CountryList from './components/CountryList';
import Filter from './components/Filter';
import countryService from './services/countries';

function App() {
  const [ countries, setCountries ] = useState([])
  const [ show, setShow ] = useState('')
  const [ weather, setWeather ] = useState([])
  const [ detailCountry, setDetailCountry ] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  
  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  //Runs only after render and doesn't provoke a new render
  useEffect(() => {
    capitalWeather(api_key, detailCountry.capital)
    console.log(`filtered country: ${detailCountry.name}`)
    console.log(`capital: ${detailCountry.capital}`)
  }, [detailCountry, api_key])

  //should this update the state "countries"?
  const showCountries = (show === '')
  ? countries
  : countries.filter(country =>
      country.name.toUpperCase().includes(show.toUpperCase()))

  const handleShowChange = (event) => {
    setShow(event.target.value)
    if (showCountries.length === 1) {
      setDetailCountry(showCountries[0])
    }
  }

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
        show={show}
        showCountries={showCountries}
        onClick={fillCountry}
        weather={weather} />
    </div>
  )
}

export default App;
