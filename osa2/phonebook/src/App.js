import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log(persons)
    let exists = false;
    persons.map(person => 
      {if(person.name === newName) {
        alert(newName + ' ' + 'is already added to the phonebook')
        exists = true;
      }});

      if (!exists){
        const person = {
          name: newName
        }
          setPersons(persons.concat(person))
          setNewName('')
      }
    
  }

  const handleNameChange = (event) => {   
    setNewName(event.target.value)
 }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value = {newName} 
          onChange={handleNameChange} />
        </div>  
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
        <Person key={person.name} person={person} /> 
          )}
      </ul>
    </div>
  )

}

export default App