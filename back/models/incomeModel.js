const mongoose = require('mongoose')

const incomeSchema = new mongoose.Schema({
    companyId: {
        type: String,
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Clients',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'Income'
    },
    invoice: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Invoices'
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
        default: 'Other'
    },
    amount: {
        type: Number,
        required: true
    }


})

const incomeModel = mongoose.model('Income', incomeSchema)
module.exports = incomeModel