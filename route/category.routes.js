/**
 * localhost:7777/ecomm/api/v1/categories
 */

const category_controller = require("../controllers/category.controller")
const authMw = require("../middleware/auth.middleware")

module.exports = (app) => {
    app.post("/ecomm/api/v1/categories",[authMw.verifyToken, authMw.isAdmin],category_controller.createNewCategory)
    app.get("/ecomm/api/v1/categories",[authMw.verifyToken],category_controller.getAllCategory)
    app.put("/ecomm/api/v1/categories/:id",[authMw.verifyToken,authMw.isAdmin],category_controller.updatedCategory)
}