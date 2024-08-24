const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const businessModel = require('../models/businessModel')
const clientModel = require('../models/clientModel')


const createClient = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id)
        const Client = await clientModel.create(req.body)
        await businessModel.findByIdAndUpdate(User.currentCompany, { $push: { clients: Client._id } })

        res.status(200).json('Client created')
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
            .populate({ path: 'clients' })

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
        const Business = await businessModel.findById(User.currentCompany)
            .populate({ path: 'clients' })

        id ? res.status(200).json(Business.clients.filter(item => (item._id === id))) : res.json('No id')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const editClient = async (req, res) => {
    const { id, data } = req.body

    try {
        await clientModel.findByIdAndUpdate(id, data)
        res.status(200).json('Client updated')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const deleteClient = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    const { id } = req.body
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id)
        await businessModel.findOneAndUpdate(User.currentCompany, { $pull: { clients: id } })
        await clientModel.findByIdAndDelete(id)
        res.status(200).json('Client deleted')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { createClient, getAllClients, getClient, editClient, deleteClient }