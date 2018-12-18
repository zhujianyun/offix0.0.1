<template>
 <!--pages/infoShare/infoShare.wxml-->
<div class="container info_yun" id="infoYun">

  <div class="info_topbar">
    <div class="scroll-view_H" scroll-x="true" style='100%' id="topScroll" bindscroll="topscroll">
      <div v-for="(item, index) in infoList" :key="index" class="every_name" @click='selcetClick(item, index)'>
        <span :class="{'every_select' : nowSelected === index }">{{item.UserName}}</span>
        <span v-if="nowSelected === index"  class="every_line"></span>
      </div>
    </div>
    <span v-if="topScrollFlag" class="icon_scroll iconfont icon-huadongshou_PDF"></span>
  </div>

  <div class="info_every" v-if="nowSelectedInfo">
    <div class="info_view info_desc">
      <div class="info_view_title">描述：</div>
      <div v-if="nowSelectedInfo && nowSelectedInfo.ReplyInformationList" class="info_desc_content">
        <p v-for="(item, index) in nowSelectedInfo.ReplyInformationList" :key="index">{{item.Content}}</p>
      </div>
    </div>
    <div class="info_view info_file" v-if="nowSelectedInfo && nowSelectedInfo.TaskFileList2 && nowSelectedInfo.TaskFileList2.length">
    <div class="info_view_title">说明文件：</div>
    <span class="info_view_number">{{nowSelectedInfo.TaskFileList2.length}}个文件</span>
      <div class="info_filelist">
        <div class="scroll-view_H" scroll-x="true" style='100%'>
          <div class="info_file_list" v-for="(item, index) in nowSelectedInfo.TaskFileList2" :key="index">
            <div class="info_file_list_top">
              <img :src="item.FileTypeNum > 0 ? fileTypeImg[item.FileTypeNum - 2].src : fileTypeImg[fileTypeImg.length - 1].src"/>
              <span class="info_file_list_name">{{item.Title}}.{{item.FileType}}</span>
            </div>
            <span v-if="false" class="info_file_list_desc">文档中包括分享功能的需求，展示三行的效果已完成。</span>
          </div>
        </div>
      </div>
    </div>
    <div class="info_view info_img" v-if="nowSelectedInfo && nowSelectedInfo.TaskFileList1 && nowSelectedInfo.TaskFileList1.length">
    <!-- <div class="info_view_title">图片和视频：</div> -->
    <div class="info_view_title">图片：</div>
    <span class="info_view_number" v-if="nowSelectedInfo.TaskFileList1.length">{{nowSelectedInfo.TaskFileList1.length}}个文件</span>
    <div class="info_imglist">
        <div class="scroll-view_H" scroll-x="true" style='100%'>
          <div class="info_img_list" v-for="(item, index) in nowSelectedInfo.TaskFileList1" :key="index">
            <img class="info_img_list_img" :src="item.Url"/>
            <div><span class="info_img_list_name">{{item.Title}}.{{item.FileType}}</span></div>
            <span v-if="false" class="info_file_list_desc">文档中包括分享功能的需求，展示三行的效果已完成。</span>
          </div>
        </div>
      </div>
    </div>
    <div class="info_view info_team" v-if="teskInfo && teskInfo.IsDescn && nowSelected === 0">
      <span>{{teskInfo.UName}} | {{teskInfo.StartTime}} - {{teskInfo.EndTime}}</span> 
      <!-- <span>{{teskInfo.UName}} | {{teskInfo.StartTime}} - {{teskInfo.EndTime}}</span> -->
      <span>成员：{{memberList}}</span>
    </div>
  </div>
  
  <div class="info_view info_bottom" v-if="false">
    <div class="info_allfile" bindtap='fileSum'>
      <img src="../../assets/img/wenjianjia1.png"/>
      <span>文件汇总</span>
    </div>
    <div class="info_returnhome" bindtap='returHome'>
      <img src="../../assets/img/eggs1.png"/>
      <span>返回首页</span>
    </div>
  </div>

</div>

