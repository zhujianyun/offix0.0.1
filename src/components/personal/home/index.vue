<template>
  <div class="home1">
    <div class="home_top" v-if="true">
      <top-bar :companyLogo="companyLogo" :companyName="companyName" @my-event="setShow"></top-bar>

      <menu-bar ref="menu" v-show="!setNavShow"></menu-bar>

      <div v-show="setNavShow" class="menubartwo">
        <span @click="enterHome">
          <i class="el-icon-back"></i> 账号设置
        </span>
      </div>
    </div>
    <div class="main_content">
      <router-view></router-view>
      <div id="rightbar" class="rightbar" @mouseover="barMouseover" @mouseleave="barMouseleave">
        <div class="arrow_div cur fl">
          <div class="arrow cur" @click="rightbarShow">
            <i class="el-icon-arrow-left"></i>
          </div>
        </div>
        <div id="sidebar" class="sidebar fl" :class="{'sidebar': sidebarHideShow,'sidebar_hide': !sidebarHideShow}">
          <div class="label_use cur" :class="{'click_color': index === clickIndex}" v-for="(li, index) in list"
               @click="clicks(li.id)" :key="index">{{li.title}}
          </div>
          <div class="search">
            <input
              v-model="serachs" type="text"
              @focus="searchIconFlag = false"
              @blur="serachs ? searchIconFlag = false : searchIconFlag = true"
              @keyup="searchLabel(serachs)"
            >
            <i v-if="searchIconFlag" class="el-icon-search"></i>
          </div>
          <ul class="label_ul" v-if="!clickIndex">
            <li v-for="(list, index) in labelList" :key="index" class="label_li cur">
              <span class="label_span">{{list.Title}}</span>
              <p v-if="!labelList.length" class="search_empty">空空如也</p>
            </li>
          </ul>

          <ul class="use_ul" v-if="clickIndex">
            <li class="use_li cur"><img src="../../../assets/img/2.png" alt=""></li>
            <li class="use_li cur"><img src="../../../assets/img/3.png" alt=""></li>
            <li class="use_li cur"><img src="../../../assets/img/4.png" alt=""></li>
            <li class="use_li cur"><img src="../../../assets/img/0.png" alt=""></li>
          </ul>
        </div>
      </div>
      <div id="informBox" class="informBox">
        <span class="el-icon-bell" @click="infomShow">
          <span v-if="Number(unreadNum)" class="unread">{{unreadNum}}</span>
        </span>
        <div class="inform">
          <span class="triangle" id="triangle"></span>
          <div class="header">
            <span class="all_read cur" @click="allRead">全部已读</span>
            <span class="title">通知</span>
            <i class="el-icon-close" @click="colseInform"></i>
          </div>
          <div class="news_content">
            <ul class="informList">
              <li
                v-for="(news, index) in newsList"
                :key="index"
                @click="newsClick(news, index)"
                class="cur"
              >
                <div class="logo fl"><img :src="news.userPic" alt=""></div>
                <div class="informContent fl">
                  <span class="names">{{news.userName}}</span>
                  <span v-if="news.Content !== '4'" class="stay">在</span>
                  <span v-if="news.Content !== '4'" class="click_card">{{cardTypes[Number(news.Type)]}}</span>
                  <span v-if="news.Content !== '4'">中</span>
                  <p class="news_type">{{newsTypes[news.Content]}}<span v-if="news.Content === '4'" class="click_card">{{cardTypes[news.Type]}}</span>
                  </p>
                  <p class="news_time">{{news.CreateTime}}</p>
                </div>
                <span v-if="news.Enabled" class="news_tip fl"></span>
              </li>
            </ul>
            <p v-if="loadFlag" class="load_more" @click="loadMore">加载更多</p>
          </div>
        </div>
      </div>
    </div>
    <popupPrompt v-if="false"></popupPrompt>
  </div>
</template>
<script>
import topBar from "../../common/topBar";
import menuBar from "../../common/menuBar";
import popupPrompt from "../../common/popupPrompt";
import { setCookie, getCookie, delCookie } from "../../../api/cookie";

