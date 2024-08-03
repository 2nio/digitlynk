const incomeModel = require('../models/incomeModel')
const businessModel = require('../models/businessModel')

const createIncome = async (req, res) => {
    const { companyId, clientId, clientCompany, type, bank, IBAN, invoice, number, category, date, amount, notes } = req.body

    try {
        const income = await incomeModel.create({ companyId, clientId, clientCompany, type, bank, IBAN, invoice, category, date, amount, notes })
        res.status(200).json('Income created')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getAllIncome = (req, res) => {
    incomeModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
}

const deleteIncome = async (req, res) => {
    const { id } = req.body
    try {
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