<template>
  <div class="popup_shares">
     <div class="share_box" v-show="Defaultapplet" @click.stop="hidePopo">
      <i class="popup_close iconfont icon-guanbi cur fr cancelIcon" @click="popupCancel"></i>
      <div class="share_left fl">
        <div class="share_phone fl">
         <wx-share :params="shareParams"></wx-share>
        </div>
        <div class="lines fl"></div>
      </div>
      <div class="share_right fl">
        <div class="shareType">
          <p class="one">以小程序形式分享</p>
          <p class="two">请使用微信扫一扫进行分享</p>
          <img :src="qrcode" class="QRcode " alt="">
          <span class="othershare" @click="otherType">切换为网页分享</span>
        </div>
        <p class="shareContent fr" @click.stop="checkContent">选择分享内容</p>
          <ul class="staff_ul fr" v-if="checkContenBoxShow">
             <ul class="mainBox_ke clearfix" @click.stop >
                <li class="gaishu cur">
                  <input v-model='summarizeFlag' class="staff_checked cur" @change="summarize()" type="checkbox">
                  <!-- <el-checkbox class="staff_checked" v-model="summarizeFlag"  @change="summarize()"></el-checkbox> -->
                  <span class="cur" @click.stop="summarize('sum')">任务描述</span>
                </li>
                <li class="fl checkList" v-for="(staff, index) in staffList" :key="index">
                  <input  v-model='staff.checked' class="staff_checked cur"  @change="staffChange(staff)"  type="checkbox">
                  <!-- <el-checkbox class="staff_checked" v-model="staff.checked"  @change="staffChange(staff,staff.checked)"></el-checkbox> -->
                  <span class="cur" @click.stop="staffChange(staff,index)">{{staff.UserName}}</span>
               </li>
             </ul>
            <div class="button clearfix">
              <span class="fl" @click="cancel">取消</span>
              <span class="fr" @click="ok">确认</span>
            </div>
           </ul>
      </div>
    </div>
  <div class="share_box_two" v-show="!Defaultapplet" @click.stop="hidePopo">
      <i class="popup_close iconfont icon-guanbi cur fr cancelIcon" @click="popupCancel"></i>
      <div class="share_left fl ">
      <ul class="templates">
        <li v-for="(list,index) in imgList" :key='index' @click="checkTemplate(index)">
          <img  :src="list.url" :class="{'activeImg': index + 1 == TemplateType}" alt="">
          <p :class="{'activefont': index + 1 == TemplateType}">{{list.title}} </p>
        </li>
      </ul>
      </div>
      <div class="share_middle fl">
        <div class="templateStyle">
            <web-share-a v-show="TemplateType == 2" thumbnail="1" :params="shareParams"></web-share-a>
            <web-share-b v-show="TemplateType == 1" thumbnail="1" :params="shareParams"></web-share-b>
        </div>
      </div>
      <div class="share_right fr">
         <div class="shareType">
            <p class="one">以网页形式分享</p>
            <p class="two">请使用常用app扫码进行分享</p>
            <img :src="webqrcode" class="QRcode " alt="">
            <textarea class="url" type="text" v-model="webUrl" id='url'></textarea>
            <div class="copy" @click="shareLinkCopy('url')">一键复制</div>
            <p class="othershare" @click="otherType">切换为小程序分享</p>
        </div>
        <p class="shareContent fr" @click.stop="checkContent">选择分享内容</p>
      <ul class="staff_ul fr" v-if="checkContenBoxShow">
             <ul class="mainBox_ke clearfix" @click.stop >
                <li class="gaishu cur">
                  <input v-model='summarizeFlag' class="staff_checked cur" @change="summarize()" type="checkbox">
                  <!-- <el-checkbox class="staff_checked" v-model="summarizeFlag"  @change="summarize()"></el-checkbox> -->
                  <span class="cur" @click.stop="summarize('sum')">任务描述</span>
                </li>
                <li class="fl checkList" v-for="(staff, index) in staffList" :key="index">
                  <input  v-model='staff.checked' class="staff_checked cur"  @change="staffChange(staff)"  type="checkbox">
                  <!-- <el-checkbox class="staff_checked" v-model="staff.checked"  @change="staffChange(staff,staff.checked)"></el-checkbox> -->
                  <span class="cur" @click.stop="staffChange(staff,index)">{{staff.UserName}}</span>
               </li>
             </ul>
            <div class="button clearfix">
              <span class="fl" @click="cancel">取消</span>
              <span class="fr" @click="ok">确认</span>
            </div>
           </ul>
        <p class="editor fr" @click="enterEditoy">高级编辑</p>
      </div>
    </div>
  </div>