export default {
  components: {
    topBar,
    menuBar,
    popupPrompt
  },
  data() {
    return {
      setNavShow: false, //设置个人信息页面
      companyLogo: "", // 公司logo
      companyName: "", // 公司名称
      serachs: "", //搜索内容
      list: [{ id: 0, title: "标签" }, { id: 1, title: "应用" }],
      clickIndex: 0, // 当前点击的侧边栏类型
      searchIconFlag: true, // search图标
      labelList: [], // 标签列表
      labelCList: [], // copy标签列表
      sidebarHideShow: false, // 侧边栏显示隐藏
      sideBarFun: null, // 侧边栏移出隐藏函数
      infShow: false,
      newsList: [], // 消息列表
      // <param name="contId">描述内容信息Id  '0添加了反馈','1上传了文件','2完成了任务','3添加了新的评论','4创建新的任务给您','5添加了新的需求'，'6删除了新的需求','7上传需求文件，','8删除需求文件',’9添加了参与者’ ,’10删除协同人’ ,'11删除回复内容' ,'12撤回文件'  ,'13修改完成状态','14 修改任务时间'</param>
      newsTypes: [
        "添加了反馈",
        "上传了文件",
        "完成了任务",
        "添加了新的评论",
        "给您创建了一个新的",
        "添加了新的需求",
        "删除了新的需求",
        "上传需求文件",
        "删除需求文件",
        "添加了参与者",
        "删除协同人",
        "删除回复内容",
        "撤回文件",
        "修改完成状态",
        "修改任务时间"
      ], // 消息类型
      cardTypes: ["任务卡"], // 卡片类型
      newsPage: 1,
      userID: "",
      allNews: 0, // 共多少条消息
      loadFlag: false, // 是否显示加载更多
      newsInterval: null, // 定时器获取消息
      unreadNum: 0, // 未读消息的数量
      lastUnreadNum: 0 // 上次获取到的未读消息数量
    };
  },
  watch: {
    $route: "pathPush",
    serachs(val) {
      if (!val) {
        this.searchIconFlag = true;
      } else {
        this.searchIconFlag = false;
      }
    }
  },
  methods: {
    setShow(show) {
      this.setNavShow = show;
    },
    //      返回首页
    enterHome() {
      this.setNavShow = false;
      this.$router.push("/myTesk/myTeskList");
    },

    pathPush(path1, params) {
      
      // 直接点击跳转会watch和mounted都会执行，但直接输入路径置只会执行mounted中的调用
      if (!JSON.parse(localStorage.getItem("staffInfo")).Realname) {
        this.$router.push("/");
        return;
      }
      let path = path1 ? path1 : this.$route.path;
      let menuList = this.$refs.menu.menuList;
      if (path === "/Search") {
        this.$refs.menu.searchPage();
        return;
      }

      if (
        this.$route.path === "/myTesk/myTeskPublish" ||
        this.$route.path === "/myTesk/H5share"
      ) {
        $(".inform")
          .eq(0)
          .css({ height: 0, "padding-bottom": "0", overflow: "hidden" });
      }
      if (path === "/personalHome") {
        path = "/myTesk/myTeskList";
      }
      for (let menu of menuList) {
        if (path === menu.path) {
          if (path1) {
            this.$refs.menu.menuClick(menu, params);
          } else {
            this.$refs.menu.menuClick(menu);
          }
        }
      }
    },
    getPersonalInfo() {
      let info = JSON.parse(localStorage.getItem("staffInfo"));
      this.companyLogo = info.Pic;
      this.companyName = "北京泰合鼎鼎科技责任有限公司";
    },
    // 获取标签列表
    getLabelList() {
      let obj = { Cpkid: 1, pkids: 0, number: 0 };
      this.$HTTP("get", "/GetCategoryByPkid", obj)
        .then(res => {
          // console.log('标签列表', res.result);
          res.result.map(ele => {
            return (ele.checked = false);
          });
          this.labelList = res.result;
          this.labelCList = [...this.labelList];
        })
        .catch(err => {
          console.log("获取话题列表失败", err);
        });
    },
    // 搜索标签
    searchLabel(text) {
      this.labelList = this.labelCList.filter(el => {
        return el.Title.indexOf(text) >= 0;
      });
    },
    // 右边侧边栏内容切换
    clicks(id) {
      this.clickIndex = id;
      this.serachs = "";
      this.searchLabel(this.serachs);
    },
    // 右边侧边栏显示隐藏
    rightbarShow() {
      this.sidebarHideShow = !this.sidebarHideShow;
      clearTimeout(this.sideBarFun);
    },
    // 右边侧边栏鼠标移入
    barMouseover() {
      if (this.sidebarHideShow) {
        clearTimeout(this.sideBarFun);
      }
    },
    // 右边侧边栏鼠标移除
    barMouseleave() {
      this.sideBarFun = setTimeout(() => {
        if (this.sidebarHideShow) {
          this.sidebarHideShow = !this.sidebarHideShow;
        }
      }, 5000);
    },
    infomShow() {
      this.newsPage = 1;
      this.getNewsList(this.newsPage); // 刷新消息列表
      // this.infShow = !this.infShow;
      $(".inform")
        .eq(0)
        .animate({ height: "100%" }, 300, function() {
          $(".inform")
            .eq(0)
            .css({ "padding-bottom": "25px", overflow: "visible" });
        });
    },
    colseInform() {
      // this.infShow = false;
      $(".inform")
        .eq(0)
        .animate({ height: "0" }, 300, function() {
          $(".inform")
            .eq(0)
            .css({ "padding-bottom": "0", overflow: "hidden" });
        });
    },

    // 点击消息中的任务卡
    newsClick(news, index) {
      let params = { newsId: news.ArticlepkId };
      // this.$router.push({path: '/myTesk/myTeskList', params: params});
      this.pathPush("/myTesk/myTeskList", params);
      if (news.Enabled) {
        let obj = { pkid: news.Pkid };
        this.$HTTP("post", "/UpdateNotificationState", obj)
          .then(res => {
            if (res.result) {
              this.newsList[index].Enabled = false;
              this.unreadNum--;
            }
            console.log("消息已读", res);
          })
          .catch(err => {
            console.log("消息已读失败", err);
          });
      }
    },

    // 消息加载更多
    loadMore() {
      this.newsPage++;
      this.getNewsList(this.newsPage); // 获取消息列表
    },

    // 消息全部已读
    allRead() {
      let obj = { userId: this.userID };
      this.$HTTP("post", "/UpdateAllNotificationState", obj)
        .then(res => {
          this.unreadNum = 0;
          this.newsList.map(ele => {
            return (ele.Enabled = false);
          });
        })
        .catch(err => {
          console.log("消息全部已读失败", err);
        });
    },

    // 获取消息列表
    getNewsList(page) {
      let obj = { page: page, number: 20, userId: this.userID };
      this.$HTTP("post", "/GetNotificationList", obj)
        .then(res => {
          let result = res.result;
          if (page) {
            this.allNews = res.iRecordsTotal;
            if (page === 1) {
              this.newsList = result;
            } else {
              this.newsList = this.newsList.concat(result);
            }
            if (this.newsList.length >= this.allNews) {
              this.loadFlag = false;
            } else {
              this.loadFlag = true;
            }
          }
          this.unreadNum = res.newsCont;
          if (this.unreadNum > this.lastUnreadNum && page === 0) {
            if (result.lengt <= 20) {
              this.loadFlag = false;
              this.newsList = result;
            } else {
              this.loadFlag = true;
              this.newsList = result.splice(0, 20);
            }
          }
          this.lastUnreadNum = this.unreadNum;

          console.log("消息列表", this.newsList);
        })
        .catch(err => {
          console.log("消息列表获取失败", err);
        });
    }
  },
  created() {
    
  },
  mounted() {
    // localStorage.getItem("staffInfo")
    if (getCookie("loginEmail") && localStorage.getItem("staffInfo")) {
      this.userID = JSON.parse(localStorage.getItem("staffInfo")).Pkid;
      this.userID = this.userID.toString();
    } else {
      return;
    }
    this.pathPush();
    if (this.$route.path == "/setNumber") {
      this.setNavShow = true;
    }

    this.getPersonalInfo();
    this.getNewsList(this.newsPage); // 获取消息列表

    this.$nextTick(() => {
      // 定时获取消息
      this.newsInterval = setInterval(() => {
        this.newsPage = 1;
        this.getNewsList(this.newsPage);
      }, 1000 * 60 * 3);
    });
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.newsInterval);
    next();
  }
};
</script>
<style lang="less">
@import "../../../assets/css/base.less";
@import "../../../assets/css/media.less";
/*...................................ke*/

