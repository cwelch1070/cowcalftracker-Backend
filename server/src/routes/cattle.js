const express = require('express')
const Cattle = require('../models/cattle')
const router = new express.Router()

router.post('/cattle', async (req, res) => {
    const cattle = new Cattle({
        ...req.body,
        herd: req.herd._id
    })
    
    try {
        await cattle.save()

        res.status(201).send(cattle)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/cattle', async (req, res) => {

})

module.exports = router