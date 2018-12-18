<template>
	<div class="my_tesk contents">
    <div class="top">
      <div class="add_tesk fl cur" @click="addPublish">
        <i class="iconfont icon-add"></i>
      </div>
      <div class="date_tesk fl">
        <el-date-picker class="selected_time" v-model="listDate" format="MM月dd日" type="date" placeholder="选择日期">
        </el-date-picker>
        <i>-</i>
        <span class="cur tesk_type">
          <span class="tesk_text">{{teskType}}</span>
          <span v-if="false" class="tesk_number">{{teskNumber}}</span>
        </span>
      </div>
      <ul class="sort_type fr" v-if="false">
        <li class="sort_li fl cur" :class="{'bgc' : list.type === nowSortType}" v-for="(list, index) in sortTypeList" :key="index">
          <i class="sort_icon" :class="list.icon"></i>
        </li>
      </ul>
    </div>
    <div class="mains clearfix">

      <!--左侧展开卡片-->
      <div v-if="teskList.length" class="left clearfix fl">
        <tesk-card ref="teskCard" @cardFinishChange="cardFinishChange" @cardAddStaff="cardAddStaff"></tesk-card>
      </div>

      <!--右侧缩略卡片-->
      <div  v-if="teskList.length" class="right fl">
        <ul class="tesk_ul">
          <li v-for="(tesk, index) in teskList" :key="index" class="mini_tesk fl cur" @click="getCardDetail(index, tesk.Pkid)" :class="{'selected_border': index === nowSelected, 'finished_tesk': tesk.State, 'allFinished_tesk': tesk.show ? tesk.TaskState : tesk.State}">
            <div class="mini_tesk_top">
              <span class="mini_tesk_finish fr"><el-checkbox :class="{'opacity_ban': tesk.State}" v-if="tesk.show" :disabled="tesk.disabled" v-model="tesk.State" @change="finishChange(tesk)"></el-checkbox></span>
              <span class="mini_tesk_head fl" :class="{'opacity_ban': tesk.State}">
                <img :src="tesk.Pic" alt="">
              </span>
            </div>
            <p class="mini_tesk_content lines">{{tesk.Content}}</p>

          </li>
        </ul>
      </div>
      <p class="nodata_img" v-if="!teskList.length"><img src="../../../assets/img/noData.png" alt=""></p>
    </div>
  </div>
</template>
<script>
import form from "../../../api/form";
import teskCard from "../../common/teskCard";

