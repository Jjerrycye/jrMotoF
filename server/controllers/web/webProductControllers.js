const webProductServices = require("../../services/web/webProductServices")
const webProductControllers = {
    getlist: async (req, res) => {
        const data = await webProductServices.getlist()
        res.send({ ActionType: "ok", data })
    }
}

module.exports = webProductControllers