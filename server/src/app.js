require('./db/mongoose')
const User = require('./models/users')
const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')
const herdRouter = require('./routes/herd')
const cattleRouter = require('./routes/cattle')
require('dotenv').config()

const app = express()
const port = process.env.PORT

//Cross Origin Resource Sharing: Allows frontend and backend to communicate
app.use(cors())

//Allows for json
app.use(express.json())

//Routes
app.use(userRouter)
app.use(herdRouter)
app.use(cattleRouter)

//Start express 
app.listen(port, () => {
    console.log('App is running on port ' + port)
})