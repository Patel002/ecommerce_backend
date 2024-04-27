/**
 * logic to register user
 */
const bcrypt = require("bcryptjs")
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const secret = require("../configs/auth.config")

exports.signup = async function (req,res){
     
    //read the request
    const request_body = req.body

    //inserting data in the user 
    const userObj={
        name:request_body.name,
        userId:request_body.userId,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password,8),
        email:request_body.email
    }

    try{
        const user_created = await user_model.create(userObj)

        const res_obj ={
            name:user_created.name,
            userId:user_created.userId,
            userType:user_created.userType,
            email:user_created.email
        }

        //return this user
       return  res.status(201).send(res_obj)

    }catch(err){
        console.log("error while registering the user",err)
       return res.status(406).send({
            message :"some error while registering the user"
        })
    }
}

exports.signin = async (req,res) =>{

    // check if user id is slready present in system

    const user = await user_model.findOne({userId:req.body.userId})

    if(user == null){
        return res.status(400).send({
            message:"user id passed is not valid user id"
        })
    }

    //check enterd password is right or wrong

    const isPasswordvaild = bcrypt.compareSync(req.body.password ,user.password)
    if(!isPasswordvaild){
        res.status(401).send({
            message:"enter valid the password"
        })
    }

    //using jwt we will created token with a given TTL and return

    const token = jwt.sign({id : user.userId},secret.secret,{
        expiresIn : 100
    })

    res.status(200).send({
        name : user.name,
        userId:user.userId,
        userType :user.userType,
        email:user.email,
        accessToken : token
    })
}
