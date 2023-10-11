const express = require("express")
const ArticleRoute = express.Router()
const ArticleControllers = require("../../controllers/web/ArticleControllers")
//Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件
const multer = require('multer')
const upload = multer({ dest: 'public/webData/article/' })

//发表文章
ArticleRoute.post("/webapi/article/publishart",ArticleControllers.publishArt)
//获取文章列表
ArticleRoute.get("/webapi/article/articlelist",ArticleControllers.getArticleList)



module.exports = ArticleRoute