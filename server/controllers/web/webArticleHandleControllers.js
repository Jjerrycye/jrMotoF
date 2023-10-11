const webArticleHandleServices = require("../../services/web/webArticleHandleServices")
const webArticleHandleControllers = {
    pubComment:async (req,res)=>{
        const data = await webArticleHandleServices.pubComment(req.body)
        res.send({
            msg:"ok",
            data
        })
    }
}

module.exports = webArticleHandleControllers