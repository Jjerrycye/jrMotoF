<template>
    <el-form :model="handleArticle">
        <el-form-item label="评论:">
            <el-input v-model="handleArticle.comment"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="comment">评论</el-button>
        </el-form-item>

        <hr>
        <el-form-item label="标题">
            <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="文章内容">
            <el-input v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="publich">发表</el-button>
        </el-form-item>

    </el-form>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import http from "@/utils/http";
import router from "@/router";
import store from "@/store";

const user_id = store.state.userInfo.id

const article = reactive({
    title:"",
    content:"",
    author:user_id
})

const handleArticle = reactive({
    comment:"",
    article_id:"6506a65ce731514092ae08a2",
    comment_user_id:"6502c35fc7ef48237adb54a0"
})


//发布文章
const publich = async ()=>{
    console.log(user_id)
    http.post("/webapi/articlehandle/publishart",article).then(res=>{
        console.log(res)
        article.content = ""
        article.title= ""
    }).catch(err=>{
        console.log(err)
    })
}

//评论
const comment = async ()=>{
    const res = await http.post("/webapi/article/commentart",handleArticle)
    console.log(res)
}

</script>

<style scoped>

</style>