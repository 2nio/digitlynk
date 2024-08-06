const mongoose = require('mongoose')

const incomeSchema = new mongoose.Schema({
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
    },
    amount: {
        type: Number,
        required: true
    }


})

const incomeModel = mongoose.model('Income', incomeSchema)
module.exports = incomeModel