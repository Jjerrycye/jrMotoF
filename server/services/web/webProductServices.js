const productModel = require("../../models/productModel")
const webProductServices = {
    getlist: async () => {
        return productModel.find()
    }
}

module.exports = webProductServices