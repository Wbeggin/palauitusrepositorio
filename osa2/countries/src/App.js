import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import './App.css';
import Weather from './components/Weather'

let newFilter = false
let countriesCopy = []
let newWeahter = false

// make a .ENV file and put your api key there such as EACT_APP_API_KEY = API KEY

const ShowCountries = ({filter}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([])
  const [country,setCountry] = useState({})
  const [weather, setWeather] = useState({})
  const [icon, setIcon] = useState('')

  useEffect(() => {   
    if (newFilter) {
      setCountry({})
      console.log('effect')    
      axios.get(`https://restcountries.com/v3.1/name/${filter}`)
      .then(response => {console.log('promise fulfilled')
      setCountries(response.data)
      console.log(response.data)
      })      
    }
    newFilter = false
  })

     console.log('render', countries.length, 'notes'  )



const show = (country) => {
  setCountry(country)
  newWeahter = true
}

countriesCopy = []
for(let i = 0; i < countries.length; i++) {
if (countries[i].name.common.toUpperCase().includes(filter.toUpperCase())) {
  countriesCopy.push(countries[i])
    }
  }
  useEffect(() => {   
    if (countriesCopy.length === 1 && newWeahter)  {
      setWeather({})
      newWeahter = false
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${countriesCopy[0].capital}&APPID=${api_key}&units=metric`)
  .then(response => {console.log('promise fulfilled 2')
   console.log(response.data)
   setWeather(response.data)
   setIcon(response.data.weather[0].icon)
   console.log('weather' , weather)
   }) }
   
   if (country.capital !== undefined && newWeahter) {
    setWeather({})
    newWeahter = false
     axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}&units=metric`)
  .then(response => {console.log('promise fulfilled 3')
   console.log('icon' , response.data.weather[0].icon)
   setWeather(response.data)
   setIcon(response.data.weather[0].icon)
   console.log('weather' , weather)
   }) } 

  })

   if (filter === '') {
    return <p> </p>
  }

return(
  <div>
    {countriesCopy.length > 10 && <p>too many matches, specify another filter</p>}
    {countriesCopy.length <= 10 && countriesCopy.length !== 1 && countriesCopy.map((country) => 
    <div key={country.name.common}>{country.name.common}<button onClick={() => show(country)}>show</button></div>)}
     {countriesCopy.length === 1 && Country(countriesCopy[0])}
     {countriesCopy.length === 1 && Weather(countriesCopy[0].capital, weather, icon) }
     {country.capital !== undefined && country.name.common.toUpperCase().includes(filter.toUpperCase()) && Country(country)}
     {countriesCopy.length !== 1 && Weather(country.capital,weather, icon)}
  </div>
)


}

const App = () => {

  const [filter,setFilter] = useState('')

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
    newFilter = true
    newWeahter = true
  }

  return (
    <div>      
      <form>
        <div>
          find countries <input value = {filter}
          onChange={handleFilterChange} />
        </div>
      </form>
    <ShowCountries filter={filter}></ShowCountries>
    </div>
  )
}
   // <Weather country = {filter} countries = {countriesCopy}></Weather>


export default App;
