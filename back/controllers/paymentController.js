const paymentModel = require('../models/paymentModel')

const createPayment = async (req, res) => {
    const { companyId, clientId, clientCompany, type, bank, IBAN, bill, number, category, date, amount, notes } = req.body

    try {
        await paymentModel.create({ companyId, clientId, clientCompany, type, bank, IBAN, bill, category, date, amount, notes })
        res.status(200).json('Payment created')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getAllPayments = (req, res) => {
    paymentModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
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