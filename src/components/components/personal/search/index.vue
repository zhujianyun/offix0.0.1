<template>
  <div class="searchList">
    <div class="searchBox" v-if="searchShow">
      <div class="triangle cur"></div>
      <input type="search" class="searchinput" placeholder="请输入搜索内容" v-model="searchText">
    </div>
    <div class="searchContent">
      <div class="searchNum">共计：<span>{{activeName === 'first' ? teskCount : fileCount}}</span>条</div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="任务" name="first">
          <ul class="taskList" :class="{'finished_tesk': item.State, 'allFinished_tesk': item.TaskState}" v-for="(item,index) in teskList" :key="index" @click="getTaskList(item)">
            <li class="checked" @click="stops">
              <el-checkbox v-show="item.show" v-model="item.State" :checked="item.State" :disabled="item.disabled" @change="finishChange(item)"></el-checkbox>
            </li>
            <li><img :src="item.Pic" alt="" class="user"></li>
            <li class="taskContent lines">{{item.Content}}</li>
            <li>
              <i class="el-icon-date lines"></i>
              <span class="lines">{{item.StartTime}} - {{item.EndTime}}</span>
            </li>
            <ul class="clearfix titleLists">
              <li class="title lines" v-for="(title,index) in item.Ccategorys" :key="index">{{title.Title}}</li>
            </ul>
            <li class="lines">{{item.size}}</li>
          </ul>
          <p class="nodata_img" v-if="!teskList.length && searchText">没有符合条件的结果!</p>
          <p class="nodata_img" v-if="!teskList.length && !searchText"><img src="../../../assets/img/noData.png" alt=""></p>


        </el-tab-pane>
        <el-pagination
          v-show="activeName === 'first' && teskCount > 10"
          small
          background
          layout="prev, pager, next"
          @current-change="taskCurrentChange"
          :page-size="10"
          :total="teskCount">
        </el-pagination>

        <el-tab-pane label="文件" name="second">
          <ul class="labelList" v-for="(file,index) in fileList" :key="index">
            <li><img class="user" :src="file.UserImage" alt=""></li>
            <li>{{file.CreateTime}}</li>
            <li class="typeImg">
              <img class="typeOne" v-if="file.FileTypeNum === 1" :src="file.Url">
              <img class="typeTwo" v-else-if="file.FileTypeNum === 2" src="../../../assets/img/2.png">
              <img class="typeTwo" v-else-if="file.FileTypeNum === 3" src="../../../assets/img/3.png">
              <img class="typeTwo" v-else-if="file.FileTypeNum === 4" src="../../../assets/img/4.png">
              <img class="typeTwo" v-else-if="file.FileTypeNum === 5" src="../../../assets/img/5.png">
              <img class="typeTwo" v-else-if="file.FileTypeNum === 6" src="../../../assets/img/6.png">
              <img class="typeTwo" v-else-if="file.FileTypeNum === 7" src="../../../assets/img/7.png">
              <img class="typeTwo" v-else-if="file.FileTypeNum === 8" src="../../../assets/img/8.png">
              <img class="typeTwo" v-else-if="file.FileTypeNum === 9" src="../../../assets/img/9.png">
              <img class="typeTwo" v-else-if="file.FileTypeNum === 10" src="../../../assets/img/10.png">
              <img class="typeTwo" v-else-if="file.FileTypeNum === 0" src="../../../assets/img/0.png">
            </li>
            <li>
              <span class="contents">{{file.Title}}</span>
              <span class="contents"> .{{file.FileType}}</span>
              <span class="contents">{{file.Size}}kb</span>
            </li>
            <li><i class="el-icon-rank" @click="getDetail(file)"></i></li>
            <li><a :href="file.Url" class="el-icon-download" :download="file.Title+file.FileType"></a></li>
          </ul>
          <p class="nodata_img" v-if="!fileList.length && searchText">没有符合条件的结果!</p>
          <p class="nodata_img" v-if="!fileList.length && !searchText"><img src="../../../assets/img/noData.png" alt=""></p>
        </el-tab-pane>
        <el-pagination
          v-show="activeName === 'second' && fileCount > 10"
          small
          background
          layout="prev, pager, next"
          @current-change="fileCurrentChange"
          :page-size="10"
          :total="fileCount">
        </el-pagination>
      </el-tabs>
    </div>
    <div class="card_pop" v-if="getDetailFlag" @click="getDetailFlag = false">
      <i class="close el-icon-error" @click="getDetailFlag = false"></i>
      <div class="seaech_card" @click="stops">
        <tesk-card ref="searchCard" @cardFinishChange="cardFinishChange" @cardAddStaff="cardAddStaff"></tesk-card>
      </div>
    </div>
  </div>
