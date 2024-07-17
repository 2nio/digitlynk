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
        type: String,
        required: true
    },
    users: [{
        id: String,
        role: String
    }],
    bank: String,
    IBAN: String,
    phone: String,
    email: String,
    website: String,
    invoices: [String],
    users: [String],
    providers: [{
        contactPerson: String,
        company: String,
        bank: String,
        IBAN: String,
        address: String,
        phone: String,
        email: String,
        website: String,
        notes: String
    }],
    clients: [{
        fullName: String,
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