var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//允许跨域
const cors = require("cors")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var UserRoute = require('./routes/admin/UserRoute');
var NewsRoute = require("./routes/admin/NewsRoute")
var ProductRouter = require("./routes/admin/ProductRoute")
var webNewsRouter = require("./routes/web/webNewsRoute")
var webProductRoute = require("./routes/web/webProtuctRoute")
var webUserRoute = require("./routes/web/webUserRoute")
const JWT = require('./utils/JWT');
const ArticleRoute = require("./routes/web/ArticleRoute");
const webArticleHandleRoute = require("./routes/web/webArticleHandleRoute")
const webMotofRoute = require("./routes/web/WebMotofRoute")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//不需要token验证的路由
app.use(webNewsRouter)
app.use(webProductRoute)
//注册web文章路由
app.use(ArticleRoute)

// 摩友圈动态
app.use(webMotofRoute)
//测试路由
app.use(webArticleHandleRoute)

/**
 * /adminapi ---后台系统用
 * /webapi --- 企业官网用
 * 
 */

// 验证token的有效性中间键
app.use((req, res, next) => {
  //如果token有效 ,就next
  //如果token无效 ,就返回401错误
  //首次登录是没token的 所以要判断是否为login路由
  console.log(req.url);
  if (req.url === "/adminapi/user/login" || req.url === "/webapi/product/list" || req.url === "/webapi/user/login") {
    next()
    return
  }
  const token = req.headers["authorization"].split(" ")[1]
  //判断是否有token
  if (token) {
    var payload = JWT.verify(token)
    // 判断token是否过期
    if (payload) {
      const newToken = JWT.generate({
        _id: payload._id,
        username: payload.username
      }, "1d")
      //没有过期就新生成newToken发给前端
      res.header("Authorization", newToken)
      next()
    } else {
      res.status(401).send({ errCode: "-1", errorInfo: "token已过期" })
    }
  }

})

//以下路由是要经过token验证中间件才注册
//注册UserRoute路由
app.use(UserRoute)
//注册NewsRoute路由
app.use(NewsRoute)
//注册ProductRouter路由
app.use(ProductRouter)
//注册webUserRoute路由
app.use(webUserRoute)
//注册点赞 评论 等路由 因为以上操作需要判断用户是否登录
// app.use(webArticleHandleRoute)




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


// 100：继续
// 200：成功
// 400：错误请求
// 401：未授权
// 403：服务器拒绝请求，禁止
// 404：服务器找不到请求的网页
// 405：禁止请求中指定的方法
// 408：请求超时
// 414：请求的网址URL过长，服务器无法处理
// 500：服务器内部错误
// 505：服务器不支持请求中所用的http协议版本