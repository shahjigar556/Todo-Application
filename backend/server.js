const express = require('express')
const app = express()
const cors=require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()
const connectDB=require('./config/db');

// middlewares
app.use(cors())
app.use(express.json())

const taskRoutes=require('./routes/taskRoutes')
connectDB();

app.use('/task',taskRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`)
})