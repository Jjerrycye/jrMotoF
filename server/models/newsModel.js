const mongoose = require('mongoose')

const Schema = mongoose.Schema

const NewsType = {
    title: String,//机车标题
    content: String,//内容
    category: Number, //1:最新动态 2:典型案例 3:通知公告
    cover: String,//封面图
    isPublish: Number,// 0 未发布 1 已发布
    editTime: Date //编辑时间
}

//news 为要建的表名
const NwesModel = mongoose.model('news', new Schema(NewsType))

module.exports = NwesModel