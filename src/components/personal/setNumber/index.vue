<template>
  <div class="main_content">
    <div class="mainBox clearfix">
      <span class="logo_k">
        <el-upload
          class="avatar-uploader"
          action="/img.ashx"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <span class="editor">编辑</span>
            </el-upload>
      </span>
      <ul class="fl">
        <li>邮箱</li>
        <li>姓名</li>
        <li>手机号</li>
        <li>职位</li>
        <li>密码</li>
      </ul>
      <ul class="fl" style="margin-left: 40px;min-width: 170px">
        <li>
          <span>{{Email}}</span>
          <i class="el-icon-edit fr" @click="setEmail()"></i>
        </li>
        <li>
          <span>{{Realname}}</span>
          <i class="el-icon-edit fr" @click="setName()"></i>
        </li>
        <li>
          <span>{{Mobi}}</span>
          <i class="el-icon-edit fr" @click="setTel()"></i>
        </li>
        <li>
          <span>{{JobDescription}}</span>
          <i class="el-icon-edit fr" @click="setJob()"></i>
        </li>
        <li>
          <span>******</span>
          <i class="el-icon-edit fr" @click="setPwd()"></i>
        </li>
      </ul>
    </div>


    <!--修改邮箱-->
    <div class="message_box" v-show="setEmailShow">
      <div class="el-message-box">
        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <span>修改邮箱</span>
          </div>
          <button type="button" aria-label="Close" class="el-message-box__headerbtn"><i
            class="el-message-box__close el-icon-close" @click="Colse"></i></button>
        </div>
        <div class="el-message-box__content">
          <div class="el-message-box__input" style="">
            <div class="el-input">
              <p style="padding-left: 15px">请输入您的邮箱</p>
              <input type="text" autocomplete="off" placeholder="" v-model="Email_s" class="el-input__inner"
                     v-on:blur="autofocusEm(Email_s)" @focus="emailFocus">
            </div>
            <p class="erroPwd" style="margin: 0" :v-show="errorMessage">{{errorMessage}}</p>
          </div>
        </div>
        <div class="el-message-box__btns">
          <button type="button" class="el-button el-button--default el-button--small" @click="cancelEmail">
            <span>取消</span>
          </button>
          <button type="button" class="el-button el-button--default el-button--small el-button--primary"
                  @click="ConfirmaEmail(Email_s)">
            <span>确定</span>
          </button>
        </div>
      </div>
    </div>
    <!--修改姓名-->
    <div class="message_box" v-show="setNameShow">
      <div class="el-message-box">
        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <span>修改姓名</span>
          </div>
          <button type="button" aria-label="Close" class="el-message-box__headerbtn"><i
            class="el-message-box__close el-icon-close" @click="Colse"></i></button>
        </div>
        <div class="el-message-box__content">
          <div class="el-message-box__input" style="">
            <div class="el-input">
              <p style="padding-left: 15px">请输入您的姓名</p>
              <input type="text" autocomplete="off" placeholder="" v-model="Realname_s" class="el-input__inner"
                     @focus="focusName" v-on:blur="blurName">
            </div>
            <p class="erroPwd" style="margin: 0" :v-show="errorMessage">{{errorMessage}}</p>
          </div>
        </div>
        <div class="el-message-box__btns">
          <button type="button" class="el-button el-button--default el-button--small" @click="cancelName">
            <span>取消</span>
          </button>
          <button type="button" class="el-button el-button--default el-button--small el-button--primary"
                  @click="ConfirmName(Realname_s)">
            <span>确定</span>
          </button>
        </div>
      </div>
    </div>
    <!--修改手机号-->
    <div class="message_box" v-show="setTelShow">
      <div class="el-message-box">
        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <span>修改手机号</span>
          </div>
          <button type="button" aria-label="Close" class="el-message-box__headerbtn"><i
            class="el-message-box__close el-icon-close" @click="Colse"></i></button>
        </div>
        <div class="el-message-box__content">
          <div class="el-message-box__input" style="">
            <div class="el-input">
              <p style="padding-left: 15px">请输入您的手机号</p>
              <input type="text" autocomplete="off" placeholder="" v-model="Mobi_s" class="el-input__inner"
                     v-on:blur="telBlur(Mobi_s)" @focus="telFocus" v-on:input="telInput">
            </div>
          </div>
          <p class="erroPwd" style="margin: 0" :v-show="errorMessage">{{errorMessage}}</p>
        </div>
        <div class="el-message-box__btns">
          <button type="button" class="el-button el-button--default el-button--small" @click="cancelTel">
            <span>取消</span>
          </button>
          <button type="button" class="el-button el-button--default el-button--small el-button--primary"
                  @click="ConfirmTel(Mobi_s)">
            <span>确定</span>
          </button>
        </div>
      </div>


    </div>
    <!--修改职位-->
    <div class="message_box" v-show="setJobShow">
      <div class="el-message-box">
        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <span>修改职务</span>
          </div>
          <button type="button" aria-label="Close" class="el-message-box__headerbtn"><i
            class="el-message-box__close el-icon-close" @click="Colse"></i></button>
        </div>
        <div class="el-message-box__content">
          <div class="el-message-box__input" style="">
            <div class="el-input">
              <el-select v-model="JobDescription_s" placeholder="请选择" filterable>
                <el-option v-for="item in JobList" :key="item.Pkid" :label="item.Title"
                           :value="item.Pkid"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="el-message-box__btns">
          <button type="button" class="el-button el-button--default el-button--small" @click="cancelJob">
            <span>取消</span>
          </button>
          <button type="button" class="el-button el-button--default el-button--small el-button--primary"
                  @click="ConfirmJob">
            <span>确定</span>
          </button>
        </div>
      </div>
    </div>
    <!--修改密码-->
    <div class="message_box" v-show="setPwdShow">
      <div class="el-message-box">
        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <span>修改密码</span>
          </div>
          <button type="button" aria-label="Close" class="el-message-box__headerbtn"><i
            class="el-message-box__close el-icon-close" @click="Colse"></i></button>
        </div>
        <div class="el-message-box__content">
          <input type="password" v-model="oldPwd" class="pwd-input" placeholder="请输入旧密码" v-on:blur="oldPwdBlur(oldPwd)">
          <input type="password" v-model="newPwd" v-on:blur="autofocusPw(newPwd)" @focus="pawdFocus"
                 v-on:input="pwdInput(newPwd)" maxlength="20" class="pwd-input" placeholder="请输入新密码">
          <input type="password" v-model="newPwdtwo" v-on:blur="autofocusPwTw(newPwdtwo)" @focus="pawdFocusTwo"
                 v-on:input="pwdInputTwo(newPwdtwo)" class="pwd-input" placeholder="请再次输入新密码">
          <p class="erroPwd" v-if="erroPad">{{erroPad}}</p>
          <div class="triangle" v-show="triangleShow">
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
        <div class="el-message-box__btns">
          <button type="button" class="el-button el-button--default el-button--small" @click="cancelPwd">
            <span>取消</span>
          </button>
          <button type="button" class="el-button el-button--default el-button--small el-button--primary"
                  @click="ConfirmPwd">
            <span>确定</span>
          </button>
        </div>
      </div>


    </div>
    <!--修改手机号-->
    <!--cancelTel-->
    <div class="pop-up" v-show="setPop"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        Pkid: '',
        data: '',
        imageUrl: '',
        Realname: '',
        Mobi: '',
        Email: "",
        JobDescription: '',
        setBoxShow: false,
        JobList: '',
        Realname_s: '',
        Mobi_s: '',
        Email_s: "",
        JobDescription_s: '',
        setBoxShow_s: false,
        JobList_s: '',
        setPwdBoxShow: false,
        pwd: '',
        setJobShow: "", //修改职位
        setPwdShow: '', //修改密码
        setPop: false, //弹框隐藏显示
        setNameShow: false, // 修改姓名
        setTelShow: false, //修改手机号
        erroPwd: '',   //密码错误信息提示
        errorMessage: '',  //错误信息提示
        oldPwd: '', //输入旧密码
        newPwd: '',
        newPwdtwo: '',
        triangleShow: false, //信息提示显示
        radio: false,
        radio2: false,
        erroPad: '',
        setEmailShow: false, //修改邮箱
        oldOk: '',
        nextPage: false,
        nextPagetwo: false,
      }
    },
    watch: {
      errorMessage(val, oldval) {
//        console.log(1,val,2,oldval);
        if (val) {
//          this.

        }
      },
      erroPwd() {

      }
    },
    methods: {
//      关闭弹窗
      Colse() {

        this.erroPwd = "";
        this.errorMessage = "";
        this.setEmailShow = false;
        this.setPop = false;
        this.setJobShow = false;
        this.setPwdShow = false;
        this.setNameShow = false;
        this.setTelShow = false
      },

//      取消修改姓名
      cancelName() {
        this.$message('取消修改姓名');
        this.Colse();
      },
//      修改姓名
      ConfirmName(Realname_s) {

        if (Realname_s !== '') {
          let data = {'pkid': this.Pkid, 'Realname': this.Realname_s};
          this.$HTTP('post', '/UpdateMemberRealname', data).then(res => {
            this.Realname = this.Realname_s;
            this.$message('修改成功');
            this.setNameShow = false;
            this.setPop = false;
          });
        } else {
          this.errorMessage = '请填写姓名';
        }
      },
      focusName() {
        this.errorMessage = '';
      },
      blurName(){
        if(this.Realname_s==""){
          this.errorMessage = '请填写姓名';
        }
      },
      //      上传头像
      handleAvatarSuccess(res, file) {
        this.imageUrl = res;
        console.log(res);
//        this.imageUrl = URL.createObjectURL(file.raw);
        this.logo = res;
        let data = {'userpkid': this.Pkid, 'pic': res};
        this.$HTTP('post', '/UpdateMemberPIC', data).then(res => {
          console.log(res);
        })
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg/png/gif/tiff/';
        const isLt2M = file.size / 1024 / 1024 < 2;

//        if (!isJPG) {
//          this.$message.error('上传头像图片只能是 JPG 格式!');
//        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
//      修改姓名
      setName(Realname) {
        this.Realname_s=this.Realname;
        this.setPop = true;
        this.setNameShow = true;
      },
//      修改手机号
      setTel(Mobi) {
        this.Mobi_s=this.Mobi;
        this.setTelShow = true;
        this.setPop = true;
      },
      telInput() {
//        this.isPoneAvailable(this.Mobi_s);
      },
      telBlur(Mobi_s) {
        if (this.Mobi_s == '') {
          this.errorMessage = '请输入手机号';
          return
        } else {
          this.isPoneAvailable(this.Mobi_s);
        }
      },
      telFocus() {
        this.errorMessage = '';
      },
      //      手机号正则判断
      isPoneAvailable(str) {
        var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;              //手机的格式
        if (!reg.test(str)) {
          this.errorMessage = '*请输入正确的手机号';
          return false;
        } else {
          this.errorMessage = '';
        }
      },
//      取消修改手机号
      cancelTel() {
        this.$message('取消修改手机号');
        this.Colse();
      },
//      修改手机号
      ConfirmTel(Mobi_s) {
        this.isPoneAvailable(Mobi_s);
        if (Mobi_s == '' || this.errorMessage != '') return;

        let data = {'pkid': this.Pkid, 'Tel': this.Mobi_s};
        this.$HTTP('post', '/UpdateMemberTel', data).then(res => {
          this.Mobi = this.Mobi_s;
          this.$message('修改手机号成功');
          this.Colse();
        });
      },
//      修改职位
      setJob() {
        this.setPop = true;
        this.setJobShow = true;
      },
//      点击确定修改职务
      ConfirmJob() {
        let data = {'pkid': this.Pkid, 'Job': this.JobDescription_s};
        this.$HTTP('post', '/UpdateMemberJob', data).then(res => {
          this.$message('职务修改成功');
          let tittle = this.JobList.findIndex(ele => {
            return ele.Pkid === this.JobDescription_s;
          });
          if (tittle !== -1) {
            this.JobDescription = this.JobList[tittle].Title;
          }
          this.setPop = false;
          this.setJobShow = false;
        })
      },
//点击取消不 修改职务
      cancelJob() {
        this.$message('职务取消修改');
        this.setPop = false;
        this.setJobShow = false;
      },
//      密码修改
      setPwd() {
        this.erroPad='';
        this.setPop = true;
        this.setPwdShow = true;
      },
      //      1.获取焦点事件
      pawdFocus() {
        this.setPwPlace = '';
        this.erroPad = '';
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
        this.triangleShow = false;
        if (this.password == "") {
          this.erroPad = '请输入密码'
        }
      },
      //      再次验证密码失焦
      autofocusPwTw() {
        this.setPwPlaceTwo = "请再次输入密码";
        if (this.newPwd !== this.newPwdtwo) {
          this.erroPad = '输入密码不一致，请重新输入';
          return
        } else {
          this.erroPad = '';
        }
        if (this.password == "") {
          this.erroPad = '请输入密码'
        }
      },
      pawdFocusTwo() {
        this.setPwPlaceTwo = "";
        this.erroPad = ''
      },
      pwdInputTwo(pwd) {
      },
      oldPwdBlur(oldPwd) {
        let data = {'userpkid': this.Pkid, 'oldPassword': oldPwd};
        this.$HTTP('post', '/ExistsPassword', data).then(res => {
          if (res.result.code !== 200) {
            this.erroPad = '旧密码输入错误';
            this.oldOk = false;
            return false;
          } else {
            this.erroPad = '';
            this.oldOk = true;
          }
        });
      },
      cancelPwd() {
        this.erroPad = '';
        this.$message('取消修改密码');
        this.setPop = false;
        this.setPwdShow = false;
      },
      ConfirmPwd() {
        if (this.newPwd == '' || this.newPwdtwo == '') {
          this.erroPad = "请输入密码";
          return;
        } else {
          this.erroPad = "";
        }
        if (this.newPwd !== this.newPwdtwo) {
          this.erroPad = '两次输入的密码不一致';
          return
        } else {
          this.erroPad = '';
        }
        this.oldPwdBlur(this.oldPwd);
        if (this.erroPad == '' && this.radio == true && this.radio2 == true && this.oldOk == true) {
          let data = {'userpkid': this.Pkid, 'oldPassword': this.oldPwd, 'newPassword': this.newPwd};
          this.$HTTP('post', '/UpdatePassword', data).then(res => {
            this.$message('密码修改成功');
            this.setPwdShow = false;
            this.setPop = false;
          })
        }
        else {
          this.$message('密码修改失败，请重新输入');
        }
      },
//      点击修改邮箱
      setEmail(Email) {
        this.Email_s = this.Email;
        this.setPop = true;
        this.setEmailShow = true;
      },
      //      邮箱输入框设置
      autofocusEm(Email_s) {
        let emailReg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
        if (this.Email_s == '') {
          this.errorMessage = "请输入您的工作邮箱";
          return
        }
        if (!emailReg.test(this.Email_s)) {
          this.errorMessage = "请输入正确的邮箱格式";
        } else {
          this.errorMessage = '';
        }
      },

      emailFocus() {
        this.errorMessage = '';
      },
//      点击确定 修改邮箱信息
      ConfirmaEmail(Email_s) {
        this.autofocusEm(Email_s);
        if (this.Email_s == '') return;
        let datas = {'Email': this.Email_s};
        this.$HTTP('post', '/UnameEmail', datas).then(res => {
//          为 true 存在  false 不存在
          if (res.result == true) {
            this.nextPage = false;
          } else {
            this.nextPage = true;
          }
        });
        this.$HTTP('post', '/UnameExists', datas).then(ress => {
          if (ress.result == true) {
            this.nextPagetwo = false;
          } else {
            this.nextPagetwo = true;
          }
        });
        let t;
        t = setTimeout(res => {
          console.log(this.nextPage, this.nextPagetwo);
//          this.nextPage 为 true 说明不存在 可注册
          if (this.nextPage == true && this.nextPagetwo == true) {
            console.log(this.nextPage, this.nextPagetwo);
            let emil = {'pkid': this.Pkid, 'Email': this.Email_s};
            this.$HTTP('post', '/UpdateMemberEmail', emil).then(res => {
              this.Email = this.Email_s;
              this.$message('邮箱已修改成功');
              this.setPop = false;
              this.setEmailShow = false;
            });
          } else {
            this.$message('您输入的邮箱已存在，请重新输入');
          }
        }, 500);
      },

//      点击取消 取消修改邮箱信息
      cancelEmail() {
        this.errorMessage = '';
        this.erroPad = '';
        this.erroWor = true;
        this.setPop = false;
        this.setEmailShow = false;
        this.$message('取消修改邮箱')
      },
    },
    created() {

      let body = document.querySelector('body');
      body.addEventListener('click', (e) => {
        if (e.target.id !== 'setButton') {
          $('#settingShow').hide();
        } else {
          $('#settingShow').show();
        }
      }, false);


      let staffInfo = JSON.parse(localStorage.getItem('staffInfo'));
      this.Pkid = staffInfo.Pkid;
      let data = {'userpkid': this.Pkid};
      this.$HTTP('post', '/getMember', data).then(res => {
        let result = res.result;
//        console.log(result);
        this.imageUrl = result.Pic;
        this.Realname_s = result.Realname;
        this.Mobi_s = result.Mobi;
        this.Email_s = result.Email;

        this.JobDescription_s = result.JobDescription;
        //      修改信息展示
        this.Realname = result.Realname;
        this.Mobi = result.Mobi;
        this.Email = result.Email;
        this.JobDescription = result.JobDescription;
      });
//      获取职位列表
      let datas = {'pkid': '5'};
      this.$HTTP('post', '/GetCategory', datas).then(res => {
        this.JobList = res.result;
      })
    },
    mounted() {

    }
  }
