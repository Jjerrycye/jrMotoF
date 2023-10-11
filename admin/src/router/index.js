import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import routes_config from '@/router/config'
import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'

import store from '@/store'

const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'mainBox',
    path: '/mainBox',
    component: MainBox
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//添加路由守卫(拦截)，在每一次切换路由时调用
router.beforeEach((to, from, next) => {

  if (to.name === "login") {
    next()
  } else {
    //验证有没有携带登录信息
    if (!localStorage.getItem("token")) {
      //没有就重定向到登录页
      next({ path: '/login' })
    } else {
      //判断是否是第一次配置 这个第一次的状态得让全局看见 所以存在vuex中
      if (!store.state.isGetRouter) {
        router.removeRoute("mainbox")//为路由权限做的 保证路由不是重复的添加
        //不是的话就配置一遍路由
        configRouter()
        next({ path: to.fullPath })
      } else {
        //是的话就直接放行
        next()
      }
    }
  }

})

//动态添加子路由
const configRouter = () => {

  if (!router.hasRoute("mainBox")) {
    router.addRoute({
      name: 'mainBox',
      path: '/mainBox',
      component: MainBox
    })
  }

  routes_config.forEach(item => {
    checkPermission(item) && router.addRoute('mainBox', item)
  });

  //改变isGetRouter的值为true
  store.commit("changeGetRouter", true)

}


const checkPermission = (item) => {
  if (item.requireAdmin) {
    return store.state.userInfo.role === 1
  } else {
    return true
  }

}



export default router
