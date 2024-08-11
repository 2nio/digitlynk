const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    contactType: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    CIN: {
        type: String,
    },
    bank: {
        type: String
    },
    IBAN: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    website: {
        type: String
    },
    notes: {
        type: String
    }

})

const clientModel = mongoose.model('Clients', clientSchema)
module.exports = clientModel