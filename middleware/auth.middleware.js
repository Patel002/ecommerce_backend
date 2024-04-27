/**
 * create middleware to check request
 */

const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const config = require("../configs/auth.config")

const verifySignUpBody = async (req,res,next)=>{

    try {
    //check user name
        if (!req.body.name) {
           return res.status(400).send({
            message : "please provide name in request body"
           })  
        }

        //check userId

        if (!req.body.userId) {
           return res.status(400).send({
            message : "please provide userId in request body"
           })  
        }


        if (!req.body.email) {
           return res.status(400).send({
            message : "please provide email in request body"
           })  
        }
        
        //check if user is already present with same userId

          const user = await user_model.findOne({userId:req.body.userId})

          if (user) {
            return res.status(400).send({
                message : "sorry!user with same userId is already present"

            })  
          }
          next()



    } catch (error) {
        console.log("Error while validating to request");
        res.status(500).send({
            message:"Failed!! you are signup with same request body"
        })  
    }
}

const verifySigninBody = (req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message : "userId is not provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message : "password is not provided"
        })
    }

    next()
}

    const verifyToken = (req,res,next)=>{

    //check if user have token or not in the header

    const token = req.headers['x-access-token']

    if(!token){
        res.status(403).send({
            message : "No token found : UnAuthorized"
        })
    }
     //If it's vaild token
     jwt.verify(token,config.secret, async(error,decode)=>{

        if(error){
             return res.status(401).send({
                message : "UnAuthorized!"
            })
        }

        const user = await user_model.findOne({userId : decode.id})
        if(!user){
           return res.status(400).send({
                message : "UnAuthorized , This user for this token does't exist"
            })
        }

        //set the user info in req body
        req.user = user
        next()
     })

}

const isAdmin = (req,res,next)=>{
    const user = req.user
    if(user && user.userType == "ADMIN"){
    next()
   }else{
    return res.status(403).send({
        message : "Only Admin users are allowed to access"
    })
   }
}

module.exports ={
    verifySignUpBody : verifySignUpBody,    
    verifySigninBody : verifySigninBody,
    verifyToken : verifyToken,
    isAdmin : isAdmin
}