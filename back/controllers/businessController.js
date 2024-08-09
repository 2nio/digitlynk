const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const userModel = require('../models/userModel')
const businessModel = require('../models/businessModel')

const createBusiness = async (req, res) => {
    const { company, address } = req.body
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const Business = await businessModel.create({ company, address, owner: Token.id, users: { id: Token.id, role: 'owner' } })
        const User = await userModel.findByIdAndUpdate(Token.id, { $push: { companies: { id: Business._id, name: Business.company, role: 'owner' } } })

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
        const Business = await businessModel.findById(User.currentCompany).populate({ path: 'users.id', select: ['name', 'email'] })

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

const createClient = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id)
        const Business = await businessModel.findByIdAndUpdate(User.currentCompany, { $push: { clients: req.body } })

        res.status(200).json(Business.clients)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getAllClients = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id)
        const Business = await businessModel.findById(User.currentCompany)

        res.status(200).json(Business.clients)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getClient = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    const { id } = req.query
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id)
        const Business = await businessModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(User.currentCompany) } },
            { $unwind: '$clients' },
            { $match: { 'clients._id': new mongoose.Types.ObjectId(id) } },
        ])

        id ? res.status(200).json(Business[0].clients) : res.json('No id')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const editClient = async (req, res) => {
    const { id, data } = req.body

    try {
        await businessModel.findOneAndUpdate({ 'clients._id': id }, {
            '$set': {
                'clients.$.fullname': data.fullname,
                'clients.$.company': data.company,
                'clients.$.bank': data.bank,
                'clients.$.IBAN': data.IBAN,
                'clients.$.address': data.address,
                'clients.$.phone': data.phone,
                'clients.$.email': data.email,
                'clients.$.website': data.website,
                'clients.$.notes': data.notes

            }
        })

        res.status(200).json('Client updated')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const deleteClient = async (req, res) => {
    const { id } = req.body
    try {
        await businessModel.findOneAndUpdate({ 'clients._id': id }, { $pull: { clients: { _id: id } } })
        res.status(200).json('Client deleted')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { getBusiness, createBusiness, createClient, getAllClients, editBusiness, getClient, editClient, deleteClient }