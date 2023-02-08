const express = require('express')
const Cattle = require('../models/cattle')
const router = new express.Router()

router.post('/cattle', async (req, res) => {
    const cattle = new Cattle({
        ...req.body,
        herd: req.body.herdId
    }) 
    
    try {
        await cattle.save()

        res.status(201).send(cattle)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/cattle/:id', async (req, res) => {
    try {
        const cattle = await Cattle.find({herd: req.params.id})
        res.status(200).send(cattle)
    } catch (e) {
        
    }
})

module.exports = router