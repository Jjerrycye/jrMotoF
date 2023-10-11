var express = require('express');
const UserController = require('../../controllers/admin/UserController');
var UserRouter = express.Router();

//Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件
const multer = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })

/* GET users listing. */
//用户登录
UserRouter.post("/adminapi/user/login", UserController.login)

//更新用户信息
UserRouter.post("/adminapi/user/upload", upload.single('file'), UserController.upload)

//添加用户
UserRouter.post("/adminapi/user/adduser", upload.single("file"), UserController.addUser)

//获取用户列表数据
UserRouter.get("/adminapi/user/userlist", UserController.getUserList)
//根据id获取用户
UserRouter.get("/adminapi/user/userlist/:id", UserController.getUserList)
//更新用户
UserRouter.put('/adminapi/user/putlist/:id', UserController.putlist)

//删除用户
UserRouter.delete("/adminapi/user/delete/:id", UserController.deleteUser)

module.exports = UserRouter;
