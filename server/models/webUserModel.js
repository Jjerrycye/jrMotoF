const mongoose = require("mongoose")

const Schema = mongoose.Schema

const webUserType = {
    username: String,
    password: {
        type:String,
        //使用bcrypt对密码进行散列加密 后面的10代表强度
        set(val){
            return require("bcrypt").hashSync(val,10)
        }
    },
    gender: Number,
    birthday:String,
    avatar: String,//头像
}

const webUserModel = mongoose.model("webUser",new Schema(webUserType))

module.exports = webUserModel