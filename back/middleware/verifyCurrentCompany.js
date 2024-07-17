const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const verifyCurrentCompany = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const accessToken = req.cookies.accessToken || authHeader.split(' ')[1]
        const Token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        const User = await userModel.findById(Token.id)
        if (User.currentCompany) {
            next()
        } else {
            res.status(401).json({ error: 'NoCurrentCompany' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = verifyCurrentCompany