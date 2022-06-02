import Filter from './Filter'

const Person = ({ person, filter}) => {
    console.log(person, filter)
     if (filter === '') {
         return(
        <li>{person.name + ' ' + person.number}</li>
         )
        }

    if (!Filter(person.name, filter))
        {  
            return(
                ''
             )
        }
    return(
        <li>{person.name + ' ' + person.number}</li>
         )
    
  }
  
  export default Person