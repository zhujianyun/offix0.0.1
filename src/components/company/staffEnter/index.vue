<template>
  <div class="staffEnter content">
    <!--头部搜索等-->
    <ul class="staff_top">
      <li class="fl">员工数：{{staffCount}}</li>
      <li class="fr">
        <button type="button" class="button_add main_button_bg cur" @click="addStaff">添加员工</button>
      </li>
      <li class="search fr">
        <search-input @searchEnter="search"></search-input>
      </li>
    </ul>
    <!--列表-->
    <div class="staff_list">
      <el-table
        :data="staffList"
      >
        <el-table-column
          label=""
          width="50"
        >
        </el-table-column>

        <el-table-column
          prop="Realname"
          label="姓名"
        >
          <template slot-scope="scope">
            <img :src="scope.row.Images" v-if="scope.row.Images" class="staff_head"><span class="staff_name">{{scope.row.Realname}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="Number"
          label="员工号">
        </el-table-column>
        <el-table-column
          prop="Mobi"
          label="电话"
        >
        </el-table-column>
        <el-table-column
          prop="Email"
          label="邮箱"
        >
        </el-table-column>
        <el-table-column
          prop="Job"
          label="职务">
        </el-table-column>
        <el-table-column
          prop="ProjectName"
          label="项目"
        >
        </el-table-column>
        <el-table-column
          label="账号状态">
          <template slot-scope="scope">
            <span v-if="scope.row.State === 0 ">已离职</span>
            <span v-else-if="scope.row.State === 1 ">已激活</span>
            <span v-else>未激活</span>
          </template>
        </el-table-column>
        <el-table-column
          label="">
          <template slot-scope="scope">
            <i class="iconfont icon-edit1 cur editIcon" @click="editStaff(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--编辑弹窗-->
    <div class="popup popup_edit" v-if="editFlag">
      <div class="popup_box">
        <div class="top clearfix">
          <span class="popup_title fl">员工编辑</span> <i class="iconfont icon-guanbi cur fr cancelIcon"
                                                      @click="popupCancel"></i>
        </div>
        <ul class="center">
          <li>
            <span class="spans">姓名：</span>
            <span>{{staffName}}</span>
          </li>
          <li>
            <span class="spans">电话：</span>
            <span>{{staffMobi}}</span>
          </li>
          <li>
            <span class="spans">邮箱：</span>
            <span>{{staffEmail}}</span>
          </li>

          <li>
            <span class="spans">员工号：</span>
            <el-input
              class="number"
              v-model="staffNumber"
              :class="{'red_border': staffNumberRed}"
              placeholder="请输入员工编号"
              @focus="numberFocus()"
              @blur="numberBlur()"
              @input="numberInput()"
            ></el-input>
            <span class="err_pop f-size-12" v-show="staffNumberText">{{staffNumberText}}</span>
          </li>
          <li>
            <span class="spans">职务：</span>
            <el-select
              class="job"
              v-model="staffJob"
              multiple
              collapse-tags
              @change="jobChange"
              @focus="jobFocus"
              @blur="jobBlur"
              :class="{'red_border': staffJobRed}"
              placeholder="请选择职务">
              <el-option
                v-for="item in staffJobList"
                :key="item.Pkid"
                :label="item.Title"
                :value="item.Pkid">
              </el-option>
            </el-select>
            <span class="err_pop f-size-12" v-show="staffJobText">{{staffJobText}}</span>

          </li>
          <li>
            <span class="spans">所在项目：</span>
            <span>{{staffProject}}</span>
          </li>
        </ul>
        <div class="bottom">
          <button class="main_button_bg fr" type="button" @click="popupSure">确定</button>
        </div>
      </div>
    </div>
    <!--新增弹窗-->
    <div class="popup popup_add" v-if="addFlag">
      <div class="popup_box">
        <div class="top clearfix">
          <span class="popup_title fl">添加员工</span> <i class="iconfont icon-guanbi cur fr cancelIcon"
                                                      @click="popupCancel"></i>
        </div>
        <p class="point f-size-12">请输入电子邮箱，邀请成员加入。</p>
        <ul class="center">
          <li v-for="(email, index) in addStaffList" :key="index">
            <span>员工</span>
            <el-input class="email_input" :class="{'red_border': email.emailBFlag}" v-model="email.email"
                      placeholder="请输入邀请邮箱" @focus="emailFocus(index,addStaffList)" @blur="emailBlur(email)"
                      @input="emailInput(index,addStaffList)"></el-input>
            <span class="err_pop f-size-12" v-show="email.emailFlag">请输入正确的邮箱格式。</span>
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
        staffCount: 0, // 员工总人数
        staffList: [], // 员工列表
        editFlag: false, // 编辑弹窗
        addFlag: false, // 添加弹窗
        staffName: '', // 员工姓名
        staffMobi: '', // 员工电话
        staffEmail: '', // 员工邮箱
        staffNumber: '', // 员工编号
        staffProject: '', // 员工所属项目
        staffJob: [], // 员工职务
        staffJobList: [], // 职务列表
        addStaffList: [{'email': ''}, {'email': ''}, {'email': ''}], //添加员工邮箱列表
        staffId: null, // 员工ID
        searchContent: '', // 员工搜索
        staffNumberText: '', // 员工编号校验提示语
        staffNumberRed: false, // 员工编号边框
        staffJobText: '', // 员工职务校验提示语
        staffJobRed: false, // 员工职务边框
      }
    },
    watch: {},
    methods: {
      // 列表搜索
      search(val) {
        this.searchContent = val;
        this.getStaffList();
      },

      // 点击添加员工
      addStaff() {
        this.addFlag = true;
      },


      // 点击编辑员工
      editStaff(staff) {
        this.editFlag = true;
        let obj = {userpkid: staff.Pkid};
        this.$HTTP('get', '/GetSystem_Member', obj).then(res => {
          // console.log('员工详情', res.result);
          let staffInfo = res.result;
          this.staffId = staffInfo.Pkid;
          this.staffName = staffInfo.Realname;
          this.staffMobi = staffInfo.Mobi;
          this.staffEmail = staffInfo.Email;
          this.staffNumber = staffInfo.Number;
          this.staffProject = staffInfo.ProjectName;
          staffInfo.JobId = staffInfo.JobId ? staffInfo.JobId.split(',') : []; // 职务
          this.staffJob = staffInfo.JobId;
        });
      },

      // 员工编号聚焦
      numberFocus() {
        if(this.staffNumberRed) {
          this.staffNumberRed = false;
        }
      },

      // 员工编号失焦
      numberBlur() {
        this.numberInput();
      },

      // 员工编号变化
      numberInput() {
        this.staffNumber.replace(/(^\s*)|(\s*$)/g, "");
        let numberReg = /^[0-9A-Za-z]{0,10}$/;
        if(!numberReg.test(this.staffNumber)) {
          this.staffNumberText = '请输入数组或字母（最多十位字符）';
        } else {
          this.staffNumberText = '';
        }

      },

      // 员工职位聚焦时
      jobFocus() {
        if(this.staffJobRed) {
          this.staffJobRed = false;
        }
      },

      // 员工职位失焦时
      jobBlur() {
        if(this.staffJob && !this.staffJob.length) {
          this.staffJobText = '请选择职位';
        }else {
          this.staffJobText = '';
        }
      },

      // 员工职位变化时
      jobChange() {
        this.jobBlur();
      },


      // 弹窗确定
      popupSure() {

        if(this.editFlag) { // 编辑

          this.numberBlur();
          this.jobBlur();

          if(this.staffNumberText) {
            this.staffNumberRed = true;
          }else {
            this.staffNumberRed = false;
          }

          if(this.staffJobText) {
            this.staffJobRed = true;
          }else {
            this.staffJobRed = false;
          }

          if(this.staffNumberRed || this.staffJobRed) return;

          let obj = {userpkid: this.staffId, number: this.staffNumber, job: this.staffJob.join(',')};
          this.$HTTP('post', '/UpdateSyStem_Member', obj).then(res => {
            this.editFlag = false;
            this.getStaffList();
            // console.log('编辑成功', res);
          }).catch(err => {
            console.log('编辑失败', err);
          });

        } else { // 新增

          let emails = [];
          let returns = false;
          for (let ele of this.addStaffList) {
            if (ele.emailFlag) {
              ele.emailBFlag = true;
              returns = true;
            }
          }

          this.addStaffList = this.addStaffList.concat();

          if (returns) return;

          let ok = this.addStaffList.findIndex(el => {

            return el.emailFlag === true;
          });

          if (ok === -1) {
            for (let ele of this.addStaffList) {

              if (!ele.emailFlag && ele.email) {
                emails.push(ele.email);
              }
            }
          }
          if (emails.length) {
            let companyID = JSON.parse(localStorage.getItem('companyInfo')).CompanyId;
            let obj = {emailList: emails.join(','), companyId: companyID};
            this.$HTTP('post', '/InvitationEmail', obj).then(res => {
              console.log('添加员工成功', res);
            }).catch(err => {
              console.log('添加员工失败', err);
            });
          }
          this.addFlag = false;

          this.addStaffList = [{email: '', emailFlag: false, emailBFlag: false}, {
            email: '',
            emailFlag: false,
            emailBFlag: false
          }, {email: '', emailFlag: false, emailBFlag: false}];

        }
      },

      // 弹窗取消
      popupCancel() {
        if (this.editFlag) {
          this.editFlag = false;

        } else {
          this.addFlag = false;
          this.addStaffList = [{email: '', emailFlag: false, emailBFlag: false}, {
            email: '',
            emailFlag: false,
            emailBFlag: false
          }, {email: '', emailFlag: false, emailBFlag: false}];
        }
      },


      // 获取员工列表
      getStaffList() {

        let obj = {pkid: 1, userID: 0, number: 0, key: this.searchContent};

        this.$HTTP('get', '/GetSysteam_UserListByPkidandKey',obj).then(res => {
          this.staffList = res.result;
          this.staffCount = this.staffList.length;
        }).catch(err => {
          console.log('获取员工列表失败', err);
        });
      },

      // 输入邮箱获取焦点
      emailFocus(index, list) {
        if (list[index].emailBFlag) list[index].emailBFlag = false;
        if (index === list.length - 1) {
          list.push({email: '', emailFlag: false, emailBFlag: false});
        }
        this.addStaffList = this.addStaffList.concat();

      },

      // 输入邮箱失去焦点正则验证
      emailBlur(email) {
        let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (emailReg.test(email.email) || email.email == '') {
          email.emailFlag = false;
        } else {
          email.emailFlag = true;
        }
        this.addStaffList = this.addStaffList.concat();

      },

      // 输入邮箱正则验证
      emailInput(index, list) {
        if (list[index].emailFlag) list[index].emailFlag = false;
        this.addStaffList = this.addStaffList.concat();

      },
      // 获取职称列表
      getJob() {
        let obj = {pkid: 5};
        this.$HTTP('get', '/GetCategory', obj).then(res => {
          this.staffJobList = res.result;
          // console.log('职称列表', this.staffJobList);
        });
      },
    },
    created() {
      this.getStaffList(); // 获取员工列表
      this.getJob(); // 获取职称列表
    }
  }
