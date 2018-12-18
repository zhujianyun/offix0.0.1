<template>
  <div class="info_maintenance content">
    <div class="big-box">
      <p class="title">基本信息维护</p>
      <div class="message_settings">
        <ul>
          <li>
            <span class="option">账号：</span><span>{{result.Pkid}}</span>
          </li>
          <li>
            <span class="option">邮箱：</span>
            <el-input type="text" placeholder="例如：dedongwang@apex.top" :class="{'red_border':eamilBoderRed }"
                      v-model="email"
                      v-on:blur="autofocusEm(email)" @focus="emailFocus"></el-input>
            <p v-model="PromptEmail" v-if="PromptEmail">{{'*' + PromptEmail}}</p>
          </li>
          <li>
            <span class="option">公司名称：</span>
            <el-input type="text" placeholder="例如：北京泰合鼎鼎科技有限公司" v-model="company"
                      :class="{'red_border': companyBoderRed}"
                      @blur="companyNameBlur(company)" @focus="companyFocus"></el-input>
            <p v-model="companyMessage" v-if="companyMessage">{{'*' + companyMessage}}</p>

          </li>
          <li>
            <span class="option ">LOGO：</span>
            <el-upload
              class="avatar-uploader"
              action="/img.ashx"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <span class="amend">点击修改</span>
            </el-upload>
            <!--<img :src="url" alt="" class="logo" @click="uploading()" >-->
          </li>
          <li>
            <span class="option">修改密码：</span>
            <el-input type="password" :class="{'red_border': pwdBoderRed}" v-model="Pwd" @input="pwdInput"
                      v-on:blur="autofocusPw(Pwd)"
                      placeholder="6-16位数字、字母、字符任意组合。"></el-input>
            <p v-model="PromptPwd" v-if="PromptPwd">{{'*' + PromptPwd}}</p>
          </li>
          <li>
            <span class="option">所属行业：</span>
            <el-select v-model="industry" placeholder="请选择">
              <el-option v-for="item in selectIndustry" :key="item.Pkid" :label="item.Title"
                         :value="item.Pkid"></el-option>
            </el-select>
          </li>
          <li>
            <span class="option">绑定管理员：</span>
            <el-select v-model="userid" placeholder="请选择" filterable>
              <el-option v-for="item in staffList" :key="item.Pkid" :label="item.Realname + '/' + item.Mobi"
                         :value="item.Pkid"></el-option>
            </el-select>
          </li>
        </ul>
      </div>
      <div class="saves">
        <button type="button" class="main_button_bg fr" @click="save()">保存</button>

      </div>
    </div>
  </div>
</template>
<script>
  import {setCookie, getCookie} from "../../../api/cookie"

  export default {
    data() {
      return {
        //       行业列表
        selectIndustry: [],
//       绑定管理员下拉框
        staffList: [],
        sPkid: '',
//        请求信息
        url: '',
        result: [],
        userpkid: '',
        email: '',
        company: '',
        logo: '',
        industry: '',
        userid: '',

        imageUrl: '',

        Pwd: '',
        pwd: '',
//  邮箱提示信息
        PromptEmail: '',
//  密码框提示信息
        PromptPwd: '',
//  公司名称信息
        companyMessage: '',
//  红框
        companyBoderRed: false,
        eamilBoderRed: false,
        pwdBoderRed: false,
      }
//
    },
    methods: {

//      获取信息列表
      retrieval() {
        let data = {adminpkid: 1};
        this.$HTTP('post', '/getAdmin', data).then(r => {
          this.result = r.result;
          this.email = this.result.Email;
          this.company = this.result.Company;
          this.industry = this.result.IndustryId;
          this.userid = this.result.UserId;
          this.imageUrl = this.result.Logo;
          this.logo = this.result.Logo;
        });
      },
      getStaffList() {
        let obj = {pkid: 1, userID: 0, number: 0};
        this.$HTTP('get', '/GetUserListByPkid', obj).then(res => {
          this.staffList = res.result;
          this.staffCount = this.staffList.length;
        }).catch(err => {
          console.log('获取员工列表失败', err);
        });
      },
//      获取行业列表
      industryList() {
        let list = {"pkid": '7'};
        this.$HTTP('post', '/GetCategory', list).then(res => {
          this.selectIndustry = res.result;
//          console.log(this.selectIndustry);
        })
      },

//      上传头像
      handleAvatarSuccess(res, file) {
        this.imageUrl = res;
//        this.imageUrl = URL.createObjectURL(file.raw);
        this.logo = res;
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
//      点击保存
      save() {
        this.autofocusPw();

        if (this.companyMessage) {
          this.companyBoderRed = true;
        }
        if (this.PromptEmail) {
          this.eamilBoderRed = true;
        }
        if (this.PromptPwd) {
          this.pwdBoderRed = true;
        }
        if (this.PromptEmail || this.companyMessage || this.PromptPwd) {
          return
        }


        this.$confirm('是否保存操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            "userpkid": this.userpkid,
            "email": this.email,
            "company": this.company,
            "logo": this.logo,
            "industry": this.industry,
            "userid": this.userid,
            'pwd': this.pwd
          };

          this.$HTTP('post', '/System_Update_Admin', data).then(r => {
          });
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          });
        });
      },
      autofocusPw(pwd) {
        if (this.Pwd == '') {
          this.PromptPwd = "请输入密码";
        }
      },
      pwdInput() {
//        let pwds="^([A-Z]|[a-z]|[0-9]|[`-=[];,./~!@#$%^*()_+}{:?]){6,16}$";
//        let patrn=/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
//        let length=/.{6,}/;
        let pat = /^(\w){6,16}$/;
        if (!pat.exec(this.Pwd)) {
          this.PromptPwd = "请输入6-16位数字、字母、字符任意组合";
        } else {
          this.PromptPwd = "";
          this.pwdBoderRed = true;
          setCookie('Pwd', this.Pwd);
        }
        this.pwd = this.Pwd;
      },