</template>
<script>
import wxShare from "./wxShare";
import webShareA from "../sharePage/index";
import webShareB from "../styleTwo/index";

export default {
  components: {
    wxShare,
    webShareA,
    webShareB
  },
  props: ["teskId", "QRCodeUrl", "shareLink", "shareId", "UserPkids"],
  data() {
    return {
      Defaultapplet: true, //默认小程序分享页面
      copyUrl: "http://server.apexgame.cn/#/sharePage?pkid=157",
      userID: "", // 当前登录用户的ID
      qrcode: "", //二维码图片地址
      webqrcode: "", //网页二维码地址
      summarizeFlag: true, //概述是否选择
      checkedUserId: [], //选择人员的id
      coordinationsId: [], //coordinationsId ID
      imgList: [
        {
          url: require("../../assets/img/templateOne.png"),
          title: "商务风格"
        },
        {
          url: require("../../assets/img/templateTwo.png"),
          title: "商务风格"
        }
      ],
      webUrl: "", //weburl 地址
      checkContenBoxShow: false, //选择内容盒子 显示隐藏
      shareData: {}, // 分享的卡片所有详情
      shareCoverChecked: false, // 是否选择使用封面
      shareTitle: "", // 分享主题
      shareRequireChecked: true, // 是否选择分享需求
      shareRequire: "", // 任务需求
      shareFlieChecked: true, // 是否选择分享文件
      staffList: [], // 协助人员列表
      editPage: true, // 分享编辑页
      shareQRCode: "http://182.92.161.72:1011/#/myTesk/myTeskList", // 分享二维码
      fileList: [],
      shareStaffList: [], // 选择分享的员工列表
      shareImgMtop: null, // 手机分享图片离头部的距离margin-top
      shareImgMbottom: null, // 手机分享图片离头部的距离margin-bottom
      shareParams: {},
      TemplateType: 1, // 网页版切换模板
      wxTitle: ""
    };
  },
  watch: {
    Defaultapplet: {
      handler(val) {
        if (val) {
          this.shareParams = {
            Pkid: this.sharingPkid,
            UserPkids: this.checkedUserId,
            sumFlag: this.summarizeFlag
          };
        } else {
          this.shareParams = {
            Pkid: this.sharingPkid,
            UserPkids: this.checkedUserId,
            TemplateType: this.TemplateType,
            sumFlag: this.summarizeFlag
          };
        }
      },
      deep: true
    },
    shareParams: {
      handler(val) {
        this.shareParams = val;
      },
      deep: true
    }
  },
  methods: {
    // 点击确定
    popupCancel() {
      this.$emit("shareClose", false);
    },
    // 其他分享方式
    otherType() {
      this.Defaultapplet = !this.Defaultapplet;
      let data = {
        sharingPkid: this.sharingPkid,
        coordinationsId: this.coordinationsId.join(","),
        isDescn: this.summarizeFlag,
        sharingType: this.Defaultapplet ? 1 : 2,
        templateType: 1
      };

      this.$HTTP("post", "/UpdateSharingLinks", data).then(res => {
        this.webqrcode = res.result.Pic;
        this.webUrl = res.result.Url;
      });
    },
    // 进入高级编辑器
    enterEditoy() {
      let obj = {
        articlePkid: this.teskId,
        author: this.userID,
        sharePkid: this.sharingPkid,
        checkedUserId:this.checkedUserId
      };
      this.$router.push({ name: "H5share", params: { obj } });

      // const {href} = this.$router.resolve({
      //     name: "H5share",
      //     params: {obj}
      // });
      // window.open(href, '_blank');
    },
    // 选择分享内容
    checkContent() {
      this.checkContenBoxShow = !this.checkContenBoxShow;
      if (this.checkContenBoxShow) {
        let str = this.checkedUserId.join(",");
        for (let x of this.staffList) {
          if (str.indexOf(x.UserId) != -1) {
            x.checked = true;
          } else {
            x.checked = false;
          }
        }
        this.summarizeFlag = this.shareParams.sumFlag;
      }
    },
    // web 选择分享内容 没用了
    webCheckContent() {
      this.checkContenBoxShow = !this.checkContenBoxShow;
    },
    // 是否选择概述
    summarize(val) {
      if(val == 'sum') {
        this.summarizeFlag = !this.summarizeFlag;
      }
    },
    // 点击取消
    cancel() {
      this.checkContenBoxShow = false;
    },
    // 点击确认
    ok() {
      this.checkedUserId = [];
      this.coordinationsId = [];
      for (let item of this.staffList) {
        if (item.checked) {
          this.checkedUserId.push(item.UserId);
          this.coordinationsId.push(item.CoordinationPkid);
        }
      }
      let data = {
        sharingPkid: this.sharingPkid,
        coordinationsId: this.coordinationsId.join(","),
        isDescn: this.summarizeFlag,
        sharingType: this.Defaultapplet ? 1 : 2,
        templateType: 1
      };
      this.$HTTP("post", "/UpdateSharingLinks", data).then(res => {
        this.webqrcode = res.result.Pic;
        this.webUrl = res.result.Url;
        this.checkContenBoxShow = false;
        if (this.Defaultapplet) {
          this.shareParams = {
            Pkid: this.sharingPkid,
            UserPkids: this.checkedUserId,
            sumFlag: this.summarizeFlag
          };
        } else {
          this.shareParams = {
            Pkid: this.sharingPkid,
            UserPkids: this.checkedUserId,
            TemplateType: this.TemplateType,
            sumFlag: this.summarizeFlag
          };
        }
      });
    },
    // -------------------------------------ke
    // 点击选择模板
    checkTemplate(index) {
      let data = {
        sharingPkid: this.sharingPkid,
        coordinationsId: this.coordinationsId.join(","),
        isDescn: this.summarizeFlag,
        sharingType: this.Defaultapplet ? 1 : 2,
        templateType: index + 1
      };
      this.TemplateType = index + 1;
      this.shareParams = {
        Pkid: this.sharingPkid,
        UserPkids: this.checkedUserId,
        sumFlag: this.summarizeFlag,
        TemplateType: this.TemplateType
      };

      this.$HTTP("post", "/UpdateSharingLinks", data).then(res => {
        this.webqrcode = res.result.Pic;
        this.webUrl = res.result.Url;
      });
    },
    // // 点击分享
    // clickShare() {
    //   if (!this.shareTitle) {
    //     this.$message.warning("工作主题不能为空");
    //     return;
    //   }

    //   if (this.shareRequireChecked && !this.shareRequire) {
    //     this.$message.warning("已选择任务需求不能为空");
    //     return;
    //   }
    //   this.shareStaffList = [];
    //   for (let ele of this.staffList) {
    //     if (ele.checked) {
    //       this.shareStaffList.push(ele.CoordinationPkid);
    //     }
    //   }

    //   if (!this.shareStaffList.length) {
    //     this.$message.warning("请选择协作人员");
    //     return;
    //   }
    //   let obj = {
    //     title: this.shareTitle,
    //     articlePkid: this.shareData.Pkid,
    //     descn: this.shareRequire,
    //     isTaskFile: this.shareFlieChecked,
    //     coordinationsId: this.shareStaffList.join(","),
    //     author: this.userID,
    //     isTitle: this.shareCoverChecked,
    //     isDescn: this.shareRequireChecked
    //   };
    //   this.$HTTP("post", "/SetSharingLinks", obj)
    //     .then(res => {
    //       this.shareQRCode = res.result.Pic;
    //       console.log("分享编辑成功", res);
    //       this.editPage = false;
    //     })
    //     .catch(err => {
    //       console.log("分享编辑失败", err);
    //     });
    // },

    // 返回编辑
    returnEdit() {
      this.editPage = true;
    },

    // 选择协助人员
    staffChange(staff, index) {
      // console.log(333, staff, index);
      // this.staffList[index];
      if(index >= 0) {
        this.staffList[index].checked = !staff.checked;
        this.staffList = [...this.staffList];
      }
      // console.log(111, this.checkedUserId);
    },

    // 获取卡片详情
    getCardDetail(teskId) {
      this.userID = JSON.parse(
        localStorage.getItem("staffInfo")
      ).Pkid.toString();

      let loginName = JSON.parse(localStorage.getItem("staffInfo")).Realname;
      let obj = { articlePkid: teskId, userid: this.userID };
      this.$HTTP("post", "/GetArticle", obj, ".tesk_card")
        .then(res => {
          console.log("all", res.result);
          this.shareData = res.result;
          this.shareTitle = `关于${loginName}的工作分享`;
          this.shareRequire = this.shareData.Content;
          this.shareRequire = this.shareRequire.replace(/<br \/>/g, "\n");
          this.staffList = JSON.parse(res.result.Coordination);
          this.$nextTick(() => {
            for (let item of this.staffList) {
              this.coordinationsId.push(item.CoordinationPkid);
              item.checked = true;
            }
            let Realname = JSON.parse(localStorage.getItem("staffInfo"))
              .Realname;
            this.wxTitle = "来自" + Realname + "的分享";
            let data = {
              title: this.wxTitle,
              articlePkid: this.teskId,
              isDescn: this.summarizeFlag,
              descn: this.shareRequire,
              coordinationsId: this.coordinationsId.join(","),
              author: this.userID,
              sharingType: 1,
              templateType: 1
            };
            this.getshareLink(data);
          });
        })
        .catch(err => {
          console.log(err);
          this.$message.error("获取详情失败");
        });
    },

    // 一键复制
    shareLinkCopy(id) {
      let linkCopy = document.getElementById(id);
      linkCopy.select(); // 选择对象
      if (document.execCommand("Copy", false, null)) {
        //success info
        this.$message.success("复制成功！");
      } else {
        //fail info
      }
    },
    // 获取二维码信息地址
    getshareLink(data) {
      this.$HTTP("post", "/CreateSharingLinks", data).then(res => {
        this.qrcode = res.result.Pic;
        this.sharingPkid = res.result.Pkid;
        this.shareParams = {
          Pkid: this.sharingPkid,
          UserPkids: this.checkedUserId,
          sumFlag: this.summarizeFlag
        };
      });
    },
    // 弹框消失
    hidePopo() {
      this.checkContenBoxShow = false;
    }
  },

  mounted() {},

  created() {
    this.userID = JSON.parse(localStorage.getItem("staffInfo")).Pkid;
    this.checkedUserId = this.UserPkids.split(",");

    this.getCardDetail(this.teskId);
  }
};
</script>
<style lang="less">
.popup_shares {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(211, 211, 211, 0.5);
  .colorSix {
    color: #666666;
  }
  .colorNight {
    color: #999999;
  }
  .share_box {
    width: 780px;
    height: 580px;
    padding: 20px;
    .box_sizing;
    -webkit-box-shadow: inset 0 0 10px #474747;
    -moz-box-shadow: inset 0 0 10px #474747;
    -webkit-box-shadow: 0 0 10px rgba(71, 71, 71, 0.4);
    -moz-box-shadow: 0 0 10px rgba(71, 71, 71, 0.4);
    box-shadow: 0 0 10px rgba(71, 71, 71, 0.4);
    .border_radius(@br: 6px);
    background-color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -390px;
    margin-top: -290px;
    // animation: popup 0.2s ease;
    // -webkit-animation: popup 0.2s ease;
    // -moz-animation: popup 0.2s ease;
    // -o-animation: popup 0.2s ease;

    .popup_close {
      font-size: 12px;
      color: #666666;
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 1100;
      &:hover {
        color: #4574df;
      }
    }

    .share_left {
      width: 50%;
      height: 100%;
      .share_btt {
        margin-top: 33px;

        button {
          margin-bottom: 20px;
        }
      }

      .share_phone {
        width: 320px;
        height: 506px;
        background-size: contain;
        margin-top: 20px;
        position: relative;
        border: 1px solid #dcdcdc;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        overflow-y: auto;
        overflow-x: hidden;
        .border_radius(@br: 6px);
      }

      .share_scroll {
        width: 20px;
        margin-top: 207px;
        i {
          color: #999999;
          font-size: 20px;
          &:first-of-type {
            margin-bottom: 60px;
          }
          &:hover {
            color: #4574df;
          }
        }
      }
      // ------------------------------------------ke
      .lines {
        border-left: 1px solid #999999;
        height: 100%;
        margin-left: 10px;
      }
    }

    .share_right {
      width: 50%;
      height: 100%;
      padding: 65px 0 0 0;
      text-align: center;
      position: relative;
      .box_sizing;
      .shareType {
        font-size: 16px;
        .one {
          color: #333;
        }
        .two {
          margin-top: 75px;
          color: #666666;
        }
        .QRcode {
          display: block;
          width: 155px;
          height: 155px;
          margin: 10px auto;
        }
        .othershare {
          font-size: 14px;
          margin-top: 20px;
          cursor: pointer;
          color: #4583f0;
        }
      }
      .shareContent {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 12px;
        cursor: pointer;
        color: #4583f0;
      }
      .staff_ul {
        width: 187px;
        min-height: 20px;
        max-height: 330px;
        border: 1px solid #e0e0e0;
        background: #ffffff;
        text-align: left;
        position: absolute;
        bottom: 20px;
        right: 0;
        .border_radius(@br: 4px);
        .box_sizing;
        .mainBox_ke {
          padding: 15px 15px 0 15px;
          .gaishu {
            margin-bottom: 10px;
            input {
              vertical-align: middle;
            }
            span {
              vertical-align: middle;
            }
          }
          .staff_checked {
            width: 16px;
            height: 16px;
            background-color: #fff;
            -webkit-appearance: none;
            border: 1px solid #c9c9c9;
            border-radius: 2px;
            outline: none;
          }

          input[type="checkbox"]:checked {
            background: url("../../assets/img/check.png") no-repeat center;
            background-size: 22px;
          }
          .checkList {
            width: 50%;
            margin-bottom: 10px;
            input {
              vertical-align: middle;
            }
            span {
              vertical-align: middle;
            }
          }
        }
        .button {
          width: 100%;
          height: 35px;
          span {
            line-height: 35px;
            text-align: center;
            width: 50%;
            display: block;
            // float: left;
            border-top: 1px solid #e0e0e0;
            color: #3888ff;
            .box_sizing;
            cursor: pointer;
            &:first-child {
              border-right: 1px solid #e0e0e0;
              color: #999999;
            }
          }
        }
      }
    }
  }
  .share_box_two {
    width: 940px;
    height: 580px;
    padding: 25px 30px;
    .box_sizing;
    -webkit-box-shadow: inset 0 0 10px #474747;
    -moz-box-shadow: inset 0 0 10px #474747;
    -webkit-box-shadow: 0 0 10px rgba(71, 71, 71, 0.4);
    -moz-box-shadow: 0 0 10px rgba(71, 71, 71, 0.4);
    box-shadow: 0 0 10px rgba(71, 71, 71, 0.4);
    .border_radius(@br: 6px);
    background-color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -470px;
    margin-top: -290px;
    // animation: popup 0.2s ease;
    // -webkit-animation: popup 0.2s ease;
    // -moz-animation: popup 0.2s ease;
    // -o-animation: popup 0.2s ease;

    .popup_close {
      font-size: 12px;
      color: #666666;
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 1100;
      &:hover {
        color: #4574df;
      }
    }

    .share_left {
      width: 15%;
      height: 100%;
      border-right: 1px solid #999999;
      .box_sizing;
      overflow: auto;
      .templates {
        li {
          text-align: center;
          margin-bottom: 20px;
          cursor: pointer;
          img {
            display: block;
            width: 120px;
            height: 190px;
          }
          // -------------------------------------ke
          .activeImg {
            display: block;
            width: 120px;
            height: 190px;
            -webkit-box-shadow: inset 0 0 10px #474747;
            -moz-box-shadow: inset 0 0 10px #474747;
            -webkit-box-shadow: 0 0 10px rgba(50, 110, 210, 1);
            -moz-box-shadow: 0 0 10px rgba(50, 110, 210, 1);
            box-shadow: 0 0 10px rgba(50, 110, 210, 1);
            .box_sizing;
            }
            .activefont {
              padding-right: 10px;
              color: #4574df;
            }
          p {
            margin-top: 10px;
            color: #999999;
          }
        }
        .active {
          border: 1px solid #4574df;
          -webkit-box-shadow: inset 0 0 10px #474747;
          -moz-box-shadow: inset 0 0 10px #474747;
          -webkit-box-shadow: 0 0 10px rgba(71, 71, 71, 0.4);
          -moz-box-shadow: 0 0 10px rgba(71, 71, 71, 0.4);
          box-shadow: 0 0 10px rgba(71, 71, 71, 0.4);
          .box_sizing;
          p {
            color: #4574df;
          }
        }
      }
    }
    .share_middle {
      width: 43%;
      height: 100%;
      overflow: auto;
      padding: 0 25px;
      .box_sizing;
      border-right: 1px solid #999999;
      .templateStyle {
        width: 322px;
        height: 506px;
        border: 1px solid #e0e0e0;
        .box_sizing;
        .border_radius(@br: 6px);
        overflow: hidden;
        .share_bigBox,
        .two_bigBox {
          overflow-y: auto;
          width: 320px;
          height: 504px;
          overflow-x: hidden;
        }
      }
    }
    .share_right {
      // background: pink;
      width: 42%;
      height: 100%;
      .box_sizing;
      padding: 65px 0 0 0;
      text-align: center;
      position: relative;
      .box_sizing;
      .shareType {
        font-size: 16px;
        .one {
          color: #333;
        }
        .two {
          margin-top: 30px;
          color: #666666;
        }
        .QRcode {
          display: block;
          width: 155px;
          height: 155px;
          margin: 10px auto;
        }
        .othershare {
          font-size: 14px;
          margin-top: 20px;
          cursor: pointer;
          color: #4583f0;
        }
        .url {
          display: block;
          resize: none;
          border: none;
          width: 260px;
          margin: 20px auto;
          color: #666666;
          line-height: 1.5;
          word-break: break-all;
          text-align: center;
        }
        .copy {
          text-align: center;
          margin: 0 auto;
          cursor: pointer;
          width: 105px;
          height: 32px;
          line-height: 32px;

          border: 1px solid rgba(220, 220, 220, 1);
          border-radius: 6px;
        }
      }
      .shareContent {
        position: absolute;
        bottom: 0;
        right: 60px;
        font-size: 12px;
        cursor: pointer;
        color: #4583f0;
      }
      .staff_ul {
        width: 187px;
        min-height: 20px;
        max-height: 330px;
        border: 1px solid #e0e0e0;
        background: #ffffff;
        text-align: left;
        position: absolute;
        bottom: 20px;
        right: 0;
        .border_radius(@br: 4px);
        .box_sizing;
        .mainBox_ke {
          padding: 15px 15px 0 15px;
          .gaishu {
            margin-bottom: 10px;
            input {
              vertical-align: middle;
            }
            span {
              vertical-align: middle;
            }
          }
          .staff_checked {
            width: 16px;
            height: 16px;
            background-color: #fff;
            -webkit-appearance: none;
            border: 1px solid #c9c9c9;
            border-radius: 2px;
            outline: none;
          }

          input[type="checkbox"]:checked {
            background: url("../../assets/img/check.png") no-repeat center;
            background-size: 22px;
          }
          .checkList {
            width: 50%;
            margin-bottom: 10px;
            input {
              vertical-align: middle;
            }
            span {
              vertical-align: middle;
            }
          }
        }
        .button {
          width: 100%;
          height: 35px;
          span {
            line-height: 35px;
            text-align: center;
            width: 50%;
            display: block;
            // float: left;
            border-top: 1px solid #e0e0e0;
            color: #3888ff;
            .box_sizing;
            cursor: pointer;
            &:first-child {
              border-right: 1px solid #e0e0e0;
              color: #999999;
            }
          }
        }
      }
      .editor {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 12px;
        cursor: pointer;
        color: #4583f0;
      }
    }
  }

  label {
    display: inline;
  }

  .regular-checkbox {
    display: none;
  }

  .regular-checkbox {
    background-color: #ffffff;
    border: 1px solid #259656;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 7px;
    border-radius: 3px;
    display: inline-block;
    position: relative;
  }

  .regular-checkbox,
  .regular-checkbox:checked {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px 1px 3px rgba(0, 0, 0, 0.1);
  }

  .regular-checkbox:checked {
    background-color: #259656;
    border: 1px solid #259656;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -12px 10px -12px rgba(0, 0, 0, 0.05),
      inset 12px 10px -12px rgba(255, 255, 255, 0.1);
    color: #99a1a7;
  }

  .regular-checkbox:checked {
    content: "\2714";
    font-size: 12px;
    position: absolute;
    top: -1px;
    left: 2px;
    color: #ffffff;
  }
}

.box_sizing {
  box-sizing: border-box;
  -moz-box-sizing: border-box; /* Firefox */
  -webkit-box-sizing: border-box; /* Safari */
}
@br: 6px;
.border_radius(@br:6px) {
  -webkit-border-radius: @br;
  -moz-border-radius: @br;
  border-radius: @br;
}
@keyframes popup {
  0% {
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -ms-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
}
</style>
