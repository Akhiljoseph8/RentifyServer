const mongoose = require('mongoose')
const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Atlas Connection successfull")
}).catch((err)=>{
    console.log("MongoDB connection failed")
    console.log(err)
})