.home1 {
  width: 100%;
  height: 100%;
  .home_top {
    -webkit-box-shadow: 1px 2px 3px #c0c0c0;
    -moz-box-shadow: 1px 2px 3px #c0c0c0;
    box-shadow: 1px 2px 3px #c0c0c0;
    width: 100%;
    .menubartwo {
      width: 100%;
      height: 50px;
      line-height: 49px;
      background-color: #ffffff;
      padding-left: 100px;
      font-size: 14px;
      color: #333;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      border-top: 1px solid #cccccc;
      position: relative;
      i {
        cursor: pointer;
      }
      span {
        cursor: pointer;
      }
    }
  }
  .main_content {
    width: 100%;
    height: calc(~"100% - 103px");
    position: relative;
    /*.........................ke*/

    .informBox {
      .el-icon-bell {
        position: absolute;
        top: -35px;
        right: 100px;
        font-size: 20px;
        cursor: pointer;
        z-index: 999;
        .unread {
          position: absolute;
          top: -8px;
          left: 10px;
          display: inline-block;
          padding: 3px;
          min-width: 12px;
          font-size: 12px;
          text-align: center;
          .border_radius(@br: 50%);
          background-color: #ff6173;
          color: #ffffff;
        }
      }
      .triangle {
        position: absolute;
        width: 0;
        top: -28px;
        right: 95px;
        height: 0;
        z-index: -10;
        border: 14px solid #000;
        border-color: transparent transparent #4574df transparent;
      }
      .inform {
        position: absolute;
        top: 0;
        right: 0;
        width: 300px;
        height: 0;
        overflow: hidden;
        background: #ffffff;
        box-shadow: 2px 6px 15px rgba(68, 68, 68, 0.2);
        z-index: 9999;
        .box_sizing;
        .header {
          height: 50px;
          background: #4574df;
          color: white;
          padding: 13px 20px;
          text-align: center;
          .box_sizing;
          span {
            cursor: pointer;
            margin-right: 60px;
          }
          i {
            font-size: 18px;
            cursor: pointer;
          }
          .title {
            text-align: center;
            font-size: 18px;
          }
        }
        .news_content {
          height: calc(~"100% - 50px");
          overflow: auto;
          .informList {
            li {
              height: 78px;
              padding: 10px 20px;
              .box_sizing;
              border-bottom: 1px solid @line;

              .logo {
                width: 30px;
                height: 30px;
                display: inline-block;
                border-radius: 50%;
                overflow: hidden;
                background: skyblue;
                img {
                  width: 30px;
                  height: 30px;
                }
              }
              .informContent {
                margin-left: 15px;
                height: 100%;
                width: 180px;
                display: inline-block;
                .names {
                  font-weight: bold;
                  display: inline-block;
                  width: 64px;
                  vertical-align: bottom;
                  .word_over;
                }
                .stay {
                  margin-right: 16px;
                  color: @graySix;
                }
                .click_card {
                  color: @blue;
                  text-decoration: underline;
                  .cur;
                  &:hover {
                    color: @hoveBlue;
                  }
                }
                .news_type {
                  line-height: 2;
                }
                .news_time {
                  color: @grayNight;
                  font-size: 12px;
                }
              }

              .news_tip {
                display: inline-block;
                width: 6px;
                height: 6px;
                .border_radius(@br: 50%);
                background-color: #ff6173;
                margin-top: 25px;
                margin-left: 11px;
              }
            }
            li:hover {
              background: #f2f3f9;
            }
          }
          .load_more {
            color: @blue;
            text-align: center;
            margin-top: 25px;
            .cur;
            &:hover {
              color: @hoveBlue;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

  .rightbar {
    position: fixed;
    right: 0;
    top: 193px;
    height: calc(~"100vh - 250px");
    /*background-color: pink;*/
    z-index: 998;
    .arrow_div {
      height: 100%;
      width: 15px;
      overflow: hidden;
      position: relative;
      .arrow {
        -webkit-box-shadow: inset 0 0 10px #444444;
        -moz-box-shadow: inset 0 0 10px #444444;
        -webkit-box-shadow: 0 0 10px rgba(68, 68, 68, 0.2);
        -moz-box-shadow: 0 0 10px rgba(68, 68, 68, 0.2);
        box-shadow: 0 0 10px rgba(68, 68, 68, 0.2);
        width: 30px;
        height: 50px;
        background-color: #ffffff;
        -webkit-border-radius: 50% 0 0 50%;
        -moz-border-radius: 50% 0 0 50%;
        border-radius: 50% 0 0 50%;
        position: absolute;
        top: 50%;
        margin-top: -7px;
        left: 2px;
        i {
          position: absolute;
          .dis-in-bl;
          width: 14px;
          height: 14px;
          line-height: 1;
          top: 50%;
          left: 0;
          margin-top: -7px;
          font-size: 14px;
          font-weight: 700;
          color: @hoveBlue;
        }
      }
    }

    .sidebar {
      transition: width 0.2s;
      -moz-transition: width 0.2s; /* Firefox 4 */
      -webkit-transition: width 0.2s; /* Safari 和 Chrome */
      -o-transition: width 0.2s; /* Opera */
      width: 80px;
      text-align: center;
      height: 100%;
      background-color: #ffffff;
      -webkit-box-shadow: inset 0 0 10px #444444;
      -moz-box-shadow: inset 0 0 10px #444444;
      -webkit-box-shadow: 0 0 10px rgba(68, 68, 68, 0.2);
      -moz-box-shadow: 0 0 10px rgba(68, 68, 68, 0.2);
      box-shadow: 0 0 10px rgba(68, 68, 68, 0.2);
      -webkit-border-radius: 10px 0 0 10px;
      -moz-border-radius: 10px 0 0 10px;
      border-radius: 10px 0 0 10px;

      .label_use {
        height: 36px;
        line-height: 36px;
        font-size: 16px;
      }

      .click_color {
        color: @grayNight;
      }

      .search {
        position: relative;
        input {
          .dis-in-bl;
          height: 30px;
          width: 80px;
          border-top: 1px solid @line;
          border-bottom: 1px solid @line;
          padding: 0 4px;
          .box_sizing;
        }

        .el-icon-search {
          position: absolute;
          color: @line;
          top: 50%;
          left: 50%;
          font-size: 16px;
          -webkit-transform: translate(-50%, -50%);
          -moz-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          -o-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
        }
      }

      .label_ul {
        height: calc(~"100% - 120px");
        overflow: auto;
        margin-top: 10px;
        .label_li {
          padding-top: 10px;
          &:first-child {
            padding-top: 0px;
          }
          .label_span {
            .dis-in-bl;
            height: 20px;
            line-height: 20px;
            width: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .border_radius(@br: 10px);
            border: 1px solid @grayNight;
            color: @grayNight;
            .f-size-12;
            padding: 0 4px;
          }
        }
      }

      .use_ul {
        height: calc(~"100% - 120px");
        overflow: auto;
        margin-top: 10px;
        .use_li {
          padding-top: 10px;
          &:first-child {
            padding-top: 0;
          }
          height: 35px;
          img {
            .dis-in-bl;
            height: 100%;
          }
        }
      }
    }

    .sidebar_hide {
      width: 0;
      height: 0;
      overflow: hidden;
      transition: width 0.2s;
      -moz-transition: width 0.2s; /* Firefox 4 */
      -webkit-transition: width 0.2s; /* Safari 和 Chrome */
      -o-transition: width 0.2s; /* Opera */
    }
  }
}
</style>
