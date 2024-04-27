const { Router } = require('express')
const product = require('../controllers/product.controller')
const authMw = require('../middleware/auth.middleware')

module.exports = (app)=> {
    app.post("/ecomm/api/v1/product",[authMw.verifyToken,authMw.isAdmin],product.createProduct)
    
    //get all product
    app.get("/ecomm/api/v1/get-product/",product.getProduct)

}