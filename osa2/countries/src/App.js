import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import './App.css';
let newFilter = false

const ShowCountries = ({filter}) => {

  const [countries, setCountries] = useState([])
  const [country,setCountry] = useState({})

  
  useEffect(() => {   
    if (newFilter && filter !== "") {
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
}

return(
  <div>
    {countries.length > 10 && <p>too many matches, specify another filter</p>}
    {countries.length <= 10 && countries.length !== 1 && countries.map((country) => 
    <div key={country.name.common}>{country.name.common}<button onClick={() => show(country)}>show</button></div>)}
     {countries.length === 1 && Country(countries[0])}
    {country.capital !== undefined && Country(country)}
  </div>
)

}

const showCountry = (filter) => {
  ShowCountries(filter)
}

const App = () => {

  const [filter,setFilter] = useState('')

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
    newFilter = true
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


export default App;
