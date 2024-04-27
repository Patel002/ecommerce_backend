/**
 * localhost:7777/ecomm/api/v1/auth/signup
 */

const authController = require("../controllers/auth.controller")
const authMw = require("../middleware/auth.middleware")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authMw.verifySignUpBody], authController.signup)

    /**
     * post for localhost:2211/ecomm/api/v1/auth/signin
     */

    app.post("/ecomm/api/v1/auth/signin",[authMw.verifySigninBody],authController.signin)
}