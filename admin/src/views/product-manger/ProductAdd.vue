<template>
    <div>
        <el-page-header content="添加产品" icon="" title="产品管理" />
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
                <el-button type="primary" @click="submitUser">添加产品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from "element-plus"
import uploadVue from '@/components/upload/upload.vue';
import { useRouter } from 'vue-router';
import upload from '@/utils/upload';
const route = useRouter()

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


//每次选择完头像图片的回调
const handerChange = file => {
    productForm.prodImage = URL.createObjectURL(file)
    //提交给后端用的原生file对象，不然后端拿不到图片数据
    productForm.file = file
}

//提交添加用户按钮
const submitUser = () => {
    productFromRef.value.validate(async vaid => {
        if (vaid) {
            await upload("/adminapi/product/add", productForm).then(res => {
                if (res.status === 200) {
                    ElMessage.success("添加成功")
                    //添加成功后跳转到userlist页面
                    route.push("/product-manger/productList")
                } else {
                    ElMessage.error("添加失败")
                }
            })

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