</template>
<script>
  import teskCard from '../../common/teskCard';

  export default {
    components: {
      teskCard,
    },
    data() {
      return {
        getDetailFlag: false,
        activeName: 'first',
        fileList: [],
        teskList: [],
        searchText: '',
        fileCount: 0,
        teskCount: 0,
        userPkid: '',
        searchShow: true,
      }
    },
    watch: {
      searchText(val) {
        this.searchInput();
      }
    },
    methods: {
      // 阻止冒泡
      stops(e) {
        if(e&&e.stopPropagation){
          e.stopPropagation()
        }else if(window.event){
          window.event.cancelBubble=true;
        }
      },

      taskCurrentChange(val) {
        this.userPkid = JSON.parse(localStorage.getItem('staffInfo')).Pkid;
        let datas = {'key': this.searchText, 'userId': this.userPkid, 'page': val, 'number': 10};
        this.$HTTP('post', '/SearchArticle', datas).then(res => {
          this.teskList = res.result;
          // console.log(this.teskList);
          this.teskCount = res.Count*1;
          for (let title of this.teskList) {
            title.Ccategorys = JSON.parse(title.Ccategorys);
          }
          console.log(this.tastTotalNumber);
        })
      },
      fileCurrentChange(val) {
        let data = {'key': this.searchText, 'userId': this.userPkid, 'page': val, 'number': 10};
        this.$HTTP('post', '/SearchFile', data).then(res => {
          this.fileList = res.result;
          // console.log(this.fileList);
          this.fileCount = res.Count*1;
          let type = this.fileList.FileType;
          this.fileList.map(ele => {
            return ele.FileTypeNum = this.getFlieTyle(ele.FileType);
          });
        });
      },
      searchInput() {
        if (this.searchText == '') {
          this.teskList = [];
          this.fileList = [];
          this.teskCount = this.fileCount = 0;
          return false;
        }
        if (this.searchText !== '') {
          let data = {'key': this.searchText, 'userId': this.userPkid, 'page': 1, 'number': 10};
          this.$HTTP('post', '/SearchFile', data).then(res => {
            this.fileList = res.result;
            // console.log(this.fileList);
            this.fileCount = res.Count*1;
            let type = this.fileList.FileType;
            this.fileList.map(ele => {
              return ele.FileTypeNum = this.getFlieTyle(ele.FileType);
            });
          });

          let datas = {'key': this.searchText, 'userId': this.userPkid, 'page': 1, 'number': 10};
          this.$HTTP('post', '/SearchArticle', datas).then(res => {
            this.teskList = res.result;
            // console.log(this.teskList);
            this.teskCount = res.Count*1;
            for (let title of this.teskList) {
              title.Ccategorys = JSON.parse(title.Ccategorys);
            }
            this.powerJudge(this.teskList);
          })
        }
      },
      getTaskList(item) {
        this.getDetailFlag = true;
        this.$nextTick(() => {
          this.$refs.searchCard.getCardDetail(item.Pkid);
        });
      },
      getFlieTyle(surffix) {
        if (surffix === 'png' || surffix === 'jpeg' || surffix === 'jpg' || surffix === 'gif' || surffix === 'bmp') {
          return 1;
        } else if (surffix === 'doc' || surffix === 'docx') {
          return 2; // 文档
        } else if (surffix === 'xls' || surffix === 'xlsx') {
          return 3; // 表格
        } else if (surffix === 'psd') {
          return 4; // PS
        } else if (surffix === 'ppt' || surffix === 'pptx') {
          return 5; // ppt
        } else if (surffix === 'pdf') {
          return 6; // pdf
        } else if (surffix === 'mp3' || surffix === 'wma' || surffix === 'wav' || surffix === 'ogg' || surffix === 'ra') {
          return 7; // 音频
        } else if (surffix === 'wmv' || surffix === 'avi' || surffix === 'mpg' || surffix === 'rmvb' || surffix === 'mp4') {
          return 8; //视频
        } else if (surffix === 'zip' || surffix === 'rar') {
          return 9; // 压缩包
        } else if (surffix === 'ai') {
          return 10; // ai
        } else {
          return 0; // 其他
        }
      },

      getDetail(file) {
        this.getDetailFlag = true;
        this.$nextTick(() => {
          this.$refs.searchCard.getCardDetail(file.ArticlePkid);
        });
      },

      // 阻止事件冒泡
      stops(e) {
        if(e && e.stopPropagation) {
          e.stopPropagation();
        }else if(window.event) {
          window.event.cancelBubble = true;
        }

      },

      // 点击是否完成
      finishChange(every) {
        let obj = {coordinationPkid: every.coordinationPkid, state: every.State};

        this.$HTTP('post', '/UpdateCoordinationUser', obj).then( res => {
          this.$message.success('任务完成状态更改成功');
          this.teskList = this.teskList.concat();
        }).catch( err => {
          this.$message.error('任务完成状态更改失败');
          console.log(err);
        });
      },

      // 卡片详情是否完成change
      cardFinishChange(obj) {
        let data = JSON.parse(obj);
        let indexs = this.teskList.findIndex( ele => {
          return data.teskId === ele.Pkid;
        });
        if(indexs !== -1) {
          this.teskList[indexs].State = data.State;
        }
        this.teskList = this.teskList.concat();
      },

      // 任务权限判断
      powerJudge(list) {
        for(let ele of list) {
          if(ele.UserPkids) {

            let oks = ele.UserPkids.split(',').find( index => {
              return index === this.userPkid;
            });
            if(oks) {
              this.$set(ele, 'disabled', false);
            }else {
              this.$set(ele, 'disabled', true);
            }
            if(ele.CreatorId.toString() === this.userPkid && !oks) {
              this.$set(ele, 'show', false);
            }else {
              this.$set(ele, 'show', true);

            }
          }else {
            ele.UserPkids = ele.CreatorId.toString();
            if(ele.UserPkids === this.userPkid) {
              this.$set(ele, 'disabled', false);
            }else {
              this.$set(ele, 'disabled', true);
            }
            this.$set(ele, 'show', true);
          }
        }
      },

      // 子组件添加协助人员
      cardAddStaff(obj) {
        let data = JSON.parse(obj);
        let indexs = this.teskList.findIndex( ele => {
          return ele.Pkid === data.teskId;
        });
        if(indexs !== -1) {
          if(this.teskList[indexs].UserPkids) {
            this.teskList[indexs].UserPkids += ',' + data.addId;
          }else {
            this.teskList[indexs].UserPkids = data.addId;
          }
          let haves = this.teskList[indexs].UserPkids.indexOf(this.userPkid);

          if(haves !== -1 && !this.teskList[indexs].show) {
            this.teskList[indexs].show = true;
          }
          this.teskList = this.teskList.concat();

        }

      },
    },
    created() {
      this.userPkid = JSON.parse(localStorage.getItem('staffInfo')).Pkid.toString();

      localStorage.setItem("searchShow", this.searchShow);
      this.$emit("searchShow", this.searchShow);//$emit
    }
  }
