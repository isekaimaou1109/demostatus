const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

const { init } = require('./utils')
init()
const projectsRoute = require('./routes/projects')
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')

app.use(cors({
  origin: "*"
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/projects', projectsRoute)
app.use('/login', loginRoute)
app.use('/register', registerRoute)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})