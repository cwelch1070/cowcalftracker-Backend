const express = require('express')
const Cattle = require('../models/cattle')
const Herd = require('../models/herds')
const router = new express.Router()

//CREATE Cattle ROUTE
router.post('/api/cattle', async (req, res) => {
    const cattle = new Cattle({
        ...req.body,
        herd: req.body.herdId
    }) 

    // If an empty string for the name field is recieved set it to Cow
    if(cattle.name === '') {
        cattle.name = 'Cow'
    }

    // If an empty string is recieved for the note field set it to N/A
    if(cattle.notes === '') {
        cattle.notes = 'N/A'
    }

    try {
        await cattle.save()

        //COUNTS DOCUMENTS ON COW CREATION AND UPDATES HERD COUNT FIELD
        const count = await Cattle.countDocuments({ herd: req.body.herdId})
        await Herd.findByIdAndUpdate(req.body.herdId, { numOfCattle: count }) 
       
        res.status(201).send(cattle)
    } catch (e) {
        res.status(400).send(e) 
    }
})

//GET ALL CATTLE IN HERD
router.get('/api/cattle/:id', async (req, res) => {
    try {
        const cattle = await Cattle.find({herd: req.params.id}) 
        
        res.status(200).send(cattle)
    } catch (e) {
        res.status(400).send('Error: ', e)
    }
})

//UPDATE COW
router.patch('/api/cattle/:id', async (req, res) => { 
    const updates = Object.keys(req.body)

    try {
        const _id = req.params.id
        const cattle = await Cattle.findOne({_id, herdId: req.params.id})
        updates.forEach((update) => cattle[update] = req.body[update]) 
        await cattle.save()

        res.status(200).send({message: 'Succesfully Updated'})
    } catch (e) {
        res.status(400).send(e)
    }
})

//DELETE COW IN HERD
router.delete('/api/cattle/:id', async (req, res) => {
    try {
        const cattle = await Cattle.findByIdAndDelete(req.params.id)

        //COUNTS DOCUMENTS ON COW CREATION AND UPDATES HERD COUNT FIELD
        const count = await Cattle.countDocuments({ herd: req.body.herdId})
        const herd = await Herd.findByIdAndUpdate(req.body.herdId, { numOfCattle: count })

        res.status(200).send({messge: 'Cow was successfully deleted'})
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router