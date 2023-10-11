<template>
    <div class="navBar">
        <el-menu :default-active="route.fullPath" :router="true" class="el-menu-demo" mode="horizontal" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="/">机车资讯</el-menu-item>
            <el-menu-item index="/prodandServer">产品于服务</el-menu-item>
            <el-menu-item index="/register">注册</el-menu-item>
            <el-menu-item index="/login">登录</el-menu-item>
            <el-menu-item index="/testapi">测试接口页</el-menu-item>
            <el-menu-item index="/motofriends">摩友圈</el-menu-item>

            <div class="webName">
                <p v-if="store.state.userInfo.username">欢迎-{{ store.state.userInfo.username }}</p>
                <p v-else>jrMotoF</p>
            </div>
        </el-menu>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import store from "@/store"
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter

</script>

<style scoped lang="scss">
.navBar {
    position: sticky;
    top: 0;
    z-index: 1000;

    :deep(.el-menu){
        display: flex;
        background: rgb(47,61,70);
        padding: 0 100px 0 100px;
        .el-menu-item:hover{
            background-color: #8c939d;
            color: #ffd04b !important;
        }
        .el-menu-item.is-active{
            background-color: rgb(47,61,70);
        }
    }

    .webName {
        position: fixed;
        right: 120px;
        height: 59px;
        top: 15px;
        cursor: pointer;
        color: #ffd04b
    }
}

</style>