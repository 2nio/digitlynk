const mongoose = require('mongoose')

const businessSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users',
        required: true
    },
    users: [{
        id: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Users'
        },
        role: String
    }],
    bank: String,
    IBAN: String,
    phone: String,
    email: String,
    website: String,
    clients: [{
        contactType: String,
        fullname: String,
        company: String,
        bank: String,
        IBAN: String,
        address: String,
        phone: String,
        email: String,
        website: String,
        notes: String
    }]
})

const businessModel = mongoose.model('Businesses', businessSchema)
module.exports = businessModel