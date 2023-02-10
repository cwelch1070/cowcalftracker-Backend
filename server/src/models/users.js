const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        trim: true,
        default: 'User'
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Your password cannot contain the word "password"')
            }
        }
    },
    tokens: [{
        token: { 
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('herd', {
    ref: 'Herd',
    localField: '_id',
    foreignField: 'creator'
})

//Generate and store the jwt tokens
userSchema.methods.generateToken = async function() {
    //Get users id and sign it with a token and secret
    const token = jwt.sign({ _id: this._id.toString() }, 'secret')
    
    //concatinates the jwt token to the tokens array of objects
    //Each token is stored as an object
    //The token also gets its own id
    this.tokens = this.tokens.concat({ token: token })

    //Save the user with the new token 
    await this.save()

    return token
}

//Check if user exists for login
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error('Unable to login')
    } 

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

//Hash user password for secure storage
userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User