const express = require("express")
const WebMotofRouter = express.Router()
const WebMotoFController = require("../../controllers/web/WebMotoFController")
//Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件
const multer = require('multer')
const upload = multer({ dest: 'public/webData/article/' })

//发布朋友圈
WebMotofRouter.post("/webapi/motof/publishmotof",upload.array('files',9),WebMotoFController.publish)

module.exports = WebMotofRouter