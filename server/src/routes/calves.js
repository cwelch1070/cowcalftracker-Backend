const express = require('express')
const Cattle = require('../models/cattle')
const Calves = require('../models/calves')
const router = new express.Router()

// Create new calf
router.post('/api/calves', async (req, res) => {
    const calf = new Calves(req.body)

    try {
        await calf.save()

        res.status(200).send(calf)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Gets calves by Id of dam
router.get('/api/calves/:id', async (req, res) => {
    try {
        const calves = await Calves.findById(req.params.id)

        res.status(200).send(calves)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Get all calves in herd

// Update calf

// Delete Calf
router.delete('/api/calves/:id', async (req, res) => {
    try {
        const calf = await Calves.findByIdAndDelete(req.params.id)

        res.status(200).send(calf)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router 