</script>


<style lang="less">
  @import '../../../assets/css/base.less';
  @import '../../../assets/css/media.less';

  .main_content {
    .mainBox {
      min-width: 270px;
      position: absolute;
      left: 50%;
      top: 30px;
      margin-left: -135px;
      ul {
        margin-top: 40px;
        height: 190px;
        li {
          height: 20%;
          i {
            cursor: pointer;
          }
        }
        .el-button {
          padding: 0;
        }
      }
      .logo_k {
        display: block;
        .border_radius(@br: 50%);
        width: 66px;
        height: 66px;
        margin: 0 auto;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        img {
          width: 66px;
        }
        .editor {
          display: block;
          .border_radius(@br: 50%);
          width: 66px;
          height: 66px;
          background: rgba(0, 0, 0, 0);
          color: #fff;
          line-height: 66px;
          position: absolute;
          top: 0;
          right: 0;
          text-align: center;
          opacity: 0;
          z-index: 1000;
        }
        .editor:hover {
          background: rgba(0, 0, 0, 0.7);
          opacity: 1;
        }
      }

    }
    .pop-up {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      z-index: 1000;

    }
    .message_box {
      position: absolute;
      width: 440px;
      padding: 0;
      left: 50%;
      top: 50%;
      transform: translateY(-50%);
      margin-left: -220px;
      z-index: 1001;
      .el-message-box {
        .el-message-box__header {
          height: 55px;
          line-height: 55px;
          text-align: center;
          padding: 0;
          border-bottom: 1px solid #DCDCDC;
          .el-message-box__title {
            display: block;
            height: 55px;
            line-height: 55px;
          }
        }

        .el-message-box__content {
          padding: 30px 30px;
          .box_sizing;
          .triangle {
            .Triangle {
              left: 50%;
              margin-left: -5px;
              bottom: 96px;
              position: absolute;
              width: 10px;
              height: 10px;
              transform: rotate(45deg);
              -ms-transform: rotate(45deg); /* IE 9 */
              -moz-transform: rotate(45deg); /* Firefox */
              -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
              -o-transform: rotate(45deg); /* Opera */
              background: #ffffff;
              border-left: 1px solid #E0E0E0;
              border-top: 1px solid #E0E0E0;
              z-index: 999;
            }
            .hintMessage {
              padding: 20px 20px 0 20px;
              .box_sizing;
              width: 192px;
              height: 138px;
              left: 50%;
              margin-left: -96px;
              bottom: -36px;
              border: 1px solid #E0E0E0;
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

          .erroPwd {
            color: red;
            margin-top: -15px;
            font-size: 12px;
            padding-left: 15px;
            position: absolute;
          }
          .pwd-input {
            height: 40px;
            width: 100%;
            border-bottom: 1px solid #999999;
            margin-bottom: 20px;
            padding: 10px;
            .box_sizing;
          }
          .el-message-box__message p {
            padding-left: 15px;
            line-height: 1;
            font-size: 12px;
            color: #999999;
          }
          .el-message-box__input {
            padding: 0;
            .el-input {
              height: 50px;
              position: relative;
              .el-input__inner {
                height: 35px;
                padding: 6px 0 10px 15px;
                .border_radius(@br: 0);
                border: none;
                border-bottom: 1px solid #999999;
              }
              .el-select {
                width: 100%;
              }
              .el-input__suffix {
                top: -6px;
              }
            }
          }
        }
        .el-message-box__btns {
          padding: 0 30px 30px 0;
        }
      }

    }
  }

  .el-message-box {
    width: 440px;
    padding: 0;
    .el-message-box__header {
      height: 55px;
      line-height: 55px;
      text-align: center;
      padding: 0;
      border-bottom: 1px solid #DCDCDC;
      .el-message-box__title {
        display: block;
        height: 55px;
        line-height: 55px;
      }
    }

    .el-message-box__content {
      padding: 35px 30px;
      .box_sizing;
      .el-message-box__message p {
        padding-left: 15px;
        line-height: 1;
        font-size: 12px;
        color: #999999;
      }
      .el-message-box__input {
        padding: 0;
        .el-input {
          p {
            font-size: 12px;
          }
          .el-input__inner {
            height: 25px;
            .border_radius(@br: 0);
            border: none;
            border-bottom: 1px solid #999999;
          }
        }
      }
    }
    .el-message-box__btns {
      padding: 0 30px 35px 0;
      .el-button {
        span {

        }
      }
    }
  }

</style>
