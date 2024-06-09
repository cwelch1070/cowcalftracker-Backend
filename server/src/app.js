require('./db/mongoose')
const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')
const herdRouter = require('./routes/herd')
const cattleRouter = require('./routes/cattle')
const calfRouter = require('./routes/calves')
const recordsRouter = require('./routes/records')
require('dotenv').config()

// Gives access to express
const app = express()

// Gets port .env file
const port = process.env.PORT

//Cross Origin Resource Sharing: Allows frontend and backend to communicate
app.use(cors())

//Allows for json
app.use(express.json())

//Routes
app.use(userRouter)
app.use(herdRouter)
app.use(cattleRouter)
app.use(calfRouter)
app.use(recordsRouter)

//Start express 
app.listen(port, () => {
    console.log('App is running on port ' + port)
})