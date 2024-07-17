const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
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
    note: {
        type: String,
    },
    status: {
        type: String,
        default: 'Issued'
    },
    productList: [{
        id: Number,
        productName: String,
        qty: Number,
        price: Number,
        amount: Number
    }]
})

const invoiceModel = mongoose.model('Invoices', invoiceSchema)
module.exports = invoiceModel