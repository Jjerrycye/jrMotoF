<template>
    <div>
        <el-page-header content="首页" icon="" title="机车后台管理系统" />
        <el-card class="box-card">
            <el-row class="userInfoBox">
                <el-col :span="3">
                    <el-avatar :size="80" :src="avatarUrl" />
                </el-col>
                <el-col :span="21">
                    <p>欢迎{{ store.state.userInfo.username }}，{{ welcome }}</p>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>公司产品</span>
                </div>
            </template>
            <!-- 产品轮播图 -->
            <el-carousel :interval="4000" type="card" height="450px">
                <el-carousel-item v-for="item in productList" :key="item._id">
                    <div
                        :style="{ backgroundImage: `url(http://localhost:3000${item.prodImage})`, backgroundSize: 'cover' }">
                        <h3 text="2xl" justify="center">{{ item.prodName }}</h3>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, reactive, onMounted, ref } from "vue";
import axios from "axios";
const store = useStore()
const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png")
const welcome = computed(() => new Date().getHours() > 19 ? "别拼命！" : "迎接新的美好！")
let productList = reactive({})
onMounted(() => {
    getProductList()
})

const getProductList = async () => {
    const res = await axios("/adminapi/product/list")
    // productList.value = res.data.data
    Object.assign(productList, res.data.data)
    console.log(productList);
}

</script>

<style lang="scss" scoped>
//轮播图css
.el-carousel__item h3 {
    color: white;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;

}

.el-carousel__item div {
    height: 100%;
}
</style>