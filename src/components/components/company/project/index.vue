<template>
  <div class="project content">
    <ul class="project_top">
      <li class="fl">项目数：{{projectCount}}</li>
      <li class="fr">
        <button type="button" class="button_add main_button_bg cur" @click="addOreditProject()">添加项目</button>
      </li>
      <li class="search fr">
        <search-input @searchEnter="search"></search-input>

      </li>
    </ul>

    <div class="project_list">
      <el-table
        :data="projectList"
      >
        <el-table-column
          label=""
          width="50"
        >
        </el-table-column>

        <el-table-column
          width="125"
          label="序号"
        >
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="Title"
          label="项目名称"
        >
        </el-table-column>
        <el-table-column
          prop="CreateTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="Administrators"
          label="项目负责人"
        >
        </el-table-column>

        <el-table-column
          prop="Userlist"
          label="项目成员"
        >

        </el-table-column>

        <el-table-column
          label="">
          <template slot-scope="scope">
            <i class="iconfont icon-edit1 cur editIcon" @click="addOreditProject(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="popup popup_add_edit" v-if="addOrEditFlag">
      <div class="popup_box">
        <div class="top clearfix">
          <span class="popup_title fl">{{addOrEdit ? '新建项目' : '编辑项目'}}</span> <i class="iconfont icon-guanbi cur fr cancelIcon" @click="popupCancel"></i>
        </div>
        <ul class="center">
          <li>
            <span class="project_name">项目名称：</span>
            <el-input class="" v-model="projectName" placeholder="请输入项目名称" :class="{'red_border': projectNameRed}" @focus="projectNameFocus" @blur="projectNameBlur" @input="projectNameInput"></el-input>
            <span class="err_pop f-size-12" v-show="projectNameFlag">{{projectNameFlagText}}</span>
          </li>
          <li>
            <span class="project_name">项目简介：</span>
            <div class="project_summary">
              <textarea class="" v-model="projectSummary" :maxlength="projectSummaryMax" placeholder="请输入项目简介"></textarea>
            </div>
            <!--<span class="err_pop f-size-12" v-show="projectSummaryFlag">项目简介最多只能输入{{projectSummaryMax}}个字</span>-->
          </li>
          <li>
            <span class="project_name">项目负责人：</span>
            <el-select
              v-model="projectHead"
              @change="headChange"
              @focus="projectHeadFocus"
              @blur="projectHeadBlur"
              :class="{'red_border': projectHeadRed}" placeholder="请选择">
              <el-option
                v-for="item in staffList"
                :key="item.Pkid"
                :label="item.Realname"
                :value="item.Pkid"
              >
              </el-option>
            </el-select>
            <span class="err_pop f-size-12" v-show="projectHeadFlag">{{projectHeadFlagText}}</span>
          </li>
          <li>
            <span class="project_name">项目成员：</span>
            <el-select
              v-model="projectMumber"
              @change="staffChange"
              multiple
              collapse-tags
              placeholder="请选择">
              <el-option
                v-for="item in staffListStaff"
                :key="item.Pkid"
                :label="item.Realname"
                :value="item.Pkid">
              </el-option>
            </el-select>
            <span class="err_pop f-size-12" v-show="false">请输入正确的项目成员。</span>
          </li>
        </ul>

        <div class="bottom">
          <button class="main_button_bg fr" type="button" @click="popupSure">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import searchInput from '../../common/searchInput';
  export default {
    components: {
      searchInput,
    },
    data() {
      return {
        projectCount: 0, // 员工总人数
        projectList: [], // 员工列表
        addOrEditFlag: false, // 添加/编辑弹窗
        addOrEdit: null, // 添加1/编辑0
        projectName: '', // 项目名称
        projectSummary: '', // 项目简介
        projectHead: '', // 项目负责人
        projectMumber: [], // 项目成员
        projectMumberCopy: [],
        projectJob: [],
        projectJobList: [
          {
            value: 'job1',
            label: '项目经理'
          }, {
            value: 'job2',
            label: '产品经理'
          }, {
            value: 'job3',
            label: 'UI设计师'
          }, {
            value: 'job4',
            label: '前端开发'
          }, {
            value: 'job5',
            label: '后台开发'
          }
        ],
        addProjectList: [{'email': ''},{'email': ''},{'email': ''}], //添加员工邮箱列表
        searchContent: '', // 员工搜索
        staffList: [], // 员工列表
        staffListStaff: [], // 项目成员员工列表
        projectId: '', // 编辑项目的项目ID
        projectNameFlag: false, // 项目名称正则标识
        projectNameFlagText: '', // 项目名称正则提示内容
        projectNameRed: false, // 项目名称正则红色border
        projectHeadFlag: false, // 项目负责人正则标识
        projectHeadFlagText: '', // 项目负责人正则提示内容
        projectHeadRed: false, // 项目负责人正则红色border
        projectSummaryFlag: false, // 项目简介字数限制标识
        projectSummaryMax: 140, // 项目简介字数限制

        }
    },
    watch: {
      projectSummary(val) {
        if(val.length >= this.projectSummaryMax) {
          this.projectSummaryFlag = true;
        }else {
          this.projectSummaryFlag = false;

        }
      }
    },
    methods: {

      projectNameFocus() {
       if(this.projectNameRed) {
         this.projectNameRed = false;
       }
      },
      projectNameBlur() {
        if(!this.projectName) {
          this.projectNameFlag = true;
          this.projectNameFlagText = '项目名称不能为空';
        }
      },
      projectNameInput() {
        if(this.projectNameFlag) {
          this.projectNameFlag = false;
          this.projectNameFlagText = '';

        }
      },

      projectHeadFocus() {
       if(this.projectHeadRed) {
         this.projectHeadRed = false;
       }
      },
      projectHeadBlur() {
        if(!this.projectHead) {
          this.projectHeadFlag = true;
          this.projectHeadFlagText = '项目负责人不能为空';
        }
      },

      // 列表搜索
      search(val) {
        this.searchContent = val;
        this.getProjectList();
      },


      // 点击添加/编辑项目
      addOreditProject(project) {
        if(project) { // 编辑
          this.addOrEdit = 0;
          this.projectId = project.Pkid;
          let obj = {pkid: this.projectId};
          this.$HTTP('post', '/GetSys_Project_Info', obj).then( res => {
            let info = res.result;
            this.projectName = info.Title; // 项目名称
            this.projectSummary = info.Content;// 项目简介
            this.projectHead = info.Administrators; // 项目负责人
            this.projectMumber = info.Userlist ? info.Userlist.split(',') : []; // 项目成员
            this.projectMumberCopy = this.projectMumber;

            this.headChange(this.projectHead);

          }).catch( err => {
            console.log('项目获取失败', err);
          });


        }else { // 添加
          this.addOrEdit = 1;
        }

        this.addOrEditFlag = true;

      },

      // 弹窗确定
      popupSure() {
        this.projectNameBlur();
        this.projectHeadBlur();

        if(this.projectNameFlag) {
          this.projectNameRed = true;
        }
        if(this.projectHeadFlag) {
          this.projectHeadRed = true;
        }
        if(this.projectHeadFlag || this.projectNameFlag) return;

        let companyID = JSON.parse(localStorage.getItem('companyInfo')).CompanyId;
        if(this.addOrEdit === 1) { // 新增
          let obj = {companyId: companyID, title: this.projectName, Content: this.projectSummary, Administrators: this.projectHead,
            Userlist: this.projectMumber.join(',')};
          this.$HTTP('post', '/SetSys_Project', obj).then( res => {
            // console.log('项目添加成功', res);
            this.getProjectList(); // 获取项目列表
          }).catch( err => {
            console.log('项目添加失败', err);
          });
        }else { // 编辑
          let obj = {proId: this.projectId, companyId: companyID, title: this.projectName, Content: this.projectSummary, Administrators: this.projectHead,
            Userlist: this.projectMumber.join(',')};
          this.$HTTP('post', '/UpdateSys_Project', obj).then( res => {
            // console.log('项目编辑成功', res);
            this.getProjectList(); // 获取项目列表
          }).catch( err => {
            console.log('项目编辑失败', err);
          });
        }
        if(this.addOrEditFlag) {
          this.addOrEditFlag = false;
          this.popupInit();
        }
      },

      // 弹窗取消
      popupCancel() {
        if(this.addOrEditFlag) {
          this.addOrEditFlag = false;
          this.popupInit();
        }
      },

      // 弹窗清空
      popupInit() {
        this.projectName = ''; // 项目名称
        this.projectSummary = '';// 项目简介
        this.projectHead = ''; // 项目负责人
        this.projectMumber =[]; // 项目成员
        this.projectMumberCopy =[]; // 项目成员
        this.addOrEdit = null;
        this.projectNameFlag =  false; // 项目名称正则标识
        this.projectNameFlagText =  ''; // 项目名称正则提示内容
        this.projectNameRed =  false; // 项目名称正则红色border
        this.projectHeadFlag =  false; // 项目负责人正则标识
        this.projectHeadFlagText =  ''; // 项目负责人正则提示内容
        this.projectHeadRed =  false; // 项目负责人正则红色border

      },

      // 项目负责人改变
      headChange(val) {
        if(this.projectHeadFlag) {
          this.projectHeadFlag = false;
          this.projectHeadFlagText = '';

        }
        this.staffListStaff = this.staffList.concat();
        let indexs = this.staffList.findIndex(ele => {
          return val === ele.Pkid;
        });
        if(indexs !== -1) {
          this.staffListStaff.splice(indexs, 1);
        }
        let haves = this.projectMumber.findIndex( el => {
          return el === val;
        });
        this.projectMumber = this.projectMumberCopy.concat();
        if(haves !== -1) {
          this.projectMumber.splice(haves, 1);
        }
      },

      // 项目成员改变
      staffChange(val) {
        this.projectMumberCopy = val;
      },


      // 获取项目列表
      getProjectList() {
        let obj = {pkid: 631, key: this.searchContent};
        this.$HTTP('get', '/GetSys_Project_Bykey',obj).then(res => {
          this.projectList = res.result;
          this.projectCount = this.projectList.length;
        }).catch( err => {
          console.log('获取项目列表失败', err);
        });
      },

      // 输入邮箱获取焦点
      emailFocus(index,list) {
        if(index === list.length - 1) {
          list.push({'email': ''});
        }
      },

      // 获取员工列表
      getStaffList() {
        let obj = {pkid: 1, userID: 0, number: 0, key: ''};
        this.$HTTP('get', '/GetSysteam_UserListByPkidandKey',obj).then(res => {
          this.staffList = res.result;
          this.staffListStaff = this.staffList;
          // console.log(this.staffList);
        }).catch( err => {
          console.log('获取员工列表失败', err);
        });
      },
    },
    created() {
      this.getProjectList(); // 获取项目列表
      this.getStaffList(); // 获取员工列表
    }
  }
