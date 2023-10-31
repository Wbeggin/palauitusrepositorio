import { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'
import Popup from './components/popup'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newPopUpText, setPopUpText] = useState('')

  useEffect(() => {   
    console.log('effect')    
    personService.getAll()
    .then(initialpersons => {setPersons(initialpersons)}) 
    }, [])
    console.log(persons)
   

  const addName = (event) => {
    event.preventDefault()
    console.log(persons)
    let isAdded = false

    persons.map(person => 
      {
        if (person.name === newName) {
          isAdded = true;
        }
      })

      if (isAdded) {

        if (window.confirm(`${newName} is already added to the phonebook,  replace the old number with a new one?`))
        {
          const personId = persons.find(n => n.name === newName)
          const person = {
            name: newName,
            number: newNumber
          }
         personService.update(personId.id, person)
          .then(returnedPerson => {                
            if (returnedPerson === 'fail') {
              setPopUpText(`information of ${newName} has already been removed from server`)
              setTimeout(() => { setPopUpText('')}, 5000)
            }
            else {
              setPopUpText(`Number succesfully updated`)
              setTimeout(() => { setPopUpText('')}, 5000)
              setPersons(persons.map(person => 
                person.id !== personId.id ? person : returnedPerson)
                ) 
            }
          setNewName('')
          setNewNumber('')   
        })
  
      }
      }
      
      if (!isAdded) {
        const person = {
          name: newName,
          number: newNumber
        }
        personService.create(person)
        .then(returnedPerson => {setPersons(persons.concat(returnedPerson))
          setPopUpText(`added ${newName}`)
          setTimeout(() => { setPopUpText('')}, 5000)
        setNewName('')
        setNewNumber('')  
        })
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

const removePerson = id => {
  const person = persons.find(p => p.id === id)

  if (window.confirm(`delete '${person.name}'`)) {
  personService.removeID(person.id)
  .then()
  .catch(error => {
    alert(`the person '${person.name}' was already deleted from server`)
  }
  )
  setPersons(persons.filter(p => p.id !== id))
  setPopUpText(`${person.name} succesfully deleted`)
  setTimeout(() => { setPopUpText('')}, 5000)
  }

}

  return (
    <div>
      <h2>Phonebook</h2>
      <Popup
      key={newPopUpText}
      popupText = {newPopUpText}
      />
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
        {
        persons.map(person => 
        <Person key={person.name} 
        person={person} 
        filter={newFilter}
        remove = {() => removePerson(person.id)} 
        /> 
          )}
      </ul>
    </div>
  )

}

export default App