<template>
    <div class="product">
        <el-carousel v-if="loopList.length" height="calc(100vh - 59px)" direction="vertical" :autoplay="true">
            <el-carousel-item v-for="item in loopList" :key="item._id"
                :style="{ background: `url(http://localhost:3000${item.prodImage})`, backgroundSize: '100% 100%' }">
                <div class="mask">
                    <h2>{{ item.prodName }}</h2>
                    <h3 text="2xl" justify="center">{{ item.briefdescribe }}</h3>
                    <h4 text="2xl" justify="center">{{ item.detaildescribe }}</h4>
                </div>
            </el-carousel-item>
        </el-carousel>
        <el-empty v-else description="暂无产品" />
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue"
const loopList = ref([])

onMounted(() => {
    getproductlist()
})

const getproductlist = async () => {
    const res = await axios.get("/webapi/product/list")
    loopList.value = res.data.data
}

</script>
<style lang="scss" scoped>
.product {
    .mask {
        width: 50%;
        height: 100%;
        color: rgb(191, 206, 206);
        background-color: rgba($color: #000000, $alpha: 0.5);
        padding: 25px;
        box-sizing: border-box;

        h2,
        h3,
        h4 {
            margin-bottom: 20px;
        }
    }
}
</style>