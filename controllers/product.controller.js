const product_model  =  require('../models/product.model')


exports.createProduct = async (req,res)=>{

    const productData = {
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        quantity : req.body.quantity
    }

    try {

        const product =  await product_model.create(productData)
        return res.status(201).send(product)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error while creating product"
        })
        
    }
}

exports.getProduct = async (req,res)=>{
    try {
        const getAllProducts = await product_model.find({}).populate('category')
        return res.status(201).send({
            sucess : true,
            counTotal : this.getProduct.length,
            message : "show all product",
            getAllProducts
    })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            sucess : false,
            massage :"Sorry!We don't find product"
        })
    }
}
