<template>
  <div class="menubar">
    <ul class="clearfix">
      <li v-for="(menu, index) in menuList" :key="index" class="menu_li fl cur" @click="menuClick(menu)">
        <span :class="{'color_now': menuSelected === menu.id}">{{menu.name}}</span>
        <i v-show="menuSelected === menu.id" class="bottom_bar"></i>
      </li>
      <li class="search fr"><i class="el-icon-search" @click="searchPage"></i></li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        menuList: [],
        menuSelected: '01',
        type: true
      }
    },
    methods: {
      // 导航点击跳转
      menuClick(menu, params) {
        // console.log('menu', menu, this.menuSelected); // 有时候会执行两次
        let randomNum1 = Math.random().toFixed(4);
        this.menuSelected = menu.id;
        if(params && menu.path === '/myTesk/myTeskList') {
          this.$router.push({name: 'MyTeskList', query: {random: randomNum1},  params: params});
        }else {
          this.$router.push(menu.path);
        }
      },
      searchPage() {
        this.$router.push('/Search');
        this.menuSelected = false;
      }
    },

    created() {
      this.type = localStorage.getItem('loginType') === 'false' ? false : true;

      if (false) {
        this.menuList = [
          {
            id: '01',
            name: '员工管理',
            path: '/staff',
            menuSelected: true,
          }, {
            id: '02',
            name: '项目管理',
            path: '/project',
            menuSelected: false,

          }, {
            id: '03',
            name: '基本信息维护',
            path: '/infoMaintenance',
            menuSelected: false,

          },
        ];
      } else {
        this.menuList = [
          {
            id: '01',
            name: '我的任务',
            path: '/myTesk/myTeskList',
            menuSelected: true,
          }, {
            id: '02',
            name: '我的项目',
            path: '/myProject',
            menuSelected: false,

          }, {
            id: '03',
            name: '我的文件',
            path: '/myFile',
            menuSelected: false,
          }
        ];
      }
      
    }
  }
</script>
<style lang="less">
  @import '../../assets/css/base.less';
  @import '../../assets/css/media.less';

  .menubar {
    width: 100%;
    height: 50px;
    line-height: 49px;
    background-color: #ffffff;
    padding-left: 100px;
    font-size: 18px;
    color: #666666;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 1px solid #cccccc;
    position: relative;
    ul {
      width: 100%;
    }
    ul .menu_li:not(:last-child) {
      margin-right: 80px;
      position: relative;
      .color_now {
        color: @blue;
      }
      .bottom_bar {
        display: block;
        position: absolute;
        width: 100%;
        height: 4px;
        bottom: 0;
        left: 0;
        background-color: @blue;
      }
    }
    .search {
      float: right;
      font-size: 20px;
      cursor: pointer;
      color: @blue;
      z-index: 999;
      position: absolute;
      right: 135px;
      top: 0;
    }
  }

</style>
