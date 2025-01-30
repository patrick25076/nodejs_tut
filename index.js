const express= require('express')
const cors = require('cors')
const app =express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const Note = require('models/Note')

app.get('/' , (req , res) => {
    res.send("<div> <h1> Hello World </h1> </div>")
})

app.get('/api/notes' , (req,res) => {
    Note.find({}).then(result => {
      res.json(result)
    })
})

app.get('/api/notes/:id' , (req,res) => {
    const id =req.params.id
    Note.findById(id).then((note) =>{
      res.json(note)
    })
})

app.delete('/api/notes/:id' , (req, res) => {
    id=req.params.id
    notes=notes.filter(note => note.id!==id)
    res.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})