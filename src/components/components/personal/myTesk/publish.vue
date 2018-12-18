<template>
  <div>
    <div class="popup popup_publish">
      <i class="el-icon-error" @click="close"></i>
      <div class="three">
        敬请期待
      </div>

      <!-- 发布汇报 -->
      <div class="popup_two" @click="switchCardTwo" :class="switchStyleOne">
        <h1>发布汇报</h1>
        <div class="big_box">
          <span class="clickInput" v-show="two_inptuShow" @click="two_InptuShow">请输入汇报描述内容</span>
          <textarea class="temporary_input" id="twoTemporary_input" maxlength="140" v-model="reportContent" type="text"
                    placeholder="请输入汇报描述内容">
          </textarea>
          <span class="word_number">{{reportNum}}/{{allNumber}}</span>
          <div class="two_upload_files">
            <div class="two_upload_Box">
              <ul class="uploadImg">
                <li v-for="(item,index) in twoimgList" :key="index">
                  <i class="el-icon-delete" @click="twoImg(item,index)"></i>
                  <img class="typeOne" v-if="item.FileTypeNum === 1" :src="item.url">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 2" src="../../../assets/img/2.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 3" src="../../../assets/img/3.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 4" src="../../../assets/img/4.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 5" src="../../../assets/img/5.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 6" src="../../../assets/img/6.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 7" src="../../../assets/img/7.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 8" src="../../../assets/img/8.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 9" src="../../../assets/img/9.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 10" src="../../../assets/img/10.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 0" src="../../../assets/img/0.png">
                  <div class="fileName">{{item.name}}</div>
                </li>
              </ul>
              <el-upload
                class=""
                :action="'/File.ashx?publisher='+userPkid+'&informationType=coll'"
                :show-file-list="false"
                :multiple="true"
                :on-success="twoHandleAvatarSuccess"
                :on-progress="uploadProgress"
                :limit="9"
                :on-exceed="handleExceed"
                :before-upload="twoBeforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i class="el-icon-plus"></i>
              </el-upload>

            </div>
          </div>
          <div class="two_label_box">
            <div class="two_addTag" @click="two_clicklabel" v-show="two_addTagshow">点击区域内空白处添加标签</div>
            <div class="" style="height: 100%" v-show="two_jListShow">
              <ul class="labelBox clearfix">
                <li class="jList fl" v-for="(twoTop,index) in two_addTopicList" :key="index"
                    @mouseenter="delIconShow=!delIconShow">{{twoTop.Title}}
                  <transition name="el-fade-in-linear">
                    <i class="el-icon-circle-close-outline" @click="two_delTopic(twoTop,index)"
                       v-show="delIconShow"></i>
                  </transition>
                </li>
              </ul>
              <span class="j_box_big">
               <i class="el-icon-circle-plus-outline" @click.stop="two_jShowList()"></i>
               <ul class="j_ul" v-show="twoJshow">
                 <li class="j_top">
                      <input type="text" placeholder="搜索标签" class="twosearch" v-model="searchTop"
                             @focus="searchFlag = true" @keyup="two_searchTopic(topicCList)">
                 </li>
                 <div class="j_bottom">
                    <li v-for="(list, index) in TwotopicList" :key="index" @click="two_addJid(list,index)"
                        class="two_topicListShow">
                      <span class="two_jIconShow">{{list.Title}}</span>
                      <el-checkbox v-model="list.checked" class="fr" @change="two_addJid(list,index)"></el-checkbox>
                    </li>
                 </div>
                 <li>
                   <button @click="two_newTopic">创建</button>
                 </li>
               </ul>
             </span>
            </div>
          </div>

        </div>
        <button class="main_button_bg fr" type="button" @click="ReleaseReport">提交</button>
      </div>
      <!--发布任务卡片-->
      <div class="popup_one" @click="switchCardOne" :class="switchStyleTwo">
        <h1>发布任务</h1>
        <div class="big_box">
          <div class="top_box">
            <div class="setTime">
              <div class="block">
                <el-date-picker
                  v-model="setTime"
                  format="MM月dd日 HH:mm"
                  type="datetimerange"
                  align="right"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </div>
            </div>

            <div class="setAT">
              <span class="initialState" @click="clickAt" v-show="addshow">点击添加任务协作人</span>
              <div class="personnelBox" v-show="AtButtonShow">
                <div class="AtLabel">
                  <ul class="chosePerson">
                    <li class="at_who fl" v-for="(at ,index) in AtLists" :key="index">
                      <img :src="at.Images" alt="">
                      <el-tooltip class="item" effect="dark" :content=at.Realname placement="top">
                        <i class="el-icon-close" @click="delAdPerson(at,index)"></i>
                      </el-tooltip>
                    </li>
                  </ul>

                  <div class="at_box_big">
                    <i class="el-icon-circle-plus-outline" @click.stop="atShowList()" id="atIcon"> </i>
                    <span class="personNumber">{{atnum}}人</span>
                    <ul class="at_ul" v-show="atShow">
                      <div class="at_top">
                        <input type="text" placeholder="搜索成员" class="search" v-model="searchText"
                               @keyup="searchAtTopic(atCList)" id="searchPerson">
                      </div>
                      <div class="at_bottom">
                        <!--<li><i class="el-icon-service"></i>所有成员</li>-->
                        <li v-for="(list, index) in atList" :key="index" @click="addAtId(list)" id="atPersonShow">
                          <span><img :src="list.Images" alt="" class="atImage"></span>
                          <span class="realname">{{list.Realname}}</span>
                          <el-checkbox v-model="list.checked" @change="addAtId(list)"></el-checkbox>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
                <!--...........................................................-->
              </div>
            </div>
          </div>
          <div class="middle_box clearfix">
            <span class="clickInput" v-show="inptuShow" @click="inptushow">点击输入工作任务描述</span>
            <textarea type="text" class="temporary_input" id="temporary_input" maxlength="140" v-model="content"
                      placeholder="请输入工作任务描述"
                      :allNumber="allNumber"></textarea>
            <span class="word_number">{{nowByte}}/{{allNumber}}</span>
            <!--上传图片-->
            <div class="upload_Box">
              <ul class="uploadImg">
                <li v-for="(item,index) in uploadList" :key="index">
                  <i class="el-icon-delete" @click="delImg(item,index)"></i>
                  <img class="typeOne" v-if="item.FileTypeNum === 1" :src="item.url">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 2" src="../../../assets/img/2.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 3" src="../../../assets/img/3.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 4" src="../../../assets/img/4.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 5" src="../../../assets/img/5.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 6" src="../../../assets/img/6.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 7" src="../../../assets/img/7.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 8" src="../../../assets/img/8.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 9" src="../../../assets/img/9.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 10" src="../../../assets/img/10.png">
                  <img class="typeTwo" v-else-if="item.FileTypeNum === 0" src="../../../assets/img/0.png">
                  <div class="fileName">{{item.name}}</div>
                </li>
              </ul>
              <el-upload
                class=""
                :action="'/File.ashx?publisher='+userPkid+'&informationType=Pub'"
                :show-file-list="false"
                :multiple="true"
                :on-success="uploadSuccess"
                :on-progress="uploadProgress"
                :limit="9"
                :on-exceed="handleExceed"
                :before-upload="beforeUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>

          <div class="label_box">
            <div class="addTag" @click="clicklabel" v-show="addTagshow">点击添加标签</div>
            <div class="" style="height: 100%" v-show="jListShow">
              <ul class="labelBox clearfix">
                <li class="jList fl" v-for="(addj,index) in addTopicList" :key="index"
                    @mouseenter="delIconShow=!delIconShow">{{addj.Title}}
                  <transition name="el-fade-in-linear">
                    <i class="el-icon-circle-close-outline" @click="delTopic(addj,index)" v-show="delIconShow"></i>
                  </transition>
                </li>
              </ul>
              <span class="j_box_big">
               <i class="el-icon-circle-plus-outline" @click.stop="jShowList()"></i>
               <ul class="j_ul" v-show="jShow">
                 <li class="j_top">
                      <input type="text" placeholder="搜索标签" class="search" v-model="searchTop"
                             @focus="searchFlag = true" @keyup="searchTopic(twotopicCList)" id="searchTop">
                 </li>
                 <div class="j_bottom">
                    <li v-for="(list, index) in topicList" :key="index" @click="addJid(list,index)" class="topicListShow">
                      <span class="jIconShow">{{list.Title}}</span>
                      <el-checkbox v-model="list.checked" class="fr" @change="addJid(list,index)"></el-checkbox>
                    </li>
                 </div>
                 <li>
                   <button @click="newTopic" class="newTopic">创建</button>
                 </li>
               </ul>
             </span>
            </div>
          </div>
          <!--<p class="fl">2222</p>-->
          <button class="main_button_bg fr" type="button" @click="present">发布</button>
        </div>
      </div>
    </div>

    <!-- 上传进度 -->
    <uploadProgress v-if="uploadProgressFlag" :fileProgressList="fileProgressList" @closeProgress="closeProgress"></uploadProgress>
  </div>
