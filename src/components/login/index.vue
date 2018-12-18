<template>
  <div class="loginBox">
    <div class="bgSvg_k">
      <div class="grid_ke"></div>
      <div class="svg"></div>
    </div>
    <div class="topNav">
      <img src="../../assets/img/egLogo_small.png" class="company_logo" alt="">
      <span class="logon" @click="logIn">登录</span>
      <span class="register" @click="register">注册</span>
    </div>
    <div class="main_box">
      <div class="main">
        <p>账户密码登录</p>
        <div class="email_div box">
          <span class="hint" v-show="hintEmail">请输入邮箱/手机号</span>
          <input type="text" :placeholder="emPlace" class="inputBox" ref="email" v-model="email"
                 v-on:blur="autofocusEm(email)" @focus="emailFocus">
        </div>
        <div class="passwrod_div box">
          <span class="hint" v-show="hintPw">请输入密码</span>
          <input type="password" :placeholder="pwPlace" class="inputBox" v-model="passWord" @focus="pwFocus"
                 v-on:blur="pwBlur()" @keyup.enter="enterLogin">
          <span class="error_title" v-if="errorTitle">{{errorTitle}}</span>
        </div>
        <div style="color: #999999;margin-top: 30px">
          <el-checkbox v-model="checked" style="color:#a0a0a0" class="next">下次自动登录</el-checkbox>
          <span class="forgetPassword fr" @click="forgetPwd">忘记密码？</span>
        </div>
        <span class="step" @click="enterLogin"> →</span>
        <!-- <p class="otherType">你也可以用以下方式登录</p> -->
        <!-- <span class="weixin cur"> <i class="iconfont icon-weixin"></i></span>      -->
      </div>
    </div>
  </div>
</template>
<script>
import { setCookie, getCookie } from "../../api/cookie";

export default {
  data() {
    return {
      email: "",
      emPlace: "请输入邮箱/手机号",
      pwPlace: "请输入密码",
      passWord: "",
      checked: false,
      errorTitle: "", // 错误提示
      hintEmail: false, //邮箱提示信息显示
      hintPw: false //密码提示信息显示
    };
  },

  watch: {
    email(val) {
      if (this.errorTitle) {
        this.errorTitle = "";
      }
    },
    passWord(val) {
      if (this.errorTitle) {
        this.errorTitle = "";
      }
    }
  },
  mounted() {
    if (getCookie("loginEmail")) {
      this.email = getCookie("loginEmail");
    }
  },

  methods: {
    //      点击登录 跳转登录页
    logIn() {
      this.$router.push("/login");
    },
    //      点击注册 跳转注册页
    register() {
      // setCookie("registerEmail", "");
      this.$router.push("/register");
    },
    //      点击忘记密码
    forgetPwd() {
      setCookie("loginEmail", this.email);
      this.$router.push("/forgetPwd");
    },

    //      邮箱输入框设置
    autofocusEm(email) {
      this.emPlace = "请输入邮箱/手机号";
      this.hintEmail = false;

      let emailReg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
      let reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;

      if (email == "") {
        this.errorTitle = "请输入邮箱/手机号";
      } else if (!emailReg.test(email) && !reg.test(email)) {
        this.errorTitle = "请输入正确的账号";
      } else {
        this.errorTitle = "";
      }
    },
    emailFocus() {
      this.emPlace = "";
      this.hintEmail = true;
      this.errorTitle = "";
      this.eamilBoderRed = false;
      this.hintPw = false;
    },
    pwFocus() {
      this.pwPlace = "";
      this.hintEmail = false;
      this.hintPw = true;
    },
    pwBlur() {
      this.pwPlace = "请输入密码";
      this.hintPw = false;
    },
    enterLogin() {
      this.hintPw = false;
      this.hintEmail = false;
      if (this.email == "" || this.passWord == "") {
        this.errorTitle = "请输入用户名或密码";
        return;
      } else {
        var email = this.email;
        var pass = this.passWord;
        let data = { Uname: this.email, Pwd: this.passWord };
        // 个人账号
        this.$HTTP("post", "/memberLogin2", data)
          .then(res => {
            if (res.result) {
              let pkid = res.result.Pkid;
              setCookie("Pkid", pkid, 1000 * 60);
              setCookie("loginEmail", this.email, 1000 * 60);
              localStorage.setItem("staffInfo", JSON.stringify(res.result));
              this.$router.push("/myTesk/myTeskList");
            } else {
              this.errorTitle = "账号或密码错误";
            }
          })
          .catch(err => {
            this.errorTitle = "账号或密码错误";
          });
      }
      if (this.checked == true) {
        setCookie("email", this.email, 1000 * 60);
        setCookie("passWord", this.passWord, 1000 * 60);
      }

      this.$router.push("/login");
    },
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.ruleForm.userName = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.ruleForm.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  },
  created() {
    if (getCookie("loginEmail") && localStorage.getItem("staffInfo")) {
      this.$router.push("/myTesk/myTeskList");
    }
  }
};
</script>

<style lang="less">
@import "../../assets/css/base.less";
@import "../../assets/css/media.less";

.bgSvg_k {
  width: 1200px;
  height: 600px;
  position: absolute;
  left: 50%;
  margin-left: -600px;
  top: 50%;
  margin-top: -300px;
  .svg {
    width: 100%;
    height: 100%;
    position: absolute;
    background: url("../../assets/img/bg.svg");
  }
  .grid_ke {
    width: 100%;
    height: 100%;
    background: -webkit-linear-gradient(top, transparent 179px, #f0f0f0 180px),
      -webkit-linear-gradient(left, transparent 179px, #f0f0f0 180px);
    background-size: 180px 180px;
    position: absolute;
    z-index: 1;
  }
}

.loginBox {
  width: 100%;
  height: 100%;
  background: #ffffff;
  .topNav {
    height: 50px;
    width: 100%;
    line-height: 50px;
    z-index: 9999;
    right: 0;
    position: absolute;
    .company_logo {
      display: block;
      height: 30px;
      left: 100px;
      top: 15px;
      position: absolute;
    }
    span {
      position: absolute;
      color: #333333;
      cursor: pointer;
    }
    .logon {
      right: 150px;
    }
    .register {
      right: 100px;
    }
  }

  .main_box {
    height: calc(100vh - 20px);
    width: 100%;
    position: relative;
    .main {
      width: 317px;
      height: 200px;
      padding: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -158px;
      margin-top:-100px;
      background: #ffffff;
      z-index: 9999;
      p {
        text-align: center;
        margin-bottom: 25px;
        font-size: 18px;
      }
      .box {
        height: 50px;
        position: relative;

        .hint {
          font-size: 12px;
          padding-left: 10px;
          position: absolute;
          bottom: 30px;
          color: #999999;
        }
        .inputBox {
          width: 317px;
          border-bottom: 1px solid #999999;
          padding: 0 10px 10px 10px;
          .box_sizing;
          position: absolute;
          bottom: 0;
        }
      }
      .error_title {
        position: absolute;
        color: red;
        bottom: -20px;
        left: 10px;
        font-size: 12px;
      }
      .forgetPassword {
        cursor: pointer;
      }
      .step {
        text-align: center;
        line-height: 35px;
        display: block;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        border: 1px solid #999;
        margin: 40px auto 0;
        cursor: pointer;
        background: #ffffff;
      }
      .otherType {
        font-size: 14px;
        color: #999;
        margin-top: 70px;
      }
      .weixin{
        width: 40px;
        height: 40px;
        display: block;
        border: 1px solid #999;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        margin: 0 auto;
      }
    }
  }
}
</style>
