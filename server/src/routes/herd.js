const express = require('express')
const Herd = require('../models/herds')
const Cattle = require('../models/cattle')
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
        const herd = await Herd.find({ creator: req.user._id}) 
        res.status(200).send(herd)
    } catch (e) {
        res.status(400).send(e) 
    }
})

/* router.patch('/herd/:id', auth, async (req, res) => {
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
}) */

//Deletes herd and all cattle associated with it
router.delete('/herd/:id', auth, async (req, res) => {
    try {
        const herd = await Herd.findByIdAndDelete(req.params.id)
        const cattle = await Cattle.deleteMany({ herd: req.params.id})

        res.status(200).send({message: 'Successfully deleted herd and all associated cattle'})
    } catch (e) {
        res.status(400).send(e)
    }   
})

module.exports = router