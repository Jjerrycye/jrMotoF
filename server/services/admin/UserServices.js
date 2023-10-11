const UserModel = require("../../models/UserModel")

const UserServices = {
    login: async ({ username, password }) => {
        return UserModel.find({ username, password })
    },
    upload: async ({ _id, username, introduction, gender, avatar }) => {
        //判断avatar为真 , 为真就是重新上传了新头像 就把头像也返回
        if (avatar) {
            //mongodb updateOne 更新数据语法 updateOne({要更新字段的id},{要更新的内容})
            return UserModel.updateOne({ _id }, { username, introduction, gender, avatar })
        } else {
            //为假就是用户没有修改头像 就别把avatar返回
            return UserModel.updateOne({ _id }, { username, introduction, gender })
        }
    },
    addUser: async ({ username, password, introduction, role, gender, avatar }) => {
        //mongodb updateOne 更新数据语法 create({要更新的内容})
        return UserModel.create({ username, password, introduction, role, gender, avatar })
    },
    getUserList: async ({ id }) => {
        //获取数据库指定列表数据的语法：
        return id ? UserModel.find({ _id: id }, ["username", "introduction", "role", "password"]) : UserModel.find({}, ["avatar", "username", "gender", "introduction", "role"])

    },
    deleteUser: async ({ _id }) => {
        return UserModel.deleteOne({ _id })
    },
    putlist: async ({ body }) => {
        return UserModel.updateOne({ _id: body._id }, body)

    }


}

module.exports = UserServices