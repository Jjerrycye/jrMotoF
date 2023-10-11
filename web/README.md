# 摩友圈

### 用户数据

​	用户数据：

```
用户名：username
密码：password
出生日期：birthday
性别：gender
地点：adress
头像:avatar
粉丝数：fans
获赞：liked
点赞：likes
收藏：collect
```

​	摩友圈文章数据

```
const Article = {
    //文章标题
    title:String,
    //文章内容
    content:String,
    //文章归属
    tag:String,
    //文章作者
    author:String,
    //文章浏览量
    views:{
        type:Number,
        default:0,
    },
    {
        //启动时间戳
        timestamps:true
    }
}

```



------



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```



### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
