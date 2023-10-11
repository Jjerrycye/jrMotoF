const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const isAnalyzeMode = !!process.env.ANALYZE_MODE
let { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  assetsDir: 'static',//打包后将静态资源放入static文件夹中
  // parallel: false,
  publicPath: './',
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  indexPath: 'index.html',

  transpileDependencies: true,
  devServer: {
    proxy: {
      //  '/adminapi'为请求前缀，用于控制是不是走代理，想走代理时就在请求前缀前边加上这个请求前缀
      "/webapi": {
        target: 'http://localhost:3000',
        changeOrigin: true//用于控制请求头中的host值
      }
    }
  },
  configureWebpack: (config) => {
    if (isAnalyzeMode) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          // 生成静态文件
          analyzerMode: 'static',
        })
      )
    }
  },
  chainWebpack: (config) => {
    config.
      when(process.env.NODE_ENV !== 'development',
        config => {
          // 设置哪些资源不需要被打包，改为获取cdn资源
          //要排除的包名
          //key（要排除的包名）: value（实际引入的包的全局变量名）
          //如 因为要排除element-plus 所以后面要引入CDN文件 CDN文件中有ELEMENT的全局变量名
          config.set('externals', {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'axios': 'axios',
            'element-plus': 'ElementPlus',
            'moment': "moment",
            'lodash': 'lodash',
            '@element-plus/icons': '@element-plus/icons'
          })
          // 给index.html传参
          config.plugin('html').tap(args => {
            args[0].name = '机车资讯'
            args[0].useCdn = true
            return args
          })
        }
      )
  }

})
