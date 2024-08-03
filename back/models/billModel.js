const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
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
    dueDate: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    note: {
        type: String,
    },
    status: {
        type: String,
        default: 'Issued'
    }
})

const billModel = mongoose.model('Bills', billSchema)
module.exports = billModel