</script>
<style lang="less">
  @import '../../../assets/css/base.less';
  @import '../../../assets/css/media.less';


  .project {
    .project_top {
      height: 90px;
      line-height:90px;
      li {
        height: 90px;
        line-height:90px;
      }

      li:first-child {
        font-size: 30px;
      }

      li:nth-child(2) {
        padding-left: 40px;
        .button_add {
          margin-top: 30px;

        }

      }
    }

    .project_list {

      .editIcon {
        font-size: 20px;
        font-weight: bold;
        &:hover {
          color: @hoveBlue;
        }
      }

      .list_el_table;

    }

    .popup_add_edit {
      .popup_box {
        width: 487px;

        .center {

          .box_sizing;
          margin-top: 30px;

          li {
            height: 40px;
            line-height:40px;
            margin-bottom: 30px;
            position: relative;
            .h_mediaMgB(@pxOne: 20px);

            .err_pop {
              line-height: 1;
              color: #FF0000;
              position: absolute;
              top: 44px;
              left: 94px;

            }

            &:nth-child(2) {
              height: 90px;
              line-height:90px;
              .err_pop {
                top: 96px;
              }
            }
          }

          .project_name {
            float: left;
            width: 88px;
            text-align: right;
          }

          .el-input {
            width: 317px;
            display: inline-block;
          }

          .red_border {
            input {
              border: 1px solid red;
            }
          }

          .project_summary {
            display: inline-block;
            height: 90px;
            width: 317px;
            border: 1px solid #dcdfe6;
            .border_radius(@br: 4px;);
            .box_sizing;

            textarea {
              resize:none;
              border: 1px solid #FFFFFF;
              .border_radius(@br: 4px;);
              margin: 10px;
              height: 70px;
              width: 297px;
              background-color: rgba(69,131,240,0.17);
              color: #606266;
              padding: 4px;
              .box_sizing;

            }

            textarea::-webkit-input-placeholder{
              color:#b6b6b6;
            }
            textarea:-moz-placeholder{
              color:#b6b6b6;
            }
            textarea::-moz-placeholder{
              color:#b6b6b6;
            }
            textarea:-ms-input-placeholder{
              color:#b6b6b6;
            }



          }
        }
      }


    }

  }



</style>
