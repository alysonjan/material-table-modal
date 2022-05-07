const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json({ extended: false }))
app.get('/', (req, res) => {
  res.send('welcome server')
})
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)

app.use('/user', require('./routes'))

const PORT = 5000

app.listen(PORT, () => console.log(`server is running`))
