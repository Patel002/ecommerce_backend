const cart = require("../controllers/cart.controller")
const authMw = require("../middleware/auth.middleware")


module.exports = (app)=>{
    app.post("/ecomm/api/v1/carts",[authMw.verifyToken],cart.createNewCart)
    app.put("/ecomm/api/v1/carts/:id", [authMw.verifyToken ], cart.updateCart)
}