</template>
<script>
  import form from '../../../api/form';
  import uploadProgress from '../../common/uploadProgress';

  export default {
    components: {
      uploadProgress,
    },
    data() {
      return {
        switchStyleOne: '',
        switchStyleTwo: '',
        userPkid: '', //用户pkid
        setTime: [new Date(), new Date()],
        delIconShow: false,
        startTime: '',
        endTime: '',
        inptuShow: true,//输入框遮罩
        two_inptuShow: true, //发布汇报输入框遮罩
        two_jListShow: false,
        two_addTagshow: true,
//@人员列表
        atList: [],
        atCList: [], // 数据列表@数据列表
        searchText: '', //@搜索内容
        searchTop: '',
        atShow: true,
        AtButtonShow: false, //显示添加人员
        AtLists: [],
        atnum: '0',
//        点击span 人员显示
        addshow: true,
        userpkids: [], //协助人 pkid
//        输入任务内容
        content: '',
        allNumber: 140,
        nowByte: 0,
        reportContent: '',  //汇报内容
        reportNum: 0,       //汇报字数
        size: 0,
//      标签
        jShow: false,
        twoJshow: false,
        topicList: [],
        topicCList: [],
        TwotopicList:[],
        twotopicCList:[],
        copytopicList: [],
        addTopicList: [],
        two_addTopicList: [],
        addTagshow: true,
        jListShow: false,
        categorypkids: [],//  话题标签id
        two_categorypkids: [],
        imageUrl: '',
        imgPkid: [],
//        发布汇报
        reportPic: [],
        twoimgList: [],
        uploadList: [],
        fileTypeImg: [
          {
            src: require("../../../assets/img/icon2/2.png")
          }, {
            src: require("../../../assets/img/icon2/3.png")
          }, {
            src: require("../../../assets/img/icon2/4.png")
          }, {
            src: require("../../../assets/img/icon2/5.png")
          }, {
            src: require("../../../assets/img/icon2/6.png")
          }, {
            src: require("../../../assets/img/icon2/7.png")
          }, {
            src: require("../../../assets/img/icon2/8.png")
          }, {
            src: require("../../../assets/img/icon2/9.png")
          }, {
            src: require("../../../assets/img/icon2/10.png")
          }, {
            src: require("../../../assets/img/icon2/0.png")
          },
        ], // 文件类型图片
        uploadProgressFlag: false, // 上传进度显示隐藏
        fileProgressList: [], // 上传进度列表
      }
    },
    watch: {
//      发布任务字数显示
      content(val) {
        this.nowByte = val.length;
      },
//      发布汇报字数显示
      reportContent(val) {
        this.reportNum = val.length;
      },

    },
    methods: {

      // 关闭文件上传视图
      closeProgress() {
        this.uploadProgressFlag = false;
        this.fileProgressList = [];
      },

      popFileProgress(list) {
        let indexs = list.findIndex( ele => {
          return ele.progress < 100;
        });
        if(indexs == -1) {
          return true;
        }else {
          return false;
        }

      },


//    發佈任務發佈匯報頁面切換
      switchCardOne() {
        this.switchStyleOne = "two";
        this.switchStyleTwo = "one";
      },
      switchCardTwo() {
        this.switchStyleOne = "one";
        this.switchStyleTwo = "two";
      },
//      发布任务 事件++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      clickAt() {
        this.addshow = false;
        this.AtButtonShow = true;
        this.atShow = true;
      },
      clicklabel() {
        this.addTagshow = false;
        this.jShow = true;
        this.jListShow = true;
      },
      two_clicklabel() {
        this.two_addTagshow = false;
        this.twoJshow = true;
        this.two_jListShow = true;
      },
//      获取@人员列表
      getAtlist() {
        let obj = {pkid: 1, userID: 0, number: 0};
        this.$HTTP('get', '/GetUserListByPkid', obj).then(res => {
          this.atList = res.result;
          this.atCList = [...this.atList];
          this.atCList.map(ele => {
            return ele.checked = false;
          });
          this.copyAtList = [...this.atList];
        }).catch(err => {
          console.log('获取员工列表失败', err);
        });
      },
//      获取话题列表
      getjList() {
        let obj = {Cpkid: 1, pkids: 0, number: 0};
        this.$HTTP('get', '/GetCategoryByPkid', obj).then(res => {
          this.topicList = res.result;
          this.topicCList = [...this.topicList];
          this.topicCList.map(ele => {
            return ele.checked = false;
          });
        }).catch(err => {
          console.log('获取话题列表失败', err);
        });
      },
      TwoGetjList() {
        let obj = {Cpkid: 1, pkids: 0, number: 0};
        this.$HTTP('get', '/GetCategoryByPkid', obj).then(res => {
          this.TwotopicList = res.result;
          this.twotopicCList = [...this.topicList];
          this.twotopicCList.map(ele => {
            return ele.checked = false;
          });
        }).catch(err => {
          console.log('获取话题列表失败', err);
        });
      },
      //  @搜索框
      searchAtTopic(atCList) {
        this.atList = atCList.filter(ele => {
          return ele.Realname.indexOf(this.searchText) >= 0;
        });
      },

      // #添加的搜索框
      searchTopic(topicCList) {
        this.topicList = topicCList.filter(ele => {
          return ele.Title.indexOf(this.searchTop) >= 0;
        });
      },
      two_searchTopic(twotopicCList) {
        this.TwotopicList = twotopicCList.filter(ele => {
          return ele.Title.indexOf(this.searchTop) >= 0;
        });
      },
      atShowList() {
        this.atShow = !this.atShow;
        this.jShow = false;
      },
//     发布任务 话题显示隐藏
      jShowList() {
        this.jShow = !this.jShow;
      },
      inptushow() {
        document.getElementById('temporary_input').focus();
        this.inptuShow = false;
      },
      two_InptuShow() {
        document.getElementById('twoTemporary_input').focus();
        this.two_inptuShow = false;
      },
//      发布汇报 话题显示隐藏
      two_jShowList() {
        this.twoJshow = !this.twoJshow;
      },


//       点击+ 添加协助人员
      addAtId(atVal) {
        let indexs = this.AtLists.findIndex(el => {
          return el.Pkid === atVal.Pkid;
        });
        if (indexs === -1) {
          this.AtLists.push(atVal);
          atVal.checked = true;
          this.userpkids.push(atVal.Pkid);
        } else {
          atVal.checked = false;
          this.AtLists.splice(indexs, 1);
          this.userpkids.splice(indexs, 1);
        }
        this.atnum = this.AtLists.length;
      },
//      点击x 删除协助人员
      delAdPerson(at, index) {
        at.checked = false;
        this.AtLists.splice(index, 1);
        this.userpkids.splice(index, 1);
        this.atnum = this.AtLists.length;
      },
//发布任务 添加标签
      addJid(jlist, index) {
        let indexs = this.addTopicList.findIndex(ele => {
          return ele.Title == jlist.Title;
        });
        if (indexs == -1) {
          this.addTopicList.push(jlist);
          jlist.checked = true;
          this.categorypkids.push(jlist.Pkid);
        } else {
          jlist.checked = false;
          this.addTopicList.splice(indexs, 1);
          this.categorypkids.splice(indexs, 1);
        }
      },
//      发布汇报 添加标签
      two_addJid(jlist, index) {
        let indexs = this.two_addTopicList.findIndex(ele => {
          return ele.Title == jlist.Title;
        });
        if (indexs == -1) {
          this.two_addTopicList.push(jlist);
          jlist.checked = true;
          this.two_categorypkids.push(jlist.Pkid);
        } else {
          jlist.checked = false;
          this.two_addTopicList.splice(indexs, 1);
          this.two_categorypkids.splice(indexs, 1);
        }
      },

//      创建新标签
      newTopic() {
        if (!this.searchTop) {
          this.$message.warning('请输入标签');
          return false;
        }
        let obj = {title: this.searchTop};
        this.$HTTP('post', '/SetCategory', obj).then(res => {
          this.searchText = "";
          this.getjList();
          console.log(this.searchText);
          this.$message.warning('创建新标签成功');
        });
      },
      two_newTopic() {
        if (!this.searchTop) {
          this.$message.warning('请输入标签');
          return false;
        }
        let obj = {title: this.searchTop};
        this.$HTTP('post', '/SetCategory', obj).then(res => {
          this.getjList();
          this.searchText = '';
          this.$message.warning('创建新标签成功');
        });
      },
//      删除话题标签
      delTopic(addj, index) {
        console.log(addj);
        addj.checked = false;
        this.addTopicList.splice(index, 1);
        this.categorypkids.splice(index, 1);
      },
      two_delTopic(twoTop, index) {
        console.log(twoTop);
        twoTop.checked = false;
        console.log(this.two_addTopicList);
        this.two_addTopicList.splice(index, 1);
        this.two_categorypkids.splice(index, 1)
      },

      // 文件上传超出提示
      handleExceed(files, fileList) {
        this.$message.warning('最多只能选择9个文件');
      },

      // 文件上传前
      beforeUpload(file) {
        if(!this.uploadProgressFlag) {
        this.uploadProgressFlag = true;
        }
        let sizes = this.conver(file.size);
        let FileTypeNum = this.getSuffix(file.name);
        FileTypeNum = this.getFlieTyle(FileTypeNum);
        let obj = {
          uid: file.uid,
          size: sizes,
          name: file.name,
          type: 2,
          progress: 0,
          status: false,
          FileTypeNum: FileTypeNum,
          imgUrl: '', 
        };
        this.fileProgressList.unshift(obj);
        let index = this.uploadList.findIndex(err => {
          return err.name == file.name;
        });
        if (index !== -1) {
          this.$message("文件重复");
          return false;
        }
      },

      // 文件上传中
      uploadProgress(event, file, fileList) {
        let percents = parseInt(event.percent);
        let ids = this.fileProgressList.findIndex(ele => {
          return ele.uid === file.uid;
        });

        if(ids !== -1) {
          this.fileProgressList[ids].progress = percents;
          if(!this.fileProgressList[ids].imgUrl && this.fileProgressList[ids].FileTypeNum == 1) {
            this.fileProgressList[ids].imgUrl = file.url;
          }
        }
      },

      // 文件上传成功
      uploadSuccess(res, file) {
        let type = file.name.split('.')[1];
        this.$set(file, 'FileTypeNum', this.getFlieTyle(type));
        this.uploadList.push(file);

        let ids = this.fileProgressList.findIndex(ele => {
          return ele.uid === file.uid;
        });

        if(ids !== -1) {
          this.fileProgressList[ids].status = true;
        }

        let returns = this.popFileProgress(this.fileProgressList);
        if(this.uploadProgressFlag && returns) {
          setTimeout( () => {
            this.closeProgress();
          }, 2000);
        }

    
      },


      twoHandleAvatarSuccess(res, file) {
        let type = file.name.split('.')[1];
        this.$set(file, 'FileTypeNum', this.getFlieTyle(type));
        this.twoimgList.push(file);

        
        let ids = this.fileProgressList.findIndex(ele => {
          return ele.uid === file.uid;
        });

        if(ids !== -1) {
          this.fileProgressList[ids].status = true;
        }

        let returns = this.popFileProgress(this.fileProgressList);
        if(this.uploadProgressFlag && returns) {
          setTimeout( () => {
            this.closeProgress();
          }, 2000);
        }
      },
      twoBeforeAvatarUpload(file) {
    
        if(!this.uploadProgressFlag) {
          this.uploadProgressFlag = true;
        }
        let sizes = this.conver(file.size);
        let FileTypeNum = this.getSuffix(file.name);
        FileTypeNum = this.getFlieTyle(FileTypeNum);
        let obj = {
          uid: file.uid,
          size: sizes,
          name: file.name,
          type: 2,
          progress: 0,
          status: false,
          FileTypeNum: FileTypeNum,
          imgUrl: '', 
        };
        this.fileProgressList.unshift(obj);
        let index = this.uploadList.findIndex(err => {
          return err.name == file.name;
        });
        if (index !== -1) {
          this.$message("文件重复");
          return false;
        }

        let index1 = this.twoimgList.findIndex(err => {
          return err.name == file.name;
        });
        if (index1 !== -1) {
          this.$message("文件重复");
          return false;
        }

      },
//      刪除圖片
      delImg(imgUrl, index) {
        this.uploadList.splice(index, 1);
      },
      twoImg(imgUrl, index) {
        this.twoimgList.splice(index, 1);
      },
//      判断文件类型
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
      onExceed() {
        this.$message("最多上传9个文件");
      },
//      点击提交
      present() {
//        1.设置时间节点
        this.startTime = this.setTime[0];
        if (!this.startTime) {
          this.$message('请设置时间');
          return
        }
        if (!this.content) {
          this.$message('请填写汇报内容');
          return
        }
        if (this.userpkids.length !== 0) {
          this.userpkids = this.userpkids.join(',');
        } else {
          this.$message('请选择协助人员');
          return
        }
        for (var i = 0; i < this.uploadList.length; i++) {
          this.imgPkid.push(this.uploadList[i].response);
        }
        if (this.imgPkid.length != 0) {
          this.imgPkid = this.imgPkid.join(',');
        } else {
          this.imgPkid = '';
        }
        //        上传文件不是必选项
        if (this.categorypkids && this.content && this.startTime) {
          this.categorypkids = this.categorypkids.join(',');
          this.endTime = this.setTime[1];
          let data = {
            'pkid': this.userPkid,
            'content': this.content,
            'pic': this.imgPkid, //this.pic
            'oldpic': "",
            'startTime': this.startTime,
            'endTime': this.endTime,
            'type': 1,
            'userpkids': this.userpkids,
            'categorypkids': this.categorypkids
          };
          this.$HTTP('post', '/SetArticle', data).then(res => {
            this.$message('发布任务成功');
            this.$router.push('/myTesk/myTeskList');
          }).catch(err => {
          })
        }
      },
      //      发布汇报事件++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      ReleaseReport() {
        for (let i = 0; i < this.twoimgList.length; i++) {
          this.reportPic.push(this.twoimgList[i].response);
        }
        if (this.reportPic) {
          this.reportPic = this.reportPic.join(',');
        }
        if (this.reportContent || this.pic) {
          if (this.two_categorypkids) {
            this.two_categorypkids = this.two_categorypkids.join(',');
          }
          let data = {
            'pkid': this.userPkid,
            'content': this.reportContent,
            'pic': this.reportPic, //发布汇报文件
            'oldpic': "",
            'type': 2,
            'userpkids': "",//没有协助人员
            'categorypkids': this.two_categorypkids
          };
          this.$HTTP('post', '/SetReportArticle', data).then(res => {
            this.$message('发布汇报成功');
            this.$router.push('/myTesk/myTeskList');
          })
        } else {
          this.$message('请输入发布内容');
          return;
        }
      },
      close() {
        this.$router.push('/myTesk/myTeskList');
      },

      // 默认时间
      defaultTime() {
        let times = new Date();
        this.setTime = [new Date(times.getFullYear(), times.getMonth(), times.getDate(), 8, 0), new Date(times.getFullYear(), times.getMonth(), times.getDate(), 23, 0)];
      }

    },
    created() {
      this.getAtlist(); // 获取@列表
      this.getjList(); //获取#列表
      this.TwoGetjList();
      this.userPkid = JSON.parse(localStorage.getItem('staffInfo')).Pkid;
      this.defaultTime();

//
      let body = document.querySelector('body');
      body.addEventListener('click', (e) => {
        if (e.target.className === 'topicListShow' || e.target.className === "addTag" || e.target.className === "jIconShow" || e.target.id === "searchTop" || e.target.className === "el-checkbox__inner" || e.target.className === "el-checkbox__original" || e.target.className === "newTopic") {
          return;
        } else {
          this.jShow = false;
        }
        if (e.target.id === "searchPerson" || e.target.id === "atPersonShow" || e.target.className === "realname" || e.target.className === "atImage" || e.target.className === "el-checkbox__inner" || e.target.className === "el-checkbox__original" || e.target.className === "initialState") {
          return;
        } else {
          this.atShow = false;
        }
        if (e.target.className === 'two_topicListShow' || e.target.className === "two_addTag" || e.target.className === "two_jIconShow" || e.target.className === "twosearch" || e.target.className === "el-checkbox__inner" || e.target.className === "el-checkbox__original" || e.target.className === "newTopic") {
          return;
        } else {
          this.twoJshow = false;
        }
      }, false);
    }
  }
