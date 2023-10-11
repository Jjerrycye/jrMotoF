import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入Element-plus库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//引入axios.config.js
require("./utils/axios.config")
createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
