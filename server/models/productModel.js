const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductType = {
    prodName: String,
    briefdescribe: String,
    detaildescribe: String,
    prodImage: String,
    editTime: Date,
    role: Number//用户身份
}

const ProductModel = mongoose.model('product', new Schema(ProductType))

module.exports = ProductModel