const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
morgan.token('data', (req, res) => JSON.stringify(req.body));
const cors = require('cors')
app.use(express.static('build'))
require('dotenv').config()
const Person = require('./models/person')

app.use(cors())
app.use(morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ');
  }));

let notes = Person

  app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
      console.log(result)
    response.json(result)
    })
  })

  app.get('/info', (request, response) => {
    const currentDate = new Date();
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        second: '2-digit',
        timeZoneName: 'long',
      };
      
      const formattedDateTime = currentDate.toLocaleString('en-US', options);
    const response_text = `Phonebook has info for ${notes.length } people`
    response.end(response_text + "\n" + formattedDateTime)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)    
    const note = notes.findById(note => {
      return note.id === id
    })
    if(!note) {
        response.status(404).end()
    }
    response.json(note)
  })

  app.delete('/api/persons/:id/', (request, response) => {
    console.log(Person)
    Person.findByIdAndDelete(request.params.id).then(result => {
      console.log("RESULT")
      console.log(result)
      response.status(204).end()
    })
    .catch(error => {
      console.log(error)
      response.status(404).end()})
  });

  app.post('/api/persons', (request, response) => {
    const { name, number } = request.body;

    if (!name || !number) {
      return response.status(400).json({ error: "name or number missing" });
    }
   // if (Person.some(note => note.name === name)) {
     // return response.status(409).json({ error: 'name must be unique' });
    //}
    number.trim()
    const newPerson = new Person({
      name,
      number,
    })

    newPerson.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })


  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })