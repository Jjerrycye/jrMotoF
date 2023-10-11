const webUserModel = require("../../models/webUserModel")
const webUserServices = {
    register: async ({req,res,username,password,gender,birthday,avatar})=>{
        //查询数据库里用户名是否存在.findOne({username})
        const user = await webUserModel.findOne({username})
        try{
            if(user){
                return res.status(400).send({
                    message:"用户名已存在"
                })
            }
            res.status(201).send({
                message:"注册成功"
            })
            return webUserModel.create({username,password,gender,birthday,avatar})
        }catch (e) {
           res.status(500).send({
               message:"注册失败"
           })
        }

    },
    login:async({username,password}) =>{
        return webUserModel.findOne({username})
    }
}

module.exports = webUserServices