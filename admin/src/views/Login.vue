<template>
    <div class="loginPage">
        <!-- 登录框 -->
        <div class="formContainer">
            <h1>jrMotoF机车后台管理系统</h1>
            <el-form ref="loginruleFormRef" :model="loginForm" status-icon :rules="rules" label-width="80px"
                class="ruleForm">
                <el-form-item label="用户名：" prop="username">
                    <el-input v-model="loginForm.username" type="username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="loginForm.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitForm(loginruleFormRef)">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import axios from "axios"
import { ref, reactive } from "vue"
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus'
import { useStore } from "vuex";
const store = useStore()
const router = useRouter()
const loginForm = reactive({
    username: '',
    password: '',
})
//表单的引用对象
const loginruleFormRef = ref()
const rules = reactive({
    username: [{ required: true, message: "请输入用户名", trigger: 'blur' }],
    password: [{ required: true, message: "请输入密码", trigger: 'blur' }],
})
//点击登录按钮
const submitForm = () => {
    //1检验表单
    loginruleFormRef.value.validate((vaid) => {
        if (vaid) {
            //2 拿到表单内容 提交给后端
            axios.post('/adminapi/user/login', loginForm).then(res => {
                //验证成功
                if (res.data.ActionType === "ok") {
                    ElMessage.success("登录成功")
                    store.commit("updateUserInfo", res.data.data)
                    store.commit("changeGetRouter", false)
                    router.push('/index')
                } else {
                    ElMessage.error("用户名密码不匹配！")
                }
            }).catch(err => {
                ElMessage.error(err.message)
            })
        }
    })
}

</script>

<style scoped lang="scss">

.loginPage{
    width: 100vw;
    height: 100vh;
    background: url("../../src/assets/ktm_rc8_beautiful_sport_bike_road_trick_74171_1920x1080.jpg") no-repeat center;
}

.formContainer {
    width: 500px;
    height: 300px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
    position: fixed;
    top: 50%;
    left: 75%;
    transform: translate(-50%, -50%);
    color: rgb(190,46,19);
    text-align: center;
    padding: 20px;
    border-radius: 5px;

    .ruleForm {
        margin-top: 20px;
    }
    .el-button{
        color: rgb(190,46,19);
    }
}

//通过vue中的::v-deep可以选中唯一属性
::v-deep .el-form-item__label {
    color: rgb(190,46,19);
}
</style>