</script>
<style lang="less">
  @import '../../../assets/css/base.less';
  @import '../../../assets/css/media.less';

  .searchList {
    position: relative;
    height: 100%;
    width: 100%;
    .searchBox {
      z-index: 999;
      position: absolute;
      width: 100%;
      .triangle {
        position: absolute;
        width: 0;
        top: -28px;
        right: 131px;
        height: 0;
        z-index: 666;
        border: 14px solid #000;
        border-color: transparent transparent #4574DF transparent;
      }

      ::-webkit-input-placeholder { /* WebKit browsers */
        color: #ffffff;
      }
      :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #ffffff;
      }
      ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #ffffff;
      }
      :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #ffffff;
      }
    }

    .card_pop {
      width: 100%;
      height: 100%;
      background-color: rgba(211, 211, 211, 0.3);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;

      .close {
        font-size: 50px;
        position: absolute;
        top: 160px;
        right: 100px;
        cursor: pointer;
        color: @hoveBlue;
      }

      .seaech_card {
        width: 800px;
        height: 500px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -400px;
        margin-top: -250px;
      }
    }
    .searchNum {
      position: absolute;
      right: 100px;
      top: 90px;
    }
    .searchinput {
      position: relative;
      width: 100%;
      height: 50px;
      top: 0;
      padding: 15px 100px;
      color: white;
      /*border: 1px solid rgba(69, 131, 240, 1);*/
      /*border-radius: 6px;*/
      background: #4574DF;
    }


    .el-tabs {
      width: 100%;
      height: 100%;
      .nodata_img {
        text-align: center;
        padding-top: 100px;
        font-size: 24px;
        color: @grayNight;
      }
      el-tabs__nav {
        div {
          margin-right: 15px;
        }
      }
      .el-tabs__content {
        width: 100%;
        height: calc(~ '100% - 40px');

        .el-tab-pane {
          max-height: calc(~ '100% - 30px');
          overflow: auto;
          margin-bottom: 4px;

        }


      }
      .el-tabs__active-bar {
        background-color: transparent;
        display: none;
      }
      .el-tabs__nav-wrap::after {
        background-color: transparent;
      }
      .el-tabs__item.is-active {
        color: #333333;
        font-size: 30px;
        padding: 0;
        box-shadow: none;
      }
      .el-tabs__item {
        font-size: 18px;
        color: #666666;
        padding: 0;
      }
      .el-tabs__item:focus.is-active.is-focus:not(:active) {
        box-shadow: none;
      }
      .el-tabs__item:hover {
        cursor: pointer;
        color: #666666;
      }
      #tab-first {
        height: 100%;
        margin-right: 15px;
      }
      .el-tabs__header {
        padding: 0;
        margin: 0;
      }
    }

    .searchContent {
      width: 100%;
      height: 100%;
      padding: 70px 100px;
      .box_sizing;
      position: relative;
      .el-pagination {
        position: absolute;
        right: 0;
      }
    }

    .nav {
      ul {
        li {
          float: left;
          cursor: pointer;
          margin-right: 20px;
        }
      }
    }

    .labelList {
      width: 100%;
      height: 45px;
      background: #ffffff;
      border-radius: 6px;
      padding: 7px 20px;
      box-sizing: border-box;
      margin-top: 6px;

      li {
        float: left;
        margin-right: 20px;
        line-height: 30px;
        vertical-align: middle;
        .user {
          display: inline-block;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .fileType {
          width: 26px;
          height: 30px;
          display: inline-block;
        }
        .contents {
          width: 10px;
          height: 10px;
          margin-bottom: 18px;
        }
      }
      .typeImg {
        img {
          width: 26px;
          height: 30px;
        }
      }
      .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background: none;
        border-color: #666666;
      }
      .el-checkbox__inner {
        width: 20px;
        height: 20px;
      }

      .el-checkbox__inner::after {
        box-sizing: content-box;
        content: "";
        border: 1px solid #999999;
        border-left: 0;
        border-top: 0;
        position: absolute;
        top: 1px;
        height: 11px;
        left: 7px;
      }
    }

    .taskList {
      width: 100%;
      height: 45px;
      background: #ffffff;
      border-radius: 6px;
      padding: 7px 20px;
      box-sizing: border-box;
      margin-top: 6px;
      cursor: pointer;
      li {
        float: left;
        margin-right: 20px;
        line-height: 30px;
        vertical-align: middle;
        .user {
          display: inline-block;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
      .checked {
        width: 20px;
        height: 30px;
      }
      .taskContent {
        max-width: 335px;
        height: 30px;
        overflow: hidden;
      }
      .title {
        height: 20px;
        border: 1px solid #68C58F;
        line-height: 20px;
        border-radius: 10px;
        padding: 0 5px;
        font-size: 12px;
        box-sizing: border-box;
        margin-top: 5px;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background: none;
        border-color: #666666;
      }
      .el-checkbox__inner {
        width: 20px;
        height: 20px;
      }

      .el-checkbox__inner::after {
        box-sizing: content-box;
        content: "";
        border: 1px solid #999999;
        border-left: 0;
        border-top: 0;
        position: absolute;
        top: 1px;
        height: 11px;
        left: 7px;
      }
      .titleLists {
        float: left;
        max-width: 170px;
        overflow: hidden;
        height: 30px;
        li {
          margin-right: 5px;
        }
      }
    }

    .finished_tesk {
      li {
        opacity: 0.5;

      }
    }

    .allFinished_tesk {
      li {
        opacity: 0.5;
      }
      .lines {
        text-decoration: line-through;
      }
    }

  }

</style>
