require('./db/mongoose')
const User = require('./models/users')
const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')

const app = express()
const port = process.env.PORT || 3001

//Cross Origin Resource Sharing: Allows frontend and backend to communicate
app.use(cors())

//Allows for json
app.use(express.json())

//Routes
app.use(userRouter)

//Start express 
app.listen(port, () => {
    console.log('App is running on port ' + port)
})