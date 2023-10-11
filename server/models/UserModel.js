const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserType = {
    username: String,
    password: String,
    gender: Number,
    introduction: String,//用户介绍
    avatar: String,//头像
    role: Number//用户身份
}

const UserModel = mongoose.model('user', new Schema(UserType))

module.exports = UserModel