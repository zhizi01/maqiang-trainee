<template>
  <mainPage v-if="uiPage == 'main'"/>
  <reactivityPage v-else-if="uiPage == 'reactivity'" />
  <reactivityPlusPage v-else-if="uiPage == 'reactivityPlus'" />
</template>

<script>
import mainPage from './components/mainPage.vue';
import reactivityPage from './components/reactivityPage.vue';
import reactivityPlusPage from './components/reactivityPagePlus.vue';

export default {
  name: 'App',
  components: {
    mainPage,
    reactivityPage,
    reactivityPlusPage
  },
  data(){
    var uiPage = sessionStorage.getItem("uiPage") ?? "main";
    return {uiPage};
  }
}
</script>
<style>
.title_class{
  font-size:28px;
  color:black;
  font-weight:1;
}
.content_class{
  font-size:14px;
  color:black;
  font-weight:1;
}
.button-link{
  color:#FB7299;
  text-decoration:none;
}
</style>