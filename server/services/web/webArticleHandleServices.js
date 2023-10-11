const CommentModel = require("../../models/CommentModel")
const webArticleHandleServices = {
    pubComment:async ({comment,article_id,comment_user_id})=>{
        return CommentModel.create({comment,article_id,comment_user_id})
        // CommentModel.find().populate("comment_user_id").then(res=>{
        //     console.log(res)
        // })
    }
}

module.exports = webArticleHandleServices