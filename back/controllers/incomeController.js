const incomeModel = require('../models/incomeModel')
const invoiceModel = require('../models/invoiceModel')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createIncome = async (req, res) => {
    const { companyId, clientId, clientCompany, type, bank, IBAN, invoice, number, category, date, amount, notes } = req.body

    try {
        const income = await incomeModel.create({ companyId, clientId, clientCompany, type, bank, IBAN, invoice, category, date, amount, notes })
        invoice && await invoiceModel.findByIdAndUpdate(invoice, { $push: { payment: income._id } })
        res.status(200).json('Income created')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getAllIncome = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id)
        const Income = await incomeModel.find({ companyId: User.currentCompany }).populate({ path: 'invoice', select: ['number'] })
        res.status(200).json(Income)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const deleteIncome = async (req, res) => {
    const { id } = req.body
    try {
        const income = await incomeModel.findById(id)
        income.invoice && await invoiceModel.findByIdAndUpdate(income.invoice, { $pull: { payment: income._id } })
        await incomeModel.findByIdAndDelete(id)
        res.status(200).json('Income deleted')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getIncome = (req, res) => {
    const { id } = req.query
    incomeModel.findById(id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
}

const editIncome = (req, res) => {
    const { id, data } = req.body
    incomeModel.findByIdAndUpdate(id, data)
        .then(result => res.json(result))
        .catch(err => res.json(err))
}

module.exports = { createIncome, getAllIncome, deleteIncome, getIncome, editIncome }