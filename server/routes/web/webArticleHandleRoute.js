const express = require("express")
const webArticleHandleRoute = express.Router()
const webArticleHandleControllers = require("../../controllers/web/webArticleHandleControllers")

//文章评论
webArticleHandleRoute.post("/webapi/articlehandle/commentart",webArticleHandleControllers.pubComment)


module.exports = webArticleHandleRoute