</script>

<style lang="less">
  @import '../../../assets/css/base.less';
  @import '../../../assets/css/media.less';

  @linecolor: #4574DF;
  .popup_publish {
    z-index: 1000;
    background: -webkit-linear-gradient(left, #6535D4, #4583F0); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #6535D4, #4583F0); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #6535D4, #4583F0); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #6535D4, #4583F0); /* 标准的语法 */
    border-radius: 2px;
    .el-icon-error {
      top: 123px;
      right:100px;
      font-size: 50px;
      color: white;
      position: absolute;
    }
    /*默认发布任务卡片样式设置*/
    .popup_one {
      position: relative;
      padding: 0 30px;
      width: 830px;
      height: 400px;
      /*position: absolute;*/
      top: 50%;
      left: 50%;
      margin-left: -416px;
      margin-top: -200px;
      border-radius: 10px;
      background: #ffffff;
      box-sizing: border-box;
      z-index: 999;
      .one_title {
        position: relative;
        width: 100%;
        text-align: center;
        margin-top: 5px;
      }
      h1 {
        text-align: center;
        font-size: 30px;
        color: rgba(51, 51, 51, 1);
        line-height: 70px;
      }
      .big_box {
        height: 255px;
        border: 1px solid rgba(220, 220, 220, 1);
        border-radius: 10px;
        .top_box {
          height: 55px;
          border-bottom: 1px solid rgba(220, 220, 220, 1);
          .setTime {
            width: 269px;
            height: 100%;
            border-right: 1px solid rgba(220, 220, 220, 1);
            float: left;
            .el-date-editor .el-range-input {
              font-size: 13px;
              width: 50%;
            }
            .el-input__icon {
              display: none;
            }
            .el-date-editor {
              width: 100%;
              /*line-height: 55px;*/
              height: 55px;
              border-radius: 10px;
              border: none;
              background: none;
              .el-range-separator {
                line-height: 50px;
                padding: 0;
              }
              .el-input__inner {
                border: none;
              }
            }
          }
          .setAT {
            width: 498px;
            height: 100%;
            float: left;
            line-height: 55px;
            cursor: pointer;
            color: rgba(153, 153, 153, 1);
            .initialState {
              display: inline-block;
              width: 100%;
              text-align: center;
            }
            .AtLabel {
              box-sizing: border-box;
              height: 55px;
              position: relative;
              .chosePerson {
                width: 495px;
                height: 100%;
                padding: 10px 50px 0 10px;
                overflow: auto;
                box-sizing: border-box;
                .pages {
                  float: right;
                  height: 100%;
                }
              }
              .at_who {
                position: relative;
                margin-right: 10px;
                margin-bottom: 5px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                img {
                  .border_radius(@br: 50%);
                  width: 30px;
                  height: 30px;
                }
                .el-icon-close {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 30px;
                  height: 30px;
                  background: #333333;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 30px;
                  opacity: 0;
                }
              }
              .at_who:hover {
                .el-icon-close {
                  opacity: 0.7;
                }
              }
              .at_box_big {
                position: absolute;
                top: 20px;
                right: 10px;
                width: 50px;
                height: 20px;
                .el-icon-circle-plus-outline {
                  font-size: 18px;
                  color: @linecolor;
                  position: absolute;
                  top: 0;
                  left: 0;
                }
                .personNumber {
                  position: absolute;
                  top: 0;
                  right: 0;
                  height: 18px;
                  line-height: 18px;
                }
                .at_ul {
                  top: 15px;
                  left: 10px;
                  width: 207px;
                  height: 217px;
                  background: rgba(255, 255, 255, 1);
                  border-radius: 6px;
                  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
                  position: absolute;
                  z-index: 1000;
                  .at_top {
                    height: 30px;
                    line-height: 30px;
                    padding-left: 20px;
                    border-bottom: 1px solid rgba(220, 220, 220, 1);
                  }
                  .at_bottom {
                    height: 184px;
                    overflow: auto;
                    li {
                      height: 30px;
                      line-height: 30px;
                      padding: 0 20px;
                      box-sizing: border-box;
                      .realname {
                        margin-left: 10px;
                      }
                      .el-checkbox {
                        float: right;
                      }
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
                    li:hover {
                      background: rgba(242, 243, 249, 1);
                    }
                    img {
                      vertical-align: middle;
                      display: inline-block;
                      width: 24px;
                      height: 24px;
                      .border_radius(@br: 50%);
                    }
                  }
                }
              }
            }
            .personnelBox {
              box-sizing: border-box;
              .addIcon {
                margin-left: 100px;;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                display: inline-block;
                border: 1px solid @linecolor;
                color: @linecolor;
                font-size: 18px;
                text-align: center;
                line-height: 19px;
                position: absolute;
              }
              .addList {
                background: pink;
                position: relative;
                bottom: 0;
                left: 20px;
              }
            }
          }
        }
        .middle_box {
          height: 140px;
          position: relative;
          .clickInput {
            cursor: pointer;
            position: absolute;
            width: 269px;
            height: 140px;
            background: #ffffff;
            z-index: 999;
            text-align: center;
            line-height: 140px;
          }
          .temporary_input {
            padding: 10px 10px 20px 10px;

            width: 270px;
            height: 140px;
            /*background: red;*/
            border: 0 solid #FFFFFF;
            border-right: 1px solid rgba(220, 220, 220, 1);
            vertical-align: top;
            box-sizing: border-box;
            float: left;
            /*background: none;*/
            resize: none;
          }
          .upload_Box {
            width: 495px;
            height: 100%;
            float: left;
            text-align: center;
            cursor: pointer;
            color: rgba(153, 153, 153, 1);
            overflow: auto;
            padding: 17px 0 0 17px;
            box-sizing: border-box;
            .uploadImg {
              li {
                display: inline-block;
                border: 1px solid #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                float: left;
                overflow: hidden;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                width: 100px;
                height: 100px;
                margin-right: 17px;
                margin-bottom: 17px;
                .el-icon-delete {
                  width: 12px;
                  height: 12px;
                  position: absolute;
                  top: 7px;
                  right: 7px;
                  opacity: 0;
                  transition: all 0.1s linear;
                }

                img {
                  margin-top: 25px;
                  max-width: 88px;
                  height: 50px;
                }
                .fileName {
                  width: 72px;
                  text-align: center;
                  overflow: hidden;
                  margin-left: 14px;
                  height: 13px;
                  font-size: 12px;
                  margin-top: 5px;
                }
              }
              li:hover {
                border: 1px solid @linecolor;
                .el-icon-delete {
                  opacity: 1;
                }
              }
            }
            .el-icon-plus {
              font-weight: bold;
              font-size: 50px;
              color: #EBEBEB;
              line-height: 100px;
            }
            div {
              .is-success {
                height: 100px;
                width: 100px;
                border-radius: 6px;
                margin: 0 20px 20px 0;
              }
              .el-upload {
                height: 100px;
                width: 100px;
                border-radius: 6px;
                border: 1px solid rgba(220, 220, 220, 1);
                float: left;
                text-align: center;
                line-height: 100px;
                font-size: 50px;
                font-weight: bolder;
                color: #B6B6B6;
                img {
                  width: 100px;
                  height: 100px;
                  display: none;
                }
              }
            }

            .bottom_div {
              position: absolute;
              width: 100%;
              padding: 0 5px;
              box-sizing: border-box;
              height: 15px;
              bottom: 5px;
              left: 0;
              line-height: 15px;
              font-size: 12px;
              overflow: hidden;
            }
            .el-checkbox {
              text-indent: 2px;
            }
            .el-checkbox__input {
              border-radius: 50%;
            }
            .avatar-uploader .el-upload {
              border: 1px dashed #d9d9d9;
              border-radius: 6px;
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
              width: 100px;
              height: 100px;
              line-height: 100px;
              text-align: center;
            }
            .avatar {
              width: 178px;
              height: 178px;
              display: block;
            }

          }
          .word_number {
            margin-left: 1px;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 250px;
            height: 20px;
            /*padding: 5px 10px;*/
            background: #ffffff;
            text-align: right;
            box-sizing: border-box;
            color: rgba(153, 153, 153, 1);
          }
        }
        .label_box {
          /*position: absolute;*/
          bottom: 0;
          left: 0;
          width: 100%;
          height: 59px;
          text-align: center;
          border-top: 1px solid rgba(220, 220, 220, 1);
          cursor: pointer;
          color: rgba(153, 153, 153, 1);
          box-sizing: border-box;
          position: relative;
          /*padding: 0 20px;*/
          .addTag {
            display: block;
            width: 100%;
            height: 100%;
            line-height: 59px;
          }
          .labelBox {
            border-radius: 10px;
            width: 765px;
            height: 100%;
            overflow: auto;
            padding: 17px 40px 0 15px;
            box-sizing: border-box;
            .jList {
              height: 20px;
              min-width: 30px;
              padding: 0 6px;
              line-height: 22px;
              text-align: center;
              margin-right: 10px;
              -webkit-border-radius: 10px;
              -moz-border-radius: 10px;
              border-radius: 10px;
              border: 1px solid #999999;
              margin-bottom: 5px;
              i {
                display: none;
                color: @linecolor;
                margin-left: 5px;
                transition: all 0.3s linear;
              }
            }
            .jList:hover {
              i {
                display: inline-block;
                color: @linecolor;
                margin-left: 5px;
                /*transition: all 0.5s ;*/
                transition: all 0.3s linear;

              }
            }
          }
          .jList:hover {
            border: 1px solid #68C58F;
            i:hover {
              /*opacity: 1;*/
            }
          }
          .j_box_big {
            position: absolute;
            width: 20px;
            height: 20px;
            line-height: 20px;
            right: 20px;
            top: 20px;
            .labelBox {
              width: 100%;
              height: 100%;
              background-color: yellow;
            }
            i {
              font-size: 18px;
              color: #4574DF;
            }
            .j_ul {
              position: absolute;
              width: 207px;
              height: 193px;
              top: 8px;
              left: 18px;
              background: red;
              z-index: 999;
              background: rgba(255, 255, 255, 1);
              border-radius: 6px;
              box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
              .j_top {
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                border-bottom: 1px solid rgba(220, 220, 220, 1);
              }
              .j_bottom {
                height: 120px;
                overflow: auto;
                li {
                  height: 30px;
                  line-height: 30px;
                  padding: 0 20px;
                  box-sizing: border-box;
                  text-align: left;
                  .jIconShow{
                    display: inline-block;
                    max-width: 130px;
                    height: 30px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                  }
                  .el-checkbox__inner {
                    border-radius: 50%;
                    width: 18px;
                    height: 18px;
                    padding: 2px;
                    box-sizing: border-box;
                    line-height: 18px;
                    text-align: center;
                  }
                  .el-checkbox__inner::after {
                    height: 9px;
                    top: 2px;
                    left: 6px;
                  }
                }
                li:hover {
                  background: rgba(242, 243, 249, 1);
                }
              }
              button {
                margin: 0 20px;
                width: 166px;
                height: 32px;
                background: rgba(69, 131, 240, 1);
                border-radius: 6px;
                color: white;
                cursor: pointer;
              }
            }
          }
        }
        .main_button_bg {
          width: 72px;
          height: 32px;
          line-height: 32px;
          margin-top: 20px;
        }
      }
    }

    /*默认发布汇报卡样式*/
    .popup_two {
      width: 772px;
      height: 400px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -386px;
      margin-top: -220px;
      border-radius: 10px;
      background: #ffffff;
      opacity: 0.7;
      box-sizing: border-box;
      .popup_title {
        display: block;
        width: 100%;
        position: absolute;
        text-align: center;
        margin-top: 5px;
        font-size: 14px;;
      }
      h1 {
        text-align: center;
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
        line-height: 23px;
      }
      .big_box {
        position: relative;
        width: 772px;
        height: 255px;
        border: 1px solid rgba(220, 220, 220, 1);
        border-radius: 10px;
        .clickInput {
          position: absolute;
          width: 271px;
          left: 1px;
          height: 196px;
          text-align: center;
          line-height: 196px;
          background: #ffffff;
          border-radius: 10px;
          cursor: pointer;
          z-index: 999;
        }
        .temporary_input {
          padding: 10px;
          width: 271px;
          height: 196px;
          vertical-align: top;
          box-sizing: border-box;
          border: none;
          resize: none;
        }
        .word_number {
          position: absolute;
          bottom: 71px;
          left: 1px;
          display: block;
          width: 250px;
          text-align: right;
          /*background: pink;*/
          height: 14px;
        }
        .two_upload_files {
          width: 498px;
          border-left: 1px solid rgba(220, 220, 220, 1);
          height: 196px;
          float: right;
          .two_upload_Box {
            width: 498px;
            height: 100%;
            float: left;
            text-align: center;
            cursor: pointer;
            color: rgba(153, 153, 153, 1);
            overflow: auto;
            padding: 17px 0 0 17px;
            box-sizing: border-box;
            .uploadImg {

              li {
                display: inline-block;
                border: 1px solid #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                float: left;
                overflow: hidden;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                width: 100px;
                height: 100px;
                margin-right: 17px;
                margin-bottom: 17px;
                .el-icon-delete {
                  width: 12px;
                  height: 12px;
                  position: absolute;
                  top: 5px;
                  right: 5px;
                  opacity: 0;
                  transition: all 0.1s linear;
                }

                img {
                  margin-top: 25px;
                  max-width: 88px;
                  height: 50px;
                }
                .fileName {
                  width: 72px;
                  text-align: center;
                  overflow: hidden;
                  margin-left: 14px;
                  height: 13px;
                  font-size: 12px;
                  margin-top: 5px;
                }
              }
              li:hover {
                border: 1px solid @linecolor;

                .el-icon-delete {
                  opacity: 1;
                }
              }
            }
            .el-icon-plus {
              font-weight: bold;
              font-size: 50px;
              color: #EBEBEB;
              line-height: 100px;
            }
            div {
              .is-success {
                height: 100px;
                width: 100px;
                border-radius: 6px;
                margin: 0 20px 20px 0;
              }
              .el-upload {
                height: 100px;
                width: 100px;
                border-radius: 6px;
                border: 1px solid rgba(220, 220, 220, 1);
                float: left;
                text-align: center;
                line-height: 100px;
                font-size: 50px;
                font-weight: bolder;
                color: #B6B6B6;
                img {
                  width: 100px;
                  height: 100px;
                  display: none;
                }
              }
            }
            .bottom_div {
              position: absolute;
              width: 100%;
              padding: 0 5px;
              box-sizing: border-box;
              height: 15px;
              bottom: 5px;
              left: 0;
              line-height: 15px;
              font-size: 12px;
              overflow: hidden;
            }
            .el-checkbox {
              text-indent: 2px;
            }
            .el-checkbox__input {
              border-radius: 50%;
            }
          }
        }
        .two_label_box {
          bottom: 0;
          left: 0;
          width: 100%;
          height: 59px;
          text-align: center;
          border-top: 1px solid rgba(220, 220, 220, 1);
          cursor: pointer;
          color: rgba(153, 153, 153, 1);
          box-sizing: border-box;
          position: relative;
          /*padding: 0 20px;*/
          .two_addTag {
            display: block;
            width: 100%;
            height: 100%;
            line-height: 59px;
          }
          .labelBox {
            border-radius: 10px;
            width: 765px;
            height: 56px;
            overflow: auto;
            padding: 15px 40px 0 15px;
            box-sizing: border-box;
            .jList {
              height: 20px;
              min-width: 30px;
              padding: 0 6px;
              line-height: 22px;
              text-align: center;
              margin-right: 10px;
              -webkit-border-radius: 10px;
              -moz-border-radius: 10px;
              border-radius: 10px;
              border: 1px solid #999999;
              margin-bottom: 5px;
              i {
                display: none;
                color: @linecolor;
                margin-left: 5px;
              }
            }
            .jList:hover {
              i {
                display: inline-block;
                color: @linecolor;
                margin-left: 5px;
              }
            }
            .jList:hover {
              border: 1px solid #68C58F;
              i:hover {
                /*opacity: 1;*/
              }
            }
          }

          .j_box_big {
            position: absolute;
            width: 20px;
            height: 20px;
            line-height: 20px;
            right: 20px;
            top: 20px;
            .labelBox {
              width: 90%;
              height: 100%;
              background-color: yellow;
            }
            i {
              font-size: 18px;
              color: #4574DF;
            }
            .j_ul {
              position: absolute;
              width: 207px;
              height: 193px;
              top: 8px;
              left: 18px;
              background: red;
              z-index: 999;
              background: rgba(255, 255, 255, 1);
              border-radius: 6px;
              box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
              .j_top {
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                border-bottom: 1px solid rgba(220, 220, 220, 1);
              }
              .j_bottom {
                height: 120px;
                overflow: auto;
                li {
                  height: 30px;
                  line-height: 30px;
                  padding: 0 20px;
                  box-sizing: border-box;
                  text-align: left;
                  .two_jIconShow{
                    display: inline-block;
                    overflow: hidden;
                    max-width: 130px;
                    height: 30px;
                  }
                  .el-checkbox__inner {
                    border-radius: 50%;
                    width: 18px;
                    height: 18px;
                    padding: 2px;
                    box-sizing: border-box;
                    line-height: 18px;
                    text-align: center;
                  }
                  .el-checkbox__inner::after {
                    height: 9px;
                    top: 2px;
                    left: 6px;
                  }
                }
                li:hover {
                  background: rgba(242, 243, 249, 1);
                }
              }
              button {
                margin: 0 20px;
                width: 166px;
                height: 32px;
                background: rgba(69, 131, 240, 1);
                border-radius: 6px;
                color: white;
                cursor: pointer;
              }
            }
          }

        }
      }
      .main_button_bg {
        margin-top: 20px;
      }
    }
    /*切换样式 第一个卡片样式*/
    .one {
      padding: 0 30px;
      width: 830px;
      height: 398px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -416px;
      margin-top: -200px;
      border-radius: 10px;
      z-index: 999;
      opacity: 1;
      h1 {
        text-align: center;
        font-size: 30px;
        color: rgba(51, 51, 51, 1);
        line-height: 70px;
      }
      transition: all 0.5s linear;
    }
    /*切换样式 第二个卡片样式*/
    .two {
      width: 772px;
      height: 400px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -386px;
      margin-top: -220px;
      border-radius: 10px;
      opacity: 0.7;
      z-index: 888;
      padding: 0;
      h1 {
        text-align: center;
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
        line-height: 23px;
      }
      transition: all 0.5s linear;
    }
    /*第三个卡片样式*/
    .three {
      padding: 5px;
      box-sizing: border-box;
      text-align: center;
      width: 712px;
      height: 400px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -356px;
      margin-top: -240px;
      border-radius: 10px;
      background: skyblue;
      opacity: 0.5;
      z-index: -1;
    }
  }
</style>
