const mongoose = require('mongoose')

const propertySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    rent:{
        type:String,
        required:true
    },
    bedroom:{
        type:Number,
        required:true
    },
    bathroom:{
        type:Number,
        required:true
    },
    hospital:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    likes: {
        type: Number, 
        default: 0 
    }
})

const property=mongoose.model('properties',propertySchema)
module.exports=property