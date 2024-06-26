const express = require('express')
const Herd = require('../models/herds')
const Cattle = require('../models/cattle')
const auth = require('../middleware/auth')
const router = express.Router()

//CREATE A NEW HERD
router.post('/api/herd', auth, async (req, res) => {
    const herd = new Herd({
        ...req.body,
        creator: req.user._id
    })
    
    try {
        await herd.save()
        res.status(201).send({message: 'Herd Successfully Created'})
    } catch (e) {
        res.status(400).send(e)
    }
})

//GET ALL HERDS ASSOCIATED WITH USER
router.get('/api/herd', auth, async (req, res) => {
    try {
        const herd = await Herd.find({ creator: req.user._id}) 
        res.status(200).send(herd)
    } catch (e) {
        res.status(400).send(e) 
    }
})

//UPDATE HERD
router.patch('/api/herd/:id', auth, async (req, res) => { 
    const updates = Object.keys(req.body)

    try {
        const _id = req.params.id
        const herd = await Herd.findOne({_id, creator: req.user._id})
        updates.forEach((update) => herd[update] = req.body[update])
        await herd.save()

        res.status(200).send({message: 'Succesfully Updated'})
    } catch (e) {
        res.status(400).send(e)
    }
})

//DELETES HERD AND ALL CATTLE ASSOCIATED WITH IT
router.delete('/api/herd/:id', auth, async (req, res) => {
    try {
        await Herd.findByIdAndDelete(req.params.id)
        await Cattle.deleteMany({ herd: req.params.id})

        res.status(200).send({message: 'Successfully deleted herd and all associated cattle'})
    } catch (e) {
        res.status(400).send(e)
    }   
})

module.exports = router