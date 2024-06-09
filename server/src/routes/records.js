const express = require('express')
const Cattle = require('../models/cattle')
const Records = require('../models/records')
const router = new express.Router()

router.post('/api/attendance', async (req, res) => {
    const cattle = await getCattleRecords(req.body.record)
    const records = await buildRecordsObjects(cattle)
    
    try {
        await Records.insertMany(records, { ordered: true })
    } catch (error) {
        res.status(200).send('Success')
    }
})

router.get('/api/attendance/:id', async (req, res) => {
    try {
        const cattle = await Records.find({ herdId: req.params.id }) 
        
        res.status(200).send(cattle)
    } catch (e) {
        res.status(400).send('Error: ', e)
    }
})

const getCattleRecords = async (reqBody) => {
    let cattleIds = []
    reqBody.forEach(element => {
        cattleIds.push(element.cowId)
    });

    const cattle = await Cattle.find({ '_id': { $in: cattleIds } })

    return cattle
}

const buildRecordsObjects = async (cattle) => {
    const currDate = new Date()
    const records = []
    cattle.forEach(element => {
        records.push(new Records({
            cowName: element.name,
            tag: element.tag,
            accountedFor: true,
            date: currDate.toLocaleDateString(),
            cowId: element._id,
            herdId: element.herd
        }))
    });

    return records
}

module.exports = router 