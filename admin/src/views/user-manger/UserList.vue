<template>
    <div>
        <el-page-header content="用户列表" icon="" title="用户管理" />
        <el-card class="box-card">
            <el-table :data="userTableData" border stripe style="width: 100%">
                <el-table-column prop="username" label="用户名" width="180" />
                <el-table-column prop="avatar" label="头像" width="180">
                    <template #default="scope">
                        <div v-if="scope.row.avatar">
                            <el-avatar :size="80" :src="'http://localhost:3000' + scope.row.avatar"></el-avatar>
                        </div>
                        <div v-else>
                            <el-avatar :size="80"
                                :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="introduction" label="介绍" />
                <el-table-column prop="role" label="角色">
                    <template #default="scope">
                        <el-tag v-if="scope.row.role === 1" class="ml-2" type="danger">管理员</el-tag>
                        <el-tag v-if="scope.row.role === 2" class="ml-2" type="success">编辑</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
                        <el-popconfirm title="确定删除吗？" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="confirmEvent(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- dialog弹窗 -->
        <el-dialog v-model="centerDialogVisible" title="修改用户" width="30%" align-center>
            <el-form ref="addUserFromRef" :model="AddUserForm" :rules="addUserRormRules" label-width="80px"
                class="demo-ruleForm" status-icon label-position="left">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="AddUserForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="AddUserForm.password" />
                </el-form-item>
                <el-form-item label="权限" prop="role">
                    <el-select style="width:100%" v-model="AddUserForm.role" class="m-2" placeholder="请选择" size="default">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="个人简介" prop="introduction">
                    <el-input type="textarea" v-model="AddUserForm.introduction" />
                </el-form-item>

            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitEdit">
                        提交
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import axios from "axios"
import { ElMessage } from "element-plus"
import { ref, onMounted, reactive } from "vue"
const addUserFromRef = ref()
const AddUserForm = reactive({
    username: "",
    password: "",
    introduction: "",
    role: 2,//1是管理员,2编辑
})
const addUserRormRules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
    password: [{ required: true, message: '请填写密码', trigger: 'blur' },],
    role: [{ required: true, message: '请选择权限', trigger: 'blur' },],
    introduction: [{ required: true, message: '请输入个人信息', trigger: 'blur' },],
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
const userTableData = ref([])
const centerDialogVisible = ref(false)
onMounted(() => {
    getUserList()
})
//获取用户数据列表
const getUserList = () => {
    axios("/adminapi/user/userlist").then(res => {
        userTableData.value = res.data.data
    })

}

//编辑用户回调
const handleEdit = async (row) => {
    //从后端重新获取到带密码的用户信息
    const res = await axios(`/adminapi/user/userlist/${row._id}`)
    //使用assign合并reactive所代理的对象
    Object.assign(AddUserForm, res.data.data[0])
    centerDialogVisible.value = true
}
//提交编辑用户
const submitEdit = () => {
    addUserFromRef.value.validate(async (vaid) => {
        if (vaid) {
            const res = await axios.put(`/adminapi/user/putlist/${AddUserForm._id}`, AddUserForm)
            if (res.status === 200) {
                ElMessage.success("更新成功")
                centerDialogVisible.value = false
                getUserList()
            }
        }
    })
}
//删除用户
const confirmEvent = (row) => {
    axios.delete(`/adminapi/user/delete/${row._id}`).then(res => {
        if (res.status === 200) {
            getUserList()
        }
    })

}




</script>

<style></style>