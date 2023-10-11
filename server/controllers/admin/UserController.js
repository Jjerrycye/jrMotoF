const UserServices = require("../../services/admin/UserServices");
const JWT = require("../../utils/JWT")


const UserController = {
    login: async (req, res) => {
        //处理数据库函数
        const result = await UserServices.login(req.body)
        //UserController返回数据
        if (result.length === 0) {
            res.send({ code: "-1", error: "用户名密码不匹配" })
        } else {
            //设置token
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username
            }, "1d")
            //在响应头里加上token
            res.header("Authorization", token)
            res.send({
                ActionType: "ok",
                data: {
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0,// 0保密 1男 2女
                    introduction: result[0].introduction,//用户介绍
                    avatar: result[0].avatar,//头像
                    role: result[0].role//用户身份
                }
            })
        }

    },
    upload: async (req, res) => {
        const { username, gender, introduction } = req.body
        // 后端是拿不到multipart/form-data 类型的表单数据 所以要使用第三方插件Multer
        console.log(req.body, req.file);
        // 拿到登录者id
        const token = req.headers["authorization"].split(" ")[1]
        var payload = JWT.verify(token)

        //拿到头像数据
        //判断req.file是否为空 为空的话如果用户不修改头像点击提交会报错
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""

        //拿到数据后调用Servers模块更新数据库
        await UserServices.upload({ _id: payload._id, username, introduction, gender: Number(gender), avatar })

        if (avatar) {
            //判断avatar为真 就连头像一起返回
            res.send({ ActionType: "ok", data: { username, gender: Number(gender), introduction, avatar } })
        } else {
            //判断avatar为假 就不返回头像信息
            res.send({ ActionType: "ok", data: { username, gender: Number(gender), introduction } })
        }
    },
    addUser: async (req, res) => {
        const { username, password, introduction, role, gender } = req.body
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""
        //把数据向servers层传过去
        await UserServices.addUser({ username, password, introduction, role: Number(role), gender: Number(gender), avatar })
        res.send({ ActionType: "ok" })

    },
    getUserList: async (req, res) => {
        const result = await UserServices.getUserList(req.params)
        res.send({ ActionType: "ok", data: result })
    },
    deleteUser: async (req, res) => {
        //通过req.params可以获取到路径携带的参数
        // console.log(req.params);
        await UserServices.deleteUser({ _id: req.params.id })
        res.send({ ActionType: "ok" })
    },
    putlist: async (req, res) => {
        await UserServices.putlist({ body: req.body })
        res.send({ ActionType: "ok" })
    }
}

module.exports = UserController