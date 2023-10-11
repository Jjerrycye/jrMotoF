const WebUserServices = require("../../services/web/WebUserServices")
const JWT = require("../../utils/JWT")
const WebUserController = {
    //用户注册
    register: async (req,res) =>{
        const {username,password,gender,birthday} = req.body
        const avatar = req.file ? `/webuser/avataruploads/${req.file.filename}` : ""
        //把数据向servers层传过去
        await WebUserServices.register({req,res,username,password,gender,birthday,avatar})
    },
    //用户登录
    login: async (req,res) =>{
        const user = await WebUserServices.login(req.body.userInfo)
        try{
            //判断用户是否存在
            if(!user){
               return res.status(400).send({
                    message:"用户名不存在，请先注册~"
                })
            }
            //用户存在 判断用户名密码是否一致
            const pwdCompare = require("bcrypt").compareSync(req.body.userInfo.password,user.password)
            if(!pwdCompare){
                return res.status(400).send({
                    message:"密码错误"
                })
            }
            //密码校验成功设置token返回给前端
            const token = JWT.generate({
                _id:user._id,
                username:user.username
            },"10s")
            // 把token加在响应体中
            res.header("Authorization",token)
            return res.status(201).send({
                message:"登录成功",
                userInfo:{
                    id:user._id,
                    username:user.username,
                    gender:user.gender,
                    birthday:user.birthday,
                    avatar:user.avatar,
                }
            })
        }catch (e) {
           return res.status(500).send({
                message:"登录失败"
            })
        }
    }
}

module.exports = WebUserController