<template>
  <div class="topbar">
    <ul class="CompanyWorkbench" v-if="false">
      <li class="logo">
        <div><img :src="companyLogo" alt=""></div>
      </li>
      <li class="names">{{companyName}}</li>
      <li class="handle cur" @click="signOut">{{handle}}</li>
    </ul>
    <ul class="workbench">
      <li class="companyLogo fl">
        <div class="company_logo"><img src="../../assets/img/logo.png" alt=""></div>
      </li>
      <li class="realName fl">{{realName}}工作台</li>
      <li class="logo fr">
        <img class="cur" :src="headLogo" alt="" @click="setPersonalInfo()" id="setButton">
        <ul class="setButton"  id="settingShow">
          <li class="nameAndNub">
            <span class="name">{{realName}}</span>
            <span class="number">{{number}}</span>
          </li>
          <li class="button" @click="numberSet">账号设置</li>
          <li class="button" @click="signOut">退出</li>
        </ul>
      </li>
    </ul>
    <popupPrompt v-if="signOutFlag" :title="title" @isSure="isSure" @isCancel="isCancel"></popupPrompt>
  </div>
</template>
<script>
  import {setCookie, getCookie, delCookie} from "../../api/cookie";
  import popupPrompt from './popupPrompt';

  export default {
    props: ['companyLogo', 'companyName'],
    components: {
      popupPrompt
    },
    data() {
      return {
        Pkid:'',
        logoUrl: null, // 公司logo
        names: '北京泰合鼎鼎科技责任有限广公司', // 公司名称
        handle: '注销', // 操作
        info: [],
        realName: '',
        number: '', //登录账号
        headLogo: '',
        type: true,
        signOutFlag: false, // 退出确认标识
        settingShow: false, //点击头像设置个人信息
        setNavShow: true,
      }
    },
    methods: {
      // 退出
      signOut() {
        this.settingShow = false;
        this.title = `您确定要退出${this.realName}的工作台吗？`;
        this.signOutFlag = true;

      },
//      点击头像设置个人信息
      setPersonalInfo() {
        console.log(this.settingShow);
        this.settingShow = !this.settingShow;
      },
//      账号设置
      numberSet() {
        this.settingShow = false;
        this.$emit('my-event', this.setNavShow);
        this.$router.push('/setNumber');
      },
      // 退出确定
      isSure() {
        
         delCookie('loginEmail');
        delCookie('email');
        delCookie('passWord');
        this.$router.push('/');
        localStorage.removeItem('staffInfo');
        this.signOutFlag = false;
      },

      // 退出取消
      isCancel() {
        this.signOutFlag = false;

      },
    },

    created() {


      let staffInfo = JSON.parse(localStorage.getItem('staffInfo'));
      this.Pkid = staffInfo.Pkid;
      let data = {'userpkid': this.Pkid};
      this.$HTTP('post', '/getMember', data).then(res => {
        let result = res.result;
//        this.info = JSON.parse(localStorage.getItem('staffInfo'));
        this.realName = result.Realname;
        this.headLogo = result.Pic;
        this.number = result.Username;
      });


    },
    mounted() {

    }
  }
</script>

<style lang="less">
  @import '../../assets/css/base.less';
  @import '../../assets/css/media.less';

  .topbar {
    width: 100%;
    height: 50px;
    line-height: 50px;
    // .h_mediaH(@pxOne: 40px);
    // .h_mediaLH(@pxOne: 40px);
    background-color: #fff;
    font-size: 18px;
    .CompanyWorkbench li:not(:last-child) {
      float: left;
    }
    .CompanyWorkbench li:last-child {
      float: right;
      margin-right: 100px;
      &:hover {
        color: @blue;
      }
    }
    .CompanyWorkbench .logo {
      width: 40px;
      margin-left: 30px;
      div {
        width: 40px;
        height: 40px;
        // .h_mediaH(@pxOne: 30px);
        // .h_mediaW(@pxOne: 30px);
        border-radius: 50%;
        display: table-cell;
        vertical-align: middle;
        overflow: hidden;
      }
      img {
        display: inline-block;
        width: 40px;
        height: 40px;
        // .h_mediaH(@pxOne: 30px);
        // .h_mediaW(@pxOne: 30px);
        border-radius: 50%;
        vertical-align: middle;
      }
    }
    .names {
      margin-left: 30px;
    }
    .workbench {
      .companyLogo {
        margin-left: 27px;
        height: 40px;
        line-height: 40px;
        // .h_mediaH(@pxOne: 30px);
        // .h_mediaLH(@pxOne: 30px);
        .company_logo {
          height: 30px;
          line-height: 30px;
          margin-top: 10px;
        }
      }
      li {
        /*float: right;*/
      }
      .handle {
        margin-right: 100px;
      }
      .realName {
        margin-left: 22px;
      }
      .names {
        margin-right: 20px;
      }
      .logo {
        margin-top: 5px;
        width: 40px;
        height: 40px;
        position: relative;
        margin-right: 100px;
        img {
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .setButton {
          width: 150px;
          background: #ffffff;
          position: absolute;
          top: 40px;
          right: 0;
          z-index: 10000;
          font-size: 14px;
          display: none;
          .border_radius(@br:4px);
          border: 1px solid #E0E0E0;
          .nameAndNub {
            padding: 0 10px;
            .box_sizing;
            height: 50px;
            line-height: 35px;
            background: #F2F3F9;
            border-bottom: 1px solid #DCDCDC;
            span {
              display: block;
              height: 20px;
            }
            .name {
              font-size: 14px;
            }
            .number {
              color: #999999;
              font-size: 12px;
            }
          }
          li {
            width: 100%;
            height: 35px;
            line-height: 35px;
            padding: 0 10px;
            .box_sizing;
          }
          .button:hover {
            background: #F2F3F9;
            cursor: pointer;

          }
        }
      }

    }
  }
</style>
