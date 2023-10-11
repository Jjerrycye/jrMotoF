var express = require('express');
const productControllers = require("../../controllers/admin/productControllers")
var ProductRouter = express.Router();

//Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件
const multer = require('multer')
const upload = multer({ dest: 'public/productuploads/' })

/* GET users listing. */
//添加产品
ProductRouter.post("/adminapi/product/add", upload.single("file"), productControllers.add)
//产品列表数据
ProductRouter.get("/adminapi/product/list", productControllers.list)
ProductRouter.get("/adminapi/product/list/:id", productControllers.list)
//删除产品
ProductRouter.delete("/adminapi/product/delete/:id", productControllers.delete)
//更新产品信息
ProductRouter.post("/adminapi/product/upload/:id", upload.single("file"), productControllers.upload)

module.exports = ProductRouter;
