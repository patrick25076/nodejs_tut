const express= require('express')
const cors = require('cors')
const app =express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/' , (req , res) => {
    res.send("<div> <h1> Hello World </h1> </div>")
})

app.get('/api/notes' , (req,res) => {
    res.json(notes)
})

app.get('/api/notes/:id' , (req,res) => {
    id=req.params.id
    note=notes.find(note => note.id==id)
    if(note){
        res.json(note)
    }else{
        res.status(404)
        res.send("<h1>404</h1>")
    }
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
  
    const note = request.body

    if (!body.content) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }
    

    note ={
        'content': body.content , 
        'important': Boolean(body.important) || false , 
        'id':generateId()
    }
  
    notes = notes.concat(note)
  
    response.json(note)

  })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})