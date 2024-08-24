const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
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
    note: {
        type: String,
    },
    status: {
        type: String,
        default: 'Issued'
    },
    tax: Number,
    productList: [{
        id: Number,
        productName: String,
        qty: Number,
        price: Number,
        amount: Number
    }],
    payment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Income' }]
})

const invoiceModel = mongoose.model('Invoices', invoiceSchema)
module.exports = invoiceModel