<template>
  <div>
      <el-row>
          <el-col :span="8" v-for="(item,index) in articleList" :key="item._id" :offset="index > 0 ? 2 : 0">
              <el-card :body-style="{ padding: '0px' }">
                  <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                  <div style="padding: 14px;">
                      <span>{{item.title}}</span>
                      <div class="bottom clearfix"></div>
                      <el-button>点赞</el-button>
                      <el-button @click="comment">评论</el-button>
                  </div>
              </el-card>
          </el-col>
      </el-row>
  </div>
</template>

<script setup>
//获取文章
import {onMounted, reactive, ref} from "vue";
import http from "@/utils/http";
import store from "@/store";
import router from "@/router";
let articleList = ref([])
const getArticleList = async ()=>{
    const res = await http.get("/webapi/article/articlelist")
    articleList.value = res.data.data
}

const comment = () => {
    //判断用户是否登录
    console.log(store.state.userInfo.username)
    if(store.state.userInfo.username === undefined){
        router.push("/login")
    } else{
        router.push("/register")
    }

}

onMounted(()=>{
    getArticleList()
})
</script>

<style scoped>
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>