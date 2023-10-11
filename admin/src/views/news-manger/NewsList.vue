<template>
    <div>

        <el-page-header content="机车资讯列表" icon="" title="机车资讯管理" />
        <el-card class="box-card">
            <el-table :data="NewsList" border stripe style="width: 100%">
                <el-table-column prop="title" label="标题" width="180" />
                <el-table-column prop="category" label="分类">
                    <template #default="scope">
                        {{ categoryContent(scope.row.category) }}
                    </template>
                </el-table-column>
                <el-table-column prop="editTime" label="更新时间">
                    <template #default="scope">
                        {{ formatDate.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="isPublish" label="是否发布">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" class="ml-2" @change="SwitchChange(scope.row)"
                            :inactive-value="0" :active-value="1" />
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" circle :icon="Star" type="success" @click="showNews(scope.row)"></el-button>
                        <el-button size="small" circle :icon="Edit" @click="editNews(scope.row)"></el-button>
                        <el-popconfirm title="确定删除吗？" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="confirmEvent(scope.row)">
                            <template #reference>
                                <el-button size="small" circle :icon="Delete" type="danger"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 预览资讯 -->
        <el-dialog v-model="centerDialogVisible" title="资讯预览" width="50%" align-center>
            <div>
                <h1 style="font-size:20px">{{ showNewsData.title }}</h1>
                <p style="font-size: 10px; color: gray;">{{ formatDate.getTime(showNewsData.editTime) }}</p>
            </div>
            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <!-- v-html慎用 防止xss注入 除非非常信任的后台数据-->
            <div v-html="showNewsData.content" style="font-size:13px;font-weight: 300;"></div>
        </el-dialog>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, reactive, onMounted, computed } from "vue"
import { useRouter } from 'vue-router';
import { ElMessage } from "element-plus"
import { Star, Edit, Delete, StarFilled } from "@element-plus/icons-vue"
import formatDate from "../../utils/FormatDate"
const router = useRouter()
let NewsList = ref([])
let showNewsData = ref({})//保存当前资讯预览数据用于展示
let centerDialogVisible = ref(false)
onMounted(() => {
    getNewsList()
})

const getNewsList = async () => {
    const res = await axios("/adminapi/news/newslist")
    NewsList.value = res.data.data
}
//判断分类函数
//1:最新动态 2:典型案例 3:通知公告
const categoryContent = (number) => {
    const categoryArr = ["最新动态", "典型案例", "通知公告"]
    return categoryArr[number - 1]
}

//开关改变回调
const SwitchChange = async (data) => {
    const { _id, isPublish } = data
    await axios.put("/adminapi/news/ispublish", { _id, isPublish })
    getNewsList()
}
//预览资讯
const showNews = (data) => {
    centerDialogVisible.value = true
    showNewsData.value = data
}
//确定删除资讯
const confirmEvent = async (data) => {
    const res = await axios.delete(`/adminapi/news/deletenews/${data._id}`)
    if (res.status === 200) {
        ElMessage.success("删除成功")
        getNewsList()
    } else {
        ElMessage.error("服务器错误")
    }
}
//编辑资讯
const editNews = (data) => {
    router.push(`/news-manger/editornews${data._id}`)
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
    img {
        width: 100%;
    }
}
</style>