const ArticleModel = require("../../models/ArticleModel")
const ArticleServices = {
    publishArt:async ({title,content,tag,author,views})=>{
        //查询作者关联文章
        // ArticleModel.find().populate("author").then(res=>{
        //     console.log(res)
        // })
        //
        // ArticleModel.find({}).populate("coms").populate("author").then(res=>{
        //     console.log(res)
        // })
        return ArticleModel.create({title,content,tag,author, views })
        //
    },
    //获取所有文章
    getArticleList: async ()=>{
        return ArticleModel.find().populate("author")
    }
}

module.exports = ArticleServices
