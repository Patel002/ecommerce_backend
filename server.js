/**
 * starting file of the project
 */

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")

app.use(express.json())


mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error", function () {
        console.log("database is not connected")
    })

db.once("open", function () {
    console.log("database is connected");
    init()
})

async function init(){
    try{
        let user = await user_model.findOne({name : "admin"})
    
        if(user){
            console.log("Admin is already created");
            return
        }

    }catch(err){
        console.log("error while reading the data",err);
    }


    try {
        user = await user_model.create({
            name:"admin",
            userId:"Admin",
            email:"hydrochloric@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("welcome@db",12)
        })
        console.log("admin created",user);

    } catch (error) {
        console.log("error while creating admin");
    }

}

//stich the route

require("./route/auth.route")(app)
require("./route/category.routes")(app)
require("./route/product.route")(app)
require("./route/cart.route")(app)

/**
 *  start server
*/

app.listen(server_config.PORT,()=>{
    console.log("server started at port num:",server_config.PORT);
})
