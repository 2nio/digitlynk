const paymentModel = require('../models/paymentModel')
const billModel = require('../models/billModel')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createPayment = async (req, res) => {
    const { companyId, clientId, clientCompany, type, bank, IBAN, bill, number, category, date, amount, notes } = req.body

    try {
        const payment = await paymentModel.create({ companyId, clientId, clientCompany, type, bank, IBAN, bill, category, date, amount, notes, number })
        bill && await billModel.findByIdAndUpdate(bill, { $push: { payment: payment._id } })
        res.status(200).json('Payment created')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getAllPayments = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id)
        const Payment = await paymentModel.find({ companyId: User.currentCompany }).populate({ path: 'bill', select: ['number'] })
        res.status(200).json(Payment)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const deletePayment = async (req, res) => {
    const { id } = req.body
    try {
        await paymentModel.findByIdAndDelete(id)
        res.status(200).json('Payment deleted')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getPayment = (req, res) => {
    paymentModel.find(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))
}

const editPayment = (req, res) => {
    const { id, data } = req.body
    paymentModel.findByIdAndUpdate(id, data)
        .then(result => res.json(result))
        .catch(err => res.json(err))
}

module.exports = { createPayment, getAllPayments, deletePayment, getPayment, editPayment }