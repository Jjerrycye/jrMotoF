<template>
    <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false" :auto-upload="false" :on-change="handerChange">
        <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script setup>
//导入defineEmits,defineProps实现组件间通信
import { defineEmits, defineProps, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue';

//接收父组件穿过来的值
const props = defineProps({
    avatar: String
})
//子组件向父组件传值
const emit = defineEmits(["emitHanderChange"])

const uploadAvatar = computed(() => props.avatar.includes("blob") ? props.avatar : 'http://localhost:3000' + props.avatar)


// 点击上传头像
const handerChange = file => {
    emit("emitHanderChange", file.raw)
}


</script>

<style lang="scss" scoped>
::v-deep .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

::v-deep .el-upload:hover {
    border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
}
</style>