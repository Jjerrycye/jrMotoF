<template>
    <el-aside :width="$store.state.iscollapse ? '65px' : '200px'">

        <el-menu :default-active="route.fullPath" class="el-menu-vertical-demo" :collapse="$store.state.iscollapse"
            :collapse-transition="false" :router="true">
            <el-menu-item index="/index">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/center">
                <el-icon>
                    <Avatar />
                </el-icon>
                <span>个人中心</span>
            </el-menu-item>
            <!-- noAdminHidden 为权限控制自定义事件 用来控制路由是否显示 -->
            <el-sub-menu index="/user-manger" v-noAdminHidden>
                <template #title>
                    <el-icon>
                        <UserFilled />
                    </el-icon>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="/user-manger/userAdd">添加用户</el-menu-item>
                <el-menu-item index="/user-manger/userList">用户列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/news-manger">
                <template #title>
                    <el-icon>
                        <MessageBox />
                    </el-icon>
                    <span>机车资讯管理</span>
                </template>
                <el-menu-item index="/news-manger/newsAdd">添加机车资讯</el-menu-item>
                <el-menu-item index="/news-manger/newsList">机车资讯列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/product-manger">
                <template #title>
                    <el-icon>
                        <Reading />
                    </el-icon>
                    <span>产品管理</span>
                </template>
                <el-menu-item index="/product-manger/productAdd">添加产品</el-menu-item>
                <el-menu-item index="/product-manger/productList">产品列表</el-menu-item>
            </el-sub-menu>

        </el-menu>

    </el-aside>
</template>

<script setup>
import { HomeFilled, Avatar, UserFilled, MessageBox, Reading, Pointer } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore()

//先判断vuex中的用户的role是否为1 1为管理员 如果不是就移除节点
//但是这种方法只是在用户界面上移除此节点 用户如果记住路由连接的话 还是能显示此路由页面
//还得去路由配置里面判断路由权限，这里只是对页面做文章
const vNoAdminHidden = {
    mounted(el) {
        if (store.state.userInfo.role !== 1) {
            el.parentNode.removeChild(el)
        }
    },
}


const route = useRoute()

//判断是否为管理员 不是就隐藏用户管理导航



</script>

<style scoped lang="scss">
.el-aside {
    height: 100vh;

    .el-menu {
        height: 100vh;
    }
}
</style>