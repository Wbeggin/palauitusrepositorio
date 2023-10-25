const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
morgan.token('data', (req, res) => JSON.stringify(req.body));
const cors = require('cors')

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

let notes = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendicl",
        number: "39-23-6423122"
    }
  ]

  app.get('/api/persons', (request, response) => {
    response.json(notes)
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
    const note = notes.find(note => {
      return note.id === id
    })
    if(!note) {
        response.status(404).end()
    }
    response.json(note)
  })

  app.delete('/api/persons/:id/', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(note => note.id === id);
    if (!note) {
      response.status(404).end();
    } else {
      note.number = ''; 
      response.status(204).end();
    }
  });

  app.post('/api/persons', (request, response) => {
    const { name, number } = request.body;

    if (!name || !number) {
      return response.status(400).json({ error: "name or number missing" });
    }
    if (notes.some(note => note.name === name)) {
      return response.status(409).json({ error: 'name must be unique' });
    }
  
    const newNote = {
      id: Math.floor(Math.random() * 1000000) + 1,
      name,
      number,
    };
  
    notes.push(newNote);
    response.status(201).json(newNote);
  });


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})