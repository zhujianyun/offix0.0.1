<template>
  <div class="home">
    <div class="home_top">
      <top-bar :companyLogo="companyLogo" :companyName="companyName"></top-bar>
      <menu-bar ref="menu"></menu-bar>
    </div>

    <div class="main_content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import topBar from '../../common/topBar';
  import menuBar from '../../common/menuBar';

  export default {
    components: {
      topBar,
      menuBar,
    },
    data() {
      return {
        companyLogo: '', // 公司logo
        companyName: '', // 公司名称

      }
    },
    watch: {
      '$route': 'pathPush'
    },
    methods: {
      pathPush() { // 直接点击跳转会watch和mounted都会执行，但直接输入路径置只会执行mounted中的调用
        let path = this.$route.path;
        let menuList = this.$refs.menu.menuList;
        if(path === '/companyHome') {
          path = '/staff';
        }
        for(let menu of menuList) {
          if(path === menu.path) {
            this.$refs.menu.menuClick(menu);
          }
        }
      },

      // 获取公司信息
      getCompany() {
        let obj = {adminpkid: 1};
        let info = '';
        this.$HTTP('post', '/getAdmin', obj).then(r => {
          info = r.result;
          this.companyLogo = info.Logo;
          this.companyName = info.Company;
          localStorage.setItem('companyInfo', JSON.stringify(info));
        });
      }
    },
    created() {
      this.getCompany();
    },
    mounted() {
      this.pathPush();
    }
  }
</script>
<style lang="less">
  .home {
    width:100%;
    height: 100vh;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;

    .home_top {
      -webkit-box-shadow: 1px 2px 3px #c0c0c0;
      -moz-box-shadow:  1px 2px 3px #c0c0c0;
      box-shadow:  1px 2px 3px #c0c0c0;
    }
    .main_content {
      margin-top:3px;
      background-color: #F2F3F9;
      flex: 1;
    }
  }
</style>
