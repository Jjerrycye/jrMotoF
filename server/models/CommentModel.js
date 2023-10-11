const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentType = {
    //评论内容
    comment:String,
    //评论文章id 关联到文章表id
    article_id:{type:Schema.Types.ObjectId,ref:"articles"},
    // 评论用户id 关联到用户表id
    comment_user_id:{type:Schema.Types.ObjectId,ref:"webUser"}
}

const CommentModel = mongoose.model("comment",new Schema(commentType))

module.exports = CommentModel