<template>
    <div>
        <el-page-header @back="goBack">
            <template #content>
                <span class="text-large font-600 mr-3"> 编辑机车资讯 </span>
            </template>
        </el-page-header>
        <el-card class="box-card">
            <div>
                <el-form ref="MotoRuleFormRef" :model="MotoRuleForm" :rules="MotoRules" label-width="120px"
                    class="demo-ruleForm" status-icon>
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="MotoRuleForm.title" />
                    </el-form-item>
                    <!-- 富文本编辑器 -->
                    <el-form-item label="内容" prop="content">
                        <!-- 如果没值就不创建 不然传给Editor的content永远都空字符串 -->
                        <Editor v-if="MotoRuleForm.content" @changeEditor="onchangeEditor"
                            :content="MotoRuleForm.content" />
                    </el-form-item>
                    <el-form-item label="类型" prop="category">
                        <el-select style="width:50%" v-model="MotoRuleForm.category" class="m-2" placeholder="请选择"
                            size="default">
                            <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="封面图" prop="cover">
                        <Upload :avatar="MotoRuleForm.cover" @emitHanderChange="handerChange" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitNews">更新资讯</el-button>
                    </el-form-item>

                </el-form>
            </div>

        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Editor from "@/components/editor/Editor.vue"
import Upload from "@/components/upload/upload.vue";
import upload from "@/utils/upload";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import axios from "axios";
onMounted(() => {
    //组件创建通过id获取对应新闻资讯
    getNewsList(route.params.id)
})
const router = useRouter()
const route = useRoute()

// const idNewsList = reactive({})
const MotoRuleFormRef = ref()
const MotoRuleForm = reactive({
    title: "",//机车标题
    content: "",//内容
    category: 1, //1:最新动态 2:典型案例 3:通知公告
    cover: "",//封面图
    isPublish: 0,// 0 未发布 1 已发布
    file: null
})
const MotoRules = {
    title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
    content: [{ required: true, message: '请填写内容', trigger: 'blur' },],
    cover: [{ required: true, message: '请添加封面图', trigger: 'blur' },],
    category: [{ required: true, message: '请选择类别', trigger: 'blur' },],
}
const categoryOptions = [
    {
        label: "最新动态",
        value: 1
    },
    {
        label: "典型案例",
        value: 2
    },
    {
        label: "通知公告",
        value: 3
    },
]

//每次editor内容改变的回调
const onchangeEditor = (data) => {
    MotoRuleForm.content = data
}

//每次选择完头像图片的回调
const handerChange = file => {
    MotoRuleForm.cover = URL.createObjectURL(file)
    //提交给后端用的原生file对象，不然后端拿不到图片数据
    MotoRuleForm.file = file
}

//提交更新资讯按钮
const submitNews = () => {
    MotoRuleFormRef.value.validate(async vaid => {
        if (vaid) {
            const res = await upload(`/adminapi/news/upload/${MotoRuleForm._id}`, MotoRuleForm)
            if (res.status === 200) {
                ElMessage.success("更新成功")
                router.push("/news-manger/newsList")
            }
        }
    })
}
//通过id获取数据
const getNewsList = async (id) => {
    const res = await axios(`/adminapi/news/newslist/${id}`)
    Object.assign(MotoRuleForm, ...res.data.data)
}
//返回
const goBack = () => {
    router.back()
}

</script>

<style lang="scss" scoped>
.el-form {

    // max-width: 700px;
    .el-input {
        width: 50%;
    }
}
</style>