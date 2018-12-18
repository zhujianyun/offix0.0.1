<template>
  <div class="two_bigBox">
    <div class="logintwo" v-if="content.IsTitle">
      <div class="bg">
        <div class="background_box"></div>
        <img src="../../assets/img/logo2.png" class="logo" alt="" width="50px">
        <p class="LoginTitle">{{title}}</p>
        <img class="dow" src="../../assets/img/dow2.png" alt="" width="15px">
      </div>
    </div>
    <div class="sharePagetwo">
      <div class="taskFeedback">
        <h1>工作展示</h1>
        <div class="title"></div>
        <ul v-if="cooperationName && item.shareFlag" class="subject clearfix" v-for="(item,index) in cooperationName" :key="index">
          <li class="personMain">
            <span class="logo"><img :src="item.Pic" alt=""></span>
            <span class="name">{{item.UserName}}</span>
            <span class="job">{{item.Job}}</span>
            <span class="time fr">{{item.CreateTime}}</span>
          </li>
          <li class="feedbackInformation">
            <p v-for="(reply,index) in item.ReplyInformationList" :key="index" v-html="reply.Content"></p>
          </li>
          <li :class="item.cardunfold ? 'fileList':'fileListShow'">
            <span class="fileBox " v-for="(fileList,index) in item.TaskFileList" :key="index">
                <div id="photos" class="img" @click="openPhotoSwipe(item,index)">
                   <figure style="margin: 0" class="figure">
                    <a v-if="fileList.FileTypeNum === 1" :src="fileList.TitleS">
                      <img class="typeOne" :src="fileList.TitleS ?fileList.TitleS : fileList.Url"/>
                    </a>
                   </figure>
                   <a :href="fileList.Url" v-if="fileList.FileTypeNum === 2"><img class="typeTwo"
                                                                                  src="../../assets/img/icon2/2.png"></a>
                <a :href="fileList.Url" v-if="fileList.FileTypeNum === 3"><img class="typeTwo"
                                                                               src="../../assets/img/icon2/3.png"></a>
                <a :href="fileList.Url" v-if="fileList.FileTypeNum === 4"><img class="typeTwo"
                                                                               src="../../assets/img/icon2/4.png"></a>
                <a :href="fileList.Url" v-if="fileList.FileTypeNum === 5"><img class="typeTwo"
                                                                               src="../../assets/img/icon2/5.png"></a>
                <a :href="fileList.Url" v-if="fileList.FileTypeNum === 6"><img class="typeTwo"
                                                                               src="../../assets/img/icon2/6.png"></a>
                <a :href="fileList.Url" v-if="fileList.FileTypeNum === 7"><img class="typeTwo"
                                                                               src="../../assets/img/icon2/7.png"></a>
                <a :href="fileList.Url" v-if="fileList.FileTypeNum === 8"><img class="typeTwo"
                                                                               src="../../assets/img/icon2/8.png"></a>
                <a :href="fileList.Url" v-if="fileList.FileTypeNum === 9"><img class="typeTwo"
                                                                               src="../../assets/img/icon2/9.png"></a>
                <a :href="fileList.Url" v-if="fileList.FileTypeNum === 10"><img class="typeTwo"
                                                                                src="../../assets/img/icon2/10.png"></a>
                <a :href="fileList.Url" v-if="fileList.FileTypeNum === 0"><img class="typeTwo"
                                                                               src="../../assets/img/icon2/0.png"></a>
                </div>
                <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="pswp__bg"></div>
          <div class="pswp__scroll-wrap">
            <div class="pswp__container">
              <div class="pswp__item"></div>
              <div class="pswp__item"></div>
              <div class="pswp__item"></div>
            </div>
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <button class="pswp__button pswp__button--share" title="Share"></button>
            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>
          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
                <span class="fileTitle">{{fileList.Title}}.{{fileList.FileType}}</span>
              </span>
          </li>
          <span class="ClickUnfold fr" v-if="item.FileIsShow" @click="unfold(item)">点击展开<i
            class="el-icon-arrow-down"></i></span>
        </ul>
      </div>
      <div class="taskDescription" v-if="content && content.IsDescn">
        <h1>任务需求</h1>
        <div class="title"></div>
        <div class="TaskMain">{{taskContent}}</div>
        <div v-if="content.IsTaskFile && content.PubFile.length" class="clearfix">
          <p class="taskFile">任务文件：</p>
          <li :class="testcardunfold ? 'fileList':'fileListShow'">
            <span class="fileBox " v-for="(list,index) in content.PubFile" :key="index">
                <div id="photos_two" class="img" @click="openPhotoSwipe_two(content.PubFile,index)">
                  <figure style="margin: 0" class="figure">
                    <a v-if="list.FileTypeNum === 1" :src="list.Url" :data-size="dataSize_two"><img class="typeOne"
                                                                                                    :src="list.Url"/></a>
			            </figure>
                <a href="#" :download="list.Title+'.'+list.FileType" v-if="list.FileTypeNum === 2"><img class="typeTwo"
                                                                                                        src="../../assets/img/icon2/2.png"></a>
                <a href="#" :download="list.Title+'.'+list.FileType" v-if="list.FileTypeNum === 3"><img class="typeTwo"
                                                                                                        src="../../assets/img/icon2/3.png"></a>
                <a href="#" :download="list.Title+'.'+list.FileType" v-if="list.FileTypeNum === 4"><img class="typeTwo"
                                                                                                        src="../../assets/img/icon2/4.png"></a>
                <a href="#" :download="list.Title+'.'+list.FileType" v-if="list.FileTypeNum === 5"><img class="typeTwo"
                                                                                                        src="../../assets/img/icon2/5.png"></a>
                <a href="#" :download="list.Title+'.'+list.FileType" v-if="list.FileTypeNum === 6"><img class="typeTwo"
                                                                                                        src="../../assets/img/icon2/6.png"></a>
                <a href="#" :download="list.Title+'.'+list.FileType" v-if="list.FileTypeNum === 7"><img class="typeTwo"
                                                                                                        src="../../assets/img/icon2/7.png"></a>
                <a href="#" :download="list.Title+'.'+list.FileType" v-if="list.FileTypeNum === 8"><img class="typeTwo"
                                                                                                        src="../../assets/img/icon2/8.png"></a>
                <a href="#" :download="list.Title+'.'+list.FileType" v-if="list.FileTypeNum === 9"><img class="typeTwo"
                                                                                                        src="../../assets/img/icon2/9.png"></a>
                <a href="#" :download="list.Title+'.'+list.FileType" v-if="list.FileTypeNum === 10"><img class="typeTwo"
                                                                                                         src="../../assets/img/icon2/10.png"></a>
                <a href="#" :download="list.Title+'.'+list.FileType" v-if="list.FileTypeNum === 11"><img class="typeTwo"
                                                                                                         src="../../assets/img/icon2/11.png"></a>
                <a href="#" :download="list.Title+'.'+list.FileType" v-if="list.FileTypeNum === 0"><img class="typeTwo"
                                                                                                        src="../../assets/img/icon2/0.png"></a>
                  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="pswp__bg"></div>
          <div class="pswp__scroll-wrap">
            <div class="pswp__container">
              <div class="pswp__item"></div>
              <div class="pswp__item"></div>
              <div class="pswp__item"></div>
            </div>
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <button class="pswp__button pswp__button--share" title="Share"></button>
            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>
          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
                  <span class="fileTitle">{{list.Title}}.{{list.FileType}}</span>
        </div>
              </span>
          </li>

          <span class="ClickUnfold fr" v-if="testcardShow" @click="testFileShow()">点击展开<i
            class="el-icon-arrow-down"></i></span>
        </div>
      </div>
      <ul class="message">
        <li><span class="title">发送时间：</span><span>{{createTime}}</span></li>
        <li><span class="title">信息来自：</span><span>{{name}}</span></li>
        <li v-if="cooperationName"><span class="title">协作人员：</span><span v-for="(item,index) in cooperationName" :key="index">{{item.UserName}}</span></li>
      </ul>
      <img src="../../assets/img/logo2.png" class="companylogo" alt="" width="50px">
      <p>现在您可以立即加入OFFIX，创建自己的工作台，让工作变得有趣。扫描二维码吧！</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["params"],
  data() {
    return {
      items: [],
      options: {
        showHideOpacity: true,
        getThumbBoundsFn: false,
        history: false,
        focus: false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0
      },
      dataSize_two: "",
      homeShow: "",
      title: "",
      createTime: "",
      name: "",
      content: "",
      cooperationName: [],
      pubFile: "",
      taskContent: "",
      activeNames: ["1"],
      cardunfold: true,
      unfoldHide: true,
      unfoldTaskFile: true,
      testcardunfold: true,
      url: "",
      testcardShow: false,
      Pkid: "",
      UserPkids: "",
      sumFlag: true,
      TemplateType: 2
    };
  },
  watch: {
    params(val) {
      if (this.params.TemplateType) {
        this.Pkid = this.params.Pkid;
        this.UserPkids = this.params.UserPkids;
        this.UserPkids = this.UserPkids.length
          ? this.UserPkids.join(",")
          : "1189,1204,1212,1184,1196";
        this.sumFlag = this.params.sumFlag;
        this.TemplateType = this.params.TemplateType;
        this.getShareList(this.Pkid);
      }
    }
  },
  methods: {
    openPhotoSwipe(item, index) {
      this.items = [];
      var pswpElement = document.querySelectorAll(".pswp")[0];
      for (let i of item.TaskFileList) {
        if (
          i.FileType == "png" ||
          i.FileType == "jpg" ||
          i.FileType == "jpeg" ||
          i.FileType == "gif"
        ) {
          if (i.Width) {
            this.items.push({ src: i.Url, w: i.Width, h: i.Heigth });
          } else {
            this.items.push({ src: i.Url, w: 800, h: 1200 });
          }
        }
      }
      var options = {
        index: index,
        escKey: false,
        timeToIdle: 4000
      };

      var gallery = new PhotoSwipe(
        pswpElement,
        PhotoSwipeUI_Default,
        this.items,
        options
      );
      gallery.init();
    },
    openPhotoSwipe_two(file, index) {
      this.items = [];
      var pswpElement = document.querySelectorAll(".pswp")[0];
      for (let i of file) {
        if (
          i.FileType == "png" ||
          i.FileType == "jpg" ||
          i.FileType == "jpeg" ||
          i.FileType == "gif"
        ) {
          if (i.Width) {
            this.items.push({ src: i.Url, w: i.Width, h: i.Heigth });
          } else {
            this.items.push({ src: i.Url, w: 800, h: 1200 });
          }
        }
      }
      var options = {
        index: index,
        escKey: false,
        timeToIdle: 4000
      };

      var gallery = new PhotoSwipe(
        pswpElement,
        PhotoSwipeUI_Default,
        this.items,
        options
      );
      gallery.init();
    },
    unfold(item) {
      item.FileIsShow = false;
      item.cardunfold = false;
    },
    testFileShow() {
      this.testcardunfold = !this.testcardunfold;
      this.testcardShow = false;
    },
    unfoldTask() {
      this.cardunfold = !this.cardunfold;
      this.unfoldTaskFile = false;
    },

    getShareList(pkid) {
      let data = { articlePkid: pkid };
      this.$HTTP("post", "/GetSharingLinks", data)
        .then(res => {
          this.content = res.result;
          this.homeShow = this.content.IsTitle;
          this.title = this.content.Title;
          this.createTime = this.content.CreateTime;
          this.name = this.content.UName;
          if (this.params) {
            this.content.IsDescn = this.params.sumFlag;
          }
          this.taskContent = this.content.Content;
          this.cooperationName = JSON.parse(this.content.Coordination);
          for (let i of this.cooperationName) {
            i.ReplyInformationList = JSON.parse(i.ReplyInformationList);
            i.TaskFileList = JSON.parse(i.TaskFileList);
            this.$set(i, "filenum", i.TaskFileList.length);
            this.$set(i, "cardunfold", true);
            this.$set(i, "FileIsShow", false);
            // yun+++++++++++++++++++++++
            this.$set(i, "shareFlag", true);
            if (i.filenum > 3) {
              i.FileIsShow = true;
            }
            for (let j of i.TaskFileList) {
              this.$set(j, "FileTypeNum", this.getFlieTyle(j.FileType));
            }
            if (this.UserPkids) {
              if (this.UserPkids.indexOf(i.UserId) != -1) {
                this.$set(i, "shareFlag", true);
              } else {
                this.$set(i, "shareFlag", false);
              }
            }
            // yun+++++++++++++++++++++++
          }
          this.content.PubFile = JSON.parse(this.content.PubFile);
          for (let flie of this.content.PubFile) {
            this.$set(flie, "FileTypeNum", this.getFlieTyle(flie.FileType));
          }
          console.log(this.content.PubFile.length);
          if (this.content.PubFile.length > 3) {
            this.testcardShow = true;
          } else {
            this.testcardShow = false;
          }

          // console.log(this.testcardShow);
        })
        .catch(err => {
          console.log(err);
          this.$message("获取信息失败，请稍后再试");
        });
    }
  },
  created() {
    this.url = window.location.href; //获取url中"?"符后的字串
    var di = window.location.href;
    var index = di.indexOf("pkid");
    if (index != -1) {
      let url = di.slice(index);
      var pkid = url.split("=")[1];
      this.getShareList(pkid);
    }
  },
  mounted() {}
};
</script>
<style lang="less">
@import "../../assets/css/common.css";

