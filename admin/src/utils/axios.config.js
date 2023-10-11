
import axios from "axios";
import store from "@/store";

// Add a request interceptor 请求之前
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    //每次发请求之前 把token传给后端
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor 响应之前
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const { authorization } = response.headers
    //在每一次响应之前 判断是否有authorization字段 有就将authorization存到localStorage中
    authorization && localStorage.setItem("token", authorization)
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error);
    //如果token过期
    if (error.response.status === 401) {
        //清除token
        localStorage.removeItem("token")

        //跳转到登录页
        alert("身份已过期，请重新登录")
        window.location.href = "#/login"
    }


    return Promise.reject(error);
});