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
        required: true
    },
    invoice: {
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

const incomeModel = mongoose.model('Income', incomeSchema)
module.exports = incomeModel