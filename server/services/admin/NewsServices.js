const NwesModel = require("../../models/newsModel")

const NewsServices = {

    newsadd: async ({ title, content, category, cover, isPublish, editTime }) => {
        return NwesModel.create({ title, content, category, cover, isPublish, editTime })
    },
    newslist: async ({ _id }) => {
        return _id ? NwesModel.find({ _id }) : NwesModel.find()
    },
    isPublish: async ({ _id, isPublish }) => {
        return NwesModel.updateOne({ _id }, { isPublish, editTime: new Date() })
    },
    deletenews: async ({ _id }) => {
        return NwesModel.deleteOne({ _id })
    },
    upload: ({ title, content, category, _id, editTime, cover }) => {
        if (cover) {
            return NwesModel.updateOne({ _id }, { title, content, category, editTime, cover })
        } else {
            return NwesModel.updateOne({ _id }, { title, content, category, editTime })
        }

    }
}

module.exports = NewsServices