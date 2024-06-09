const mongoose = require('mongoose')
const validator = require('validator')

const recordsSchema = new mongoose.Schema({
    cowName: {
        type: String,
        trim: true,
        default: 'Cow'
    },
    tag: {
        type: String,
        trim: true
    },
    accountedFor: {
        type: Boolean,
        default: false
    },
    date: {
        type: String,
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
    }
})

const Records  = mongoose.model('Records', recordsSchema) 
  
module.exports = Records