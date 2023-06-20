const mongoose = require('mongoose')
const validator = require('validator')

const calvesSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Calf',
        trim: true
    },
    tag: {
        type: String,
        trim: true
    },
    notes: {
        type: String,
        trim: true,
        default: 'N/A'
    },
    birthDate: {
        type: Date,
        default: Date.now(),
        trim: true
    },
    dam: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Cattle'
    }
})

const Calves = mongoose.model('Calves', calvesSchema)  
  
module.exports = Calves