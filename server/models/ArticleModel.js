const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ArticleType = new Schema({
    //文章标题
    title:String,
    //文章内容
    content:String,
    //文章归属
    tag:String,
    //文章作者传作者的id 创建关联表 关联了webUser表种的id
    author:{type:Schema.Types.ObjectId,ref:"webUser"},
    //文章浏览量
    views:{
        type:Number,
        default:0,
    },

})

ArticleType.virtual("coms",{
    //关联评论表
    ref:"comment",
    //用文章表中的_id字段去关联表
    localField:"_id",
    //外键 意思就是要去关联评论表的哪个字段
    foreignField:"article_id",
    //false把所有的都取出来并返回一个Array,true只会取出第一条
    justOne:false,
    //true显示数组的长度
    count:true
})

//加上下面这两句 虚拟字段才可以显性的看到,不然只能隐性使用
ArticleType.set("toObject",{virtuals:true});
ArticleType.set("toJSON",{virtuals:true});

const ArticleModel = mongoose.model("article",ArticleType)
module.exports = ArticleModel


