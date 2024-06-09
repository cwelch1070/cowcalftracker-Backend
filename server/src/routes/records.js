const express = require('express')
const Herd = require('../models/herds')
const Cattle = require('../models/cattle')
const Records = require('../models/records')
const router = new express.Router()

router.post('/api/attendance', async (req, res) => {
    const cattle = getCattleRecords(req.body.record)
    const records = buildRecordsObjects(cattle)
    
    try {
        await Records.insertMany(records, { ordered: true })
    } catch (error) {
        res.status(200).send('Success')
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
    const records = []
    cattle.forEach(element => {
        records.push(new Records({
            tag: element.tag,
            cowId: element._id,
            herdId: element.herd
        }))
    });

    return records
}

module.exports = router 