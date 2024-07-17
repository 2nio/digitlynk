const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
}
const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '60m' })
}

const Signup = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const User = await userModel.signup(email, password, name)

        const accessToken = createAccessToken(User._id)
        res.cookie('accessToken', accessToken, { maxAge: 60000 * 15 })

        const refreshToken = createRefreshToken(User._id)
        res.cookie('refreshToken', refreshToken, { maxAge: 60000 * 60, httpOnly: true })

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
        res.cookie('accessToken', accessToken, { maxAge: 60000 * 15 })

        const refreshToken = createRefreshToken(User._id)
        res.cookie('refreshToken', refreshToken, { maxAge: 60000 * 60, httpOnly: true })

        res.status(200).json('Account logged')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const Signout = async (req, res) => {
    res.cookie('refreshToken', '', { maxAge: 1, httpOnly: true })
    res.cookie('accessToken', '', { maxAge: 1 })
    res.status(200).json('Signed out')
}

const getUser = async (req, res) => {
    const authHeader = req.headers['authorization']
    const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
    try {
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id)
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
        const User = await userModel.findByIdAndUpdate(Token.id, { currentCompany: companyId })
        res.status(200).json('Company set')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { Signup, Login, Signout, createAccessToken, getUser, setCurrentCompany, findUser }