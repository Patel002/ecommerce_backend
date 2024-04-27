const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({

    product : {
        type : [String],
        //ref : 'Product',
        //required : true
        default:[]
    },
    total_cost :{
        type : Number,
        default:0
    }
}, {timestamps : true , versionKey:false})

module.exports = mongoose.model("Cart",cartSchema)