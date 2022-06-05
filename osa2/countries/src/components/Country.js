import Filter from './Filter'
import '../App.css';

const Country = ({ country, filter, bool}) => {
    console.log(country, filter)

    if (!Filter(country.name.common, filter))
        {  
            return(
              ''
             )
        }

    if (bool) {
    return(
        < div>
        <h1> {country.name.common}</h1>
        <p>capital {country.capital} </p>
        <p>area {country.area}</p>

        <h2>languages</h2>
        {
            Object.keys(country.languages).map((i) => (
                <li> 
                    {country.languages[i]}
                </li>
            )
        )}
        <div className='flag'> 
            {
            country.flag
            }
        </div>           
         </div>
         )
        }
    
    return (
    < div>
        <h1> {country.name.common}</h1>
        </div>

    )

    
  }
  
  export default Country