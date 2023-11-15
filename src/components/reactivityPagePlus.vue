<template>
    <div class="pageBody">
        <div style="width:80%;height:420px;text-align:center;" v-if="lianXiPage == 1">
            <div style="margin-top:2rem;">
                <p class="title_class">2D爆头区域练习</p>
                <p class="content_class">
                    开始后会随机生成蓝色区域块，你需要迅速去点击积攒积分，每次练习为一分钟。
                </p>
                <p class="title_class">上次练习成绩</p>
                <p class="content_class" style="font-size:18px;">平均速度：{{ pingJunSuDu }} 点击数: {{ totalClicks }}</p>
                <el-button type="primary" @click="startLianXi">开始</el-button> <el-button type="danger" @click="updatePage('main')">返回主菜单</el-button>
            </div>
        </div>
        <div v-else-if="lianXiPage == 2">
            <div style="position: absolute; top: 10px; left: 10px;">倒计时：{{ countdown }}  总点击: {{ totalClicks }} <a class="button-link" @click="stopXunLian">暂停训练</a> </div>
            <div style="height:98vh;">
                <div 
                    v-if="showTarget" 
                    :style="{ 
                        position: 'absolute', 
                        top: targetY + 'px', 
                        left: targetX + 'px', 
                        width: '24px', 
                        height: '24px', 
                        backgroundColor: 'blue' 
                    }" 
                    @click="handleTargetClick"
                ></div>
            </div>
        </div>
    </div>

</template>
<script setup>
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

const pingJunSuDu = ref("0:00:000");
const lianXiPage = ref(1);
const countdown = ref(60);
const totalClicks = ref(0);
const showTarget = ref(false);
const targetX = ref(0);
const targetY = ref(0);

const { ipcRenderer } = require('electron');
ipcRenderer.on('screen-size', (event, { width, height }) => {
    sessionStorage.setItem("screen-width", width);
    sessionStorage.setItem("screen-height", height);
});


const updatePage = (newPage) => {
    const ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.send('default-screen');
    sessionStorage.setItem("uiPage", newPage);
    window.location.reload(true);
}

const startLianXi = () => {
    lianXiPage.value = 2;

    pingJunSuDu.value = "0:00:000";
    countdown.value = 60;
    totalClicks.value = 0;

    startCountdown();
    generateTarget();
};

const stopXunLian = () =>{
    countdown.value = 1;
}

const generateTarget = () => {
    const screen_w = sessionStorage.getItem("screen-width") ??  1200;
    const screen_h = sessionStorage.getItem("screen-height") ?? 750;
    targetX.value = Math.floor(Math.random() * (screen_w - 24));
    targetY.value = Math.floor(Math.random() * (screen_h - 24));
    showTarget.value = true;
};


const handleTargetClick = (event) => {
    event.stopPropagation();
    totalClicks.value++;
    showTarget.value = false;
    generateTarget();
};

const startCountdown = () => {
    const interval = setInterval(() => {
        countdown.value--;
        if (countdown.value === 0) {
            clearInterval(interval);
            lianXiPage.value = 1;
            calculateResults();
        }
    }, 1000);
};

const calculateResults = () => {
    pingJunSuDu.value = totalClicks.value > 0 ? (totalClicks.value / 60).toFixed(2) + '' : "0:00:000";
};


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