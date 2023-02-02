const mongoose = require('mongoose')
const validator = require('validator')

const Herd = mongoose.model('Herd',{
    name: {
        type: String,
        default: 'Herd',
        trim: true
    },
    numOfCattle: {
        type: Number,
        default: 0
    },
    date: {

    }
})

module.exports = Herd