<template>
    <div>
        <el-page-header content="个人中心" icon="" title="机车后台管理系统" />
        <div class="userMainbox">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-card class="box-card userBox">
                        <el-avatar :size="90" :src="avatarUrl" />
                        <p>{{ store.state.userInfo.username }}</p>
                        <p>{{ UserRole }}</p>
                    </el-card>
                </el-col>
                <el-col :span="16">
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <span>个人中心</span>
                            </div>
                        </template>
                        <div>
                            <el-form ref="CenterRuleFormRef" :model="CenterRuleForm" :rules="CenterRules"
                                label-width="120px" class="demo-ruleForm" status-icon>
                                <el-form-item label="用户名" prop="username">
                                    <el-input v-model="CenterRuleForm.username" />
                                </el-form-item>
                                <el-form-item label="性别" prop="gander">
                                    <el-select style="width:100%" v-model="CenterRuleForm.gender" class="m-2"
                                        placeholder="请选择" size="default">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="个人简介" prop="introduction">
                                    <el-input type="textarea" v-model="CenterRuleForm.introduction" />
                                </el-form-item>
                                <el-form-item label="头像" prop="navatarame">
                                    <uploadVue :avatar="CenterRuleForm.avatar" @emitHanderChange="handerChange" />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="upLoadUserInfo(loginruleFormRef)">更新</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useStore } from "vuex";
import { ElMessage } from 'element-plus';
import uploadVue from '@/components/upload/upload.vue';
import upload from "@/utils/upload"
const store = useStore()

const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png")
const UserRole = computed(() => store.state.userInfo.role === 1 ? "管理员" : "编辑")

const { username, gender, introduction, avatar } = store.state.userInfo
const CenterRuleFormRef = ref()
const CenterRuleForm = reactive({
    username,
    gender,
    introduction,
    avatar,
    file: null
})
const CenterRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请填写性别', trigger: 'blur' },

    ],
    introduction: [
        { required: true, message: '请输入个人信息', trigger: 'blur' },

    ],
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' },

    ],

})
//性别选择字段
const options = [
    {
        label: "保密",
        value: 0
    },
    {
        label: "男",
        value: 1
    },
    {
        label: "女",
        value: 2
    }
]

//每次选择完头像图片的回调
const handerChange = file => {
    CenterRuleForm.avatar = URL.createObjectURL(file)
    //提交给后端用的原生file对象，不然后端拿不到图片数据
    CenterRuleForm.file = file
}
//点击更新用户信息
const upLoadUserInfo = () => {
    CenterRuleFormRef.value.validate((vaid) => {
        if (vaid) {
            //验证成功
            upload("adminapi/user/upload", CenterRuleForm).then(res => {
                if (res.data.ActionType === "ok") {
                    ElMessage.success("更新成功")
                    store.commit("updateUserInfo", res.data.data)
                }
            })
        }
    })
}


</script>

<style lang="scss" scoped>
.userMainbox {
    margin-top: 30px;

    .userBox {
        display: flex;
        justify-content: center;
        text-align: center;
    }

}
</style>