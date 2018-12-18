<template>
  <div class="popup popup_share">
    <div class="share_box">
      <i class="popup_close iconfont icon-guanbi cur fr cancelIcon" @click="popupCancel"></i>
      <div class="share_left fl">
        <div class="share_phone fl">
          <div id="shareImg" class="share_img">
            <iframe :src="'../../../../static/myShare.html?zoom=1&pkid='+shareId" width="320" height="100%" frameborder="0" scrolling="yes"></iframe>
          </div>

          <div class="phone_page">
          </div>
        </div>
        <div class="share_scroll fl" v-if="false">
          <i class="el-icon-arrow-up cur fl" @click="scrollUp"></i>
          <i class="el-icon-arrow-down cur fl" @click="scrollDown"></i>
        </div>
        <div class="lines fl"></div>
      </div>
      <div class="share_right fl">
        <div v-show="false && editPage" class="share_right_one">
          <div class="share_cover">
            <el-checkbox class="share_checked" v-model="shareCoverChecked" @change="coverChange"></el-checkbox>
            <span class="title">使用封面：</span>
            <span class="file_text">可在分享内容时添加一个封面。</span>
          </div>
          <div class="share_topical">
            <span class="title">工作主题：</span>
            <el-input class="title_input" placeholder="请输入分享主题" :maxlength="48" v-model="shareTitle">
            </el-input>
            <span class="title_range">{{shareTitle.length}}/48</span>
          </div>
          <div class="share_require">
            <el-checkbox class="share_checked" v-model="shareRequireChecked"></el-checkbox>
            <span class="title mTop">任务需求：</span>
            <div class="share_require_div">
              <!--<el-input id="shareInput" class="share_input" placeholder="请输入分享需求" type="textarea" autosize></el-input>-->
              <el-input id="shareInput" class="share_input" v-model="shareRequire" placeholder="请输入分享需求" type="textarea" autosize></el-input>
              <span class="title_range">{{shareRequire.length}}/140</span>
            </div>
          </div>
          <div class="share_file">
            <el-checkbox class="share_checked" :disabled="!fileList.length" v-model="shareFlieChecked"></el-checkbox>
            <span class="title">任务文件：</span>
            <span class="file_text">在左侧分享页面中查看文件。</span>
          </div>
          <div class="share_staff clearfix">
            <span class="title mTop">协作人员：</span>
            <ul class="staff_ul fr">
              <li class="staff_li fl" v-for="(staff, index) in staffList" :key="index">
                <p class="staff_img"><img :src="staff.Pic" alt=""></p>
                <p class="staff_name" :class="staff.State ? 'colorSix' : 'colorNight'">{{staff.UserName}}-{{staff.State ? '已完成' : '未完成'}}</p>
                <el-checkbox class="staff_checked"  v-model="staff.checked" @change="staffChange(staff)"></el-checkbox>
              </li>
            </ul>
          </div>
          <div class="click_share"><button class="main_button_bg fr" type="button" @click="clickShare()">点击分享</button></div>
        </div>
        <div v-show="true || !editPage" class="share_right_two">

          <div class="shareType">
            <p class="one">以网页形式分享</p>
            <p class="two">请使用常用app扫码进行分享</p>
            <img :src="editorQrcode" class="QRcode " alt="">
            <textarea class="url" type="text" v-model="editorUrl" id='shareLink'></textarea>
            <div class="copy" @click="shareLinkCopy('shareLink')">一键复制</div>
          </div>
          <div class="share_QRCode" v-if="false">
           <span class="share_QRCode_img">
             <img :src="editorQrcode" alt="">
             <span class="share_QRCode_text">扫一扫，分享到微信</span>
           </span>

          </div>

          <div class="share_link" v-if="false">
            <span class="fl">链接：</span>
            <el-input class="share_link_input fl" id="shareLink" v-model="editorUrl" placeholder="请输入内容"></el-input>
            <button class="main_button_color fr" type="button" @click="shareLinkCopy('shareLink')">一键复制</button>
          </div>
          <!--<div class="sahre_return"><button class="main_button_bg fr" type="button" @click="returnEdit">上一步</button></div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: ["teskId", "editorQrcode", "editorUrl", "shareId"],
  data() {
    return {
      userID: "", // 当前登录用户的ID
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
      shareImgMbottom: null // 手机分享图片离头部的距离margin-bottom
    };
  },
  methods: {
    // 点击确定
    popupCancel() {
      this.$emit("shareClose", false);
    },

    // 展示内容
    scrollUp() {
      this.shareImgMtop = Number(
        $("#shareImg")
          .css("margin-top")
          .replace("px", "")
      );
      if (this.shareImgMtop === null || Math.abs(this.shareImgMtop) < 2) {
        return;
      }
      let scrollSize = 391;
      if (Math.abs(this.shareImgMtop) < scrollSize) {
        scrollSize = Math.abs(this.shareImgMtop);
      }
      $("#shareImg").animate(
        { marginTop: this.shareImgMtop + scrollSize + "px" },
        200,
        () => {
          this.shareImgMtop = Number(
            $("#shareImg")
              .css("margin-top")
              .replace("px", "")
          );
          this.shareImgMbottom =
            $("#shareImg").height() -
            $("#shareImg")
              .parent()
              .height() +
            this.shareImgMtop;
        }
      );
    },

    scrollDown() {
      if (this.shareImgMbottom !== null && this.shareImgMbottom < 2) {
        return;
      }
      this.shareImgMtop = Number(
        $("#shareImg")
          .css("margin-top")
          .replace("px", "")
      );
      let scrollSize = 391;
      if (
        this.shareImgMbottom !== null &&
        parseInt(this.shareImgMbottom) < scrollSize
      ) {
        scrollSize = parseInt(this.shareImgMbottom);
      }
      $("#shareImg").animate(
        { marginTop: this.shareImgMtop - scrollSize + "px" },
        200,
        () => {
          this.shareImgMtop = Number(
            $("#shareImg")
              .css("margin-top")
              .replace("px", "")
          );
          this.shareImgMbottom =
            $("#shareImg").height() -
            $("#shareImg")
              .parent()
              .height() +
            this.shareImgMtop;
        }
      );
    },

    // 点击是否需要使用封面
    coverChange() {
      $("#shareImg").css({ "margin-top": 0 });
      this.shareImgMtop = null;
      this.shareImgMbottom = null;
    },

    // 点击分享
    clickShare() {
      if (!this.shareTitle) {
        this.$message.warning("工作主题不能为空");
        return;
      }

      if (this.shareRequireChecked && !this.shareRequire) {
        this.$message.warning("已选择任务需求不能为空");
        return;
      }
      this.shareStaffList = [];
      for (let ele of this.staffList) {
        if (ele.checked) {
          this.shareStaffList.push(ele.CoordinationPkid);
        }
      }

      if (!this.shareStaffList.length) {
        this.$message.warning("请选择协作人员");
        return;
      }
      let obj = {
        title: this.shareTitle,
        articlePkid: this.shareData.Pkid,
        descn: this.shareRequire,
        isTaskFile: this.shareFlieChecked,
        coordinationsId: this.shareStaffList.join(","),
        author: this.userID,
        isTitle: this.shareCoverChecked,
        isDescn: this.shareRequireChecked
      };
      this.$HTTP("post", "/SetSharingLinks", obj)
        .then(res => {
          // this.shareLink = res.result.Url;
          this.shareQRCode = res.result.Pic;
          console.log("分享编辑成功", res);
          this.editPage = false;
        })
        .catch(err => {
          console.log("分享编辑失败", err);
        });
    },

    // 返回编辑
    returnEdit() {
      this.editPage = true;
    },

    // 选择协助人员
    staffChange(staff) {
      this.staffList = this.staffList.concat();
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
          this.shareData = res.result;
          this.shareTitle = `关于${loginName}的工作分享`;
          this.shareRequire = this.shareData.Content;
          this.shareRequire = this.shareRequire.replace(/<br \/>/g, "\n");

          this.staffList = JSON.parse(res.result.Coordination);
          this.$nextTick(() => {
            this.staffList.map(ele => {
              return (ele.checked = false);
            });
          });

          if (
            this.userID !== this.shareData.UserId.toString() &&
            this.shareData.UserPkids.indexOf(this.userID) !== -1
          ) {
            let finds = this.staffList.find(ele => {
              return ele.UserId.toString() === this.userID;
            });
            this.staffList = [finds];
          }
          this.fileList = this.shareData.PubFile
            ? JSON.parse(this.shareData.PubFile)
            : [];

          this.shareFlieChecked = this.fileList.length ? true : false;

          console.log("shareData", this.shareData);
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
    }
  },

  mounted() {
    this.getCardDetail(this.teskId);
    console.log("???????", $("#myShare"));
  },

  created() {}
};
</script>
<style lang="less">
.popup_share {
  .colorSix {
    color: #666666;
  }
  .colorNight {
    color: #999999;
  }
  .share_box {
    width: 1000px;
    height: 550px;
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
    margin-left: -500px;
    margin-top: -275px;
    animation: popup 0.2s ease;
    -webkit-animation: popup 0.2s ease;
    -moz-animation: popup 0.2s ease;
    -o-animation: popup 0.2s ease;

    .popup_close {
      font-size: 12px;
      color: #666666;
      position: absolute;
      top: 20px;
      right: 20px;
      &:hover {
        color: #4574df;
      }
    }

    .share_left {
      width: 430px;
      height: 100%;
      .share_btt {
        margin-top: 33px;

        button {
          margin-bottom: 20px;
        }
      }

      .share_phone {
        width: 320px;
        height: 476px;
        background-size: contain;
        margin: 20px;
        position: relative;
        border: 1px solid #dcdcdc;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        border-radius: 6px;
        // overflow-x: hidden;
        // overflow-y: auto;

        .share_img {
          width: 100%;
          height: 100%;
        }
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

      .lines {
        border-left: 1px solid #999999;
        margin-top: 13px;
        height: 490px;
        margin-left: 10px;
      }
    }

    .share_right {
      width: 530px;
      height: 100%;
      padding: 55px 0 0 30px;
      .box_sizing;

      .share_right_one {
        width: 100%;
        height: 100%;
        .title {
          display: inline-block;
          font-weight: 700;
          width: 106px;
          text-align: right;
        }
        .mTop {
          vertical-align: top;
          margin-top: 8px;
        }

        .share_cover {
          position: relative;
          .share_checked {
            position: absolute;
            left: 14px;
            top: 0px;
          }

          .title {
            margin-top: 0;
          }

          .file_text {
            color: #666666;
          }
        }

        .share_topical {
          margin-top: 20px;
          position: relative;

          .title_input {
            width: 390px;
            height: 32px;
            position: relative;

            .el-input__inner {
              height: 32px;
              line-height: 32px;
              border-color: #dcdfe6;
              padding-left: 10px;
              padding-right: 36px;
            }
          }

          .title_range {
            position: absolute;
            font-size: 12px;
            color: #999999;
            top: 12px;
            right: 8px;
          }
        }

        .share_require {
          margin-top: 20px;
          position: relative;

          .share_checked {
            position: absolute;
            left: 14px;
            top: 9px;
          }

          .share_require_div {
            display: inline-block;
            position: relative;
            width: 390px;
            border: 1px solid #e5e5e5;
            height: 77px;
            .box_sizing;
            .border_radius(@br: 6px);
            .share_input {
              height: 77px;
              .el-textarea__inner {
                min-height: 32px;
                max-height: 60px !important;
                overflow: auto;
                width: 100%;
                border: 0px solid #e5e5e5;
                resize: none;
                padding: 5px 10px;
              }
            }

            .title_range {
              position: absolute;
              right: 5px;
              bottom: 2px;
              font-size: 12px;
              color: #999999;
            }
          }
        }

        .share_file {
          margin-top: 20px;
          position: relative;

          .share_checked {
            position: absolute;
            left: 14px;
            top: 0px;
          }

          .title {
            margin-top: 0;
          }

          .file_text {
            color: #666666;
          }
        }

        .share_staff {
          margin-top: 20px;

          .staff_ul {
            width: 390px;
            min-height: 90px;
            max-height: 180px;
            overflow-y: auto;
            border: 1px solid #e5e5e5;
            .border_radius(@br: 6px);
            .staff_li {
              width: 80px;
              padding: 6px;
              text-align: center;

              .staff_img {
                display: inline-block;
                width: 30px;
                height: 30px;
                .border_radius(@br: 50%);

                img {
                  display: inline-block;
                  width: 100%;
                  height: 100%;
                  .border_radius(@br: 50%);
                }
              }

              .staff_name {
                font-size: 12px;
                padding: 4px 0;
                white-space: nowrap;
                overflow: hidden;
              }

              .staff_checked {
                .el-checkbox__inner {
                  border-radius: 50%;
                  width: 18px;
                  height: 18px;
                  line-height: 18px;
                  text-align: center;
                  float: right;
                }
                .el-checkbox__inner::after {
                  left: 7px;
                  top: 3px;
                }
              }
            }
          }
        }

        .click_share {
          margin-top: 20px;
        }
      }

      .share_right_two {
        width: 100%;
        height: 100%;
        text-align: center;
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

        .share_QRCode {
          width: 100%;
          height: 178px;
          line-height: 178px;
          padding: 40px 0 20px 20px;
          vertical-align: middle;

          .share_QRCode_text {
            font-size: 16px;
            display: inline-block;
            height: 178px;
            vertical-align: top;
            margin-left: 30px;
          }
          .share_QRCode_img {
            display: inline-block;
            height: 178px;
            img {
              display: inline-block;
              width: 178px;
              height: 178px;
            }
          }
        }

        .share_link {
          height: 32px;
          line-height: 32px;
          .share_link_input {
            width: 300px;
            display: inline-block;
            .el-input__inner {
              width: 300px;
              height: 32px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          button {
            margin-right: 50px;
          }
        }

        .sahre_return {
          margin-top: 30px;

          button {
            margin-right: 50px;
          }
        }
      }
    }
  }

  .red {
    color: red;
  }

  // 自定义滚动条
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 6px; /*滚动条宽度*/
    height: 6px; /*滚动条高度*/
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
    border-radius: 3px; /*滚动条的背景区域的圆角*/
    // background-color: red;/*滚动条的背景颜色*/
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 3px; /*滚动条的圆角*/
    // -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,.3);
    background-color: rgba(151, 168, 190, 0.3); /*滚动条的背景颜色*/
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