export default {
  components: {
    teskCard
  },
  data() {
    return {
      nowSelected: 0, // 现在选中卡片的index
      listDate: new Date(), // 列表任务日期
      teskType: "我收到的任务", // 任务类型
      sortTypeList: [
        {
          type: 1,
          icon: "iconfont icon-guanbi"
        },
        {
          type: 2,
          icon: "iconfont icon-guanbi"
        },
        {
          type: 3,
          icon: "iconfont icon-adduser"
        },
        {
          type: 4,
          icon: "iconfont icon-word"
        }
      ],
      nowSortType: 1, // 现在的排列方式
      teskNumber: 16, // 当前列表任务数量
      teskList: [], // 任务列表
      newsId: "" // 消息卡片Id
    };
  },

  watch: {
    $route(to, from) {
      this.routeChange();
    }
  },
  mounted() {
    this.routeChange();
  },
  methods: {
    // 路由变化
    routeChange() {
      if (this.$route.params && this.$route.params.newsId) {
        this.newsId = this.$route.params.newsId;
        this.getTeskList(this.newsId);
      }
    },
    // 点击添加任务
    addPublish() {
      this.$router.push("/myTesk/myTeskPublish");
    },
    // 点击是否完成
    finishChange(every) {
      let obj = {
        coordinationPkid: every.coordinationPkid,
        state: every.State
      };

      this.$HTTP("post", "/UpdateCoordinationUser", obj)
        .then(res => {
          let state = res.result;
          every.TaskState = state.TaskState;
          every.State = state.State;

          //this.$message.success('任务完成状态更改成功');
          this.$refs.teskCard.cardFinishChange(this.userID, state.State);
        })
        .catch(err => {
          this.$message.error("任务完成状态更改失败");
          console.log(err);
        });
    },

    // 卡片详情是否完成change
    cardFinishChange(obj) {
      let data = JSON.parse(obj);
      // console.log(222,obj);
      let indexs = this.teskList.findIndex(ele => {
        return data.teskId === ele.Pkid;
      });
      if (indexs !== -1) {
        this.teskList[indexs].State = data.State;
        this.teskList[indexs].TaskState = data.TaskState;
        //          if(this.teskList[indexs].CreatorId.toString() === this.teskList[indexs].UserPkids.toString()) {
        //            this.teskList[indexs].TaskState = data.State;
        //          }
      }
      this.teskList = this.teskList.concat();
    },

    // 子组件添加协助人员
    cardAddStaff(obj) {
      let data = JSON.parse(obj);
      let indexs = this.teskList.findIndex(ele => {
        return ele.Pkid === data.teskId;
      });
      if (indexs !== -1) {
        if (this.teskList[indexs].UserPkids) {
          this.teskList[indexs].UserPkids += "," + data.addId;
        } else {
          this.teskList[indexs].UserPkids = data.addId;
        }
        let haves = this.teskList[indexs].UserPkids.indexOf(this.userID);

        if (haves !== -1 && !this.teskList[indexs].show) {
          this.teskList[indexs].show = true;
        }
        this.teskList = this.teskList.concat();
      }
    },

    // 获取卡片详情
    getCardDetail(index, id) {
      this.nowSelected = index;
      this.$refs.teskCard.getCardDetail(id);
    },

    //  获取任务列表
    getTeskList(newsId) {
      if (!localStorage.getItem("staffInfo")) {
        this.$router.push("/");
        return;
      }
      this.userID = JSON.parse(
        localStorage.getItem("staffInfo")
      ).Pkid.toString();
      let obj = {
        page: 0,
        number: 0,
        userID: this.userID,
        CcategoryId: "",
        key: ""
      };
      this.$HTTP("post", "/GetListByPkidAndkey", obj)
        .then(res => {
          this.teskList = res.result;
          if (!this.teskList.length) {
            return;
          }
          this.powerJudge(this.teskList);
          this.$nextTick(() => {
            if (newsId) {
              this.$refs.teskCard.getCardDetail(newsId);
              this.nowSelected = this.teskList.findIndex(el => {
                return el.Pkid.toString() === newsId.toString();
              });
            } else {
              this.nowSelected = 0;
              this.$refs.teskCard.getCardDetail(this.teskList[0].Pkid); // 初试获取第一个卡片的详情
            }
          });
        })
        .catch(err => {
          console.log("获取任务列表失败", err);
          this.$message.error("获取任务列表失败");
        });
    },
    // 任务权限判断
    powerJudge(list) {
      for (let ele of list) {
        if (ele.UserPkids) {
          let oks = ele.UserPkids.split(",").find(index => {
            return index === this.userID;
          });
          if (oks) {
            this.$set(ele, "disabled", false);
          } else {
            this.$set(ele, "disabled", true);
          }
          if (ele.CreatorId.toString() === this.userID && !oks) {
            this.$set(ele, "show", false);
          } else {
            this.$set(ele, "show", true);
          }
        } else {
          ele.UserPkids = ele.CreatorId.toString();
          if (ele.UserPkids === this.userID) {
            this.$set(ele, "disabled", false);
          } else {
            this.$set(ele, "disabled", true);
          }
          this.$set(ele, "show", true);
        }
      }
    }
  },

  created() {
    this.getTeskList(); //  获取任务列表
    let body = document.querySelector("body");
    body.addEventListener(
      "click",
      e => {
        if (e.target.id !== "setButton") {
          $("#settingShow").hide();
        } else {
          $("#settingShow").show();
        }
      },
      false
    );
  }
};
</script>
<style lang="less">
@import "../../../assets/css/base.less";
@import "../../../assets/css/media.less";
.my_tesk {
  width: 100%;
  height: 100%;
  // height: calc(~ '100vh - 100px');
  padding: 23px 100px 70px 100px;
  .box_sizing;

  .top {
    height: 50px;
    line-height: 50px;
    position: relative;

    .add_tesk {
      i {
        display: inline-block;
        width: 50px;
        height: 50px;
        font-size: 30px;
        .border_radius(@br: 25px);
        background: linear-gradient(to right, #4000b4, #63b1ff);
        text-align: center;
        color: #fff;
      }
    }

    .date_tesk {
      font-size: 30px;
      padding-left: 30px;

      .selected_time {
        width: 134px;
        .el-input__inner {
          padding: 0 !important;
          border: 0 solid #ffffff;
          color: #2c3e50;
          background-color: #f2f3f9;
          font-size: 30px;
          cursor: pointer;
        }

        .el-input__prefix {
          display: none;
        }

        .el-input__suffix {
          display: none;
        }
      }

      .tesk_type {
        position: relative;
        .tesk_number {
          display: inline-block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          background-color: #ff6173;
          color: #ffffff;
          font-size: 12px;
          .border_radius(@br: 50%);
          position: absolute;
          top: -6px;
          right: -16px;
          text-align: center;
        }
      }
    }
    .sort_type {
      width: 136px;
      height: 26px;
      .border_radius(@br: 6px);
      background-color: #fff;
      position: absolute;
      bottom: 0;
      right: 0;

      .sort_li {
        width: 34px;
        height: 26px;
        position: relative;

        .sort_icon {
          display: inline-block;
          font-size: 14px;
          height: 26px;
          line-height: 26px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: @grayNight;
        }
      }
    }
  }

  .mains {
    width: 100%;
    height: calc(~"100% - 50px - 20px");

    margin-top: 20px;

    .nodata_img {
      text-align: center;
      padding-top: 100px;
      .box_sizing;
    }
    .left {
      @media screen and (min-width: 1920px) {
        width: 60%;
      }
      width: 70%;
      height: 100%;
    }

    .right {
      @media screen and (min-width: 1920px) {
        width: 40%;
      }
      width: 30%;

      height: 100%;

      .tesk_ul {
        width: 100%;
        height: 90%;
        padding-left: 40px;
        .box_sizing;
        overflow-y: auto;
        .mini_tesk {
          @media screen and (min-width: 1920px) {
            width: 47%;
            margin-top: 20px;
            &:nth-child(even) {
              margin-left: 20px;
            }
            &:nth-child(-n + 2) {
              margin-top: 0;
            }
          }

          width: 95%;
          height: 133px;
          overflow: hidden;
          -webkit-box-shadow: inset 2px 6px 10px #444444;
          -moz-box-shadow: inset 2px 6px 10px #444444;
          -webkit-box-shadow: 2px 6px 10px rgba(68, 68, 68, 0.2);
          -moz-box-shadow: 2px 6px 10px rgba(68, 68, 68, 0.2);
          box-shadow: 2px 6px 10px rgba(68, 68, 68, 0.2);
          .border_radius(@br: 10px);
          background-color: #ffffff;
          text-align: center;

          margin-top: 20px;
          &:first-child {
            margin-top: 0;
          }

          padding: 20px;
          .box_sizing;

          .mini_tesk_top {
            width: 100%;
            height: 30px;
            line-height: 30px;
            .mini_tesk_finish {
              .self_checked(@pxone: 20px, @color: #666666);
              height: 30px;
              line-height: 30px;
            }

            .mini_tesk_head {
              .dis-in-bl;
              width: 30px;
              height: 30px;
              .border_radius(@br: 50%);
              background-color: @line;
              img {
                .dis-in-bl;
                width: 100%;
                height: 100%;
                .border_radius(@br: 50%);
                border: 0 solid #ffffff;
              }
            }
          }

          .mini_tesk_content {
            padding-top: 10px;
            .box_sizing;
            line-height: 1.5;
            text-align: left;
            max-height: 55px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            word-wrap: break-word;
          }
        }

        .selected_border {
          -webkit-box-shadow: inset 2px 6px 10px #4574df;
          -moz-box-shadow: inset 2px 6px 10px #4574df;
          -webkit-box-shadow: 2px 6px 15px rgba(69, 116, 223, 0.4);
          -moz-box-shadow: 2px 6px 15px rgba(69, 116, 223, 0.4);
          box-shadow: 2px 6px 15px rgba(69, 116, 223, 0.4);
        }
      }
    }
  }

  .avatar-uploader {
    width: 100px;
    height: 100px;
    padding: 0 10px 10px 0;
    .box_sizing;
  }
  .avatar-uploader .el-upload {
    .dis-in-bl;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .box_sizing;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 80px;
    color: #ebebeb;
    width: 98px;
    height: 98px;
    .box_sizing;
    line-height: 98px;
    text-align: center;
  }

  .finished_tesk {
    color: @grayNight;
  }

  .opacity_ban {
    opacity: 0.5;
  }

  .allFinished_tesk {
    color: @grayNight;
    .lines {
      text-decoration: line-through;
    }
  }
}
</style>
