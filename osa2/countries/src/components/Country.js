import Filter from './Filter'

const Country = ({ country, filter}) => {
    console.log(country, filter)
     if (filter === '') {
         return(
        <li>' '</li>
         )
        }

    if (!Filter(country.name, filter))
        {  
            return(
                ''
             )
        }
    return(
        <li>' '</li>
         )
    
  }
  
  export default Country