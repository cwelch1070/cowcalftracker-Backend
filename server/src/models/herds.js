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
    creator: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Herd = mongoose.model('Herd', herdSchema)

module.exports = Herd