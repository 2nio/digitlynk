const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const businessModel = require('../models/businessModel')

const createBusiness = async (req, res) => {
    const { company, address } = req.body
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const Business = await businessModel.create({ company, address, owner: Token.id, users: { id: Token.id, role: 'owner' } })
        const User = await userModel.findByIdAndUpdate(Token.id, { $push: { companies: { id: Business._id, role: 'owner' } } })

        res.status(200).json('Business created')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getBusiness = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id)
        const Business = await businessModel.findById(User.currentCompany)
            .populate({ path: 'users.id', select: ['name', 'email'] })
            .populate({ path: 'clients' })


        res.status(200).json(Business)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const editBusiness = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id)
        const Business = await businessModel.findByIdAndUpdate(User.currentCompany, req.body)

        res.status(200).json(Business)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { getBusiness, createBusiness, editBusiness }