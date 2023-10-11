const ArticleServices = require("../../services/web/ArticleServices")
const ArticleControllers = {
    //文章发布
    publishArt: async (req,res)=>{
        const data = await ArticleServices.publishArt(req.body)
        res.status(200).send({
            msg:"发布成功",
            data
        })
    },
    //获取文章
    getArticleList:async (req,res)=>{
        //服务层
        const data = await ArticleServices.getArticleList()
        console.log(data)
        res.status(200).send({
            msg:"获取文章列表成功",
            data
        })
    }
}

module.exports = ArticleControllers