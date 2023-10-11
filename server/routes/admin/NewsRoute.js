const express = require('express')
const multer = require("multer")
const NewsRouter = express.Router()
const NewsControllers = require('../../controllers/admin/NewsControllers')

//Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件
const upload = multer({ dest: 'public/coveruploads/' })

NewsRouter.post("/adminapi/news/addnews", upload.single('file'), NewsControllers.newsadd)
NewsRouter.get("/adminapi/news/newslist", NewsControllers.newslist)
NewsRouter.get("/adminapi/news/newslist/:id", NewsControllers.newslist)
NewsRouter.post("/adminapi/news/upload/:id", upload.single("file"), NewsControllers.upload)
NewsRouter.put("/adminapi/news/ispublish", NewsControllers.isPublish)
NewsRouter.delete(`/adminapi/news/deletenews/:id`, NewsControllers.deletenews)


module.exports = NewsRouter
