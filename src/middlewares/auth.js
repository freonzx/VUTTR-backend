const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const authConfig = require('../config/auth')

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' })
    }

    // Token format -> Bearer token
    const [, token] = authHeader.split(' ')

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret)
        req.userId = decoded.id
        req.userEmail = decoded.email

        return next()
    } catch (error) {
        return res.status(401).json({ error: 'Token invalid' })
    }
}
