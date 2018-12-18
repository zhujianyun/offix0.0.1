<template>
  <div id="newShare" class="h5share">
    <!--头部-->
    <div class="top">
      <span class="return_card fl cur" @click="returnCard"><i class="el-icon-back"></i> 返回</span>
      <input type="text" id="setTheme" placeholder="点击输入分享主题">
      <input class="share_button" type="button" value="保存" @click="shareSave">
    </div>
    <!--下边内容部分-->
    <div class="bottomMain">
      <!--左侧导航-->
      <div class="leftNav fl">
        <div class="model_nav">
          <el-tabs :tab-position="tabPosition" style="width: 300px;">
            <el-tab-pane label="内容">
              <span slot="label">
                  <i class="iconfont icon-moban"></i>
                  <p>内容</p>
              </span>
              <div class="templates">
                <p class="temTop">页面风格</p>
                <!--手机-->
                <ul class="clearfix" v-if="false">
                  <li v-for="(tab,index) in tabs" :key="index" :class="{active:index == num}" class="checked fl"
                      @click="tabSwitchover(index)">{{tab}}
                  </li>
                </ul>
                <div class="tabCon">
                  <div v-show="true" id="mdPhone">
                    <div v-for="(list,index) in imgList" :key="index" class="md_list"
                         :class="{'md_click': index === mdOrder}">
                      <!-- <img ondragstart="return false" :src="list.url" alt=""/> -->
                      <img ondragstart="return false" :src="list.url" alt="" @click="ChooseTemplate(index)"/>
                      <p class="md_title">{{list.title}}</p>
                    </div>
                  </div>
                  <div v-show="false">邮件</div>
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
                  <table
                    class="grid_divs"
                    draggable="true"
                    @dragstart="gridDivDragStar($event)">
                    <tr class="grid_tr">
                      <td class="every_grid">
                        <div class="main_grid_div" v-if="false"> 
                          <i class="text_clear_every iconfont icon-guanbi1"></i>
                          <div class="grid_div_p" contenteditable="false" placeholder="请输入内容"></div>
                        </div>
                        <div class="grid_files">
                          <i class="text_clear_every iconfont icon-guanbi1"></i>
                          <p class="file_empty">请拖入文件</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                  <table
                    class="grid_divs"
                    draggable="true"
                    @dragstart="gridDivDragStar($event)"
                  >
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                    </tr>
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                    </tr>
                  </table>
                  <table
                    class="grid_divs"
                    draggable="true"
                    @dragstart="gridDivDragStar($event)"
                  >
                    <!--<i class="grid_clear_every iconfont icon-guanbi1"></i>-->
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                    </tr>

                  </table>
                  <table
                    class="grid_divs"
                    draggable="true"
                    @dragstart="gridDivDragStar($event)"
                  >
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                    </tr>
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                    </tr>
                  </table>
                  <table
                    class="grid_divs"
                    draggable="true"
                    @dragstart="gridDivDragStar($event)"
                  >
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                    </tr>
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                    </tr>
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                    </tr>
                  </table>
                  <table
                    class="grid_divs"
                    draggable="true"
                    @dragstart="gridDivDragStar($event)"
                  >
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                    </tr>
                  </table>
                  <table
                    class="grid_divs"
                    draggable="true"
                    @dragstart="gridDivDragStar($event)"
                  >
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                    </tr>
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                    </tr>
                  </table>
                  <table
                    class="grid_divs"
                    draggable="true"
                    @dragstart="gridDivDragStar($event)"
                  >
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                    </tr>
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                    </tr>
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                    </tr>
                  </table>
                  <table
                    class="grid_divs"
                    draggable="true"
                    @dragstart="gridDivDragStar($event)"
                  >
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                    </tr>
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                    </tr>
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                    </tr>
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                    </tr>
                  </table>
                  <table
                    class="grid_divs"
                    draggable="true"
                    @dragstart="gridDivDragStar($event)"
                  >
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                    </tr>
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                    </tr>
                    <tr class="grid_tr">
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                      <td class="every_grid"></td>
                    </tr>
                  </table>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="背景">
                <span slot="label">
                  <i class="iconfont icon-757bianjiqi_beijing"></i>
                  <p>背景</p>
                </span>
                <div class="seTbackgroundColor">
                  <div>
                    <!-- <span class="color_k" @click="setBgColor"> -->

                    <!-- </span> -->
                  </div>
                </div>
            </el-tab-pane>

            <!-- <el-tab-pane label="素材">
              <span slot="label">
                  <i class="iconfont icon-sucai"></i>
                <p>素材</p>
              </span>
            </el-tab-pane> -->
          </el-tabs>
        </div>


      </div>
      <!--右侧选项卡-->

      <!--中间显示区域-->
      <div id="middleMain" class="middleMain">
        <div id="editPage" class="editPage">
          <div
            id="showMain"
            class="showMain"
            @dragenter="mainDragEnter($event)"
            @dragover="mainDragOver($event)"
            @dragleave="mainDragLeave($event)"
            @dragend="mainDragEnd($event)"
            @drop="mainDrop($event)"
            @dblclick="dblclick($event)"
          >

          </div>
        </div>
      </div>
      <quill-editor
        v-if="true"
        id="bubble"
        class="bubble"
        draggable="true"
        v-model="contentText"
        :options="editorOption"
        ref="qullEdit"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)">
      </quill-editor>
      <div class="add_reserve" id="add_reserve"></div>
      <div class="add_file_reserve" id="add_file_reserve"></div>
      <!--  模板->手机-> 模板   -->
      <div id="modelList" class="model_list" v-show="false">
        <div class="modelThree">
          <div class="main_grid_div" draggable="true" style="display:block;margin: 25px auto 15px">
            <div class="grid_div_p only_text" contenteditable="false">
              <h3 style="font-family: PingFangSC-Semibold, sans-serif;">来自{{Uname}}的分享</h3>
            </div>
            <i class="text_clear_every iconfont icon-guanbi1"></i>
          </div>
          <div class="main_grid_div" draggable="true" style="display:none;">
            <div class="grid_div_p only_text" contenteditable="false" placeholder="请输入文字内容">
              <p style="line-height: 1.5;">
                <span class="ql-align-justify" style="rgba(51,51,51,1);" v-html="content.Content"></span>
              </p>
            </div>
            <i class="text_clear_every iconfont icon-guanbi1"></i>
          </div>
          <table
            class="grid_divs grid_div_toggle md_three"
            draggable="true"
            @dragstart="gridDivDragStar($event)"
            v-for="(filelist,index) in cooperationName"
            :key="index"
            :data-ids="filelist.UserId"
            v-show="filelist.checked"
          >
            <tr class="grid_tr">
              <td class="every_grid">
                <div class="main_grid_div" draggable="true" style="display:block;margin-bottom: 20px">
                  <div class="grid_div_p" contenteditable="false">
                    <h5 class="ql-align-center" style="font-family: PingFangSC-Semibold, sans-serif;">
                      {{filelist.UserName}}</h5>
                    <h6 v-if="filelist.Job" class="ql-align-center" style="width: 100px; margin: 0 auto;border-bottom: 1px solid #4583F0;padding-bottom: 3px">
                      <span style="color: rgb(153,153,153);">{{filelist.Job}}</span>
                    </h6>
                    <p v-for="(contents,index1) in personContent[1][index]" :key="index1+'c'"
                       style="line-height: 1.5;margin-top: 20px;">
                      <span class="ql-align-justify" style="rgba(51,51,51,1);" v-html="contents.Content"></span>
                    </p>
                  </div>
                  <i class="text_clear_every iconfont icon-guanbi1"></i>
                </div>
                <div class="grid_file_equal" style="width: 33.33%;" draggable="true" :fileid="list.Pkid"
                    v-if="filelist && filelist.TaskFileList"
                  v-for="(list,index) in filelist.TaskFileList" :key="index">
                  <div class="grid_file_li my-gallery">
                    <figure v-if="list.FileTypeNum === 1" class="figure">
                      <a class="preview_a" :src="list.Url" :w="list.ImageWidth" :h="list.ImageHeight">
                        <img class="typeOne grid_file_img" :filetype="list.FileTypeNum" :datasrc="list.Url" :src="list.Titles ?list.Titles : list.Url"/>
                      </a>
                    </figure>
                    <a class="preview_b" v-else :src="list.Url" :downs="list.Title+'.'+list.FileType">
                      <img class="typeTwo grid_file_img" :filetype="list.FileTypeNum" :datasrc="list.Url" :src="list.FileTypeNum > 0 ? fileTypeImg[list.FileTypeNum - 2].src : fileTypeImg[fileTypeImg.length - 1].src">
                    </a>
                    <span class="grid_file_span">{{list.Title}}.{{list.FileType}}</span>
                    <i class="grid_del_file iconfont icon-guanbi1"></i>
                  </div>

                </div>
              </td>
            </tr>
          </table>

          <div class="main_grid_div" draggable="true" style="display:block;margin-top: 10px;">
            <div class="grid_div_p only_text" contenteditable="false">
              <P><span style="color: rgba(153,153,153,1);">BEST WISHES</span></P>
              <P><span class="" style="color: rgba(153,153,153,1);">{{content.UName}}</span></P>
            </div>
            <i class="text_clear_every iconfont icon-guanbi1"></i>
          </div>

        </div>
        <div class="modelOne">
          <div class="main_grid_div" draggable="true" style="display:block;margin: 25px auto 15px;">
            <div class="grid_div_p only_text" contenteditable="false">
              <h3>来自{{Uname}}的分享</h3>
            </div>
            <i class="text_clear_every iconfont icon-guanbi1"></i>
          </div>
          <div class="main_grid_div" draggable="true" style="display:block;"
               v-for="(contents,index) in personContent[0]" :key="index+'a'">
            <div class="grid_div_p only_text" contenteditable="false" placeholder="请输入文字内容">
              <p style="line-height: 1.5;"><span style="rgba(51,51,51,1);" v-html="contents.Content"></span></p>
            </div>
            <i class="text_clear_every iconfont icon-guanbi1"></i>
          </div>
          <table
            class="grid_divs grid_div_toggle md_one"
            draggable="true"
            @dragstart="gridDivDragStar($event)"
            v-if="personFile && personFile.TaskFileList"
            :data-ids="personFile.UserId"

          >
            <tr class="grid_tr">
              <td class="every_grid">
                <div class="grid_file_equal" style="width: 33.33%;" draggable="true" :fileid="list.Pkid"
                     v-for="(list,index) in personFile.TaskFileList" :key="index" >
                  <div class="grid_file_li ">
                    <figure v-if="list.FileTypeNum === 1" class="figure">
                      <a class="preview_a" :src="list.Url" :w="list.ImageWidth" :h="list.ImageHeight">
                        <img class="typeOne grid_file_img" :filetype="list.FileTypeNum" :datasrc="list.Url" :src="list.Titles ?list.Titles : list.Url"/>
                      </a>
                    </figure>
                    <a v-else class="preview_b" :src="list.Url" :downs="list.Title+'.'+list.FileType">
                      <img class="typeTwo grid_file_img" :filetype="list.FileTypeNum" :datasrc="list.Url" :src="list.FileTypeNum > 0 ? fileTypeImg[list.FileTypeNum - 2].src : fileTypeImg[fileTypeImg.length - 1].src">
                    </a>
                    <i class="grid_del_file iconfont icon-guanbi1"></i>
                    <span class="grid_file_span">{{list.Title}}.{{list.FileType}}</span>
                  </div>
                </div>
              </td>
            </tr>
          </table>
          <div class="main_grid_div" draggable="true" style="display:block;margin-top: 10px;">
            <div class="grid_div_p only_text" contenteditable="false">
              <P><span style="color: rgba(153,153,153,1);">BEST WISHES</span></P>
              <P><span style="color: rgba(153,153,153,1);">{{content.UName}}</span></P>
            </div>
            <i class="text_clear_every iconfont icon-guanbi1"></i>
          </div>

        </div>
        <div class="modelTwo">
          <div class="main_grid_div" draggable="true" style="display:block;margin: 25px auto 15px">
            <div class="grid_div_p only_text" contenteditable="false">
              <h3>来自{{Uname}}的分享</h3>
            </div>
            <i class="text_clear_every iconfont icon-guanbi1"></i>
          </div>
          <div class="main_grid_div" draggable="true" style="display:block;"
               v-for="(contents,index) in personContent[0]" :key="index + 'b'">
            <div class="grid_div_p only_text" contenteditable="false" placeholder="请输入文字内容">
              <p style="line-height: 1.5;"><span style="rgba(51,51,51,1);" v-html="contents.Content"></span></p>
            </div>
            <i class="text_clear_every iconfont icon-guanbi1"></i>
          </div>

          <table
            class="grid_divs grid_div_toggle md_two"
            draggable="true"
            @dragstart="gridDivDragStar($event)"
            v-if="personFile && personFile.TaskFileList"
            v-for="(list,index) in personFile.TaskFileList" :key="index"
            >
            <tr class="grid_tr">
              <td class="every_grid">
                <div class="grid_file_equal" style="width: 100%;" draggable="true" :fileid="list.Pkid">
                  <div class="grid_file_li">
                    <figure v-if="list.FileTypeNum === 1" class="figure">
                      <a class="preview_a" :src="list.Url" :w="list.ImageWidth" :h="list.ImageHeight">
                        <img class="typeOne grid_file_img" :filetype="list.FileTypeNum" :datasrc="list.Url" :src="list.Titles ?list.Titles : list.Url"/>
                      </a>
                    </figure>
                    <a v-else class="preview_b" :src="list.Url" :downs="list.Title+'.'+list.FileType">
                      <img class="typeTwo grid_file_img" :filetype="list.FileTypeNum" :datasrc="list.Url" :src="list.FileTypeNum > 0 ? fileTypeImg[list.FileTypeNum - 2].src : fileTypeImg[fileTypeImg.length - 1].src">
                    </a>
                    <span class="grid_file_span">{{list.Title}}.{{list.FileType}}</span>
                    <i class="grid_del_file iconfont icon-guanbi1"></i>
                  </div>

                </div>
              </td>
              <td class="every_grid">
                <div class="main_grid_div" draggable="true" style="display:block; ">
                  <div class="grid_div_p" contenteditable="false" placeholder="输入文件描述"
                       :filename="list.Title+'.'+list.FileType">
                  </div>
                  <i class="text_clear_every iconfont icon-guanbi1"></i>
                </div>
              </td>
            </tr>
          </table>

          <div class="main_grid_div" draggable="true" style="display:block; margin-top: 30px">
            <div class="grid_div_p only_text" contenteditable="false">
              <P><span style="color: rgba(153,153,153,1);">BEST WISHES</span></P>
              <P><span style="color: rgba(153,153,153,1);">{{content.UName}}</span></P>
            </div>
            <i class="text_clear_every iconfont icon-guanbi1"></i>
          </div>
        </div>
      
      </div>
      <ul class="optionButton">


        <div
          id="demos" class="main_grid_div"
          draggable="true"
        >
          <div class="grid_div_p" contenteditable="false" placeholder="请输入文字"></div>
          <i class="text_clear_every iconfont icon-guanbi1"></i>
        </div>
        <li class="iconfont icon-T" @click="addText"></li>
        <span></span>
        <li id="undo" class="iconfont icon-47"></li>
        <li id="redo" class="iconfont icon-48"></li>
        <span></span>
        <li id="clear" class="iconfont icon-qingchu" @click="mainClear"></li>
        <span></span>
        <li @click="scaleSub()">-</li>
        <li>{{saclePercent}}</li>
        <li @click="scaleAdd()">+</li>
      </ul>
      <!--右侧文件列表部分-->
      <div class="rightNav">
        <div class="fileTitle">选择分享内容</div>
        <div class="searchBox">
          <i class="el-icon-search"></i>
          <input type="text" placeholder="搜索对象">
        </div>
        <div class="fileList">
          <el-collapse>
            <el-collapse-item v-for="(list,index) in cooperationName" :key="index">
              <template slot="title">
                <el-checkbox v-model="list.checked" @change="selectCheckbox(list, list.checked)" :disabled="selectDis"></el-checkbox>
                <img v-if="list.Pic" :src=list.Pic alt="">
                <span v-if="!list.Pic" class="span_img">概述</span>
                <span class="nameAndJob ml-10">
                  <p>{{list.UserName}}</p>
                  <p v-if="list.Job" style="color: #999999">{{list.Job}}</p>
                </span>
                <span v-if="list.Job" class="completionStatus">{{list.State ? '已完成' : '未完成'}}</span>
                <span v-if="list && list.TaskFileList" class="fileName">{{list.filenum}}/{{list.TaskFileList.length}}</span>
              </template>
              <div  v-if="list && list.TaskFileList && fileList.dragFile" v-for="(fileList,index) in list.TaskFileList" :key="index">
                <ul id="fileLists">
                  <div class="sidebar-nav" style="left:1050px">
                    <div class="box box-element ui-draggable">
                        <span class="drag label" id="file"
                        >
                          <li
                            class="view list clearfix" draggable="true"
                            @dragstart="fileDragStar(fileList)"
                          >
                        <a v-if="fileList.FileTypeNum === 1" :src="fileList.Titles">
                          <img class="typeOne" :src="fileList.Titles ?fileList.Titles : fileList.Url"/>
                        </a>
                        <!-- <a v-else :src="fileList.Titles">
                          <img class="typeTwo" :src="fileList.FileTypeNum > 0 ? fileTypeImg[fileList.FileTypeNum - 2].src : fileTypeImg[fileTypeImg.length - 1].src">
                        </a> -->
                        <a v-if="fileList.FileTypeNum === 2">
                          <img class="typeTwo" src="../../../assets/img/icon2/2.png">
                        </a>
                        <a v-if="fileList.FileTypeNum === 3">
                          <img class="typeTwo" src="../../../assets/img/icon2/3.png">
                        </a>
                        <a v-if="fileList.FileTypeNum === 4">
                          <img class="typeTwo" src="../../../assets/img/icon2/4.png">
                        </a>
                        <a v-if="fileList.FileTypeNum === 5">
                          <img class="typeTwo" src="../../../assets/img/icon2/5.png">
                        </a>
                        <a v-if="fileList.FileTypeNum === 6">
                          <img class="typeTwo" src="../../../assets/img/icon2/6.png">
                        </a>
                        <a v-if="fileList.FileTypeNum === 7">
                          <img class="typeTwo" src="../../../assets/img/icon2/7.png">
                        </a>
                        <a v-if="fileList.FileTypeNum === 8">
                          <img class="typeTwo" src="../../../assets/img/icon2/8.png">
                        </a>
                        <a v-if="fileList.FileTypeNum === 9">
                          <img class="typeTwo" src="../../../assets/img/icon2/9.png">
                        </a>
                        <a v-if="fileList.FileTypeNum === 10">
                          <img class="typeTwo" src="../../../assets/img/icon2/10.png">
                        </a> 
                        <a v-if="fileList.FileTypeNum === 11">
                          <img class="typeTwo" src="../../../assets/img/icon2/11.png">
                        </a>
                        <a v-if="fileList.FileTypeNum === 0">
                          <img class="typeTwo" src="../../../assets/img/icon2/0.png">
                        </a>
                        <span class="fileName">{{fileList.Title}}.{{fileList.FileType}}</span>
                        <span class="fileSize">{{fileList.Size}}KB</span>
                      </li>
                          <!--<div class="view">移动</div>-->
                      </span>

                    </div>
                  </div>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <el-upload
          class="upInput"
          :action="'/File.ashx?publisher='+publishID+'&informationType=coll&edition='+nowSelectedEdition+'&information='+articlePkid+'&groupedition=1'"
          :show-file-list="false"
          :multiple="true"
          :limit="9"
          :on-exceed="handleExceed"
          :on-success="uploadSuccessEvery"
          :on-change="uploadChangeEvery"
          :on-progress="uploadProgress"
          :before-upload="beforeUpload">
          <span class="el_icon el-icon-upload2 cur fl" title="上传"></span>
          <span class='upbutton cur fr'>上传附件</span>
        </el-upload>
      </div>
    </div>
    <popup-share v-if="sharePopupFlag" :editorQrcode="editorQrcode" :editorUrl="editorUrl" :shareId="shareId"
