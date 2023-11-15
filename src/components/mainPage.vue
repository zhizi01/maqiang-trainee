<template>
    <div style="margin:2rem;">
        <p class="title_class">马枪练习生</p>
        <p class="content_class">你是否有过，被你的CSGO队友骂菜坤的经历？<br>你是否有过，被你的CSGO队友骂反应速度不如老奶奶的经历？</p>
        <p class="content_class">等等，这些都不是问题，只要肯练就一定能成为猛男！<br>知名主播说过：“菜就多练，输不起就别玩，以前是以前，现在是现在。”</p>
        <p class="content_class">工具内置了<el-text class="mx-1" type="primary">反应速度练习</el-text> <el-text class="mx-1" type="primary">2D爆头区域练习</el-text> <el-text class="mx-1" type="warning">3D枪法练习[正在开发]</el-text> <el-text class="mx-1" type="warning">CS2内练习[正在开发]</el-text></p>
        <p class="content_class">帮助你从马枪哥走向猛男哥，帮助你从魔王C+走向魔王S！</p>
        <p>
            <el-button type="primary" @click="updatePage('reactivity')">反应速度练习</el-button> <el-button type="primary" @click="updatePage('reactivityPlus')">2D爆头区域练习</el-button> <el-button type="warning" disabled>3D枪法练习</el-button> <el-button type="warning" disabled>CS2内练习</el-button>
        </p>
        <div style="margin-top:5rem;">
            <p class="content_class" style="font-size:12px;">作者: 青山智子 <a class="button-link" target="_blank" href="https://space.bilibili.com/451376413">BiliBili</a> <a class="button-link" target="_blank" href="https://github.com/zhizi01">Github</a></p>
            <p class="content_class" style="font-size:12px;">当前版本信息:<br>软件版本: 20231115 <br>Electron版本: 22.3.9 <br>NodeJs版本: 18.16.0</p>
            <p class="content_class" style="font-size:12px;">* 软件声明: 软件完全免费,并且源代码完全公开,任何人都可以修改此项目源代码,但是,禁止倒卖且禁止塞入任何广告!</p>
        </div>
    </div>
</template>
<script setup>

const updatePage = (newPage) => {
    sessionStorage.setItem("uiPage",newPage);
    window.location.reload(true);
}
</script>