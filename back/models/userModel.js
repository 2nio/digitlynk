const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    companies: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Businesses' },
        role: String
    }],
    currentCompany: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Businesses'
    }
})

//Signup Method
userSchema.statics.signup = async function (email, password, name) {

    if (!email || !password || !name) {
        throw Error('All fields must be completed')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const account = await this.findOne({ email })

    if (account) {
        throw Error('Email already in use')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const User = await this.create({ email, password: hashedPassword, name })

    return User
}

//Login Method
userSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error('All fields must be completed')
    }

    const account = await this.findOne({ email })

    if (!account) {
        throw Error('Incorrect credentials')
    }

    const passwordMatch = await bcrypt.compare(password, account.password)

    if (!passwordMatch) {
        throw Error('Incorrect credentials')
    }

    return account
}


const userModel = mongoose.model('Users', userSchema)
module.exports = userModel