<template>
  <div id="forgetPwd">
    <div class="bgSvg_k">
      <div class="grid_ke"></div>
       <div class="svg"></div>
    </div>
    <div class="main_box">
      <div class="main">
        <!--步骤一 -->
        <div class="getPwd" v-show="one">
          <p class="title">找回密码</p>
          <div class="email_div box">
            <span class="hint" v-show="hintEmail">请输入邮箱账号</span>
            <input type="text" placeholder="请输入邮箱账号" class="inputBox" v-model="email"
                   v-on:blur="autofocusEm(email)" @focus="emailFocus">
            <span class="error_title" v-if="errorTitle">{{errorTitle}}</span>
          </div>
          <div class="button">
            <span class="step fl" @click="returnLogin">←</span>
            <span class="step fr" @click="next">→</span>
          </div>
        </div>
        <!--步骤二 发送邮件-->
        <div class="sendEmail" v-show="two">
          <i class="el-icon-circle-check-outline"></i>
          <p class="title">邮件发送成功</p>
          <div class="pwd_div box">
            <div class="" style="color: #333333">邮件已发送至您的邮箱 {{email}} 快去查收邮件吧 </div>
          </div>
          <div class="button">
            <span class="step" @click="returnOne">←</span>
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
      errorTitle: "", // 错误提示
      one: true,
      two: false,
      tree: false,
      //     第一步
      email: ""
    };
  },

  mounted() {},

  methods: {
    //      返回登录页面
    returnLogin() {
      this.$router.push("/login");
    },

    //返回第一步
    returnOne() {
      this.one = true;
      this.two = false;
    },
    //      下一步
    next() {
      this.autofocusEm(this.email);

      if (this.errorTitle == "") {
        let data = { Email: this.email };
        this.$HTTP("post", "/UnameEmail", data).then(res => {
          //          true 代表已注册
          if (res.result == true) {
            this.one = false;
            this.two = true;
            //            生成随机数
            let t = "";
            for (let i = 0; i < 5; i++) {
              t += Math.floor(Math.random() * 10);
            }
            //            如果注册 可以修改密码
            let data = { Email: this.email, number: t };
            this.$HTTP("post", "/RetrievePassword", data).then(res => {
              setCookie("number", t);
            });
          } else {
            this.errorTitle = "该邮箱尚未注册。";
          }
        });
      }
    },
    //      邮箱输入框设置
    autofocusEm(email) {
      this.hintEmail = false;
      let emailReg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;

      if (email == "") {
        this.errorTitle = "请输入邮箱账号";
        return false;
      } else if (!emailReg.test(email)) {
        this.errorTitle = "请输入正确的邮箱格式";
        return false;
      } else {
        this.errorTitle = "";
      }
    },
    emailFocus() {
      this.hintEmail = true;

      this.errorTitle = "";
      this.eamilBoderRed = false;
      this.hintPw = false;
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
    // if (getCookie("loginEmail")) {
    //   this.$router.push("/myTesk/myTeskList");
    // }
    let emails = getCookie("loginEmail");

    let emailReg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
    if (!emailReg.test(emails)) {
    } else {
      this.email = emails;
    }
  }
};
</script>

<style lang="less">
@import "../../assets/css/base.less";
@import "../../assets/css/media.less";

/*去除默认输入框底色*/
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset; //使用足够大的纯色内阴影覆盖黄色背景
}

input:-webkit-autofill {
  background-color: #ffffff !important;
  background-image: none;
  color: #999999;
}

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

#forgetPwd {
  width: 100%;
  height: 100%;
  background: #ffffff;

  .topNav {
    height: 50px;
    width: 100%;
    line-height: 50px;
    z-index: 9999;
    right: 0;
    /*background: #ffffff;*/
    position: absolute;
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
          color: #999999;
          bottom: 30px;
        }
        .inputBox {
          width: 317px;
          border-bottom: 1px solid #999999;
          padding: 0 10px 10px 10px;
          .box_sizing;
          position: absolute;
          bottom: 0;
          left: 0;
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
        text-align: center;
        margin-top: 40px;
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
      .sendEmail {
        text-align: center;
        .el-icon-circle-check-outline {
          font-size: 40px;
          margin-bottom: 37px;
          color: #999999;
        }
        .hint {
          width: 100%;
          text-align: center;
          color: #333333;
          line-height: 2;
          bottom: 30px;
          position: absolute;
        }
      }
    }
  }
}
</style>
