<template>
  <div class="registerBox">
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

        <!--步骤一 -->
        <div class="register" v-show="one">
          <p class="title">注册</p>
          <div class="email_div box">
            <span class="hint" v-show="hintEmail">请输入您的工作邮箱</span>
            <input type="text" :placeholder="empalce" class="inputBox" v-model="email"
                   v-on:blur="autofocusEm(email)" @focus="emailFocus" @keyup.enter="nextTwo">
            <span class="error_title" v-if="errorTitle">{{errorTitle}}</span>
          </div>
          <div class="button">
            <span class="" style="display:inline-block;color: #DCDCDC;width: 40px;cursor: pointer">←</span>
            <span style="margin-left: 35px;">1</span>
            <span class="line"></span>
            <span style="margin-right: 35px;">3</span>
            <span class="step" @click="nextTwo">→</span>
          </div>
        </div>

        <!--步骤二-->
        <div class="setPw" v-show="two">
          <p class="title">设置密码</p>
          <div class="pwd_div box">
            <span class="hint" v-show="hintPwd">请设置密码</span>
            <input type="password" :placeholder="setPwPlace" class="inputBox" v-model="password"
                   v-on:blur="autofocusPw(password)" @focus="pawdFocus" v-on:input="pwdInput(password)" autocomplete="off" maxlength="20">
            <div class="" v-show="triangleShow">
              <span class="Triangle"></span>
              <div class="hintMessage">
                <p>您的密码必须包含：</p>
                <p>
                  <el-checkbox v-model="radio"> 请输入6- 20个字符</el-checkbox>
                </p>
                <p>
                  <el-checkbox v-model="radio2">同时包含字母和数字</el-checkbox>
                </p>
              </div>
            </div>
          </div>
          <div class="pwd_div box">
            <span class="hint" v-show="hintPwdTwo">请再次输入密码</span>
            <input type="password" :placeholder="setPwPlaceTwo" class="inputBox" v-model="repPassword"
                   v-on:blur="autofocusPwTw(repPassword)" @focus="pawdFocusTwo" v-on:input="pwdInputTwo(repPassword)"
                   autocomplete="off"  maxlength="20" >
            <span class="error_title" v-if="erroPaw">{{erroPaw}}</span>
          </div>
          <div class="button">
            <span class="step" @click="returnOne">←</span>
            <span style="margin-left: 35px;">2</span>
            <span class="line"></span>
            <span style="margin-right: 35px;">3</span>
            <span class="step" @click="next(password)">→</span>
          </div>
        </div>

        <!--步骤三-->
        <div class="perfectInformation" v-show="tree">
          <p class="title">完善信息</p>
          <div class="email_div box">
            <span class="hint" v-show="hintName">请输入您的姓名</span>
            <input type="text" :placeholder="namePlace" class="inputBox" v-model="name"
                   v-on:blur="nameBlur(name)" @focus="nameFocus">
          </div>
          <div class="email_div box">
            <span class="hint" v-show="hintTel">请输入您的手机号</span>
            <input type="text" :placeholder="telPlace" class="inputBox" v-model="tell"
                   v-on:blur="telBlur(tell)" @focus="telFocus" v-on:input="telInput">
            <span class="error_title" v-if="perfectErro">{{perfectErro}}</span>
          </div>
          <div class="button">
            <span class="step" @click="returnTwo">←</span>
            <span style="margin-left: 35px;">3</span>
            <hr class="line" style="transform: rotate(-45deg)">
            <span style="margin-right: 35px;">3</span>
            <span class="step" @click="enterLogin">→</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { setCookie, getCookie } from "../../api/cookie";

