const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    companyId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    clientCompany: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'Payment'
    },
    bill: {
        type: String,
    },
    notes: {
        type: String,
    },
    bank: {
        type: String,
    },
    IBAN: {
        type: String,
    },
    category: {
        type: String,
    },
    amount: {
        type: String,
        required: true
    }


})

const paymentModel = mongoose.model('payment', paymentSchema)
module.exports = paymentModel