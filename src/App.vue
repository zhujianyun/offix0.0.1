<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less">
  @import './assets/css/common.css';
  @import './assets/css/base.less';
   @import './assets/iconFont/iconfont.css';
  // @import './assets/css/index.less';

#app {
  font-family: "Microsoft YaHei", "PingFang SC", "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-seri, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  min-height: 600px;
}
</style>
