<template>
    <div class="swiper">
        <el-carousel arrow="always" height="calc(100vh - 59px)">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3 text="2xl" justify="center">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.swiper {
    .el-carousel__item h3 {
        display: flex;
        color: #475669;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }

}
</style>