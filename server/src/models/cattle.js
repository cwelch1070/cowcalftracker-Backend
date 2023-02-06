const mongoose = require('mongoose')
const validator = require('validator')

const cattleSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Cow',
        trim: true
    },
    tag: {
        type: Number,
        trim: true,
        required: true
    },
    herd: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Herd'
    }
})

const Cattle = mongoose.model('Cattle', cattleSchema) 
  
module.exports = Cattle