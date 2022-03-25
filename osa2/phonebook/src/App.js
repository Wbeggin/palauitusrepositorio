import { useState } from 'react'
import Person from './components/Person'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState(Persons()) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
          name: newName,
          pnumber: newNumber
        }
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
      }
    
  }

  const handleNameChange = (event) => {   
    setNewName(event.target.value)
 }

 const handleNumberChange = (event) => {   
  setNewNumber(event.target.value)
}

const handleFilterChange = (event) => {   
  setNewFilter(event.target.value)
}


  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input value = {newFilter}
          onChange={handleFilterChange} />
        </div>
      </form>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value = {newName}
          onChange={handleNameChange} />
        </div>  

        <div>
          number: <input value = {newNumber}
          onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
        <Person key={person.name} person={person} filter={newFilter}/> 
          )}
      </ul>
    </div>
  )

}

export default App