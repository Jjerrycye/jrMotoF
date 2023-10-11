<template>
 <el-form :model="userInfo">
     <el-form-item label="用户名:">
         <el-input v-model="userInfo.username"></el-input>
     </el-form-item>
     <el-form-item label="密码:">
         <el-input v-model="userInfo.password"></el-input>
     </el-form-item>
     <el-form-item>
         <el-button @click="login">登录</el-button>
     </el-form-item>

 </el-form>
</template>

<script setup>
import {reactive} from "vue";
import http from "@/utils/http";
import router from "@/router";
import store from "@/store";
const userInfo = reactive({
    username:"",
    password:""
})
const login = async ()=>{
    http.post("/webapi/user/login",{userInfo}).then(res => {
        console.log(res)
        //把用户信息保存到vuex中
        store.commit("setUserInfo",res.data.userInfo)
        router.push("/newsCenter")
    }).catch(err => {
        console.log(err)
    })
}


</script>

<style scoped>

</style>