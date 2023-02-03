const jwt = require('jsonwebtoken')
const User = require('../models/users')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')

        const decoded = jwt.verify(token, 'secret')

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if(!user) {
            throw new Error('Incorrect Token')
        }

        req.token = token
        req.user = user

        //The next function makes sure the code following the code that just ran runs.
        //Without it in this case the rest of the route in herd.js never or any 
        //other function using auth will not completly execute.
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate'})    
    }
}

module.exports = auth