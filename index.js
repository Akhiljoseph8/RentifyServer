//to load .env content into process.env
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Router/routes')
require('./DB/connection')
//creating server
const app = express()
const path = require("path");

//configuring cors in server
app.use(cors())
app.use(express.json())
app.use(router)
app.use('/uploads',express.static('./uploads'))


const PORT = 3000

//to run server
app.listen(PORT, () => {
    console.log(`server is running at:${PORT}`)
})

app.get('/', (req, res) => {
    res.status(200).send("<h1>The request is hit at server..</h1>")
})