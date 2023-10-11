<template>
    <div>注册页</div>
    <el-form :model="userFrom" label-width="120px">
        <el-form-item label="用户名">
            <el-input v-model="userFrom.username" />
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="userFrom.password" password/>
        </el-form-item>
        <el-form-item label="出生日期">
            <el-col :span="11">
                <el-date-picker
                    v-model="userFrom.birthday"
                    type="date"
                    placeholder="Pick a date"
                    style="width: 100%"
                />
            </el-col>
        </el-form-item>
        <el-form-item label="性别">
            <el-select v-model="userFrom.gender" placeholder="选择性别">
                <el-option v-for="i in ganderOption" :key="i.value" :label="i.label" :value="i.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="头像">
            <upload :avatar="userFrom.avatar" @emitHandleChange="handleChange"></upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onRegister">注册</el-button>
            <el-button type="primary" @click="good">点赞</el-button>
        </el-form-item>
    </el-form>

</template>

<script setup>

import {reactive} from "vue";
import Upload from "@/components/upload/upload.vue";
import upload from "@/utils/upload";
import http from "@/utils/http";

//用户表单数据
const userFrom = reactive({
    username:"",
    password:"",
    gender:0,
    birthday:"",
    avatar:"",
    file:null//指向二进制的文件对象
})
//设置性别
const ganderOption = [
    {
        label:"保密",
        value:0
    },
    {
        label:"男",
        value:1
    },
    {
        label:"女",
        value:2
    }
]
//选完图片的回调
const handleChange = file => {
    console.log(file)
    //把上传的图片转换为blob地址 并赋值给userFrom的avatar
    userFrom.avatar = URL.createObjectURL(file)
    //提交给后端要用原生的file对象 不然后端拿不到数据
    userFrom.file = file
}
const onRegister = async ()=>{
    await upload("/webapi/user/register",userFrom).then(res =>{
        console.log(res)
    })
}

const good = async ()=>{
    await http.post("/webapi/user/likes",{likes:2}).then(res =>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
}

</script>

<style></style>