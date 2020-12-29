/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const countryUrl = 'https://restcountries.eu/rest/v2/all'
const weatherUrl = 'http://api.weatherstack.com/current'
// API_KEY = 6396517320824bfe8ac8d6b4bc55ab32

const getAll = () => {
    const request = axios.get(countryUrl)
    return request.then(response => response.data)
}
  
const getWeather = (api_key, city) => {
    const request = axios.get(weatherUrl + '?access_key=' + api_key + '&query=' + city + '&units=m')
    return request.then(response => response.data)
}

export default {
    getAll,
    getWeather
}