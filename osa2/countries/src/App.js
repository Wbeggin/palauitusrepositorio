import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Filter from './components/Filter'

const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [fLength, setFlength] = useState([])
  let filteredCountries = []

  useEffect(() => {   
    console.log('effect')    
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {console.log('promise fulfilled')
    setCountries(response.data)
    console.log(response.data)
    })}, [])

     console.log('render', countries.length, 'notes'  )


  const handleFilterChange = (event) => {   
      setNewFilter(event.target.value)
      filteredCountries = []
      countries.forEach((e) => {

        if (Filter(e.name.common, event.target.value)) 
        {
          filteredCountries.push(e)
          console.log(e)
        }

      })

      console.log('array length' , filteredCountries.length)
      console.log("filtered", filteredCountries.length)
      setFlength(filteredCountries)

    }


    const renderElement = () => {
      console.log('renderFilteredLength', fLength.length)
      if (fLength.length <= 10 && fLength.length != 0) {
        return (
          fLength.map(country => 
            <Country key={country.name.common} 
            country={country} 
            filter={newFilter} /> 
              )
        )
          }

        else if (fLength == 0) {
          return ('')
        }
        
        return ('Too many matches, specify another filter')

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
        {renderElement()}
      </ul>

    </div>
  )

}

export default App;
