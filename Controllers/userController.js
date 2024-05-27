const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const mailer = require('nodemailer')

exports.userRegister = async (req, res) => {
    const { username, email, password, phone } = req.body

    try {
        const existingUser = await users.findOne({ email })
        const phoneNumber = await users.findOne({ phone })
        if (existingUser) {
            res.status(406).json("User already exist")
        } else if (phoneNumber) {
            res.status(406).json("Phone number already used")
        }
        else {
            const newUser = new users({
                username: username, password: password, email: email, phone: phone
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(404).json(err)
    }

}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email, password })

        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.secretKey)

            res.status(200).json({ token, user: existingUser.username, userId: existingUser._id })
        } else {
            res.status(406).json("Invalid username/password")
        }
    }
    catch (err) {
        res.status(404).json(err)
    }
}

exports.sellerData = async (req, res) => {
    const { userId } = req.body
    try {
        const user = await users.findOne({ _id: userId })
        res.status(200).json({ username: user.username, email: user.email, phone: user.phone })

    }
    catch (err) {
        res.status(404).json(err)
    }
}

exports.mail = async (req, res) => {
    const { userId } = req.body
    const user = req.payload
    try {
        const seller = await users.findOne({ _id: userId })
        const buyer = await users.findOne({ _id: user })
        const transporter = mailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'akhiljosephaj85@gmail.com',
                pass: 'guursfooaguugpeg'
            }
        })

        var mailOptions = {
            from: buyer.email,
            to: seller.email,
            subject: "Rentify, User interested your property",
            text: `Buyer name: ${buyer.username}, Email: ${buyer.email}, Phone: ${buyer.phone}`
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
            } else {
                console.log("Mail send successfully")
            }
        })
        var mailOptions2 = {
            from: seller.email,
            to: buyer.email,
            subject: "Rentify, Seller Details",
            text: `Seller name: ${seller.username}, Email: ${seller.email}, Phone: ${seller.phone}`
        }
        transporter.sendMail(mailOptions2, (err, info) => {
            if (err) {
            } else {
                console.log("Mail send successfully")
            }
        })
        res.status(200).json("successfull")
    } catch (err) {
        res.status(404).json(err)
    }
}