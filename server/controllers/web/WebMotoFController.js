const MotoFriendModel = require("../../models/MotoFriendsModel")
const WebMotoFController = {
    //发布摩友圈动态
    publish: async (req,res)=>{
        const files = req.files;
        console.log(files)
        console.log(req.body.postText)
        try{
            const data = {
                files:[],
                message:req.body.postText
            }

            // 添加上传的文件到data中
            for (const file of req.files) {
                //判断req.files是否为空 为空的话如果用户不修改头像点击提交会报错
                const url = req.files ? `/webData/article/${file.filename}` : ""
                data.files.push({
                    filename:file.filename,
                    mimetype:file.mimetype,
                    buffer:file.buffer,
                    url:url,
                    size:file.size
                })
            }

            await MotoFriendModel.create(data)
            res.send({
                msg:"请求成功",
                data
            })
        }catch (e) {
        console.error(e)
            res.send({
                msg:"上传失败",
            })
        }
    }
}

module.exports = WebMotoFController