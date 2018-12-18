<template>
  <div class="searchs">
    <input class="search_input fl" id="input" type="text" placeholder="请输入搜索内容" v-model="searchContent" @keyup.enter="search" @change="searchInput">
    <i class="icon_search iconfont icon-search" v-if="searchIconFlag"></i>
    <i class="icon_guanbi el-icon-circle-close" v-else @click="searchInit"></i>
  </div>
</template>
<script>
    export default {
        data() {
            return {
              searchContent: '', // 搜索
              searchIconFlag: true, // 搜索icon标识
            }
        },
      watch: {
        searchContent(val) {
          this.$emit('searchEnter',val);
          if(val) {
            this.searchIconFlag = false;
          }else {
            this.searchIconFlag = true;
          }
        }
      },
        methods: {
          // enter 搜索
          search() {
            this.$emit('searchEnter', this.searchContent);
          },

          // 搜索框输入......
          searchInput() {
//            this.$emit('searchEnter', this.searchContent);
          },

          // 搜索清除
          searchInit() {
            this.searchContent = '';
            this.$emit('searchEnter', this.searchContent);
          },
        }
    }
</script>
<style lang="less">
  @import '../../assets/css/base.less';

  .searchs {
    width: 200px;
    height: 32px;
    .border_radius(@br: 6px);
    border: 1px solid #DCDCDC;
    margin-top: 30px;
    position: relative;


    .search_input {
      display: block;
      height: 100%;
      width:100%;
      padding-left: 10px;
      .box_sizing;

    }

    .icon_search {
      font-size: 18px;
      position: absolute;
      top: -25px;
      right: 8px;
      cursor: pointer;
      color: #909399;

      /*&:hover {*/
      /*color: @hoveBlue;*/
      /*}*/
    }


    .icon_guanbi {
      font-size: 18px;
      position: absolute;
      top: 10px;
      right: 8px;
      cursor: pointer;
      opacity: 0.4;

      &:hover {
        opacity: 0.3;
      }
    }


    .search_button {
      width: 88px;
      height: 40px;
      color: @blue;
      .border_radius(@br: 6px);
      border: 1px solid #4583F0;
    }
  }
</style>
