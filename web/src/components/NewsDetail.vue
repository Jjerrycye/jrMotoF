<template>
    <div class="newsDetail">

        <el-card :body-style="{ padding: '0px' }">
            <div class="title">
                <h2>{{ newsDetailList.title }}</h2>
                <p>{{ formatDate.getTime(newsDetailList.editTime) }}</p>
            </div>
            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <div v-html="newsDetailList.content" class="contents"></div>
        </el-card>

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { StarFilled } from "@element-plus/icons-vue"
import formatDate from '@/utils/formatData';
const route = useRoute()
const newsDetailList = ref([])
onMounted(() => {
    getIdNewslist()
})

const getIdNewslist = async () => {
    const res = await axios(`/webapi/news/newslist/${route.params.id}`)
    newsDetailList.value = res.data.data[0]
}


</script>

<style lang="scss" scoped>
.newsDetail {
    display: flex;
    flex-direction: row;
    justify-content: center;

    .el-card {

        width: 70%;
        padding: 35px;
        box-sizing: border-box;

        // background-color: rgb(112, 104, 98);
        .title {
            p {
                font-size: small;
                color: #aaa9a9;
            }
        }

        :deep(.contents){
            img{
                width: 600px;
                height: 400px;
            }
        }
    }
}
</style>