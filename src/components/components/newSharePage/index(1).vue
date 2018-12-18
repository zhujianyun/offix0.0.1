<template>
  <div id="newShare">
    <!--头部-->
    <div class="top">
      <i class="el-icon-back fl"> 返回任务卡</i>
      <h1>点击此处设置分享主题</h1>
      <input type="button" value="预览/分享">
    </div>
    <!--下边内容部分-->
    <div class="bottomMain">
      <!--左侧导航-->
      <div class="leftNav fl">
        <div class="nav">
          <el-tabs :tab-position="tabPosition" style="width: 300px;">
            <el-tab-pane label="模板">
              <span slot="label">
                  <i class="iconfont icon-moban"></i>
                  <p>模板</p>
              </span>
              <div class="template">
                <p class="temTop">模板</p>
                <!--手机-->
                <ul class="clearfix">
                  <li v-for="(item,index) in tabs" :class="{active:index == num}" class="checked fl"
                      @click="tab(index)">{{item}}
                  </li>
                </ul>
                <div class="tabCon">
                  <div v-for='(itemCon,index) in tabContents' v-show=" index == num">{{itemCon}}</div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="格子">
                <span slot="label">
                  <i class="iconfont icon-biaoge"></i>
                <li>格子</li>
              </span>
              <div id="grid_con">
                <p class="gridTop">格子</p>

                <div class="gridcon">
                  <div class="sidebar-nav">
                    <ul class="nav nav-list accordion-group">
                      <li class="nav-header">
                        <div class="pull-right popover-info">
                          <div class="popover fade right">
                            <div class="arrow"></div>
                            <h3 class="popover-title">功能</h3>
                          </div>
                        </div>
                        <i class="icon-plus icon-white"></i> 格子形状
                      </li>
                      <li style="display: list-item;" class="rows" id="estRows">
                        <div class="lyrow ui-draggable"><a href="#close" class="remove label label-important"><i
                          class="icon-remove icon-white"></i>删除</a> <span class="drag label"><i class="icon-move"></i>拖动</span>
                          <div class="preview">
                            <img src="../../assets/img/sharepage/1.png" alt="">
                          </div>
                          <div class="view">
                            <div class="row-fluid clearfix">
                              <div class="span12 column"></div>
                            </div>
                          </div>
                        </div>
                        <div class="lyrow ui-draggable"><a href="#close" class="remove label label-important"><i
                          class="icon-remove icon-white"></i>删除</a> <span class="drag label"><i class="icon-move"></i>拖动</span>
                          <div class="preview">
                            <img src="../../assets/img/sharepage/2.png" alt="">
                          </div>
                          <div class="view">
                            <div class="row-fluid clearfix">
                              <div class="span6 column"></div>
                              <div class="span6 column"></div>
                            </div>
                          </div>
                        </div>
                        <div class="lyrow ui-draggable"><a href="#close" class="remove label label-important"><i
                          class="icon-remove icon-white"></i>删除</a> <span class="drag label"><i class="icon-move"></i>拖动</span>
                          <div class="preview">
                            <img src="../../assets/img/sharepage/3.png" alt="">
                          </div>
                          <div class="view">
                            <div class="row-fluid clearfix">
                              <div class="span6 column"></div>
                              <div class="span6 column"></div>
                              <div class="span6 column"></div>
                              <div class="span6 column"></div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>

                    <ul class="nav nav-list accordion-group">
                      <li class="nav-header"><i class="icon-plus icon-white"></i> 添加元素
                        <div class="pull-right popover-info">
                          <div class="popover fade right">
                            <div class="arrow"></div>
                            <h3 class="popover-title">帮助</h3>
                            <div class="popover-content">这里提供了一系列基本元素样式，你可以通过区块右上角的编辑按钮修改样式设置。如需了解更多信息，请访问<a
                              target="_blank"
                              href="http://twitter.github.io/bootstrap/base-css.html">基本CSS.</a>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li style="display: none;" class="boxes" id="elmBase">
                        <div class="box box-element ui-draggable">
                          <a href="#close" class="remove label label-important">
                            <i class="icon-remove icon-white"></i>删除
                          </a>
                          <span class="drag label">
                          <i class="icon-move"></i>拖动
                        </span>
                          <div class="preview">详细描述</div>
                          <div class="view">
                            <dl contenteditable="true">
                              <dt>今日工作内容</dt>
                              <dd>1.完成效果图</dd>
                            </dl>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="背景">
                <span slot="label">
                  <i class="iconfont icon-757bianjiqi_beijing"></i>
                <p>背景</p>
              </span>
            </el-tab-pane>
            <el-tab-pane label="素材">
              <span slot="label">
                  <i class="iconfont icon-sucai"></i>
                <p>素材</p>
              </span>
            </el-tab-pane>
          </el-tabs>
        </div>

      </div>
      <!--右侧选项卡-->

      <!--中间显示区域-->
      <div class="middleMain">
        <div class="showMain">
          <div class="container-fluid">
            <div class="row-fluid">
              <!--右侧编辑列表-->


              <!--/span-->
              <div style="min-height: 590px;" class="demo ui-sortable"></div>
              <!--/span-->
              <div id="download-layout">
                <div class="container-fluid"></div>
              </div>
            </div>
            <!--/row-->
          </div>
          <!--/.fluid-container-->
          <div class="modal hide fade" role="dialog" id="editorModal">
            <div class="modal-header"><a class="close" data-dismiss="modal">×</a>
              <h3>编辑</h3>
            </div>
            <div class="modal-body">
              <p>
                <textarea id="contenteditor"></textarea>
              </p>
            </div>
            <div class="modal-footer"><a id="savecontent" class="btn btn-primary" data-dismiss="modal">保存</a> <a
              class="btn"
              data-dismiss="modal">关闭</a>
            </div>
          </div>
          <div class="modal hide fade" role="dialog" id="downloadModal">
            <div class="modal-header"><a class="close" data-dismiss="modal">×</a>
              <h3>下载</h3>
            </div>
            <div class="modal-body">
              <p>已在下面生成干净的HTML, 可以复制粘贴代码到你的项目.</p>
              <div class="btn-group">
                <button type="button" id="fluidPage" class="active btn btn-info"><i
                  class="icon-fullscreen icon-white"></i>
                  自适应宽度
                </button>
                <button type="button" class="btn btn-info" id="fixedPage"><i class="icon-screenshot icon-white"></i>
                  固定宽度
                </button>
              </div>
              <br>
              <br>
              <p>
                <textarea></textarea>
              </p>
            </div>
            <div class="modal-footer"><a class="btn" data-dismiss="modal">关闭</a></div>
          </div>
          <div class="modal hide fade" role="dialog" id="shareModal">
            <div class="modal-header"><a class="close" data-dismiss="modal">×</a>
              <h3>保存</h3>
            </div>
            <div class="modal-body">保存成功</div>
            <div class="modal-footer"><a class="btn" data-dismiss="modal">Close</a></div>
          </div>
        </div>
        <div class="optionButton">
          <!--<div class="btn-group" data-toggle="buttons-radio">-->
          <!--<button type="button" id="edit" class="btn btn-primary active"><i class="icon-edit icon-white"></i>编辑</button>-->
          <!--</div>-->
          <button class="btn btn-primary" href="#clear" id="clear"><i class="icon-trash icon-white"></i>清空
          </button>
          <button class="btn btn-primary" href="/share/index" role="button" data-toggle="modal"
                  data-target="#shareModal"><i class="icon-share icon-white"></i>保存
          </button>
          <div class="btn-group">
            <button class="btn btn-primary" href="#undo" id="undo"><i class="icon-arrow-left icon-white"></i>上一步
            </button>
            <button class="btn btn-primary" href="#redo" id="redo"><i class="icon-arrow-right icon-white"></i>重做
            </button>
          </div>
          <!--<button type="button" class="btn btn-primary" id="sourcepreview"><i class="icon-eye-open icon-white"></i>预览-->
          <!--</button>-->
        </div>
      </div>
      <!--右侧文件列表部分-->
      <div class="rightNav">
        <div class="fileTitle">内容选择面板</div>
        <div class="searchBox">
          <i class="el-icon-search"></i>
          <input type="text" placeholder="搜索对象">
        </div>
        <div class="fileList">
          <el-collapse accordion>
            <el-collapse-item v-for="(list,index) in cooperationName" :key="index">
              <template slot="title" id="informationList" >
                <el-checkbox v-model="checked"></el-checkbox>
                <img :src=list.Pic alt="">
                <span class="nameAndJob ml-10">
                   <p>{{list.UserName}}</p>
                   <p style="color: #999999">{{list.Job}}</p>
                 </span>
                <span class="completionStatus ml-10">已完成</span>
                <span class="fileName ml-10">0/0</span>
              </template>
              <div class="sidebar-nav" style="left:1050px">
                <div class="box box-element ui-draggable">
                  <a href="#close" class="remove label label-important"><i class="icon-remove icon-white"></i>删除</a>
                  <span class="drag label"><i class="icon-move"></i>拖动</span>
                  <span class="configuration">
                  <span class="btn-group">
                    <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#">样式
                      <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                      <li class="active"><a href="#" rel="">默认</a></li>
                      <li class=""><a href="#" rel="img-rounded">圆角</a></li>
                      <li class=""><a href="#" rel="img-circle">圆圈</a></li>
                      <li class=""><a href="#" rel="img-polaroid">相框</a></li>
                    </ul>
                  </span>
                </span>
                  <div class="preview">图片</div>
                  <div class="view"><img alt="140x140" src="../../../static/BootstrapTPY20160113/img/a.jpg"></div>
                </div>
                <div class="box box-element ui-draggable">
                  <a href="#close" class="remove label label-important"><i class="icon-remove icon-white"></i>删除</a>
                  <span class="drag label"><i class="icon-move"></i>拖动</span>
                  <span class="configuration">
                  <span class="btn-group">
                    <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#">样式
                      <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                      <li class="active"><a href="#" rel="">默认</a></li>
                      <li class=""><a href="#" rel="img-rounded">圆角</a></li>
                      <li class=""><a href="#" rel="img-circle">圆圈</a></li>
                      <li class=""><a href="#" rel="img-polaroid">相框</a></li>
                    </ul>
                  </span>
                </span>
                  <div class="preview">图片</div>
                  <div class="view"><img alt="140x140" src="../../../static/BootstrapTPY20160113/img/108.jpg"></div>
                </div>
              </div>


            </el-collapse-item>
          </el-collapse>
          <div class="sidebar-nav" style="left:1050px">
            <div class="box box-element ui-draggable">
              <a href="#close" class="remove label label-important"><i class="icon-remove icon-white"></i>删除</a>
              <span class="drag label"><i class="icon-move"></i>拖动</span>
              <span class="configuration">
                  <span class="btn-group">
                    <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#">样式
                      <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                      <li class="active"><a href="#" rel="">默认</a></li>
                      <li class=""><a href="#" rel="img-rounded">圆角</a></li>
                      <li class=""><a href="#" rel="img-circle">圆圈</a></li>
                      <li class=""><a href="#" rel="img-polaroid">相框</a></li>
                    </ul>
                  </span>
                </span>
              <div class="preview">图片</div>
              <div class="view"><img alt="140x140" src="../../../static/BootstrapTPY20160113/img/a.jpg"></div>
            </div>
            <div class="box box-element ui-draggable">
              <a href="#close" class="remove label label-important"><i class="icon-remove icon-white"></i>删除</a>
              <span class="drag label"><i class="icon-move"></i>拖动</span>
              <span class="configuration">
                  <span class="btn-group">
                    <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#">样式
                      <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                      <li class="active"><a href="#" rel="">默认</a></li>
                      <li class=""><a href="#" rel="img-rounded">圆角</a></li>
                      <li class=""><a href="#" rel="img-circle">圆圈</a></li>
                      <li class=""><a href="#" rel="img-polaroid">相框</a></li>
                    </ul>
                  </span>
                </span>
              <div class="preview">图片</div>
              <div class="view"><img alt="140x140" src="../../../static/BootstrapTPY20160113/img/108.jpg"></div>
            </div>
          </div>
        </div>
        <div class="upInput">
          <i class="el-icon-upload2"> 上传附件</i>
          <input type="file" class='upbutton' value="上传附件">
        </div>
      </div>

    </div>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        tabPosition: 'left',
        tabs: ["手机", "邮件"],
        tabContents: ["内容一", "内容二"],
        num: 1,
        checked: true,
        content:'',// 文件列表
        cooperationName:'', //别选择的人 及 列表信息
      }
    },
    methods: {
      tab(index) {
        this.num = index;
      },
      getShareList(pkid) {
        let data = {'articlePkid': 161};
        this.$HTTP('post', '/GetSharingLinks', data).then(res => {
          this.content = res.result;
          console.log(this.content);
          this.homeShow = this.content.IsTitle;
          this.title = this.content.Title;
          this.createTime = this.content.CreateTime;
          this.name = this.content.UName;
          this.taskContent = this.content.Content;
          this.cooperationName = JSON.parse(this.content.Coordination);
          console.log(this.cooperationName);
          for (let i of this.cooperationName) {
            i.ReplyInformationList = JSON.parse(i.ReplyInformationList);
            i.TaskFileList = JSON.parse(i.TaskFileList);
            this.$set(i, 'filenum', i.TaskFileList.length);
            this.$set(i, 'cardunfold', true);
            this.$set(i, 'FileIsShow', false);
            if (i.filenum > 3) {
              i.FileIsShow = true;
            }
            for (let j of i.TaskFileList) {
              this.$set(j, 'FileTypeNum', this.getFlieTyle(j.FileType));
            }
          }
          this.content.PubFile = JSON.parse(this.content.PubFile);
          for (let flie of this.content.PubFile) {
            this.$set(flie, 'FileTypeNum', this.getFlieTyle(flie.FileType));
          }
          console.log(this.content.PubFile.length);
          if (this.content.PubFile.length > 3) {
            this.testcardShow = true;

          } else {
            this.testcardShow = false;
          }
          console.log(this.testcardShow);
        }).catch(err => {
          console.log(err);
          this.$message("获取信息失败，请稍后再试")
        });
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
    },
    created() {
      this.getShareList();
    },

  }
