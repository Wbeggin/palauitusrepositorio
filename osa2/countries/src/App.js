import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {   
    console.log('effect')    
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {console.log('promise fulfilled')
    setCountries(response.data)
    console.log(response.data)
    })}, [])

     console.log('render', countries.length, 'notes'  )
     console.log(countries.name)

  const handleFilterChange = (event) => {   
      setNewFilter(event.target.value)
    }

  return (
    <div>      
      <form>
        <div>
          find countries <input value = {newFilter}
          onChange={handleFilterChange} />
        </div>
      </form>

      <ul>
        {countries.map(country => 
        <Country key={country.name} country={country} filter={newFilter}/> 
          )}
      </ul>

    </div>
  )

}

export default App;
