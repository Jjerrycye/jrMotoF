<template>
    <div>
        <el-page-header @back="goBack">
            <template #content>
                <span class="text-large font-600 mr-3"> 编辑产品 </span>
            </template>
        </el-page-header>
        <el-form ref="productFromRef" :model="productForm" :rules="productFormRules" label-width="80px"
            class="demo-ruleForm" status-icon label-position="left">
            <el-form-item label="产品名称" prop="prodName">
                <el-input v-model="productForm.prodName" />
            </el-form-item>
            <el-form-item label="简要描述" prop="briefdescribe">
                <el-input type="textarea" v-model="productForm.briefdescribe" />
            </el-form-item>
            <el-form-item label="详细描述" prop="detaildescribe">
                <el-input type="textarea" v-model="productForm.detaildescribe" />
            </el-form-item>
            <el-form-item label="产品图片" prop="prodImage">
                <uploadVue :avatar="productForm.prodImage" @emitHanderChange="handerChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitProduct">更新产品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from "element-plus"
import uploadVue from '@/components/upload/upload.vue';
import { useRouter, useRoute } from 'vue-router';
import upload from '@/utils/upload';
import axios from 'axios';
const route = useRoute()
const router = useRouter()
const productFromRef = ref()
const productForm = reactive({
    prodName: "",
    briefdescribe: "",
    detaildescribe: "",
    prodImage: "",
    editTime: Date(),
    file: null//指向二进制的文件对象
})
const productFormRules = reactive({
    prodName: [{ required: true, message: '请输入产品名称', trigger: 'blur' },],
    briefdescribe: [{ required: true, message: '请输入简要描述', trigger: 'blur' },],
    detaildescribe: [{ required: true, message: '请输入详细描述', trigger: 'blur' },],
    prodImage: [{ required: true, message: '请添加产品图片', trigger: 'blur' },],

})

onMounted(() => {
    getIdProductList(route.params.id)
})

//返回
const goBack = () => {
    router.back()
}

//每次选择完头像图片的回调
const handerChange = file => {
    productForm.prodImage = URL.createObjectURL(file)
    //提交给后端用的原生file对象，不然后端拿不到图片数据
    productForm.file = file
}

//更具id获取产品数据
const getIdProductList = async (id) => {
    const res = await axios.get(`/adminapi/product/list/${id}`)
    Object.assign(productForm, res.data.data[0])
}

//提交更新产品按钮
const submitProduct = () => {
    productFromRef.value.validate(async vaid => {
        if (vaid) {
            const res = await upload(`/adminapi/product/upload/${productForm._id}`, productForm)
            if (res.status === 200) {
                ElMessage.success("更新成功")
                router.push("/product-manger/productList")
            }
        }
    })
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 50px;
    max-width: 500px;

}
</style>