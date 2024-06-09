const mongoose = require('mongoose')
const validator = require('validator')

const recordsSchema = new mongoose.Schema({
    tag: {
        type: String,
        trim: true
    },
    cowId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Cattle'
    },
    herdId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Herd'
    },
}, { timestamps: true })

const Records  = mongoose.model('Records', recordsSchema) 
  
module.exports = Records