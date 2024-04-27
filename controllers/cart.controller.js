const Cart = require("../models/cart.model")
const Category = require("../models/category.model")
const Product = require("../models/product.model")


/**
 * create new cart 
 */

exports.createNewCart = async (req,res)=>{

    const cartObj={
        product : req.body.product,
        total : req.body.total
    }

try {
    const cart = await Cart.create(cartObj)
     return res.status(201).send(cart)
    
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success : false,
        message : "Cart is Empty"
    })
    
}

}

/**
 * update cart
 */

exports.updateCart = async (req,res)=>{
    try {
        const cart =  await Cart.findOne({_id : req.params.id}).populate('product')

        cart.products = req.body.products ? req.body.products : cart.products

        if(cart.products){
            let cost = 0
            for( p of cart.products ){
                console.log(p)
                prod =  await Product.findOne({name : p})
                console.log(prod.cost)
                cost += prod.cost
            }
            console.log(cost)
            cart.total_cost = cost
        }
        
        updated_cart = await cart.save()
        console.log(`#### Cart '${cart._id}' updated ####`);
        res.status(200).send(cart);
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            massage :"Internal Server Error While Updating Cart"
        })
        
    }
}