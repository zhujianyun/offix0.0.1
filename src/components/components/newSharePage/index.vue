<template>
  <div id="newShare" v-if="false">
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
                            <div class="popover-content">这里提供了一系列基本元素样式，你可以通过区块右上角的编辑按钮修改样式设置。如需了解更多信息，请访问<a target="_blank"
                                                                                                             href="http://twitter.github.io/bootstrap/base-css.html">基本CSS.</a>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li style="display: none;" class="boxes" id="elmBase">
                        <div class="box box-element ui-draggable"><a href="#close" class="remove label label-important"><i
                          class="icon-remove icon-white"></i>删除</a> <span class="drag label"><i class="icon-move"></i>拖动</span>
                          <span class="configuration">
                  <button type="button" class="btn btn-mini" data-target="#editorModal" role="button"
                          data-toggle="modal">编辑</button>
                  <span class="btn-group"> <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown"
                                              href="#">对齐 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li class="active"><a href="#" rel="">默认</a></li>
                <li class=""><a href="#" rel="text-left">靠左</a></li>
                <li class=""><a href="#" rel="text-center">居中</a></li>
                <li class=""><a href="#" rel="text-right">靠右</a></li>
              </ul>
              </span> <span class="btn-group"> <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#">标记 <span
                            class="caret"></span></a>
              <ul class="dropdown-menu">
                <li class="active"><a href="#" rel="">默认</a></li>
                <li class=""><a href="#" rel="muted">禁用</a></li>
                <li class=""><a href="#" rel="text-warning">警告</a></li>
                <li class=""><a href="#" rel="text-error">错误</a></li>
                <li class=""><a href="#" rel="text-info">提示</a></li>
                <li class=""><a href="#" rel="text-success">成功</a></li>
              </ul>
              </span> </span>
                          <div class="preview">标题栏</div>
                          <div class="view">
                            <h3 contenteditable="true" class="oneText">h3. 这是一套可视化布局系统.</h3>
                          </div>
                        </div>
                        <div class="box box-element ui-draggable"><a href="#close" class="remove label label-important"><i
                          class="icon-remove icon-white"></i>删除</a> <span class="drag label"><i class="icon-move"></i>拖动</span>
                          <span class="configuration"><button type="button" class="btn btn-mini" data-target="#editorModal"
                                                              role="button" data-toggle="modal">编辑</button> <span
                            class="btn-group"> <a
                            class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#">对齐 <span
                            class="caret"></span></a>
              <ul class="dropdown-menu">
                <li class="active"><a href="#" rel="">默认</a></li>
                <li class=""><a href="#" rel="text-left">靠左</a></li>
                <li class=""><a href="#" rel="text-center">居中</a></li>
                <li class=""><a href="#" rel="text-right">靠右</a></li>
              </ul>
              </span>
                  <span class="btn-group"> <a class="btn btn-mini dropdown-toggle" data-toggle="dropdown"
                                              href="#">标记 <span
                    class="caret"></span></a>
              <ul class="dropdown-menu">
                <li class="active"><a href="#" rel="">默认</a></li>
                <li class=""><a href="#" rel="muted">禁用</a></li>
                <li class=""><a href="#" rel="text-warning">警告</a></li>
                <li class=""><a href="#" rel="text-error">错误</a></li>
                <li class=""><a href="#" rel="text-info">提示</a></li>
                <li class=""><a href="#" rel="text-success">成功</a></li>
              </ul>
              </span> <a class="btn btn-mini" href="#" rel="lead">Lead</a> </span>
                          <div class="preview">段落</div>
                          <div class="view oneText" contenteditable="true">
                            <p>
                              <em>Git</em>
                              是一个分布式的版本控制系统，最初由<b>Linus Torvalds</b>编写，用作Linux内核代码的管理。在推出后，Git在其它项目中也取得了很大成功，尤其是在Ruby社区中。
                            </p>
                          </div>
                        </div>


                        <div class="box box-element ui-draggable"><a href="#close" class="remove label label-important"><i
                          class="icon-remove icon-white"></i>删除</a> <span class="drag label"><i class="icon-move"></i>拖动</span>
                          <span class="configuration"><button type="button" class="btn btn-mini" data-target="#editorModal"
                                                              role="button" data-toggle="modal">编辑</button> <a
                            class="btn btn-mini"
                            href="#"
                            rel="dl-horizontal">竖向对齐</a> </span>
                          <div class="preview">详细描述</div>
                          <div class="view">
                            <dl contenteditable="true" class="oneText">
                              <dt>今日工作内容</dt>
                              <dd>1.完成效果图</dd>
                            </dl>
                          </div>
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
                          <div class="view"><img alt="140x140" src="../../../static/BootstrapTPY20160113/img/a.jpg"></div>
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
        <div id="showMian" class="showMain">
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
            <div class="modal-footer"><a id="savecontent" class="btn btn-primary" data-dismiss="modal">保存</a> <a class="btn"
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
                <button type="button" id="fluidPage" class="active btn btn-info"><i class="icon-fullscreen icon-white"></i>
                  自适应宽度
                </button>
                <button type="button" class="btn btn-info" id="fixedPage"><i class="icon-screenshot icon-white"></i> 固定宽度
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
      </div>
      <ul class="optionButton">
        <li class="iconfont icon-T"></li><span></span>
        <li id="undo" class="iconfont icon-47"></li>
        <li id="redo" class="iconfont icon-48"></li><span></span>
        <li id="clear" class="iconfont icon-qingchu"></li><span></span>
        <li @click="scaleSub()">-</li>
        <li>{{saclePercent}}</li>
        <li @click="scaleAdd()">+</li>
      </ul>
      <!--右侧文件列表部分-->
      <div class="rightNav">
        <div class="fileTitle">内容选择面板</div>
        <div class="searchBox">
          <i class="el-icon-search"></i>
          <input type="text" placeholder="搜索对象">
        </div>
        <div class="fileList">
          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title" id="informationList">
                <el-checkbox v-model="checked"></el-checkbox>
                <img src="../../assets/img/bg.jpg" alt="">
                <span class="nameAndJob ml-10">
                   <p>1</p>
                   <p>1</p>
                 </span>
                <span class="completionStatus ml-10">已完成</span>
                <span class="fileName ml-10">0/0</span>
              </template>
              <div class="fileLists">
                <ul>
                  <li>
                    <img src="" alt="">
                    <span>1111</span>
                    <span>1111</span>
                  </li>
                </ul>
              </div>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                一致性 Consistency
              </template>
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
          </el-collapse>
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
        scaleSize: 1, // 初始放大size
        saclePercent: 100, // 放大百分比
      }
    },
    methods: {
      tab(index) {
        this.num = index;
      },

      // 放大
      scaleAdd() {
        if(this.saclePercent >= 200) {
          return;
        }
        this.scaleSize = this.scaleSize + 0.25;
        this.saclePercent = this.saclePercent + 25;
        this.scaleSet(this.scaleSize);

      },

      // 缩小
      scaleSub() {
        if(this.saclePercent <= 25) {
          return;
        }
        this.scaleSize = this.scaleSize - 0.25;
        this.saclePercent = this.saclePercent - 25;
        this.scaleSet(this.scaleSize);
      },

      // 放大缩小
      scaleSet(size) {
        $('#showMian').css('zoom', size);
        $('#showMian')[0].style.zoom = size;
        $('#showMian')[0].cssText += '; -moz-transform: scale(' + size + ');-moz-transform-origin: 0 0; ';
      },


    },
    created() {

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
      i{
        margin-top:11px;
      }
      h1 {
        text-align: center;
        font-size: 24px;
      }
      input{
        width: 102px;
        height: 32px;
        border-radius: 6px;
        border: 1px solid  @dominantHue;
        position: absolute;
        right: 100px;
        top: 10px;
        color:@dominantHue ;
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
      }
      .optionButton{
        position: fixed;
        bottom:30px;
        left: 50%;
        margin-left:-163px ;
        width: 320px;
        height: 40px;
        line-height: 40px;
        padding: 8px;
        background:@dominantHue ;
        .border_radius(@br: 6px);
        .box_sizing;

        li, span{
          float: left;
          color: @bgColor;
          font-weight: 700;
          .dis-in-bl;
          .cur;
          line-height:24px;

          margin-left: 20px;
        }

        li:first-of-type {
          margin-left: 8px;


        }

        span {
          width: 2px;
          height: 24px;
          background-color: #fff;

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
              margin-left: 20px;
            }
          }
          .nameAndJob {
            display: inline-block;
            vertical-align: middle;
            width: 50px;
            background: red;
            p {
              line-height: 1;
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
