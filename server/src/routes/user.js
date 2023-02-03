const express = require('express')
const User = require('../models/users')
const router = new express.Router()
const auth = require('../middleware/auth')

//Create User
router.post('/user', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()

        const token = await user.generateToken()

        res.status(201).send({ token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/user/login', async (req, res) => {
    try { 
        const user = await User.findByCredentials(req.body.email, req.body.password) 
        const token = await user.generateToken()
        res.status(200).send({ token })
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router