const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (req, res, next) => {    
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        req.user = await User.findById(decodedToken.id)
        if (!req.user) {
            req.user = null
        }
    }
    catch (error) {
        req.user = null
        }
    next()
}

module.exports = userExtractor;