</template>
<script>
export default {
  props: ["params"],
  data() {
    return {
      sharingPkid: "", // 分享id
      pageTitle: "来自XXX的工作分享", // 当前页面的标题
      teskInfo: null, // 获取的任务列表
      infoList: [], // 协助人员任务信息列表
      nowSelected: 0, // 当前选择的
      nowSelectedInfo: null, // 当前选择人的信息
      memberList: [], // 小组人员列表
      imgArr: [], // 点击预览的图片
      fileTypeImg: [
        {
          src: require("../../assets/img/file_b/2.png")
        },
        {
          src: require("../../assets/img/file_b/3.png")
        },
        {
          src: require("../../assets/img/file_b/4.png")
        },
        {
          src: require("../../assets/img/file_b/5.png")
        },
        {
          src: require("../../assets/img/file_b/6.png")
        },
        {
          src: require("../../assets/img/file_b/7.png")
        },
        {
          src: require("../../assets/img/file_b/8.png")
        },
        {
          src: require("../../assets/img/file_b/9.png")
        },
        {
          src: require("../../assets/img/file_b/10.png")
        },
        {
          src: require("../../assets/img/file_b/11.png")
        },
        {
          src: require("../../assets/img/file_b/0.png")
        }
      ],
      preItem: null, // 文件预览详情
      openid: "", // openID
      topScrollFlag: false, // 头部是否出现滑动icon
      Pkid: "",
      UserPkids: "",
      sumFlag: true
    };
  },
  watch: {
    params(val) {
      if (!this.params.TemplateType) {
        this.Pkid = this.params.Pkid;
        this.UserPkids = this.params.UserPkids;
        this.UserPkids = this.UserPkids.length
          ? this.UserPkids.join(",")
          : "1189,1204,1212,1184,1196";
        this.sumFlag = this.params.sumFlag;
        this.getTeskInfo(this.Pkid);
      }
    }
  },
  methods: {
    // 获取任务信息
    getTeskInfo(sharingPkid) {
      this.sharingPkid = sharingPkid;
      this.infoList = [];
      this.nowSelectedInfo = {};
      let obj = { sharingPkid: this.sharingPkid };
      this.$HTTP("post", "/GetSharingContentNews", obj)
        .then(res => {
          let info = res.result;
          info.StartTime = this.timeSlice(info.StartTime);
          info.EndTime = this.timeSlice(info.EndTime);
          info.AdditionalList = JSON.parse(info.AdditionalList);
          info.AdditionalList.unshift({
            Pkid: info.Pkid,
            Content: info.Content,
            CreateTime: info.CreateTime
          });
          let coord = res.result.Coordination;
          coord = JSON.parse(coord);
          let mumlist = [];
          if (this.sumFlag) {
            let homeObj = {
              Comment: 0,
              CoordinationPkid: 0,
              Job: 0,
              Pic: 0,
              ReplyInformationList: JSON.stringify(info.AdditionalList),
              SelectEdition: 0,
              TaskFileList: info.PubFile,
              UserId: 0,
              UserName: "概述",
              homeFlag: true
            };
            coord.unshift(homeObj);
          }

          for (let ele of coord) {
            ele.TaskFileList1 = [];
            ele.TaskFileList2 = [];
            ele.ReplyInformationList = JSON.parse(ele.ReplyInformationList);
            ele.TaskFileList = JSON.parse(ele.TaskFileList);
            if (ele.UserName && !ele.homeFlag) {
              mumlist.push(ele.UserName);
            }
            for (let i of ele.ReplyInformationList) {
              i.Content = i.Content.replace(/<br \/>/g, "\n");
            }

            for (let f of ele.TaskFileList) {
              f.FileTypeNum = this.getFlieTyle(f.FileType);

              if (f.FileTypeNum == 1) {
                ele.TaskFileList1.push(f);
                this.imgArr.push(f.Url);
              } else {
                ele.TaskFileList2.push(f);
              }
            }
            this.infoList.push(ele);
          }

          mumlist = [...new Set(mumlist)];
          this.teskInfo = res.result;
          this.memberList = mumlist.join(", ");
          let imgarr = [];
          if (this.infoList[0].TaskFileList1.length) {
            for (let f of this.infoList[0].TaskFileList1) {
              imgarr.push(f.YimageUrl);
            }
          }
          this.nowSelected = 0;
          this.nowSelectedInfo = this.infoList[0];
          this.imgArr = imgarr;

          console.log("SetSharingContent", this.infoList);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 点击头部列表
    selcetClick(item, index) {
      let options = item;
      let imgarr = [];
      if (item.TaskFileList1.length) {
        for (let f of item.TaskFileList1) {
          imgarr.push(f.YimageUrl);
        }
      }
      this.nowSelected = index;
      this.nowSelectedInfo = item;
      this.imgArr = imgarr;
    },

    // 日期截取
    timeSlice(time) {
      let indexs = time.indexOf("年");
      return time.slice(indexs + 1);
    },

    // 放大缩小兼容
    scaleSet(size) {
      $("#infoYun").css({
        zoom: size,
        MozTransform: "scale(" + size + ")",
        MozTransformOrigin: "0 0"
      });
    }
  },
  created() {
    // this.getTeskInfo(this.Pkid);
  },
  mounted() {
    // this.scaleSet(0.43);
  }
};
</script>
<style lang="less">
@import "../../assets/css/common.css";
page {
  min-height: 100vh;
  background-color: #efeff4;
  padding-bottom: 100px;
  box-sizing: border-box;
}
.info_yun {
  padding: 0;
  // margin-bottom: 20px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-seri,
    sans-serif;
  position: relative;
  // margin-top: -90px;
  width: 750px / 2.3;
  height: 100%;
  overflow: hidden;
  .userinfo {
    opacity: 0;
  }
  .word_over {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .scroll-view_H {
    white-space: nowrap;
    width: 100%;
    box-sizing: border-box;
    height: 100%;
  }
  .info_topbar {
    width: 100%;
    height: 90px / 2.3;
    // position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(153, 153, 153, 0.3);
    background-color: #ffffff;
  }

  .info_topbar .icon_scroll {
    position: absolute;
    right: 10px / 2.3;
    top: 40px / 2.3;
    color: #999999;
  }

  .info_topbar .scroll-view_H {
    white-space: nowrap;
    width: 100%;
    // padding: 0 60px;
    box-sizing: border-box;
    height: 100%;
    line-height: 90px / 2.3;
  }

  .info_topbar .every_name {
    padding: 0 40px / 2.3;
    font-size: 32px / 2.3;
    font-weight: bold;
    display: inline-block;
    position: relative;
    cursor: pointer;
  }

  .every_name .every_line {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 30px / 2.3;
    height: 4px / 2.3;
    background-color: #3888ff;
    border-radius: 2px / 2.3;
    margin-left: -15px / 2.3;
  }

  .every_select {
    color: #3888ff;
  }

  .info_every {
    // margin-top: 88px;
    height: calc(~"100% - 90px / 2.3");
    overflow-y: auto;
    width: 740px / 2.3;
    overflow-x: hidden;
    .info_view {
      background-color: #ffffff;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      min-height: 40px / 2.3;
      width: 100%;
      margin-top: 20px / 2.3;
      padding: 60px / 2.3 40px / 2.3;
      box-sizing: border-box;
      position: relative;
    }

    .info_view_title {
      font-size: 32px / 2.3;
      font-weight: bold;
      margin-bottom: 50px / 2.3;
    }

    .info_view_number {
      font-size: 32px / 2.3;
      color: #999999;
      position: absolute;
      top: 60px / 2.3;
      right: 40px / 2.3;
    }
    .info_desc {
      margin-top: 0;
      p {
        word-break: break-all;
      }
    }
    .info_desc_content {
      font-size: 28px / 2.3;
      color: #353535;
      line-height: 2;
    }

    .info_filelist {
      width: 100%;
    }

    .info_file_list {
      width: 280px / 2.3;
      /* border-radius: 8px; */
      /* border: 1px solid #F0F0F0;  */
      margin-right: 36px / 2.3;
      display: inline-block;
    }
    .info_file_list_top {
      height: 108px / 2.3;
      line-height: 92px / 2.3;
      padding: 24px / 2.3 20px / 2.3;
      box-sizing: border-box;
      background-color: #f6f6f6;
      border-radius: 8px / 2.3;
    }

    .info_file_list_top img {
      width: 50px / 2.3;
      height: 60px / 2.3;
    }

    .info_file_list_top span {
      color: #353535;
      font-size: 28px / 2.3;
      max-width: 180px / 2.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      height: 60px / 2.3;
      line-height: 60px / 2.3;
      margin-left: 10px / 2.3;
      vertical-align: top;
    }

    .info_file_list_desc {
      color: #666666;
      font-size: 24px / 2.3;
      line-height: 2;
      padding: 10px / 2.3;
      box-sizing: border-box;
      white-space: normal;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      align-content: center;
    }

    .info_imglist {
      width: 100%;
    }

    .info_img_list {
      width: 240px / 2.3;
      border-radius: 8px / 2.3;
      /* border: 1px solid #F0F0F0; */
      margin-right: 45px / 2.3;
      display: inline-block;
    }
    .info_img_list_img {
      width: 240px / 2.3;
      height: 240px / 2.3;
      border-radius: 8px / 2.3;
    }

    .info_img_list_name {
      color: #353535;
      font-size: 28px / 2.3;
      width: 220px / 2.3;
      margin: 10px / 2.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      vertical-align: top;
    }

    .info_team {
      font-size: 24px / 2.3;
      color: #666666;
      padding: 40px / 2.3;
    }
    .info_team span {
      display: block;
      line-height: 2;
    }
  }

  .info_bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 0 solid transparent;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100px / 2.3;
    line-height: 100px / 2.3;
    justify-content: center;
    padding: 0 100px / 2.3;
  }

  .info_bottom div {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .info_bottom img {
    width: 38px / 2.3;
    height: 38px / 2.3;
  }
  .info_bottom span {
    font-size: 20px / 2.3;
    display: inline-block;
    margin-left: 10px / 2.3;
  }
}
</style>
