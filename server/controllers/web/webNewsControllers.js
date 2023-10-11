const webNewsServices = require("../../services/web/webNewsServices")

const webNewsControllers = {

    newslist: async (req, res) => {
        const data = await webNewsServices.newslist({ _id: req.params.id })
        res.send({ ActiveType: "ok", data })
    }
}

module.exports = webNewsControllers