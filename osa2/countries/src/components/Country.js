import Filter from './Filter'

const Country = ({ country, filter}) => {
    console.log(country, filter)
    console.log('typeof', typeof country.languages)
    const xd = country.languages
    console.log('lng', xd)
    if (!Filter(country.name.common, filter))
        {  
            return(
              ''
             )
        }
    return(
        < div>
        <h1> {country.name.common}</h1>
        <p>capital {country.capital} </p>
        <p>area {country.area}</p>

        <h2>languages</h2>
        {country.map((country) => console.log(country.language))}
         </div>
         )
    
  }
  
  export default Country