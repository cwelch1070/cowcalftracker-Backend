/* 
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1:27017/cow-calf-tracker-api', {})

*/

const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const url = `mongodb+srv://cwelch:Skeeter23@mernapp.rl0m3ev.mongodb.net/cowcalftracker-api?retryWrites=true&w=majority`;

mongoose.connect(url, {})
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

