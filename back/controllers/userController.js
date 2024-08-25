const businessModel = require('../models/businessModel')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '5m' })
}
const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '24h' })
}

const refreshOptions = {
    httpOnly: true,
    maxAge: 60000 * 60 * 24,
    sameSite: "none",
    secure: true,
};

const accessOptions = {
    maxAge: 60000 * 5,
    sameSite: "none",
    secure: true,
};


const Signup = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const User = await userModel.signup(email, password, name)
        const accessToken = createAccessToken(User._id)
        res.cookie('accessToken', accessToken, accessOptions)

        const refreshToken = createRefreshToken(User._id)
        res.cookie('refreshToken', refreshToken, refreshOptions)

        res.status(200).json('Account created')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body
    try {
        const User = await userModel.login(email, password)

        const accessToken = createAccessToken(User._id)
        res.cookie('accessToken', accessToken, accessOptions)

        const refreshToken = createRefreshToken(User._id)
        res.cookie('refreshToken', refreshToken, refreshOptions)

        res.status(200).json('Account logged')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const Signout = async (req, res) => {
    res.cookie('refreshToken', '', { maxAge: 1, httpOnly: true, sameSite: 'none', secure: true })
    res.cookie('accessToken', '', { maxAge: 1, sameSite: 'none', secure: true })
    res.status(200).json('Signed out')
}

const getUser = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id).populate({ path: 'companies.id', select: ['company'] })
        res.status(200).json(User)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const findUser = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    const { id } = req.params
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(id)
        res.status(200).json(User)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const setCurrentCompany = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    const { companyId } = req.body
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        await userModel.findByIdAndUpdate(Token.id, { currentCompany: companyId })
        res.status(200).json('Company set')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const addUser = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    const { email } = req.body
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id)
        const invitedUser = await userModel.findOne({ email })
        const Business = await businessModel.findByIdAndUpdate(User.currentCompany, { $push: { users: { id: invitedUser._id, role: 'viewer' } } })
        await userModel.findOneAndUpdate({ email }, { $push: { companies: { id: Business._id, role: 'viewer' } } })
        res.status(200).json('User added')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const removeUser = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    const { email } = req.body
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id)
        const invitedUser = await userModel.findOne({ email })
        const Business = await businessModel.findByIdAndUpdate(User.currentCompany, { $pull: { users: { id: invitedUser._id } } })
        await userModel.findOneAndUpdate({ email }, { $pull: { companies: { id: Business._id } } })
        res.status(200).json('User removed')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = { Signup, Login, Signout, createAccessToken, getUser, setCurrentCompany, findUser, addUser, removeUser }