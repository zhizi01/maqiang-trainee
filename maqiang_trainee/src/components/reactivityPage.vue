<template>
    <div class="pageBody" :style="{ backgroundColor: bgColor }">
        <div style="width:80%;height:420px;text-align:center;">
            <div style="margin-top:2rem;" v-if="lianXiPage == 1">
                <p class="title_class">反应速度练习</p>
                <p class="content_class">
                    每次开始后会随机等待几秒钟当屏幕变黑后需要迅速点击按钮完成一次练习，用于提高自己的反应速度。
                </p>
                <p class="title_class">
                    上一次反应速度：{{ oldSudu }}
                </p>
                <el-button type="primary" @click="startLianXi">开始</el-button> <el-button type="danger" @click="updatePage('main')">返回主菜单</el-button>
            </div>
            <div style="margin-top:2rem;" v-else-if="lianXiPage == 2">
                <p class="title_class">等待，即将出现！</p>
            </div>
            <div style="margin-top:2rem;" v-else-if="lianXiPage == 3">
                <p class="title_class" style="color:#409EFF;font-size:120px;">{{ oldSudu }}</p>
                <el-button type="danger" @click="sheJiEx">射击</el-button>
            </div>
        </div>
    </div>

</template>
<script setup>
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';

const oldSudu = ref("0:00:000");
const lianXiPage = ref(1);
const bgColor = ref('#FFFFFF');
let timer = null;
let startTime = null;

const updatePage = (newPage) => {
    const ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.send('default-screen');
    sessionStorage.setItem("uiPage", newPage);
    window.location.reload(true);
}

const startLianXi = () => {
    stopTimer();
    bgColor.value = '#FFFFFF';
    lianXiPage.value = 2;
    const randomTime = Math.random() * (10000 - 2000) + 2000;
    setTimeout(() => {
        bgColor.value = '#000000';
        lianXiPage.value = 3;
        startTimer();
    }, randomTime);
}

const sheJiEx = () => {
    bgColor.value = '#FFFFFF';
    lianXiPage.value = 1;
    stopTimer();
}

function startTimer() {
    startTime = Date.now();
    timer = setInterval(() => {
        const now = Date.now();
        const delta = now - startTime;
        const minutes = Math.floor(delta / 60000);
        const seconds = Math.floor((delta % 60000) / 1000);
        const milliseconds = delta % 1000;
        oldSudu.value = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 100 ? '0' : ''}${milliseconds < 10 ? '0' : ''}${milliseconds}`;
    }, 1);
}

function stopTimer() {
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
    startTime = null;
}

onMounted(() => {
    ElMessage({
        message: "窗口已全屏化，如果多屏幕出现显示不全，请在设置中设备当前屏幕为主屏幕！",
    });
    const ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.send('full-screen');
});
</script>
<style>
.pageBody{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 98vh;
    text-align: center;
}
</style>