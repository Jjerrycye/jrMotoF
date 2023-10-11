const NewsServices = require("../../services/admin/NewsServices")

const NewsControllers = {
    newsadd: async (req, res) => {

        //前端上传过来的没处理之前的图片路径 blob:http://localhost:8080/14c84263-84b1-4117-ae0c-d12c0c028cd6
        //但是我们需要的是文件夹路径 所以修改为：/coveruploads/0db4b719c6581368e477ca25f972a877
        const cover = req.file ? `/coveruploads/${req.file.filename}` : ""
        const { title, content, category, isPublish } = req.body
        const data = await NewsServices.newsadd({ title, content, category: Number(category), cover, isPublish: Number(isPublish), editTime: new Date() })

        res.send({ ActiveType: "ok", data })
    },
    newslist: async (req, res) => {
        const data = await NewsServices.newslist({ _id: req.params.id })
        res.send({ ActiveType: "ok", data })
    },
    isPublish: async (req, res) => {
        const { _id, isPublish } = req.body
        await NewsServices.isPublish({ _id, isPublish })
        res.send({ ActiveType: "ok" })
    },
    deletenews: async (req, res) => {
        await NewsServices.deletenews({ _id: req.params.id })
        res.send({ ActiveType: "ok" })
    },
    upload: async (req, res) => {
        const cover = req.file ? `/coveruploads/${req.file.filename}` : ""
        const { title, content, category, _id, editTime } = req.body
        await NewsServices.upload({ title, content, category: Number(category), _id, editTime: new Date(), cover })
        res.send({ ActionType: "ok" })
    }
}

module.exports = NewsControllers