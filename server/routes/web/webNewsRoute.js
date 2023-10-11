const express = require('express')
const multer = require("multer")
const webNewsRouter = express.Router()
const webNewsControllers = require('../../controllers/web/webNewsControllers')

//Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件
// const upload = multer({ dest: 'public/coveruploads/' })

webNewsRouter.get("/webapi/news/newslist", webNewsControllers.newslist)
webNewsRouter.get("/webapi/news/newslist/:id", webNewsControllers.newslist)


module.exports = webNewsRouter
