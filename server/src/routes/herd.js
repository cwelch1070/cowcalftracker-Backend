const express = require('express')
const Herd = require('../models/herds')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/herd', auth, async (req, res) => {
    const herd = new Herd({
        ...req.body,
        creator: req.user._id
    })
    
    try {
        await herd.save()
        res.status(201).send(herd)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/herd', auth, async (req, res) => {
    try {
        const herd = await Herd.find({ creator: req.user._id }) 
        res.status(200).send(herd)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router