const mongoose = require("mongoose")

/**
 * define schema for collection for storing data in database
*/

const userSchema = new mongoose.Schema({

    name :{
        type : String,
        required : true
    },
    userId:{
        type:String,
        required : true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        minLength:12,
        unique:true
    },
    userType:{
        type:String,
        required:true,
        default:"CUSTOMER",
        enum:["ADMIN","CUSTOMER"]
    }

},{timestamps:true , versionKey:false})

module.exports = mongoose.model("User",userSchema)