const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const userModel = require('../models/userModel')
const express = require('express');
const { createAccessToken } = require('../controllers/userController')

const app = express();
app.use(cookieParser())

const verifyAccessToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken

    //Check if there is any access token
    if (!accessToken) {
        if (verifyRefreshToken(res, req)) {
            next()
        }
    } else {
        jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
            //Errors:
            if (err) {
                //Error - expired token
                if (err.name === 'TokenExpiredError') {
                    if (verifyRefreshToken(res, req)) {
                        next()
                    }
                //Any other error
                } else {
                    res.status(401).json(`JWT Verify Access error: ${err.name}`)
                }
            //Give access:
            } else {
                const User = userModel.findById(decoded.id)
                if (User) {
                    next()
                } else {
                    res.status(401).json('Invalid Token')
                }
            }
        })
    }

}

const verifyRefreshToken = (res, req) => {
    const refreshToken = req.cookies.refreshToken
    let accessTokenCreated = false

    if (!refreshToken) {
        res.status(403).json({ error: "ExpiredRefreshToken" })
    } else {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    res.status(403).json({ error: "ExpiredRefreshToken" })
                } else {
                    res.status(401).json(`JWT Verify Refresh error: ${err.name}`)
                }
            } else {
                //Create new access token
                const User = userModel.findById(decoded.id)
                if (User) {
                    const accessToken = createAccessToken(decoded.id)
                    res.cookie('accessToken', accessToken, { maxAge: 60000 * 15})
                    accessTokenCreated = true
                    req.headers['authorization'] = `Bearer ${accessToken}`;
                } else {
                    res.status(401).json('Invalid Token')
                }
            }
        })
    }
    return accessTokenCreated
}

module.exports = verifyAccessToken