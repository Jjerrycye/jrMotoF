const ProductModel = require("../../models/productModel")
const ProductServices = {
    add: async ({ prodName, briefdescribe, detaildescribe, prodImage, editTime }) => {
        return ProductModel.create({ prodName, briefdescribe, detaildescribe, prodImage, editTime })
    },
    list: async (_id) => {
        return _id ? ProductModel.find({ _id }) : ProductModel.find()
    },
    delete: async (_id) => {
        return ProductModel.deleteOne({ _id })
    },
    upload: async ({ prodName, briefdescribe, detaildescribe, _id, editTime, prodImage }) => {
        if (prodImage) {
            return ProductModel.updateOne({ _id }, { prodName, briefdescribe, detaildescribe, editTime, prodImage })

        } else {
            return ProductModel.updateOne({ _id }, { prodName, briefdescribe, detaildescribe, editTime })

        }

    }
}

module.exports = ProductServices