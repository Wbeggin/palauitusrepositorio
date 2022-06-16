import Filter from './Filter'

const Person = ({ person, filter}) => {
    console.log(person.number, filter)
     if (filter === '') {
         return(
        <li>{person.name + ' ' + person.number}</li>
         )
        }

    if (!Filter(person.name, filter))
        {  
            console.log('filter not true')
            return(
                ''
             )
        }
    console.log('end of file' , person.number)
    return(
        <li>{person.name + ' ' + person.number}</li>
         )
    
  }
  
  export default Person