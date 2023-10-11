<template>
    <div>
        <el-page-header content="添加用户" icon="" title="用户管理" />
        <el-form ref="addUserFromRef" :model="AddUserForm" :rules="addUserRormRules" label-width="80px"
            class="demo-ruleForm" status-icon label-position="left">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="AddUserForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="AddUserForm.password" />
            </el-form-item>
            <el-form-item label="权限" prop="role">
                <el-select style="width:100%" v-model="AddUserForm.role" class="m-2" placeholder="请选择" size="default">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
                <el-input type="textarea" v-model="AddUserForm.introduction" />
            </el-form-item>
            <el-form-item label="头像" prop="navatarame">
                <uploadVue :avatar="AddUserForm.avatar" @emitHanderChange="handerChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitUser">添加用户</el-button>
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

const addUserFromRef = ref()
const AddUserForm = reactive({
    username: "",
    password: "",
    introduction: "",
    role: 2,//1是管理员,2编辑
    avatar: "",
    gender: 0,//保密
    file: null//指向二进制的文件对象
})
const addUserRormRules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
    password: [{ required: true, message: '请填写密码', trigger: 'blur' },],
    role: [{ required: true, message: '请选择权限', trigger: 'blur' },],
    introduction: [{ required: true, message: '请输入个人信息', trigger: 'blur' },],
    avatar: [{ required: true, message: '请上传头像', trigger: 'blur' },],
})
const options = [
    {
        label: "管理员",
        value: 1
    },
    {
        label: "编辑",
        value: 2
    }
]

//每次选择完头像图片的回调
const handerChange = file => {
    //把上传的图片转换为blob地址
    AddUserForm.avatar = URL.createObjectURL(file)
    //提交给后端用的原生file对象，不然后端拿不到图片数据
    AddUserForm.file = file
}

//提交添加用户按钮
const submitUser = () => {
    addUserFromRef.value.validate(async vaid => {
        if (vaid) {
            // console.log(AddUserForm);
            await upload("adminapi/user/adduser", AddUserForm).then(res => {
                if (res.status === 200) {
                    ElMessage.success("添加成功")
                    //添加成功后跳转到userlist页面
                    route.push("/user-manger/userList")
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