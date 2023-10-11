<template>
    <el-header>
        <div class="left">
            <el-icon @click="handleCollapse">
                <Menu />
            </el-icon>
            <p style="margin-left: 10px;">jrMotoF机车后台管理系统</p>
        </div>

        <div class="right">
            <p style="margin-right: 5px;">欢迎<span>{{ store.state.userInfo.username }}</span>回来</p>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon :size="20" color="white" style="cursor:pointer">
                        <UserFilled />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item :icon="Plus" @click="handleCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item :icon="CirclePlusFilled" @click="handleLogout">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Menu, UserFilled } from "@element-plus/icons-vue";
const router = useRouter()
const store = useStore()


//点击折叠菜单
const handleCollapse = () => {
    store.commit("changeCollapse")
}
// 点击调转个人中心
const handleCenter = () => {
    router.push('/center')
}
//点击退出系统
const handleLogout = () => {
    localStorage.removeItem("token")
    store.commit("clearUserInfo")
    router.push('/login')
}
</script>

<style lang="scss" scoped>
.el-header {
    background-color: rgb(39, 53, 66);
    height: 60px;
    width: 100%;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left,
    .right {
        display: flex;
    }

    .left i {
        margin: auto;
        cursor: pointer;
    }

    .rigth {
        .el-dropdown {
            margin: auto;
        }

    }

}
</style>