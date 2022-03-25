import Filter from './Filter'

const Person = ({ person, filter}) => {
    console.log(person, filter)
     if (filter === '') {
         return(
        <li>{person.name + ' ' + person.pnumber}</li>
         )
        }

    if (!Filter(person.name, filter))
        {  
            return(
                ''
             )
        }
    return(
        <li>{person.name + ' ' + person.pnumber}</li>
         )
    
  }
  
  export default Person