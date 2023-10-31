const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url =
`mongodb+srv://montw:${password}@hyfullstack.ipbmneu.mongodb.net/phonebook?retryWrites=true&w=majority`
  

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', noteSchema)

if (name === undefined && number === undefined){
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(people => {
          console.log(people.name + " " + people.number)
        })
        mongoose.connection.close()
      })
}

if (name !== undefined && number !== undefined){
    const person = new Person({
    name: name,
    number: number,
    })

    person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
    })
}