:teskId="articlePkid" @shareClose="shareClose"></popup-share>
                   <!-- 上传进度 -->
    <uploadProgress v-if="uploadProgressFlag" :fileProgressList="fileProgressList" @closeProgress="closeProgress"></uploadProgress>
  </div>
</template>
<script>
import CSS from "./getCss";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import popupShare from "./H5sharePop.vue";
import uploadProgress from "../../common/uploadProgress";

export default {
  components: {
    quillEditor,
    popupShare,
    uploadProgress
  },
  data() {
    return {
      Uname: "", // 登录者名字
      publishID: "", // 当前发布人的ID
      articlePkid: "", // 任务ID
      author: "", // 登陆者ID
      nowSelectedEdition: 1, // 现在选择的文件版本
      undoList: [], // 撤回数据数组
      undoNum: 0, // 操作变化
      tabPosition: "left",
      tabs: ["手机", "邮件"],
      tabContents: ["内容一", "内容二"],
      num: 0,
      checked: true,
      scaleSize: 1, // 初始放大size
      saclePercent: 100, // 放大百分比
      dragDom: "", // 拖拽的元素
      addPhtml: "", // 添加文本
      exchangeFlag: null, // 拖拽交换排序标识,
      content: "",
      contentText: "", // 富文本编辑器的内容
      editorOption: {
        theme: "bubble",
        placeholder: "",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            // [{ 'font': [{'font-family': '"Microsoft YaHei", "PingFang SC", "Helvetica Neue"'}] }],
            [{ align: [] }],
            ["clean"]
          ]
        }
      },
      qullContent: [],
      htmlCode: "", // HTML片段拼接
      cooperationName: "", //别选择的人 及 列表信息
      fileHtml: "", //文件片段
      fileTypeImg: [
        {
          src: require("../../../assets/img/icon2/2.png")
        },
        {
          src: require("../../../assets/img/icon2/3.png")
        },
        {
          src: require("../../../assets/img/icon2/4.png")
        },
        {
          src: require("../../../assets/img/icon2/5.png")
        },
        {
          src: require("../../../assets/img/icon2/6.png")
        },
        {
          src: require("../../../assets/img/icon2/7.png")
        },
        {
          src: require("../../../assets/img/icon2/8.png")
        },
        {
          src: require("../../../assets/img/icon2/9.png")
        },
        {
          src: require("../../../assets/img/icon2/10.png")
        },
        {
          src: require("../../../assets/img/icon2/0.png")
        }
      ],
      insertIndex: 0, // 拖拽到哪
      everyGridFlag: false, // 点击格子里
      editTextId: "nowEdit", // 现在点击的文本
      sharePopupFlag: false, // 分享弹窗显示隐藏flag
      QRCodeUrl: "", // 二维码地址
      shareLink: "", // 分享链接
      shareId: "", // 分享ID
      PclassHave: null, // 是否可以放文件
      isLeaveDragFlag: false, // 落下时是否在有效区域
      enterClassList: [], // 拖拽进入class列表
      personFile: [], // 个人文件列表
      personContent: [], // 任务内容列表
      imgList: [
        { url: require("../../../assets/img/model3.jpg"), title: "多人模板1" }
        // { url: require("../../../assets/img/model1.jpg"), title: "单人模板1" },
        // { url: require("../../../assets/img/model2.jpg"), title: "单人模板2" }
      ], // 模板视图列表
      mdOrder: null, // 当前点击的模板
      uploadProgressFlag: false, // 上传进度显示隐藏
      fileProgressList: [], // 上传进度列表
      sharePkid: "", // 分享id
      editorQrcode: "", //高级编辑二维码
      editorUrl: "", //高级编辑url
      selectDis: false,
      selectList: "" // 被选择人的id列表
    };
  },
  watch: {
    contentText(val) {
      this.editTextHtml = val;
      // console.log('contentText', this.editTextHtml);
      this.$nextTick(() => {
        $("#nowEdit")
          .find(".grid_div_p:eq(0)")
          .html(this.editTextHtml);
        $("#nowEdit").height($("#bubble").height());

        // console.log('+++nowEdit', $('#nowEdit').find('.grid_div_p:eq(0)').html());
      });
    }
  },
  computed: {
    editor() {
      // return console.log(this.$refs.qullEdit.quill);
    }
  },
  methods: {
    // 关闭文件上传视图
    closeProgress() {
      this.uploadProgressFlag = false;
      this.fileProgressList = [];
    },

    // 进度判断是否全部完成
    popFileProgress(list) {
      let indexs = list.findIndex(ele => {
        return ele.progress < 100;
      });
      if (indexs == -1) {
        return true;
      } else {
        return false;
      }
    },

    // 文本编辑器失焦，获取焦点，开始编辑
    onEditorBlur(quill) {
      // console.log('editor blur!',  quill);
      $("#nowEdit")
        .find(".grid_div_p:eq(0)")
        .html($(this.editTextHtml));
      $("#nowEdit")
        .find(".grid_div_p:eq(0)")
        .show();
      if ($("#nowEdit")) {
        // 文本正在编辑
        $("#nowEdit").removeClass("main_t_grid_border");
      }
      $("#nowEdit").removeAttr("id");

      $("#bubble").hide();
    },
    onEditorFocus(quill) {
      this.contentText = $("#nowEdit")
        .find(".grid_div_p:eq(0)")
        .html();
      $("#nowEdit")
        .find(".grid_div_p:eq(0)")
        .hide();
      // console.log('editor focus!', quill);
    },
    onEditorReady(quill) {
      // console.log('editor ready!', quill);
    },

    // 撤回操作
    undo(val) {
      $("#showMain").html(val);
    },
    // 设置背景色
    setBgColor() {},
    // 清除默认值
    clearHtml() {
      this.insertIndex = 0;
      this.fileHtml = "";
      this.dragDom = "";
      this.PclassHave = null;
      this.isLeaveDragFlag = false;
      this.enterClassList = [];
      this.mainDragEnd();
    },

    // 删除元素时对文件的影响
    clearFile(file) {
      let fileId = file.attr("fileid");
      if (fileId) {
        for (let i of this.cooperationName) {
          for (let j of i.TaskFileList) {
            if (!j.dragFile && j.Pkid.toString() === fileId.toString()) {
              j.dragFile = true;
              i.filenum++;
            }
          }
        }
      }
    },

    // 获取父级元素class
    getParent(e, className) {
      /// console.log(e, className);
      let Pclass = e.attr("class");
      let ele = e;
      if (Pclass.indexOf("showMain") !== -1) {
        return [false, ele];
      }
      if (this.PclassHave && Pclass.indexOf(className) !== -1) {
        return [this.PclassHave, ele];
      }
      if (Pclass.indexOf(className) === -1) {
        this.PclassHave = false;
        ele = e.parent();
        return this.getParent(ele, className);
      } else {
        this.PclassHave = true;
        return [this.PclassHave, ele];
      }
    },

    // 获取父级元素-->查找类名
    getParent1(e) {
      e = e.parent();
      let classN = e.attr("class");
      let ele = e;
      if (classN) {
        return ele;
      } else {
        return this.getParent1(ele);
      }
    },

    // 获取every_grid的宽度，自适应文件
    everyGridWidth(ele, file) {
      let width = ele.width();
      if (width < 70) {
        file.width("100%");
      } else if (width < 140) {
        // 1个
        file.width("100%");
      } else if (width < 210) {
        // 2个
        file.width("50%");
      } else {
        // 3个
        file.width("33.33%");
      }
    },
    // 格子开始拖拽时触发
    gridDivDragStar(e) {
      let dom = $(e.target);
      this.fileHtml = "";
      this.dragDom = "";
      this.exchangeFlag = null;
      if (dom.attr("class").indexOf("every_grid") !== -1) {
        this.dragDom = dom
          .parent()
          .parent()
          .clone(true);
      } else {
        this.dragDom = dom.clone(true);
      }
      this.onEditorBlur();
      console.log("格子开始拖拽", this.dragDom[0]);
      // e.dataTransfer.setData("text/html",JSON.stringify(this.dragDom[0]));
    },

    // 当一个被拖动的元素或者选中的文本进入一个有效的放置目标时触发，应用在目标元素上
    mainDragEnter(e) {
      e.preventDefault();
      this.isLeaveDragFlag = true;
      let tg = $(e.target);

      let enterClass = tg.attr("class");

      if (!enterClass) {
        tg = this.getParent1(tg);
        enterClass = tg.attr("class");
      }
      // console.log('enter进入', enterClass);

      let getReturn1 = this.getParent(tg, "grid_file_equal");
      let getReturn2 = this.getParent(tg, "every_grid");
      let getReturn3 = this.getParent(tg, "main_grid_div");
      let getReturn4 = this.getParent(tg, "only_text");
      // 文件
      if (this.fileHtml) {
        if (getReturn1[0]) {
          this.insertIndex = getReturn1[1].index();
          getReturn1[1].after($("#add_file_reserve"));
        } else if (getReturn2[0]) {
          this.insertIndex = getReturn2[1].children().length - 1;
          getReturn2[1].append($("#add_file_reserve"));
        } else if (getReturn3[0]) {
          this.insertIndex = getReturn3[1].index();
          getReturn3[1].after($("#add_file_reserve"));
        } else {
          this.insertIndex = getReturn1[1].children().length - 1;
          getReturn1[1].append($("#add_file_reserve"));
        }
        $("#add_file_reserve").css("display", "inline-block");
        return;
      }
      if (!this.fileHtml) {
        if (getReturn1[0] && !getReturn2[0]) {
          this.insertIndex = getReturn1[1].index();
        } else if (getReturn2[0]) {
          this.insertIndex = getReturn2[1]
            .parent()
            .parent()
            .index();
        } else if (getReturn4[0]) {
          this.insertIndex = getReturn4[1].parent().index();
        } else {
          this.insertIndex = getReturn1[1].children().length - 1;
        }
      }

      // 格子占位
      if (this.insertIndex === 0) {
        $("#showMain").prepend($("#add_reserve"));
        $("#add_reserve").show();
      } else {
        if (
          $("#showMain")
            .children()
            .eq(this.insertIndex)[0]
        ) {
          $("#showMain")
            .children()
            .eq(this.insertIndex)
            .after($("#add_reserve"));
          $("#add_reserve").show();
        } else {
          $("#showMain").append($("#add_reserve"));
          $("#add_reserve").show();
        }
      }

      // console.log('---mainDragEnter',this.insertIndex, e.target);
    },

    // 当拖动操作结束时触发（通过释放鼠标按钮或者点击转义键），应用在被拖拽元素上
    mainDragEnd(e) {
      // console.log(4);
      $("#showMain")
        .find(".add_reserve")
        .each(function() {
          $(this).hide();
        });
      $("#showMain")
        .find(".add_file_reserve")
        .each(function() {
          $(this).css("display", "none");
        });
    },

    // 拖拽放在目标元素上触发
    mainDrop(e) {
      // console.log('----000mainDrop');
      let targetClass = $(e.target).attr("class");
      let dragClass = this.dragDom ? this.dragDom.attr("class") : "";
      // 文件在编辑器中拖拽
      if (
        this.dragDom[0] &&
        targetClass &&
        dragClass.indexOf("grid_file_equal") !== -1
      ) {
        this.clearHtml();
        return;
      }

      // 占位框消失
      if (
        this.dragDom[0] &&
        targetClass &&
        targetClass.indexOf("add_reserve") !== -1
      ) {
        $("#showMain")
          .find(".add_reserve")
          .each(function() {
            $(this).hide();
          });
      }

      // 右侧文件拖拽
      if (this.fileHtml && targetClass) {
        this.fileDrop(this.fileHtml, $(e.target), targetClass);
        this.clearHtml();
        return;
      }

      // 拖拽排序
      if (!this.dragDom) {
        return;
      }
      if (this.exchangeFlag) {
        if (this.insertIndex === 0) {
          $("#showMain").prepend(this.dragDom);
        } else {
          $("#showMain")
            .children()
            .eq(this.insertIndex)
            .after(this.dragDom);
        }
      } else {
        // 从左侧拖拽添加格子
        this.dragDom
          .find(".main_grid_div")
          .show()
          .addClass("grid_div_p_border");
        this.dragDom.addClass("grid_div_toggle1");
        if (this.insertIndex === 0) {
          $("#showMain").prepend(this.dragDom);
        } else {
          $("#showMain")
            .children()
            .eq(this.insertIndex)
            .after(this.dragDom);
        }
        this.bindResize(this.dragDom[0]);
      }

      this.clearHtml();
      e.preventDefault();
    },

    // 拖拽文件放下时的操作
    fileDrop(file, tgEle, tgClass) {
      if (tgClass.indexOf("add_file_reserve") !== -1) {
        $("#showMain")
          .find(".add_reserve")
          .each(function() {
            $(this).css("display", "none");
          });
      }
      let getReturn1 = this.getParent(tgEle, "grid_file_equal");
      let getReturn2 = this.getParent(tgEle, "every_grid");

      // 直接拖到页面里
      if (getReturn1[0] && getReturn2[0]) {
        this.everyGridWidth(getReturn1[1].parent(), file);
        getReturn1[1].after(file);
      } else if (!getReturn1[0] && getReturn2[0]) {
        this.everyGridWidth(getReturn2[1], file);
        getReturn2[1].append(file);
      } else if (getReturn1[0] && !getReturn2[0]) {
        this.everyGridWidth(getReturn1[1].parent(), file);
        getReturn1[1].after(file);
      } else if (!getReturn1[0] && !getReturn2[0]) {
        this.everyGridWidth(getReturn1[1], file);
        getReturn2[1].append(file);
      }

      let fileId = file.attr("fileid");
      if (fileId) {
        for (let i of this.cooperationName) {
          for (let j of i.TaskFileList) {
            if (j.dragFile && j.Pkid.toString() === fileId.toString()) {
              j.dragFile = false;
              i.filenum--;
            }
          }
        }
      }
    },

    // 当元素或者选中的文本被拖动到有效放置区域上方时触发（每几百毫秒触发一次），应用在目标元素上
    mainDragOver(e) {
      // console.log('mainDragOver', e.target)
      e.preventDefault();
    },

    // 当拖动元素或者选中的文本离开有效的放置区域时触发，应用在目标元素上
    mainDragLeave(e) {
      console.log(
        "11111mainDragLeave",
        this.isLeaveDragFlag,
        this.enterClassList
      );

      if (!this.isLeaveDragFlag) {
        $("#add_reserve").hide();
        $("#add_file_reserve").hide();
      }
      this.isLeaveDragFlag = false;
    },

    // 双击添加文本
    dblclick(e) {
      console.log("dblclick");
      this.addText($(e.target), false);
    },
    // 点击添加文本
    addText(ele, flag) {
      this.fileHtml = "";
      this.dragDom = "";

      this.addPhtml = $("#demos")[0].cloneNode(true);
      $(this.addPhtml).removeAttr("id");
      $(this.addPhtml)
        .find(".grid_div_p:eq(0)")
        .text("");
      $(this.addPhtml).css("display", "block");
      $(this.addPhtml).addClass("main_t_grid_border");
      if (!flag) {
        $(this.addPhtml)
          .find(".grid_div_p:eq(0)")
          .addClass("only_text");
      }
      if (this.everyGridFlag) {
        $(this.addPhtml).attr("draggable", false);
        ele.append($(this.addPhtml));
        this.everyGridFlag = false;
      } else {
        $("#showMain").append($(this.addPhtml));
      }
      this.clickT($(this.addPhtml).find(".grid_div_p:eq(0)"));
    },

    // 点击T文本的操作
    clickT(ele) {
      this.onEditorBlur();
      ele.parent().attr("id", "nowEdit");
      let scrollTops = $("#middleMain").scrollTop();
      this.editTextHtml = ele.html();
      this.contentText = this.editTextHtml;
      $("#bubble")
        .show()
        .css({
          left: this.getLeft(ele[0]) + "px",
          top: this.getTop(ele[0]) - scrollTops + "px",
          width: ele.width() + "px",
          height: ele.height() + "px"
        });
      $(".ql-tooltip:eq(0)").show();
      let quill = this.$refs.qullEdit.quill;
      quill.focus();
      ele.hide();
    },

    // 文件开始拖拽
    fileDragStar(file) {
      console.log(file);
      this.dragDom = "";
      let types = file.FileTypeNum;

      if (!file.FileTypeNum) {
        file.Titles = this.fileTypeImg[this.fileTypeImg.length - 1].src;
      } else if (file.FileTypeNum !== 1) {
        file.Titles = this.fileTypeImg[file.FileTypeNum - 2].src;
      }
      if (types === 1) {
        this.fileHtml =
          '<div class="grid_file_equal" draggable="true" fileid="' +
          file.Pkid +
          '">\n' +
          '                <div class="grid_file_li">\n' +
          '                 <figure class="figure">\n' +
          '                   <a class="preview_a" src="' +
          file.Url +
          '" w="' +
          file.ImageWidth +
          '" h="' +
          file.ImageHeight +
          '">\n' +
          '                     <img class="grid_file_img" filetype="' +
          file.FileTypeNum +
          '" datasrc="' +
          file.Url +
          '" src="' +
          file.Titles +
          '">\n' +
          "                   </a>\n" +
          "                 </figure>\n" +
          '                  <span class="grid_file_span">' +
          file.Title +
          "." +
          file.FileType +
          "</span>\n" +
          '                  <i class="grid_del_file iconfont icon-guanbi1"></i>\n' +
          "                </div>\n" +
          "              </div>";
      } else {
        this.fileHtml =
          '<div class="grid_file_equal" draggable="true" fileid="' +
          file.Pkid +
          '">\n' +
          '                <div class="grid_file_li">\n' +
          '                  <a class="preview_b" src="' +
          file.Url +
          '" downs="' +
          file.Title +
          "." +
          file.FileType +
          '">\n' +
          '                     <img class="grid_file_img" filetype="' +
          file.FileTypeNum +
          '" datasrc="' +
          file.Url +
          '" src="' +
          file.Titles +
          '">\n' +
          "                   </a>\n" +
          '                  <span class="grid_file_span">' +
          file.Title +
          "." +
          file.FileType +
          "</span>\n" +
          '                  <i class="grid_del_file iconfont icon-guanbi1"></i>\n' +
          "                </div>\n" +
          "              </div>";
      }

      this.fileHtml = $(this.fileHtml);
      // console.log('file', file,this.fileHtml);
    },

    // 元素放大缩小
    bindResize(el) {
      let els = el.style;
      let x = 0; // 鼠标的xy轴坐标
      let y = 0; // 鼠标的xy轴坐标
      let oneHeight = $(el).height();
      let cursors = $(el).css("cursor");
      $(el).mouseover(function(e) {
        x = e.clientX - el.offsetWidth;
        y = e.clientY - el.offsetHeight;
        if (
          Math.abs(el.offsetLeft + 300 - x) <= 10 &&
          Math.abs(el.offsetTop + 50 - y) <= 10
        ) {
          $(el).css("cursor", "nw-resize");
        } else {
          $(el).css("cursor", "move");
        }
      });
      $(el).mousedown(function(e) {
        // 按下元素后 计算当前鼠标与对象计算后的坐标
        x = e.clientX - el.offsetWidth;
        y = e.clientY - el.offsetHeight;
        if ($(el).css("cursor") === "nw-resize") {
          // 在支持setCapture做些东西
          // setCapture可以将鼠标事件锁定在指定的元素上，当元素捕获了鼠标事件后，该事件只能作用在当前元素上。
          el.setCapture
            ? (el.setCapture(),
              (el.onmousemove = function(ev) {
                mouseMove(ev || event);
                el.onmouseup = mouseUp;
              }))
            : $(document)
                .bind("mousemove", mouseMove)
                .bind("mouseup", mouseUp);

          // 防止默认事件发生
          e.preventDefault();
        }
      });

      function mouseMove(e) {
        if ($(el).height() > 600 || $(el).height() < 100) return;
        els.width = e.clientX - x + "px";
        els.height = e.clientY - y + "px";
      }

      // 停止事件
      function mouseUp() {
        // 在支持releaseCaptuer
        el.releaseCapture
          ? (el.releaseCapture(), (el.onmousemove = el.onmouseup = null))
          : // 卸载事件
            $(document)
              .unbind("mousemove", mouseMove)
              .unbind("mouseup", mouseUp);
      }
    },

    // 放大
    scaleAdd() {
      if (this.saclePercent < 200) {
        this.scaleSize = this.scaleSize + 0.25;
        this.saclePercent = this.saclePercent + 25;
        this.scaleSet(this.scaleSize);
      }
    },

    // 缩小
    scaleSub() {
      if (this.saclePercent > 25) {
        this.scaleSize = this.scaleSize - 0.25;
        this.saclePercent = this.saclePercent - 25;
        this.scaleSet(this.scaleSize);
      }
    },

    // 放大缩小
    scaleSet(size) {
      $("#editPage").css({
        zoom: size,
        MozTransform: "scale(" + size + ")",
        MozTransformOrigin: "0 0"
      });

      $("#bubble").css({
        zoom: size,
        MozTransform: "scale(" + size + ")",
        MozTransformOrigin: "0 0"
      });
    },

    // 清空
    mainClear() {
      let _ = this;
      this.mdOrder = null;
      let cloneReserve = $("#add_reserve").clone();
      let cloneReserveFile = $("#add_file_reserve").clone();
      // 如果里面有文件，恢复文件
      let main = $("#showMain");
      let filelist = main.find(".grid_file_equal");
      if (filelist) {
        filelist.each(function(ele) {
          _.clearFile($(this));
        });
      }
      this.clearHtml();
      main.empty();
      main.append(cloneReserve);
      main.append(cloneReserveFile);
      $("#bubble").hide();
    },

    // 点击预览分享
    shareSave() {
      this.onEditorBlur();
      let cloneHtml = $("#editPage").clone(true);
      cloneHtml.find(".grid_div_p").each(function(e) {
        let place = $(this).attr("placeholder");
        $(this).removeAttr("contenteditable");
        if (!$(this).text() && place === "输入文件描述") {
          $(this).text($(this).attr("filename"));
        } else if (!$(this).text() && place !== "输入文件描述") {
          $(this)
            .parent()
            .remove();
        }
      });
      let html = cloneHtml.html();
      // html = html.replace(/line-height: 1.5;/g, 'line-height: 1.8;');
      // let css = "<style>"+CSS.getCss()+"</style>";
      // console.log(html);
      let obj = {
        SharingLinksPkid: this.shareId,
        title: $("#setTheme").val(),
        Content: html
      };
      this.$HTTP("post", "/updateSharingTitelandContent", obj)
        .then(res => {
          this.$message("分享成功");
        })
        .catch(err => {});
      this.sharePopupFlag = true;
    },

    // 返回任务卡
    returnCard() {
      let r = confirm("系统可能不会保存您所做的更改，确认离开吗");
      if (r) {
        this.$router.push("/myTesk/myTeskList");
        localStorage.setItem("shareShow", true);
        // this.$router.push("/myTesk/myTeskList");
      }
    },
    // 分享页面关闭
    shareClose() {
      this.sharePopupFlag = false;
    },

    // 分配人员的文件上传
    fileUploadEvery(fileIds, file) {
      let obj = {
        articlePkid: this.articlePkid,
        userId: this.author,
        fileIds: fileIds,
        selectedition: this.nowSelectedEdition
      };
      this.$HTTP("post", "/AddTaskFileList", obj)
        .then(res => {
          // console.log(1111,res.result);

          for (let ele of res.result) {
            this.$set(ele, "FileTypeNum", this.getFlieTyle(ele.FileType));
            this.$set(ele, "dragFile", true);
          }
          for (let i of this.cooperationName) {
            if (i.UserId == this.author) {
              i.TaskFileList = res.result.concat(i.TaskFileList);
              this.$set(i, "filenum", i.TaskFileList.length);
              for (let j of i.TaskFileList) {
                if (!j.dragFile) {
                  i.filenum--;
                }
              }
            }
          }

          let ids = this.fileProgressList.findIndex(ele => {
            return ele.uid === file.uid;
          });

          if (ids !== -1) {
            this.fileProgressList[ids].status = true;
          }

          let returns = this.popFileProgress(this.fileProgressList);
          if (this.uploadProgressFlag && returns) {
            setTimeout(() => {
              this.closeProgress();
            }, 2000);
          }

          console.log("上传chengg ", this.cooperationName);
        })
        .catch(err => {
          this.$message.error("文件上传失败");
          console.log("上传错误", err);
        });
    },

    // 分配人员文件上传成功
    uploadSuccessEvery(res, file, fileList) {
      this.fileUploadEvery(res, file);
    },

    // 分配人员文件上传改变
    uploadChangeEvery(file, fileList) {
      // this.uploadListLength = fileList.length;
    },

    // 文件上传超出提示
    handleExceed(files, fileList) {
      this.$message.warning("最多只能选择9个文件");
    },

    // 文件上传之前
    beforeUpload(file) {
      if (!this.uploadProgressFlag) {
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
        imgUrl: ""
      };
      this.fileProgressList.unshift(obj);
    },

    // 文件上传进度
    uploadProgress(event, file, fileList) {
      let percents = parseInt(event.percent);
      let ids = this.fileProgressList.findIndex(ele => {
        return ele.uid === file.uid;
      });

      if (ids !== -1) {
        this.fileProgressList[ids].progress = percents;
        if (
          !this.fileProgressList[ids].imgUrl &&
          this.fileProgressList[ids].FileTypeNum == 1
        ) {
          this.fileProgressList[ids].imgUrl = file.url;
        }
      }
    },
    // 获取任务详情
    getShareInfo() {
      let obj = { sharingPkid: this.sharePkid };
      this.$HTTP("post", "/GetSharingContentSenior", obj)
        .then(res => {
          this.content = res.result;
          this.shareId = this.content.Pkid;
          this.cooperationName = JSON.parse(this.content.Coordination);
          // console.log(this.content);

          // 任务描述处理
          this.content.AdditionalList = JSON.parse(this.content.AdditionalList);
          this.content.AdditionalList.unshift({
            Pkid: this.content.Pkid,
            Content: this.content.Content,
            CreateTime: this.content.CreateTime
          });
          let homeObj = {
            Comment: 0,
            CoordinationPkid: -1,
            Job: 0,
            Pic: 0,
            ReplyInformationList: JSON.stringify(this.content.AdditionalList),
            SelectEdition: 0,
            TaskFileList: this.content.PubFile,
            UserId: 0,
            UserName: "概述",
            homeFlag: true,
          };
          if (this.content.CoordinationSelect) {
            this.content.CoordinationSelect =
              "-1," + this.content.CoordinationSelect;
          } else {
            this.content.CoordinationSelect = "-1";
          }
          this.cooperationName.unshift(homeObj);

          let indexs = this.cooperationName.findIndex(ele => {
            return ele.UserId == this.content.UserPkid;
          });
          if (indexs != -1) {
            this.personFile = this.cooperationName[indexs];
          } else {
            this.personFile = [];
          }

          let contentList = [];
          for (let i of this.cooperationName) {
            contentList.push(JSON.parse(i.ReplyInformationList));
            if (i.UserId == this.articlePkid) {
              this.nowSelectedEdition = i.SelectEdition;
            }
            i.ReplyInformationList = JSON.parse(i.ReplyInformationList);
            i.TaskFileList = JSON.parse(i.TaskFileList);
            this.$set(i, "filenum", i.TaskFileList.length);
            if(i.CoordinationPkid == -1 && this.content.IsDescn) {
              this.$set(i, "checked", true);
            } else if (i.CoordinationPkid == -1 && !this.content.IsDescn) {
              this.$set(i, "checked", false);
            } else if (
              this.content.CoordinationSelect.indexOf(i.CoordinationPkid) != -1
            ) {
              this.$set(i, "checked", true);
            } else {
              this.$set(i, "checked", false);
            }
            for (let j of i.TaskFileList) {
              this.$set(j, "FileTypeNum", this.getFlieTyle(j.FileType));
              this.$set(j, "dragFile", true);
            }
          }
          this.personContent[0] = contentList[indexs];
          this.personContent[1] = contentList;
          this.content.Coordination = this.cooperationName;
          console.log(this.cooperationName);

          this.content.PubFile = JSON.parse(this.content.PubFile);
          for (let flie of this.content.PubFile) {
            this.$set(flie, "FileTypeNum", this.getFlieTyle(flie.FileType));
          }
          // 添加文件
          this.publishID = this.content.UserId;

          this.$nextTick(() => {
            this.ChooseTemplate(0);

            for(let x of this.cooperationName) {
              this.selectCheckbox(x, x.checked);
            }

          });
        })
        .catch(err => {
          this.$message("获取信息失败，请稍后再试");
        });
    },

    // 模板切换
    tabSwitchover(index) {
      this.num = index;
    },
    //  选择模板
    ChooseTemplate(index) {
      this.mainClear();
      this.mdOrder = index;
      if (this.mdOrder) {
        this.selectDis = true;
        for (let x of this.cooperationName) {
          if (x.UserId == this.author) {
            x.checked = true;
          } else {
            x.checked = false;
          }
        }
      } else {
        this.selectDis = false;
        for (let i of this.cooperationName) {
          if(i.CoordinationPkid == -1 && this.content.IsDescn) {
            this.$set(i, "checked", true);
          } else if (i.CoordinationPkid == -1 && !this.content.IsDescn) {
            this.$set(i, "checked", false);
          } else if (
            this.content.CoordinationSelect.indexOf(i.CoordinationPkid) != -1
          ) {
            this.$set(i, "checked", true);
          } else {
            this.$set(i, "checked", false);
          }
        }
      }
      let model = $("#modelList")
        .children()
        .eq(index)
        .children()
        .clone();
      $("#showMain").append(model);
      let files = $("#modelList")
        .children()
        .eq(index)
        .find(".grid_file_equal");
      let ids = [];
      files.each(function() {
        ids.push($(this).attr("fileid"));
      });

      for (var a = 0; a < ids.length; a++) {
        for (let i of this.cooperationName) {
          for (let j of i.TaskFileList) {
            if (j.dragFile && j.Pkid.toString() === ids[a].toString()) {
              j.dragFile = false;
              i.filenum--;
            }
          }
        }
      }
    },

    // 选择人
    selectCheckbox(list, val) {
      let _ = this;
      let ids = list.UserId;
      let divs = $("#showMain").find(".grid_divs");
      divs.each(function(ele) {
        let attr = $(this).attr("data-ids");
        if (attr && attr == ids) {
          if (val) {
            $(this).show();
            for (let j of list.TaskFileList) {
              j.dragFile = false;
            }
            list.filenum = 0;
          } else {
            // 如果里面有文件，恢复文件
            let filelist = $(this).find(".grid_file_equal");
            if (filelist) {
              filelist.each(function(ele) {
                _.clearFile($(this));
              });
            }
            $(this).hide();
          }
          $("#bubble").hide();
        }
      });
    },

    // 获取连接
    getLinks(sharePkid) {
      let data = {
        sharingPkid: sharePkid,
        coordinationsId: "",
        isDescn: true,
        sharingType: 2,
        templateType: 0
      };
      this.$HTTP("post", "/UpdateSharingLinks", data).then(res => {
        // console.log('链接',res.result);
        this.editorQrcode = res.result.Pic;
        this.editorUrl = res.result.Url;
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      let _ = this;
      $("#bubble").hide();

      // 获取元素的纵坐标（相对于窗口）
      _.getTop = function(e) {
        let offset = e.offsetTop;
        if (e.offsetParent != null) offset += _.getTop(e.offsetParent);
        return offset;
      };
      // 获取元素的横坐标（相对于窗口）
      _.getLeft = function(e) {
        let offset = e.offsetLeft;
        if (e.offsetParent != null) offset += _.getLeft(e.offsetParent);
        return offset;
      };

      // 获取鼠标当前位置
      _.getXY = function(e) {
        e = e || window.event;
        let xx = e.pageX || e.clientX + document.body.scroolLeft;
        let yy = e.pageY || e.clientY + document.body.scrollTop;
        // console.log(xx, yy);
        return [xx, yy];
      };

      // 拖拽改变样式
      _.dragStyle = function(e) {
        let xx = _.getXY[0];
        let yy = _.getXY[1];
        ele.addClass("drag_style").css({ top: xx + "px", left: yy + "px" });
      };

      // 动态添加的元素进行拖拽事件的绑定
      _.addEventHandler = function(oTarget, sEventType, fnHandler) {
        if (!oTarget) {
          return;
        }
        if (oTarget.addEventListener) {
          //监听IE9，谷歌和火狐
          oTarget.addEventListener(sEventType, fnHandler, false);
        } else if (oTarget.attachEvent) {
          //IE
          oTarget.attachEvent("on" + sEventType, fnHandler);
        } else {
          oTarget["on" + sEventType] = fnHandler;
        }
      };

      // 动态添加的元素的拖拽开始事件
      function dragstartHandle(e) {
        e = e || window.event; //IE window.event
        _.getXY(e);

        let t = e.target || e.srcElement; //目标对象
        t = $(t);
        _.exchangeFlag = true;
        let getReturn1 = _.getParent(t, "grid_file_equal");
        if (getReturn1[0]) {
          _.fileHtml = getReturn1[1];
        } else {
          let getReturn2 = _.getParent(t, "grid_divs");
          if (getReturn2[0]) {
            _.dragDom = getReturn2[1];
          } else {
            let getReturn3 = _.getParent(t, "main_grid_div");
            if (getReturn3[0]) {
              _.dragDom = getReturn3[1];
            }
          }
        }

        _.onEditorBlur(1);
      }

      _.addEventHandler($("#showMain")[0], "dragstart", dragstartHandle);
      _.addEventHandler($("#newShare")[0], "dragstart", function(e) {
        if (e.target.data || e.target.nodeType === 3) {
          e.preventDefault();
        }
      });

      // 高级编辑中间页面滚动时的富文本编辑器的位置变化
      $("#middleMain").scroll(function() {
        let scrollTops = $(this).scrollTop();
        if ($("#bubble").css("display") !== "none") {
          $("#bubble").css({
            top: _.getTop($("#nowEdit")[0]) - scrollTops + "px"
          });
        }
      });

      // 点击T文本
      $("#showMain").on("click", ".grid_div_p", function(e) {
        _.clickT($(this));
        let nowP = $(e.target);
        if (e.stopPropagation) {
          e.stopPropagation();
        } else {
          e.cancelBubble = true;
        }
        let clickHide = function(event) {
          nowP.removeClass("grid_div_p_border").css("cursor", "move");
          $(document).unbind("click", clickHide);
        };
        $(document).bind("click", clickHide);
      });

      // 文本鼠标移入
      $("#showMain").on("mouseover", ".main_grid_div", function(e) {
        if (
          $(this)
            .attr("class")
            .indexOf("main_t_grid_border") === -1
        ) {
          $(this).addClass("main_t_grid_border");
        }
      });
      // 文本鼠标移除
      $("#showMain").on("mouseout", ".main_grid_div", function(e) {
        if ($(this).attr("id") === "nowEdit") {
          // 文本正在编辑
          return;
        }
        if (
          $(this)
            .attr("class")
            .indexOf("main_t_grid_border") !== -1
        ) {
          $(this).removeClass("main_t_grid_border");
        }
      });

      // 点击删除某一项——格子
      $("#showMain").on("click", ".grid_divs", function(e) {
        let ids = $(e.target).attr("data-ids");
        let tg = $(e.target).eq(0);
        let beforeStyle = window.getComputedStyle(tg[0], ":after").cursor;
        if (beforeStyle === "pointer") {
          // 如果里面有文件，恢复文件
          let filelist = tg.find(".grid_file_equal");
          if (filelist) {
            filelist.each(function(ele) {
              _.clearFile($(this));
            });
          }
          for (let i of _.cooperationName) {
            if (i.UserId == ids) {
              i.checked = false;
            }
          }
          $(this).hide();
          $("#bubble").hide();
        }
        return false;
      });

      // 点击删除某一项——文本
      $("#showMain").on("click", ".text_clear_every", function(e) {
        $(this)
          .parent()
          .remove();
        $("#bubble").hide();
        return false;
      });

      // 格子鼠标移入
      $("#showMain").on("mouseover", ".grid_divs", function(e) {
        let className = $(this).attr("class");
        if (className.indexOf("grid_div_toggle") !== -1) {
          $(this)
            .removeClass("grid_div_toggle")
            .addClass("grid_div_toggle1");
        } else if (className.indexOf("grid_div_toggle1") !== -1) {
          $(this)
            .removeClass("grid_div_toggle1")
            .addClass("grid_div_toggle");
        }
      });
      // 格子鼠标移除
      $("#showMain").on("mouseout", ".grid_divs", function(e) {
        let className = $(this).attr("class");

        if (
          false &&
          className.indexOf("grid_div_toggle1") !== -1 &&
          $(this)
            .find(".grid_div_p:eq(0)")
            .text() === "" &&
          $(this).find(".grid_file_list").length === 0
        ) {
          return;
        }
        $(this)
          .removeClass("grid_div_toggle1")
          .addClass("grid_div_toggle");

        return;
        // 格子里添加的文本里面如果没有内容就删除
        $(this)
          .find(".every_grid .main_grid_div")
          .each(function() {
            console.log(
              $(this)
                .find(".grid_div_p:eq(0)")
                .html()
            );
            if (
              !$(this)
                .find(".grid_div_p:eq(0)")
                .html()
            ) {
              $(this).remove();
            }
          });
      });

      // 删除文件
      $("#showMain").on("click", ".grid_del_file", function(e) {
        let file = $(this)
          .parent()
          .parent();
        _.clearFile(file);
        $(this)
          .parent()
          .parent()
          .remove();
        return false;
      });

      // 点击格子里添加文本和文件
      $("#showMain").on("click", ".every_grid", function(e) {
        let getReturn1 = _.getParent($(e.target), "grid_file_li");
        // 直接拖到页面里
        if (!getReturn1[0]) {
          // 点击文件不添加文本
          _.fileHtml = "";
          _.dragDom = "";
          _.everyGridFlag = true;
          _.addText($(this), true);
        }
      });
    });
  },
  created() {
    this.Uname = JSON.parse(localStorage.getItem("staffInfo")).Realname;
    let obj = this.$route.params.obj;
    // console.log(this.$route, window.location);
    if (obj) {
      this.author = obj.author;
      this.articlePkid = obj.articlePkid;
      this.sharePkid = obj.sharePkid;
      this.shareId = obj.sharePkid;
      this.selectList = obj.checkedUserId.join(",");
      this.getShareInfo();
      this.getLinks(this.sharePkid);
    } else {
      this.$router.push("/myTesk/myTeskList");
    }
  }
};
</script>
<style lang="less">
@import "../../../assets/css/base.less";

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
}

