const express = require("express")
const webUserRoute = express.Router()
const WebUserController = require("../../controllers/web/WebUserController")
//Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件
const multer = require('multer')
const upload = multer({ dest: 'public/webuser/avataruploads/' })

//用户注册
webUserRoute.post('/webapi/user/register',upload.single("file"),WebUserController.register)
//用户登录
webUserRoute.post("/webapi/user/login",WebUserController.login)


module.exports = webUserRoute
