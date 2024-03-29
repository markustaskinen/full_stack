import React from 'react';
import Country from './Country';
import CountryData from './CountryData';

const CountryList = ({ show, showCountries, onClick, weather }) => {
          
 
    if (show === '') {
        return (
            <p>Specify filter.</p>
        )
    }
    else if (showCountries.length > 10) {
        return (
            <p>{showCountries.length} matches. Please specify filter.</p>
        )
    }
    else if (showCountries.length === 1) {
        const countryDetails = showCountries[0]
        //PROBLEM: these are called repeatedly and so the monthly limit of the API calls surpassed..
        //capitalWeather(api_key, countryDetails.capital)
        return (
            <CountryData country={countryDetails} weather={weather} />
        )
    }
    else {
        return (
            <ul className='countries'>
              {showCountries.map((country, i) =>
                <Country key={country.name} country={country} onClick={onClick} />
              )}
            </ul>
          )
    }
  }

  export default CountryList;