const express = require("express")
const webProductRoute = express.Router()
const webProductControllers = require("../../controllers/web/webProductControllers")

webProductRoute.get("/webapi/product/list", webProductControllers.getlist)

module.exports = webProductRoute