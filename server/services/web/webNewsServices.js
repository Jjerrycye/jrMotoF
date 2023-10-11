const NwesModel = require("../../models/newsModel")

const webNewsServices = {

    newslist: async ({ _id }) => {
        return _id ? NwesModel.find({ _id, isPublish: 1 }) : NwesModel.find({ isPublish: 1 }).sort({ editTime: -1 })//-1最新时间
    }
}

module.exports = webNewsServices