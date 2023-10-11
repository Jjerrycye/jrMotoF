<template>
    <div id="myeditor"></div>
</template>

<script setup>
import { onMounted, defineEmits, defineProps } from "vue";
import E from "wangeditor"
const emit = defineEmits(["changeEditor"])
const props = defineProps({
    content: String
})

onMounted(() => {
    const editor = new E("#myeditor")
    editor.create()
    props.content && editor.txt.html(props.content) // 重新设置编辑器内容
    // 配置 onchange 回调函数
    editor.config.onchange = function (newHtml) {
        // console.log("change 之后最新的 html", newHtml);
        //子传父
        emit("changeEditor", newHtml)
    };

    // 配置触发 onchange 的时间频率，默认为 200ms
    editor.config.onchangeTimeout = 500; // 修改为 500ms
    editor.config.uploadImgShowBase64 = true

})



</script>

<style lang="scss" scoped>
#myeditor {
    z-index: 999;
}
</style>