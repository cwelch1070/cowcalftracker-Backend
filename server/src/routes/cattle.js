const express = require('express')
const Cattle = require('../models/cattle')
const Herd = require('../models/herds')
const router = new express.Router()

router.post('/cattle', async (req, res) => {
    const cattle = new Cattle({
        ...req.body,
        herd: req.body.herdId
    }) 
    
    try {
        await cattle.save()

        //COUNTS DOCUMENTS ON COW CREATION AND UPDATES HERD COUNT FIELD
        const count = await Cattle.countDocuments({ herd: req.body.herdId})
        const herd = await Herd.findByIdAndUpdate(req.body.herdId, { numOfCattle: count })
       
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