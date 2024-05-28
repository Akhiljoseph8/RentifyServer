const jwt = require('jsonwebtoken')
const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (token) {
            const result = jwt.verify(token, process.env.secretkey)
            req.payload = result.userId

        } else {
            res.status(406).json("Please login")
        }
        next()

    } catch (err) {
        res.status(406).json(err)
    }
}

module.exports = jwtMiddleware