</script>
<style lang="less">
  @import "../../assets/css/common.css";
  @import '../../assets/css/base.less';

  @bgColor: #ffffff;
  @dominantHue: #4583F0;
  .ml-10 {
    margin-left: 10px;
  }

  #newShare {
    height: 100vh;
    overflow: hidden;
    .top {
      height: 50px;
      background: @bgColor;
      box-shadow: 1px 2px 3px rgba(102, 102, 102, 0.41);
      padding: 8px 100px;
      .box_sizing;
      position: relative;
      z-index: 999;
      i {
        margin-top: 11px;
      }
      h1 {
        text-align: center;
        font-size: 24px;
      }
      input {
        width: 102px;
        height: 32px;
        border-radius: 6px;
        border: 1px solid @dominantHue;
        position: absolute;
        right: 100px;
        top: 10px;
        color: @dominantHue;
        font-size: 16px;
      }
    }

    .bottomMain {
      position: relative;
      color: #333333;
      /*左侧*/
      .leftNav {
        height: calc(~ '100vh - 50px');
        background: @bgColor;
        box-shadow: 2px 0px 5px rgba(102, 102, 102, 0.41);
        z-index: 999;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        .nav {
          font-size: 16px;
          .el-tabs__nav-wrap::after {
            background: none;
          }
          .el-tabs__content {
            height: calc(~ '100vh - 50px');
          }
          .el-tabs--left .el-tabs__header.is-left {
            padding-top: 45px;
            .box_sizing;
            width: 80px;
            height: calc(~ '100vh - 50px');
            box-shadow: 2px 0px 5px rgba(102, 102, 102, 0.41);
            margin-right: 0;
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
            /*text-align: center;*/
            border: none;

            .el-tabs__item {
              padding: 10px 0;
              text-align: center;
              height: 70px;
              line-height: 25px;
              .iconfont {
                font-size: 20px;
              }
            }
            .el-tabs__item.is-active {
              background: @dominantHue;
              color: #ffffff;
            }
            .el-tabs__active-bar {
              background: none;
            }
            .el-tabs__active-bar.is-left {
              width: 0;
              height: 0 !important;
              border-width: 10px 10px 10px 0;
              border-style: solid;
              border-color: transparent #ffffff transparent transparent; /*透明 灰 透明 透明 */
              /*margin:10px auto;*/
              top: 46px;
              right: -71px;
              position: relative;
            }
          }
          /*模板内容样式*/
          .template {
            height: 100vh;
            ul {
              border-bottom: 1px solid #DCDCDC;
            }
            .temTop {
              height: 47px;
              border-bottom: 1px solid #e0e0e0;
              text-align: center;
              line-height: 47px;
            }
            .checked {
              height: 33px;
              line-height: 33px;
              cursor: pointer;
              width: 72px;
              margin-left: 23px;
              text-align: center;
            }
            .active {
              border-bottom: 2px solid @dominantHue;
              color: @dominantHue;
            }
            .tabCon {
              width: 100%;
              height: 100%;
              padding: 10px 20px;
              .box_sizing;
            }
          }

          /*格子内容样式*/
          #grid_con {
            height: 100vh;
            .gridTop {
              height: 47px;
              border-bottom: 1px solid #e0e0e0;
              text-align: center;
              line-height: 47px;
            }
            .gridcon {
              height: 100%;
              padding: 10px 20px;
              .box_sizing;
            }
          }
        }
      }

      /*中间*/

      .middleMain {
        width: calc(~ '100vw - 617px');
        height: calc(~ '100vh - 50px');
        left: 300px;
        overflow: scroll;
        position: absolute;
        padding: 80px 0 125px 0;
        .box_sizing;
        .showMain {
          width: 320px;
          min-height: 504px;
          margin: 0 auto;
          background: #ffffff;
        }
        .optionButton {
          position: fixed;
          bottom: 30px;
          left: 50%;
          margin-left: -163px;
          width: 320px;
          height: 40px;
          background: @dominantHue;
          border-radius: 6px;
          li {
            float: left;
          }
        }
      }
      @linecolor: #DCDCDC;
      /*右侧*/
      .rightNav {
        position: absolute;
        right: 0;
        /*top: 50px;*/
        height: calc(~ '100vh - 50px');
        width: 300px;
        background: @bgColor;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        box-shadow: 2px 0px 5px rgba(102, 102, 102, 0.41);
        .fileTitle {
          text-align: center;
          height: 45px;
          line-height: 45px;
          border-bottom: 1px solid @linecolor;
          font-size: 16px;
        }

        .searchBox {
          height: 35px;
          width: 100%;
          padding: 0 30px;
          .box_sizing;
          position: relative;
          border-bottom: 1px solid @linecolor;

          .el-icon-search {
            position: absolute;
            top: 11px;
            left: 10px;
          }
          input {
            height: 35px;
            width: 100%;
          }

        }
        .fileList {
          padding: 0 20px;
          height: 100%;
          .el-checkbox__inner {
            width: 20px;
            height: 20px;
            background: none;
          }
          .el-checkbox__inner::after {
            height: 11px;
            width: 4px;
            box-sizing: content-box;
            content: "";
            border: 1px solid #4583F0;
            border-left: 0;
            border-top: 0;
            left: 6px;
            position: absolute;
            top: 1px;
          }
          .el-collapse {
            margin-top: -1px;
          }
          .el-collapse-item__header {
            line-height: 48px;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-left: 15px;
            }
          }
          .nameAndJob {
            display: inline-block;
            vertical-align: middle;
            width: 70px;
            p {
              line-height: 17px;
            }
          }
          .el-collapse-item__wrap {
            background: #F8F8FF;
          }
          .el-collapse-item__content {
            padding: 0;
          }
          .fileLists {
            ul {
              li {
                height: 45px;
                background: red;
                line-height: 45px;
                img {
                  height: 40px;

                }
              }
            }
          }
        }
        .upInput {
          cursor: pointer;
          width: 130px;
          height: 30px;
          border: 1px solid #4583F0;
          border-radius: 6px;
          position: absolute;
          bottom: 30px;
          left: 50%;
          margin-left: -65px;
          .upbutton {
            position: absolute;
            width: 130px;
            height: 30px;
            opacity: 0;
            cursor: pointer;

          }
          i {
            color: #4583F0;
            position: absolute;
            left: 50%;
            margin-left: -38px;
            top: 50%;
            margin-top: -7px;
            cursor: pointer;

          }
        }
      }

    }

    .main {
      /*width: 210px;*/
      /*height: calc(~ '100vh - 50px');*/
      /*background: yellow;*/
    }
  }

</style>
