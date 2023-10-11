import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import NewsCenter from "@/views/NewsCenter"
import ProdandServer from "@/views/ProdandServer"
import NewsDetail from "@/components/NewsDetail"
import Register from "@/components/Register/Register.vue"
import Login from "@/components/Login/Login.vue"
import TestApi from "@/views/TestApi.vue";
import MotoFriends from "@/views/MotoFriends.vue";


const routes = [

  {
    name: "Register",
    path: "/register",
    component: Register
  },
  {
    name: "NewsCenter",
    path: "/",
    component: NewsCenter
  },
  {
    name: "ProdandServer",
    path: "/prodandServer",
    component: ProdandServer
  },

  {
    name: "NewsDetail",
    path: "/newsdetail/:id",
    component: NewsDetail
  },
  {
    name:"Login",
    path:"/login",
    component:Login
  },
  {
    name:"TestApi",
    path:"/testapi",
    component:TestApi
  },
  {
    name:"MotoFriends",
    path:"/motofriends",
    component:MotoFriends
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
