const ProductServices = require("../../services/admin/ProductServices");

const productControllers = {
    add: async (req, res) => {
        const { prodName, briefdescribe, detaildescribe, editTime } = req.body
        //前端上传过来的没处理之前的图片路径 blob:http://localhost:8080/14c84263-84b1-4117-ae0c-d12c0c028cd6
        //但是我们需要的是文件夹路径 所以修改为：/coveruploads/0db4b719c6581368e477ca25f972a877
        const prodImage = req.file ? `/productuploads/${req.file.filename}` : ""
        await ProductServices.add({
            prodName, briefdescribe, detaildescribe, editTime: new Date(), prodImage
        })
        res.send({ ActionType: "ok" })
    },
    list: async (req, res) => {
        const data = await ProductServices.list(req.params.id)
        res.send({ ActionType: "ok", data })
    },
    delete: async (req, res) => {
        await ProductServices.delete(req.params.id)
        res.send({ ActionType: "ok" })
    },
    upload: async (req, res) => {
        const prodImage = req.file ? `/productuploads/${req.file.filename}` : ""
        const { prodName, briefdescribe, detaildescribe, _id, editTime } = req.body
        await ProductServices.upload({ prodName, briefdescribe, detaildescribe, _id, editTime: new Date(), prodImage })
        res.send({ ActionType: "ok" })
    }
}

module.exports = productControllers