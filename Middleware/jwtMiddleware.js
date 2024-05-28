const jwt = require('jsonwebtoken')
const jwtMiddleware = (req, res, next) => {
     const secretKey="secretkey123"
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (token) {
            const result = jwt.verify(token, secretKey)
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