export default {
  data() {
    return {
      hintEmail: false,
      hintPw: "",
      userName: "",
      passWord: "",
      checked: false,
      loginType: false, // 登录账户类型 true是公司账户 false是员工账户
      errorTitle: "", // 错误提示
      stepShow: false, // 下一步按钮
      one: true,
      two: false,
      tree: false,

      //     第一步
      email: "",
      empalce: "请输入您的工作邮箱",
      //     第二步   设置密码
      password: "",
      setPwPlace: "请设置密码",
      setPwPlaceTwo: "请再次输入密码",
      repPassword: "",
      radio: false,
      radio2: false,
      triangleShow: false, //信息提示显示
      erroPaw: "",
      //     第三步 完善信息
      name: "",
      namePlace: "请输入您的姓名",
      tell: "",
      telPlace: "请输入您的手机号",
      hintPwd: false, //密码提示
      hintPwdTwo: false, // 再次输入密码提示
      perfectErro: "",
      hintName: false,
      hintTel: false,
      nextPage: false,
      nextPagetwo: false
    };
  },

  watch: {
    userName(val) {
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
    if (getCookie("Uname")) {
      this.userName = getCookie("Uname");
    }
    if (getCookie("userPwd")) {
      this.passWord = getCookie("userPwd");
    }
    if (this.userName && this.passWord) {
      this.$refs.passWord.focus();
    }
  },

  methods: {
    logIn() {
      this.$router.push("/login");
    },
    register() {
      console.log(123);
      this.email = "";
      console.log(this.email);
      this.$router.push("/register");
    },

    //返回第一步
    returnOne() {
      this.erroPaw = "";
      this.repPassword = "";
      this.password = "";
      this.one = true;
      this.two = false;
    },
    nextTwo() {
      if (this.email == "") {
        this.errorTitle = "请输入您的工作邮箱";
        return false;
      } else {
        this.autofocusEm(this.email);
      }
      if (this.errorTitle == "") {
        let datas = { Email: this.email };
        this.$HTTP("post", "/UnameEmail", datas).then(res => {
          if (res.result == false) {
            this.$HTTP("post", "/UnameExists", datas).then(ress => {
              if (ress.result == false) {
                this.one = false;
                this.two = true;
              } else {
                this.$message("您输入的账号已存在，请登录");
                let t;
                t = setTimeout(res => {
                  this.$router.push("/login");
                }, 2000);
              }
            });
          } else {
            this.$message("您输入的账号已存在，请登录");
            let t;
            t = setTimeout(res => {
              this.$router.push("/login");
            }, 2000);
          }
        });
      }
      //        let time;
      //        time = setTimeout(res => {
      //          console.log(333333);
      //          if (this.nextPage == true && this.nextPagetwo == true) {
      //
      //          } else if (this.nextPage == false || this.nextPagetwo == false) {
      //
      //
      //
      //          }
      //        },100);
    },
    returnTwo() {
      this.two = true;
      this.tree = false;
    },
    next(password) {
      if (this.password == "" || this.repPassword == "") {
        this.erroPaw = "请输入密码";
        return;
      } else {
        this.erroPaw = "";
      }
      if (this.password !== this.repPassword) {
        this.erroPaw = "两次输入的密码不一致";
        return;
      } else {
        this.erroPaw = "";
      }
      if (this.erroPaw == "" && this.radio == true && this.radio2 == true) {
        this.two = false;
        this.tree = true;
      } else {
        this.erroPaw = "密码格式不符合要求";
      }
    },
    //      密码框事件==========================

    //      1.获取焦点事件
    pawdFocus() {
      this.setPwPlace = "";
      this.erroPaw = "";
      this.hintPwd = true;
      this.triangleShow = true;
    },
    //     2.输入监控
    pwdInput(password) {
      let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
      if (password.length >= 6) {
        this.radio = true;
      } else {
        this.radio = false;
      }
      if (regExp.test(password)) {
        this.radio2 = true;
      } else {
        this.radio2 = false;
        return false;
      }
    },
    //      3.失焦事件
    autofocusPw() {
      this.setPwPlace = "请设置密码";
      this.hintPwd = false;
      this.triangleShow = false;
      if (this.password == "") {
        this.erroPaw = "请输入密码";
      }
    },
    //      再次验证密码失焦
    autofocusPwTw() {
      this.hintPwdTwo = false;
      this.setPwPlaceTwo = "请再次输入密码";
      if (this.password !== this.repPassword) {
        this.erroPaw = "输入密码不一致，请重新输入";
        return;
      } else {
        this.erroPaw = "";
      }
      if (this.password == "") {
        this.erroPaw = "请输入密码";
      }
    },
    pawdFocusTwo() {
      this.hintPwdTwo = true;
      this.setPwPlaceTwo = "";
      this.erroPaw = "";
    },
    pwdInputTwo(pwd) {},
    //      密码验证规则
    psw() {},

    //      邮箱输入框设置
    autofocusEm(email) {
      this.empalce = "请输入您的工作邮箱";
      this.hintEmail = false;

      if (this.email == "") {
        this.errorTitle = "请输入您的工作邮箱";
        return false;
      }

      let emailReg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
      if (!emailReg.test(this.email)) {
        this.errorTitle = "请输入正确的邮箱格式";
        return;
      } else {
        this.errorTitle = "";
      }
    },
    emailFocus() {
      this.empalce = "";
      this.hintEmail = true;
      this.errorTitle = "";
      this.eamilBoderRed = false;
      this.hintPw = false;
    },
    pwFocus() {
      this.hintEmail = false;
      this.hintPw = true;
    },
    nameBlur() {
      this.namePlace = "请输入您的姓名";
      this.hintName = false;
      if (this.name == "") {
        this.perfectErro = "请输入姓名";
      }
    },
    nameFocus() {
      this.namePlace = "";
      this.perfectErro = "";
      this.hintName = true;
    },
    telInput() {
      //        this.isPoneAvailable(this.tell);
    },
    telBlur() {
      this.telPlace = "请输入您的手机号";
      this.hintTel = false;
      if (this.tell == "") {
        this.perfectErro = "请输入手机号";
        return;
      }
      this.isPoneAvailable(this.tell);
    },
    telFocus() {
      this.perfectErro = "";
      this.telPlace = "";
      this.hintTel = true;
    },

    //  注册成功 进入登录页面
    enterLogin() {
      this.hintName = false;
      this.hintTel = false;
      if (this.tell == "" || this.name == "") {
        this.perfectErro = "请输入姓名或手机号";
        return false;
      } else if (this.perfectErro == "") {
        let data = {
          Uname: this.email,
          Pwd: this.password,
          Realname: this.name,
          Mobi: "",
          Type: "",
          Tel: this.tell,
          EMAIL: this.email,
          cid: ""
        };
        this.$HTTP("post", "/SetMember", data).then(res => {
          setCookie("loginEmail", this.email);
          setCookie("registerEmail", "");
          this.$message("注册成功");
          this.$router.push("/login");
        });
      }
    },
    //      手机号正则判断
    isPoneAvailable(str) {
      console.log(str);
      var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/; //手机的格式
      if (!reg.test(str)) {
        this.perfectErro = "*请输入正确的手机号";
        return false;
      } else {
        this.perfectErro = "";
      }
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
    if (getCookie("loginEmail")) {
      this.$router.push("/myTesk/myTeskList");
    }
    this.email = getCookie("registerEmail");
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

.registerBox {
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
    .logon::after {
      content: "";
      width: 10px;
      height: 10px;
      background: red;
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
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -158px;
      margin-top: -100px;
      background: #ffffff;
      z-index: 9999;
      padding: 20px;
      .title {
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
        .Triangle {
          left: 50%;
          margin-left: -5px;
          top: 40px;
          position: absolute;
          width: 10px;
          height: 10px;
          transform: rotate(45deg);
          -ms-transform: rotate(45deg); /* IE 9 */
          -moz-transform: rotate(45deg); /* Firefox */
          -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
          -o-transform: rotate(45deg); /* Opera */
          background: #ffffff;
          border-left: 1px solid #e0e0e0;
          border-top: 1px solid #e0e0e0;
          z-index: 999;
        }
        .hintMessage {
          padding: 20px 20px 0 20px;
          .box_sizing;
          width: 192px;
          height: 138px;
          left: 50%;
          margin-left: -96px;
          top: 45px;
          border: 1px solid #e0e0e0;
          .border_radius(@br:5px);
          position: absolute;
          z-index: 998;
          font-size: 13px;
          background: #ffffff;
          p {
            margin-bottom: 15px;
          }
        }
      }
      .error_title {
        position: absolute;
        color: red;
        left: 10px;
        font-size: 12px;
        bottom: -20px;
      }
      .button {
        position: absolute;
        left: 50%;
        margin-left: -109px;
        width: 218px;
        height: 40px;
        line-height: 40px;
        .line {
          display: inline-block;
          width: 27px;
          margin-top: 50px;
          margin-bottom: 5px;
          border: 1px solid #333333;
          transform: rotate(-45deg);
          -ms-transform: rotate(-45deg); /* IE 9 */
          -moz-transform: rotate(-45deg); /* Firefox */
          -webkit-transform: rotate(-45deg); /* Safari 和 Chrome */
          -o-transform: rotate(-45deg); /* Opera */
        }
        .step {
          text-align: center;
          line-height: 40px;
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #ffffff;
          cursor: pointer;
        }
        .step:hover {
          border: 1px solid #333333;
        }
      }
    }
  }
}
</style>
