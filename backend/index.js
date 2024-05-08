const connetTOmongo=require('./db')

connetTOmongo();

const express = require('express')
const app = express()
const port = 5000


app.get('/', (req, res) => {
  res.send('Hello Shakeel!')
})

 app.use(express.json())
//create endpoints in app 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNoteBook backend http://localhost:${port}`)
})