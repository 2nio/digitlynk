const invoiceModel = require('../models/invoiceModel')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createInvoice = async (req, res) => {
    const { companyId, clientId, clientCompany, date, dueDate, number, note, productList } = req.body

    try {
        const invoice = await invoiceModel.create({ companyId, clientId, clientCompany, date, dueDate, number, note, productList })
        res.status(200).json('Invoice created')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getAllInvoices = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id)
        const Invoices = await invoiceModel.find({ companyId: User.currentCompany })
            .populate({ path: 'payment', select: ['amount'] })
            .populate({ path: 'clientId' })
        res.status(200).json(Invoices)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getInvoice = (req, res) => {
    const { id } = req.query
    invoiceModel.findById(id).populate({ path: 'clientId' })
        .then(result => res.json(result))
        .catch(err => res.json(err))
}

const editInvoice = (req, res) => {
    const { id, data } = req.body
    invoiceModel.findByIdAndUpdate(id, data)
        .then(result => res.json(result))
        .catch(err => res.json(err))
}

const deleteInvoice = async (req, res) => {
    const { id } = req.body
    try {
        const Invoices = await invoiceModel.findByIdAndDelete(id)
        res.status(200).json(Invoices)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { createInvoice, getAllInvoices, getInvoice, editInvoice, deleteInvoice }