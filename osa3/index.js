const express = require('express')
const app = express()
app.use(express.json())


let notes = [
    {
      id: 1,
      content: "Arto Hellas",
      number: "040-123456"
    },
    {
        id: 2,
        content: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        content: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        content: "Mary Poppendicl",
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})