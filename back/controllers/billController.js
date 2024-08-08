const billModel = require('../models/billModel')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createBill = async (req, res) => {
    const { companyId, clientId, clientCompany, date, dueDate, amount, number, note } = req.body

    try {
        await billModel.create({ companyId, clientId, clientCompany, date, dueDate, amount, number, note })
        res.status(200).json('Bill created')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getAllBills = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id)
        const Bills = await billModel.find({ companyId: User.currentCompany }).populate({ path: 'payment', select: ['amount'] })
        res.status(200).json(Bills)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const deleteBill = async (req, res) => {
    const { id } = req.body
    try {
        await billModel.findByIdAndDelete(id)
        res.status(200).json('Bill deleted')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getBill = (req, res) => {
    const { id } = req.query
    billModel.findById(id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
}

const editBill = (req, res) => {
    const { id, data } = req.body
    billModel.findByIdAndUpdate(id, data)
        .then(result => res.json(result))
        .catch(err => res.json(err))
}


module.exports = { createBill, getAllBills, deleteBill, getBill, editBill }