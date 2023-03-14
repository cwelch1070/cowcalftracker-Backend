const mongoose = require('mongoose')
const validator = require('validator')
const Cattle = require('../models/cattle')

const herdSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Herd',
        trim: true
    },
    numOfCattle: {
        type: Number,
        default: 0
    },
    dateCreated: {
        type: String,
        required: true,
        default: function() {
            const date = new Date()
            let day = date.getDate()
            let month = date.getMonth()
            let year = date.getFullYear()

            let currentDate = `${month}/${day}/${year}`

            return currentDate
        },
    },
    creator: { 
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    }
})

herdSchema.methods.setDate = function() {
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()

    let currentDate = `${day}/${month}/${year}`

    return currentDate
}

const Herd = mongoose.model('Herd', herdSchema)

module.exports = Herd