//      邮箱输入框设置
      autofocusEm(email) {
        let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$/;
        if (this.email == '') {
          this.PromptEmail = "请输入邮箱账号";
        } else if (!emailReg.test(this.email)) {
          this.PromptEmail = "请输入正确的邮箱格式";
        } else {
          this.PromptEmail = "";
        }
      },
      emailFocus() {
        this.PromptEmail = '';
        this.eamilBoderRed = false;
      },

//      2.公司名称输入输入框
//      公司名称输入框 鼠标离开
      companyNameBlur(company) {
//        console.log(this.company);
        if (this.company == '') {
          this.companyMessage = "请输入公司名称";
        } else if (this.company) {
          this.companyMessage = "";
          this.companyBoderRed = false;
        }
      },
//      点击输入框之后 提示信息消失
      companyFocus() {
        this.companyMessage = "";
        this.companyBoderRed = false;
      }
    },

    created() {
      this.userpkid = getCookie('Pkid');
      this.Pwd = getCookie("Pwd");

      this.retrieval();
//      获取下拉框列表（绑定管理员）
      this.getStaffList();
//      获取下拉框列表（行业信息）
      this.industryList();
    }
  }
</script>
<style lang="less">
  @import '../../../assets/css/base.less';
  @import '../../../assets/css/media.less';

  @blue: #4583F0;
  .info_maintenance {
    height: 100%;
    overflow: hidden;

    .big-box {
      /*height: calc(~ '100vh - 228px');*/
      height: calc(~ '100vh - 228px');

      @media screen and (max-height: 768px) {
        /*height: calc(~ '100vh - 178px');*/
        height: calc(~ '100vh - 178px');

      }
      overflow: hidden;
      margin-left: auto;
      margin-right: auto;

      position: relative;
      top: 50%;
      transform: translateY(-50%);

      line-height: 1;
      padding: 40px;
      .h_mediaPdTwo(@pxOne: 30px, @pxTwo: 40px);
      .w_mediaPdTwo(@pxOne: 40px, @pxTwo: 30px);
      width: 491px;
      background: rgba(255, 255, 255, 1);
      .border_radius(@br: 6px);

      .box_sizing;
      .title {
        font-size: 18px;
        padding-bottom: 30px;

      }

      /*-----------------------------------------------------------------*/
      .message_settings {
        /*max-height: calc(~ '100vh - 316px');*/
        /*max-height: calc(~ '100vh - 396px');*/
        max-height: calc(~ '100vh - 426px');
        /*height: calc(~ '100vh - 120px - 88px - 80px - 106');*/

        @media screen and (max-height: 768px) {
          /*max-height: calc(~ '100vh - 266px');*/
          /*max-height: calc(~ '100vh - 346px');*/
          /*max-height: calc(~ '100vh - 326px');*/
          max-height: calc(~ '100vh - 346px');
          /*height: calc(~ '100vh - 100px - 88px - 60px - 86px');*/

        }
        overflow-y: auto;
        li {
          padding-bottom: 30px;
          .h_mediaPdB(@pxOne: 20px);
          &:last-child {
            padding-bottom: 0px;

          }
        }

        font-size: 14px;
        .avatar-uploader {
          display: inline-block;
          vertical-align: middle;
        }
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          .border_radius(@br: 50%);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;

        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 60px;
          height: 60px;
          line-height: 60px;
          text-align: center;
        }
        .avatar {
          width: 60px;
          height: 60px;
          display: block;
        }

        /*-----------------------------------------------------------------*/

        li {
          padding-bottom: 20px;
          position: relative;
          .option {
            width: 84px;
            display: inline-block;
            text-align: right;
            .form-control {
              width: 84px;
              height: 30px;
              background: red;
            }
          }
          p {
            left: 88px;
            bottom: 5px;
            font-size: 12px;
            color: red;
            position: absolute;
          }

          .prompt {
            margin: 3px 0 0 90px;
            color: rgba(153, 153, 153, 1);
          }
          .el-input {
            display: inline-block;
            /*width: 317px;*/
            width: 300px;
          }
        }

        .amend:hover {
          display: block;
          background: rgba(0, 0, 0, .5);
          color: #ffffff;
        }

        .amend {
          position: absolute;
          width: 60px;
          height: 60px;
          background: rgba(0, 0, 0, 0);
          color: rgba(0, 0, 0, 0);
          top: 0;
          left: 0;
          font-size: 12px;
          line-height: 60px;
          .border_radius(@br: 50%);
        }
        .amend:hover {
          display: block;
          background: rgba(0, 0, 0, .5);
          color: #ffffff;
        }

        .amend {
          position: absolute;
          width: 60px;
          height: 60px;
          background: rgba(0, 0, 0, 0);
          color: rgba(0, 0, 0, 0);
          top: 0;
          left: 0;
          font-size: 12px;
          line-height: 60px;
        }
      }

      .saves {
        height: 40px;
        padding-top: 30px;
      }
    }
  }
</style>
