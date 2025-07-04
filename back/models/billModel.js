const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
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
    dueDate: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    note: {
        type: String,
    },
    status: {
        type: String,
        default: 'Issued'
    },
    payment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }]

})

const billModel = mongoose.model('Bills', billSchema)
module.exports = billModel