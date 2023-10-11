const mongoose = require("mongoose")

const Schema = mongoose.Schema

const MotoFriend = new Schema({
    //图片
    image:[
        {
            filename:String,
            mimetype:String,
            buffer:String,
            url:String,
            size:String
        }
    ],
    //文章内容
    message:String,
    //文章作者传作者的id 创建关联表 关联了webUser表种的id
    author:{type:Schema.Types.ObjectId,ref:"webUser"},

})

const MotoFriendModel = mongoose.model("moto_friend",MotoFriend)

module.exports = MotoFriendModel