.ql-align-left {
  text-align: left;
}

.ql-align-center {
  text-align: center;
}

.ql-align-right {
  text-align: right;
}

.ql-align-justify {
  text-align: justify;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */

  -webkit-user-select: none; /* Chrome/Safari/Opera */

  -khtml-user-select: none; /* Konqueror */

  -moz-user-select: none; /* Firefox */

  -ms-user-select: none; /* Internet Explorer/Edge */

  user-select: none;
  /* Non-prefixed version, currently

   not supported by any browser */
}

.cur {
  cursor: pointer;
}

.word_over {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.box_sizing {
  box-sizing: border-box;
  -moz-box-sizing: border-box; /* Firefox */
  -webkit-box-sizing: border-box; /* Safari */
}

// 主颜色++++++++++++++++++++++++++++++++++++++++
@blue: #4583f0;
@line: #dcdcdc;
@hoveBlue: #4574df;
@graySix: #666666;
@grayNight: #999999;
@bgColor: #ffffff;
@dominantHue: #4583f0;
.ml-10 {
  margin-left: 10px;
}

.h5share {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
  }

  h1 {
    font-size: 24px !important;
  }
  h2 {
    font-size: 22px !important;
  }
  h3 {
    font-size: 20px !important;
  }
  h4 {
    font-size: 18px !important;
  }
  h5 {
    font-size: 16px !important;
  }
  h6 {
    font-size: 12px !important;
  }
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #f2f3f9;
  z-index: 9999;
  .top {
    height: 50px;
    background: @bgColor;
    box-shadow: 1px 2px 3px rgba(102, 102, 102, 0.41);
    padding: 8px 100px;
    .box_sizing;
    position: relative;
    z-index: 900;

    .return_card:hover {
      color: @hoveBlue;
    }
    i {
      margin-top: 11px;
    }
    h1 {
      text-align: center;
      font-size: 24px;
      font-weight: normal;
    }
    #setTheme {
      display: inline-block;
      width: calc(~"100% - 200px - 60px");
      height: 40px;
      text-align: center;
      font-size: 18px;
      padding: 0 20px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    .share_button {
      padding: 0 20px;
      height: 32px;
      border-radius: 6px;
      border: 1px solid @dominantHue;
      position: absolute;
      right: 100px;
      top: 10px;
      color: @dominantHue;
      font-size: 16px;
      .cur;
    }
  }

  .bottomMain {
    position: relative;
    color: #333333;
    /*左侧*/
    .leftNav {
      height: calc(~"100vh - 50px");
      background: @bgColor;
      box-shadow: 2px 0px 5px rgba(102, 102, 102, 0.41);
      z-index: 900;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;

      .model_nav {
        font-size: 16px;
        .el-tabs__nav-wrap::after {
          background: none;
        }
        .el-tabs__content {
          height: calc(~"100vh - 50px");
        }
        .el-tabs--left .el-tabs__header.is-left {
          padding-top: 45px;
          .box_sizing;
          width: 80px;
          height: calc(~"100vh - 50px");
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
        .templates {
          height: 100vh;

          ul {
            border-bottom: 1px solid #dcdcdc;
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
            height: calc(~"100vh - 135px");
            padding: 10px 20px;
            overflow: auto;
            .box_sizing;
            .md_list {
              text-align: center;
              margin-bottom: 20px;
              .md_title {
                font-size: 14px;
                color: rgba(102, 102, 102, 1);
                margin-top: 5px;
              }
              img {
                width: 180px;
                height: 284px;
                border: 1px solid rgba(102, 102, 102, 0.2);
                .cur;
              }
            }
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
            padding: 10px 10px;
            .box_sizing;
          }
        }
        .seTbackgroundColor {
          height: 100vh;
          .color_k {
            display: inline-block;
            width: 100px;
            height: 100px;
            background: red;
          }
        }
      }
    }

    /*中间*/

    .middleMain {
      width: calc(~"100vw - 600px");
      height: calc(~"100vh - 50px");
      left: 300px;
      overflow: scroll;
      position: absolute;
      padding: 80px 0 125px 0;
      .box_sizing;

      #editPage {
        width: 320px;
        min-height: 504px;
        margin: 0 auto;
        .showMain {
          font-family: "Microsoft YaHei", "PingFang SC", "Helvetica Neue",
            Helvetica, Arial, "Hiragino Sans GB", "Heiti SC",
            "WenQuanYi Micro Hei", sans-seri, sans-serif;
          ol,
          ul,
          li {
            list-style: inherit !important;
          }
          ol {
            list-style-type: decimal !important;
          }
          ul {
            list-style-type: demical;
          }
          ul li {
            list-style-position: outside;
          }
          ol li {
            list-style-position: outside;
          }
          ol,
          ul {
            padding-left: 25px;
          }

          width: 320px;
          min-height: 504px;
          margin: 0 auto;
          background: #ffffff;
          padding: 1px 25px 25px;
          .box_sizing;
        }
      }
    }
    .optionButton {
      position: fixed;
      bottom: 30px;
      left: 50%;
      margin-left: -163px;
      width: 320px;
      height: 40px;
      line-height: 40px;
      padding: 8px;
      background: @dominantHue;
      .border_radius(@br: 6px);
      .box_sizing;

      li,
      span {
        float: left;
        color: @bgColor;
        font-weight: 700;
        display: inline-block;
        .cur;
        line-height: 24px;

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
    @linecolor: #dcdcdc;
    /*右侧*/
    .rightNav {
      position: absolute;
      right: 0;
      /*top: 50px;*/
      height: calc(~"100vh - 50px");
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
          height: 34px;
          border: none;
          margin: 0;
          padding: 0;
          width: 100%;
        }
      }
      .fileList {
        padding: 0 20px;
        height: calc(~"100% - 150px");
        overflow: auto;
        .el-checkbox {
          display: inline-block;
        }
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
          border: 1px solid #4583f0;
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
          position: relative;

          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
            margin-left: 15px;
          }

          .fileName  {
            position: absolute;
            right: 24px;
          }
          .span_img {
             width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
            margin-left: 15px;
            background-color: #3888FF;
            display: inline-block;
            color: #ffffff;
            line-height: 30px;
            text-align: center;
            font-size: 12px;
          }
        }
        .nameAndJob {
          display: inline-block;
          vertical-align: middle;
          width: 70px;
          overflow: hidden;
          p {
            line-height: 22px;
          }
        }
        .el-collapse-item__wrap {
          background: #f8f8ff;
        }
        .el-collapse-item__content {
          padding: 0;
          #fileLists {
            min-height: 45px;
            margin: 0;
            .list {
              height: 45px !important;
              line-height: 45px !important;
              margin: 5px 0;
              cursor: move;

              a {
                display: inline-block;
                height: 40px;
                width: 60px;
                text-align: center;
                img {
                  display: inline-block;
                  height: 40px;
                  max-width: 60px;
                }
              }

              span {
                display: inline-block;
                line-height: 45px;
                vertical-align: top;
              }

              .fileName {
                width: 130px;
                .word_over;
              }
              .fileSize {
                max-width: 50px;
                .word_over;
              }
            }
          }
        }
      }

      .upInput {
        cursor: pointer;
        width: 130px;
        height: 30px;
        border: 1px solid #4583f0;
        border-radius: 6px;
        position: absolute;
        bottom: 30px;
        left: 50%;
        margin-left: -65px;
        .upbutton {
          position: absolute;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
          text-align: left;
          padding-left: 10px;
          color: #4583f0;
        }
        .el_icon {
          line-height: 30px;
          padding-left: 20px;
          color: #4583f0;
        }
      }
    }
  }

  .grid_divs {
    width: 30%;
    height: 60px;
    margin-bottom: 20px;
    float: left;
    position: relative;
    cursor: move;
    border-top: 1px solid @graySix;
    border-left: 1px solid @graySix;
    background-color: #fff;
    .box_sizing;

    table-layout: fixed;
    word-break: break-all;
    word-wrap: break-word;

    &:nth-child(3n - 1) {
      margin-left: 10px;
      margin-right: 10px;
    }

    .every_grid {
      border-right: 1px solid @graySix;
      border-bottom: 1px solid @graySix;
      vertical-align: top;
    }
    .grid_clear_every {
      display: none;
      position: absolute;
      right: -7px;
      top: -8px;
      color: @line;
      background-color: #ffffff;
      .cur;
      .border_radius(@br: 50%);
      &:hover {
        color: @hoveBlue;
      }
    }
  }

  .grid_files {
    display: none;
  }
  .grid_div_toggle {
    float: none;
    width: 100% !important;
    min-height: 40px;
    height: auto !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-top: 20px;
    margin-bottom: 40px;
    border-left: 1px solid @line !important;
    border-top: 1px solid @line !important;

    .every_grid {
      border-right: 1px solid @line !important;
      border-bottom: 1px solid @line !important;
      padding: 10px 10px 0 10px;
      .box_sizing;
      height: 50px;
      .main_grid_div:first-of-type {
        margin-top: -4px !important;
      }
    }
    .main_grid_div {
      display: block;
      .box_sizing;
      .grid_div_p {
        word-break: break-all !important;
        &:empty:before {
          color: @line;
          content: attr(placeholder);
        }
      }
    }

    .grid_files {
      position: relative;
      display: none;
      width: 100%;
      min-height: 130px;
      margin: 0px auto;
      margin-bottom: 10px;

      .box_sizing;
      .file_empty {
        color: @line;
        text-align: left;
        display: none;
      }
    }
    .text_clear_every {
      display: none;
    }
    .grid_clear_every {
      display: none;
    }
  }
  .grid_div_toggle1 {
    float: none;
    width: 100% !important;
    min-height: 40px;
    height: auto !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-top: 20px;
    margin-bottom: 40px;
    border: none;
    border-left: 1px dashed @line !important;
    border-top: 1px dashed @line !important;
    &:after {
      content: "\e612";
      font-family: "iconfont";
      font-size: 16px;
      position: absolute;
      right: -7px;
      top: -8px;
      color: @line;
      background-color: #ffffff;
      cursor: pointer !important;
      .border_radius(@br: 50%);
      &:hover {
        color: @hoveBlue;
      }
    }

    .every_grid {
      border-right: 1px dashed @line !important;
      border-bottom: 1px dashed @line !important;
      padding: 10px 10px 0 10px;
      .box_sizing;
      height: 50px;
      .main_grid_div:first-of-type {
        margin-top: -4px !important;
      }
    }
    .main_grid_div {
      display: block;
      border: 1px dashed @line !important;
      .box_sizing;
      .grid_div_p {
        word-break: break-all !important;
      }
    }

    .grid_files {
      position: relative;
      display: none;
      border: 1px dashed @line !important;
      width: 100%;
      min-height: 130px;
      margin: 0px auto;
      margin-bottom: 10px;
      .box_sizing;
      .file_empty {
        color: @line;
        text-align: left;
      }
    }
    .text_clear_every {
      display: block;
      .border_radius(@br: 50%);
    }
    .grid_clear_every {
      display: block;
    }
  }

  .main_grid_div {
    display: none;
    word-break: break-all !important;
    width: 100%;
    min-height: 24px;
    margin: 0 auto 40px;
    position: relative;
    border: 1px solid transparent;
    .box_sizing;
    cursor: move;
    .noselect;
    line-height: 1.5;
    .grid_div_p {
      width: 100%;
      // min-height: 30px;
      height: inherit;
      outline: none;
      cursor: move;
      font-size: 14px;
      // padding-top: 4px;
      .box_sizing;
      &:empty:before {
        color: @line;
        content: attr(placeholder);
      }
    }
  }

  .text_clear_every {
    display: none;
    position: absolute;
    right: -7px;
    top: -8px;
    color: @line;
    background-color: #ffffff;
    .cur;

    &:hover {
      color: @hoveBlue;
    }
  }

  .main_t_grid_border {
    border: 1px dashed @line;
    .box_sizing;
    cursor: move;
    .text_clear_every {
      display: block;
      .border_radius(@br: 50%);
    }
  }

  .grid_file_equal {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    .grid_file_li {
      width: 70px;
      height: 70px;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      background-color: #f2f3f9;
      margin-bottom: 10px;
      position: relative;
      &:hover {
        .grid_del_file {
          display: block;
          .border_radius(@br: 50%);
        }
      }

      .grid_del_file {
        display: none;
        position: absolute;
        top: 0px;
        right: 0px;
        color: #999999;
        background-color: #f2f3f9;
        .cur;

        &:hover {
          color: @hoveBlue;
        }
      }
      .grid_file_img {
        max-width: 60px;
        height: 46px;
        padding: 4px;
        vertical-align: middle;
      }

      .grid_file_span {
        .dis-bl;
        font-size: 12px;
        line-height: 1;
        padding: 2px;
        margin-top: -2px;
        vertical-align: middle;
        .box_sizing;
        .word_over;
      }
    }
  }
}

