<template>
    <div>
        <el-page-header content="产品列表" icon="" title="产品管理" />
        <el-card class="box-card">
            <el-table :data="ProductTableData" border stripe style="width: 100%">
                <el-table-column prop="prodName" label="产品名称" width="180" />

                <el-table-column prop="briefdescribe" label="产品描述" />
                <el-table-column prop="editTime" label="更新时间"></el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
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

    </div>
</template>

<script setup>
import axios from "axios"
import { ElMessage } from "element-plus"
import { ref, onMounted, reactive } from "vue"
import { Star, Edit, Delete } from "@element-plus/icons-vue"
import router from "@/router";

const ProductTableData = ref([])
onMounted(() => {
    getProductList()
})
//获取产品数据列表
const getProductList = async () => {
    const res = await axios("/adminapi/product/list")
    ProductTableData.value = res.data.data
}

//跳转到编辑产品组件
const editNews = (row) => {
    router.push(`/product-manger/editproduct${row._id}`)
}

//删除用户
const confirmEvent = async (row) => {
    const res = await axios.delete(`/adminapi/product/delete/${row._id}`)
    if (res.status === 200) {
        getProductList()
    }
}




</script>

<style></style>