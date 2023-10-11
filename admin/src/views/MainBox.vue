<template>
    <el-container>
        <AsideMenu />
        <el-container direction="vertical">
            <TopHeader />
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
  

<script setup>
import AsideMenu from '@/components/indexComponents/AsideMenu.vue';
import TopHeader from '@/components/indexComponents/TopHeader.vue';


</script>

<style scoped lang="scss">
.el-main {
    height: calc(100vh - 60px);
}
</style>