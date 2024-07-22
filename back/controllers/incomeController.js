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

const getIncome = (req, res) => {
    incomeModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
}

module.exports = { createIncome, getIncome }