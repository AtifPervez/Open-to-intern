const mongoose = require('mongoose')
const collegeModel=require('./collegeModel')
const ObjectId = mongoose.Schema.Types.ObjectId
const internSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    mobile: {
        type: Number,
        trim: true
    },
    email:{
        type:String,
        unique:true,
        trim:true
    },
    college:{
     type:ObjectId,
     ref:'college'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }



}, { timestamps: true })
module.exports = mongoose.model('intern', internSchema)