.only_text {
}

.add_reserve {
  display: none;
  height: 30px;
  width: 100%;
  border: 1px dashed #4583f0;
}

.add_file_reserve {
  display: none;
  height: 70px;
  width: 70px;
  margin-bottom: 8px;
  text-align: center;
  vertical-align: middle;
  border: 1px dashed #4583f0;
}

.drag_style {
  opacity: 0.5;
  position: fixed;
}

.my-gallery {
  float: none !important;
}

.my-gallery figure {
  float: none !important;
}

figure {
  margin: 0;
}

.md_click {
  img {
    -webkit-box-shadow: 1px 0 6px rgba(50, 110, 210, 1) !important;
    -moz-box-shadow: 1px 0 6px rgba(50, 110, 210, 1) !important;
    box-shadow: 1px 0 6px rgba(50, 110, 210, 1) !important;
  }
  .md_title {
    color: #4574df !important;
  }
}

// 富文本编辑器
.bubble {
  position: fixed;
  left: 500px;
  top: 140px;
  width: 298px;
  min-height: 24px !important;
  height: auto !important;
  z-index: 999;
  display: none;

  h1 {
    font-size: 24px !important;
  }
  h2 {
    font-size: 22px !important;
  }
  h3 {
    font-size: 20px !important;
  }
  h4 {
    font-size: 18px !important;
  }
  h5 {
    font-size: 16px !important;
  }
  h6 {
    font-size: 12px !important;
  }
  .ql-tooltip {
    width: 560px;
    left: -160px !important;
    top: -65px !important;
    z-index: 999 !important;
    -webkit-border-radius: 0px !important;
    -moz-border-radius: 0px !important;
    border-radius: 0px !important;
    .border_radius(@br: 0px);
    background-color: @dominantHue !important;
    color: #ffffff !important;
    .ql-tooltip-arrow {
      border-bottom: 6px solid #4583f0 !important;
      display: none !important;
    }
    .ql-picker-options {
      background-color: @dominantHue !important;
    }

    .ql-stroke {
      stroke: #ffffff !important;
    }
    .ql-picker-label {
      color: #ffffff !important;
    }
    .ql-picker {
      color: #ffffff !important;
    }
  }

  .ql-editor {
    padding: 0 !important;
    .box_sizing;
    font-family: "Microsoft YaHei", "PingFang SC", "Helvetica Neue", Helvetica,
      Arial, "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-seri,
      sans-serif;
    line-height: 1.5 !important;
    ol,
    ul {
      padding-left: 0;
    }
  }

  .ql-container {
    font-size: 14px !important;
  }
}
</style>
