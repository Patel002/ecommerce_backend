const category_model = require("../models/category.model")

/**
 * logic of controller for creating category 
 */

exports.createNewCategory = async (req,res) =>{
      
    //read the request body
    
    //create the category object
    const cat_data = {
        name : req.body.name,
        description : req.body.description
    }

    try {
        //insert data in mongoDb
       const category = await category_model.create(cat_data)
        return res.status(201).send(category)
        
    } catch (error) {
        console.log("Error while creating category",error);
             return res.status(500).send({
            message : "Error while creating the category"
        })
    }
    
    //return respone create category

}

/**
 * controller for fetch all categories
 */

exports.getAllCategory = async(req,res)=>{
try {
    const Category = await category_model.find()
    res.status(201).send(Category)
} catch (error) {
    console.log(error);
    res.status(500).send({
        message:"currantly there is No any Category is present"
    })
}

}

/**
 * update category
 */

exports.updatedCategory = async(req,res)=>{

    try {
        const {id} = req.params
        const update = {
            name :req.body.name,
            description : req.body.description
        } 

        const categories = await category_model.findByIdAndUpdate(id,update , {new : true})

        if(!id){
            res.status(500).send({
                message:"id is Wrong!"
            })
        }
        const updatCategory = await category_model.findById(id)
        res.status(201).send(updatCategory)

    } catch (error) {
        console.log(error);
        res.status(500).send({
            massage:"Category not updated"
        })
}
}