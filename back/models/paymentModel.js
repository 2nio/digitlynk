const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
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
        default: 'Payment'
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
    },
    bill: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Bills'
    }
})

const paymentModel = mongoose.model('Payment', paymentSchema)
module.exports = paymentModel