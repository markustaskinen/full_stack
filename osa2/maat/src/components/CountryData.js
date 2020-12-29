import React from 'react';

const CountryData = ({ country, weather }) => {
    const languages = country.languages.map(language => 
        <li key={language.iso639_1}>{language.name}</li>
        )
    //console.log(country)
    //console.log(weather)
    return (
        <>
            <div>
                <h1>{country.name}</h1>
                <p>capital: {country.capital}<br></br>
                population: {country.population}</p>
                <h3>languages</h3>
                <ul>
                    {languages}
                </ul>
                <img src={country.flag} width='150' alt=''>
                </img>
            </div>
            <div>
                <h3>weather in {country.capital}</h3>
                <p>temperature: {weather.current.temperature}°C</p>
                <img
                    src={weather.current.weather_icons[0]}
                    width='50'
                    alt='No weather icon available'>
                </img>
                <p>wind: {weather.current.wind_speed}m/s {weather.current.wind_dir}<br></br>
                humidity: {weather.current.humidity}%</p>
            </div>
        </>
    )
  }

  export default CountryData;