import axios from "axios"
import store from "@/store";

const http = axios.create({
    timeout:3000
})

http.interceptors.request.use(config =>{
    const authorization = localStorage.getItem("token")
    config.headers.authorization = `Bearer ${authorization}`
    return config
},error => {
    return Promise.reject(error)
})

http.interceptors.response.use(response =>{
    //获取后端token
    const {authorization} = response.headers
    //把token存到localStorage中
    authorization && localStorage.setItem("token",authorization)
    return response
},error =>{

    //如果token过期
    if (error.response.status === 401) {
        //清除token
        localStorage.removeItem("token")
        //删除用户信息
        store.commit("removeUserInfo")
        window.location.href = "#/login"
    }

    return Promise.reject(error);
})

export default http
