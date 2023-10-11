const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const { defineConfig } = require('@vue/cli-service')

// 环境变量的引入
const isAnalyzeMode = !!process.env.ANALYZE_MODE

module.exports = defineConfig({
  assetsDir: 'static',//打包后将静态资源放入static文件夹中
  // publicPath: '././',
  publicPath: process.env.NODE_ENV === 'production' ? '././' : "/",
  transpileDependencies: true,
  devServer: {
    proxy: {
      //  '/users'为请求前缀，用于控制是不是走代理，想走代理时就在请求前缀前边加上这个请求前缀
      "/adminapi": {
        target: 'http://localhost:3000',
        changeOrigin: true//用于控制请求头中的host值
      }
    }
  },

  configureWebpack: (config) => {
    if (isAnalyzeMode) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          //生成静态文件
          analyzerMode: 'static',
        })
      )
    }
  },

  chainWebpack: (config) => {
    config.when(process.env.NODE_ENV !== "development", config => {
      config.set('externals', {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'element-plus': 'ElementPlus',
        'moment': "moment",
        '@element-plus/icons': '@element-plus/icons',
        "wangeditor": "wangEditor "
      })
      // 给index.html传参
      config.plugin('html').tap(args => {
        args[0].name = '项目标题'
        args[0].useCdn = true
        return args
      })
    })
  }

})