/*----------------------------------------------------*/

html,
body {
  width: 100%;
  min-height: 100vh;
  position: relative;
  min-width: 320px !important;
}

.two_bigBox {
  .pnav {
    margin-top: 30px;
    text-align: center;
    line-height: 24px;
    font-size: 16px;
  }

  .pnav a {
    padding: 4px;
  }

  .pnav a.cur {
    background: #007bc4;
    color: #fff;
  }

  /*.demo {*/
  /*width: 80%;*/
  /*margin: 10px auto*/
  /*}*/

  /*必要样式*/
  #photos {
    /*width: 150px;*/
    /*border: 1px solid #d3d3d3;*/
    /*margin: 20px auto;*/
    /*text-align: center;*/
    /*padding: 4px;*/
    cursor: pointer;
    position: relative;
  }

  #photos p {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 4px;
    background: #000;
    color: #fff;
  }

  .my-gallery {
    width: 100%;
    float: left;
  }

  .my-gallery img {
    width: 100%;
    height: auto;
  }

  .my-gallery figure {
    display: block;
    float: left;
    margin: 0 5px 5px 0;
    width: 150px;
  }

  .my-gallery figcaption {
    display: none;
  }

  .logintwo {
    width: 100%;
    min-height: 568px;
    color: #333333;
    font-size: 18px;
    text-align: center;
    background: #ffffff; /* Safari 5.1 - 6.0 */

    .bg {
      min-width: 320px;
      min-height: 600px;
      .background_box {
        width: 90%;
        height: 200px;
        background: url("../../assets/img/bg2.png") no-repeat;
        background-size: 100%;
        position: absolute;
        top: 190px;
        left: 50%;
        margin-left: -45%;
      }
      .logo {
        margin-top: 78px;
      }
      .dow {
        margin-top: 43px;
      }
    }

    .LoginTitle {
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      margin-top: 350px;
      word-break: break-all;
      max-height: 43px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    @media screen and (min-height: 812px) and (min-width: 375px) {
      .bg {
        height: 812px !important;
        .background_box {
          top: 250px !important;
        }
        .LoginTitle {
          margin-top: 470px !important;
        }
      }
    }

    @media screen and (min-height: 667px) {
      .bg {
        height: 667px;
        .background_box {
          top: 200px;
        }
        .LoginTitle {
          margin-top: 400px;
        }
      }
    }
    @media screen and (min-height: 736px) and (min-width: 414px) {
      .bg {
        height: 736px;
        .background_box {
          top: 200px;
        }
        .LoginTitle {
          margin-top: 450px;
        }
      }
    }
  }

  .heng {
    width: 100px;
    height: 100px;
    background: red;
  }

  .hen {
    width: 100px;
    height: 100px;
    background: pink;
  }

  .sharePagetwo {
    min-height: 665px;
    padding: 30px 25px;
    box-sizing: border-box;
    color: #333333;
    position: relative;
    background: #ffffff;

    @media screen and(min-width: 320px) and(max-width: 359px) {
      .fileBox {
        margin: 0 22px 20px 22px !important;
      }
    }
    .taskFeedback {
      h1 {
        text-align: center;
        font-size: 18px;
        color: #007aff;
      }
      .title {
        height: 2px;
        width: 100%;
        border-bottom: 1px solid #007aff;
        border-top: 1px solid #007aff;
        margin-bottom: 20px;
        margin-top: 5px;
      }
      .subject {
        margin-bottom: 40px;
        .personMain {
          height: 20px;
          line-height: 20px;
          span {
            display: tabel-cell;
            vertical-align: middle;
            margin-right: 10px;
          }
          .logo {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: inline-block;
            img {
              display: inline-block;
              width: 100%;
              vertical-align: middle;
              max-height: 20px;
            }
          }
          .job {
            font-size: 10px;
          }
          .time {
            font-size: 10px;
          }
        }
        .feedbackInformation {
          margin-top: 10px;
          line-height: 20px;
          p {
            word-break: break-all;
          }
        }

        .fileList {
          margin-top: 20px;
          max-height: 100px;
          overflow: hidden;
          transition: height 0.5s linear;
          .fileBox {
            display: inline-block;
            border-radius: 5px;
            width: 90px;
            height: 100px;
            background: #f5f5f5;
            margin: 0 27px 27px 0;
            position: relative;
            padding: 15px 14px;
            box-sizing: border-box;
            figure {
              margin: 0;
            }
            .img {
              display: block;
              height: 100px;
              max-height: 85%;
              max-width: 100%;
              overflow: hidden;
              cursor: pointer;
              a {
                display: block;
                width: 100%;
                height: 100%;
                text-align: center;
                img {
                  max-width: 100%;
                  height: 59px;
                }
              }
            }
            .fileTitle {
              display: block;
              text-align: center;
              font-size: 10px;
              position: absolute;
              bottom: 2px;
              width: 70%;
              height: 15px;
              overflow: hidden;
              word-wrap: break-all;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }

        .fileList span:nth-child(3n) {
          margin-right: 0;
        }
        .fileListShow {
          margin-top: 20px;
          height: 100%;
          transition: height 0.5s linear;
          .fileBox {
            display: inline-block;
            border-radius: 5px;
            width: 90px;
            height: 100px;
            background: #f5f5f5;
            margin: 0 27px 27px 0;
            position: relative;
            padding: 15px 14px;
            box-sizing: border-box;
            figure {
              margin: 0;
            }
            .img {
              display: block;
              height: 100px;
              max-height: 85%;
              max-width: 100%;
              overflow: hidden;
              a {
                display: block;
                width: 100%;
                height: 100%;
                text-align: center;
                img {
                  max-width: 100%;
                  height: 59px;
                }
              }
            }
            .fileTitle {
              display: block;
              text-align: center;
              font-size: 10px;
              position: absolute;
              bottom: 2px;
              width: 70%;
              height: 15px;
              overflow: hidden;
              word-wrap: break-all;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .fileListShow span:nth-child(3n) {
          margin-right: 0;
        }
        @media screen and (min-height: 736px) and (min-width: 414px) {
          .fileList {
            .fileBox {
              margin: 0 15px 15px 15px;
            }
          }
          .fileListShow {
            .fileBox {
              margin: 0 15px 15px 15px;
            }
          }
        }
        @media screen and (min-width: 480px) {
          .fileList {
            /*background: red;*/
            .fileBox {
              margin: 0 29px 20px 29px;
            }
          }
          .fileListShow {
            .fileBox {
              margin: 0 29px 20px 29px;
            }
          }
        }

        @media screen and (min-width: 322px) {
          .fileList {
            width: 100%;
            .fileBox {
              width: 31%;
              height: 90px;
              margin: 0 3px 6px 3px;
            }
          }
          .fileListShow {
            .fileBox {
              width: 31%;
              height: 90px;
              margin: 0 3px 6px 3px;
            }
          }
        }

        .ClickUnfold {
          margin-top: 10px;
          .el-icon-arrow-down {
            color: #0074ff;
          }
        }
      }
    }
    /*======================================================*/
    .taskDescription {
      margin-top: 40px;
      h1 {
        text-align: center;
        font-size: 18px;
        color: #0074ff;
      }
      .title {
        height: 2px;
        width: 100%;
        border-bottom: 1px solid #007aff;
        border-top: 1px solid #007aff;
        margin-bottom: 20px;
        margin-top: 5px;
      }

      .TaskMain {
        margin-top: 20px;
        line-height: 20px;
      }
      .taskFile {
        margin-top: 40px;
        font-size: 15px;
      }

      .fileList {
        margin-top: 20px;
        max-height: 100px;
        overflow: hidden;
        transition: height 0.5s linear;
        .fileBox {
          display: inline-block;
          border-radius: 5px;
          width: 90px;
          height: 100px;
          background: #f5f5f5;
          margin: 0 27px 27px 0;
          position: relative;
          padding: 15px 14px;
          box-sizing: border-box;
          .img {
            display: block;
            height: 100px;
            max-height: 85%;
            max-width: 100%;
            overflow: hidden;
            a {
              display: block;
              width: 100%;
              height: 100%;
              text-align: center;
              img {
                max-width: 100%;
                height: 59px;
              }
            }
          }
          .fileTitle {
            display: block;
            text-align: center;
            font-size: 10px;
            position: absolute;
            bottom: 2px;
            width: 70%;
            height: 15px;
            overflow: hidden;
            word-wrap: break-all;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .fileList span:nth-child(3n) {
        margin-right: 0;
      }

      /*任务需求点击展开后的样式*/
      .fileListShow {
        margin-top: 20px;
        height: 100%;
        transition: height 0.5s linear;
        .fileBox {
          display: inline-block;
          border-radius: 5px;
          width: 90px;
          height: 100px;
          background: #f5f5f5;
          margin: 0 27px 27px 0;
          position: relative;
          padding: 15px 14px;
          box-sizing: border-box;
          .img {
            display: block;
            height: 100px;
            max-height: 85%;
            max-width: 100%;
            overflow: hidden;
            a {
              display: block;
              width: 100%;
              height: 100%;
              text-align: center;
              img {
                max-width: 100%;
                height: 59px;
              }
            }
          }
          .fileTitle {
            display: block;
            text-align: center;
            font-size: 10px;
            position: absolute;
            bottom: 2px;
            width: 70%;
            height: 15px;
            overflow: hidden;
            word-wrap: break-all;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
       @media screen and (min-height: 736px) and (min-width: 414px) {
          .fileList {
            .fileBox {
              margin: 0 15px 15px 15px;
            }
          }
          .fileListShow {
            .fileBox {
              margin: 0 15px 15px 15px;
            }
          }
        }
        @media screen and (min-width: 480px) {
          .fileList {
            /*background: red;*/
            .fileBox {
              margin: 0 29px 20px 29px;
            }
          }
          .fileListShow {
            .fileBox {
              margin: 0 29px 20px 29px;
            }
          }
        }

        @media screen and (min-width: 322px) {
          .fileList {
            width: 100%;
            .fileBox {
              width: 31%;
              height: 90px;
              margin: 0 3px 6px 3px;
            }
          }
          .fileListShow {
            .fileBox {
              width: 31%;
              height: 90px;
              margin: 0 3px 6px 3px;
            }
          }
        }

      .ClickUnfold {
        margin-top: 10px;
      }
      .fileListShow span:nth-child(3n) {
        margin-right: 0;
      }
    }
    .message {
      margin-top: 30px;
      border-bottom: 1px solid #ffffff;
      .title {
        color: #666666;
      }
      li {
        margin-bottom: 15px;
      }
    }
    .companylogo {
      display: block;
      margin: 25px auto;
    }
  }
}
</style>