</script>
<style lang="less">
  @import '../../../assets/css/base.less';
  @import '../../../assets/css/media.less';

  .staffEnter {
    .staff_top {

      height: 90px;
      line-height: 90px;
      li {
        height: 90px;
        line-height: 90px;
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

    .staff_list {

      .editIcon {
        font-size: 20px;
        font-weight: bold;
        &:hover {
          color: @hoveBlue;
        }
      }

      .staff_head {
        display: inline-block;
        width: 36px;
        height: 36px;
        vertical-align: middle;
        margin-right: 10px;

        .border_radius(@br: 18px);

      }

      .staff_name {
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }

      .list_el_table;

    }

    .popup_edit {

      .popup_box {
        width: 470px;
        max-height: 484px;

        .center {
          margin-top: 30px;
          font-size: 14px;

          li {
            margin-bottom:30px;
          }
          li .spans {
            display: inline-block;
            width: 70px;
            text-align: right;
          }

          li:nth-child(2) {
            margin-top: 22px;
            /*margin-bottom: 22px;*/
          }

          li:nth-child(4) {
            position: relative;
            /*margin-top: 30px;*/
            /*margin-bottom: 22px;*/
            .spans {
              display: inline-block;
              height: 40px;
              line-height:40px;
              .h_mediaH(@pxOne: 30px);
              .h_mediaLH(@pxOne: 30px);

            }
            .number {
              width: 314px;
              height: 40px;
              .h_mediaH(@pxOne: 30px);

            }

            .err_pop {
              line-height: 1;
              color: #FF0000;
              position: absolute;
              top: 44px;
              left: 76px;
            }
          }

          li:nth-child(5){
            position: relative;
            .job {
              width: 314px;
              height: 40px;
            }
            .err_pop {
              line-height: 1;
              color: #FF0000;
              position: absolute;
              top: 44px;
              left: 76px;
            }
          }

          li:last-child {
            /*margin-top: 22px;*/
            margin-bottom: 30px;
            .h_mediaMgB(@pxOne: 20px);


          }
        }

      }

    }

    .popup_add {
      .popup_box {
        width: 470px;
        .point {
          color: #999999;
          margin-top: 10px;
        }
        .center {
          max-height: 250px;
          .h_mediaMaxH(@pxOne: 220px);

          overflow-y: auto;
          .box_sizing;
          margin-top: 30px;
          .h_mediaMgT(@pxOne: 20px);

          li {
            height: 40px;
            line-height: 40px;
            margin-bottom: 30px;
            .h_mediaMgB(@pxOne: 20);
            .h_mediaH(@pxOne: 30px);
            .h_mediaLH(@pxOne: 30px);

            position: relative;

            .err_pop {
              line-height: 1;
              color: #FF0000;
              position: absolute;
              top: 44px;
              left: 70px;
            }
          }
          .email_input {
            width: 314px;
            /*margin-left: 35px;*/
            margin-left: 20px;
            display: inline-block;

          }


        }

        .bottom {
          height: 40px;
          margin-top: 30px;
          .h_mediaMgT(@pxOne: 20px);
        }
      }

    }

  }


</style>
