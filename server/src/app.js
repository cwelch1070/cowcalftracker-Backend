require('./db/mongoose')
const User = require('./models/users')
const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 3001

//app.use(express.static(path.join(__dirname, '../frontend')))
//The .json() seems to send the data in JSON format to make it readable. Without it the res and req does not work
app.use(express.json())

app.post('/user', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.listen(port, () => {
    console.log('App is running on port ' + port)
})