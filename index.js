const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(morgan('tiny'))


app.use(express.json())

let person =
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get("/api/persons", (request, response) => {
    response.json(person);
  });
  app.get("/info", (request, response) => {
    const currentDate = new Date();
    response.send(
      `<p>Phonebook has info for ${person.length} people ${currentDate}</p>`
    );
  });
  app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    console.log(id);
    const user = person.find((user) => user.id === id);
    if (!user) {
      return response.status(404).json("Not found");
    } else {
      return response.json(user);
    }
  });

  app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    person = person.filter((item) => {
      return item.id != id;
    });
    return response.json(person);
  });
  app.post("/api/persons", (request, response) => {
    const body = request.body;
    const found = person.find((item) => item.name === body.name);
    
    if (body.name === "") {
      return response.status(500).json({ error: "Name cannot be empty!" });
    } else if (body.number === "") {
      return response.status(500).json({ error: "Number cannot be empty!" });
    }
    body.id = (Math.random() * 1000).toFixed(0);
    person.push(body);
    return response.json(person);
    if (found) {
      return response.status(500).json({ error: "Name must be unique" });
    }
});
morgan.token('post', function (required) { 
  if (required.method === 'POST'){
    return JSON.stringify(required.body)
} else {
    return null;
}});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));



  const PORT = 3002;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });