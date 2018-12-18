<template>
  <div class="tesk_card" id="testCard">
    <!--左侧展开卡片==左侧任务详情-->
    <ul v-if="true" class="detail fl">

      <!--左侧展开卡片==左侧任务详情==发布人-->
      <li class="one detail_li">
        <!--<span v-show="false" class="all_finish"><el-checkbox v-model="allFinish" @change="allFinished(nowCardDetail)"></el-checkbox></span>-->
        <span class="all_head">
          <img :src="nowCardDetail.Pic" alt="">
        </span>
        <span class="theProject fr"></span>
        <!--<span class="theProject fr">所属项目：{{theProject}}</span>-->
      </li>

      <!--左侧展开卡片==左侧任务详情==发布相关时间-->
      <li class="two detail_li">
        <span class="start_time fl" v-if="!createdPower">{{nowCardDetail.StartTime}}</span>
        <el-date-picker
          v-if="createdPower"
          class="start_time fl cur"
          v-model="startTime"
          type="datetime"
          format="MM月dd日 HH:mm"
          placeholder="选择日期时间"
          @focus="setTimeFocus"
          @change="setTimeChange"
          >
        </el-date-picker>
        <!--:picker-options="pickerOptionsStart"-->

        <span class="progress_bar fl"><el-progress :show-text="false" color="#4574DF" :stroke-width="4" :percentage="nowCardDetail.Proportional"></el-progress></span>
        <span class="end_time fr" v-if="!createdPower">{{nowCardDetail.EndTime}}</span>
        <el-date-picker
          v-if="createdPower"
          class="end_time fr cur"
          v-model="endTime"
          type="datetime"
          format="MM月dd日 HH:mm"
          placeholder="选择日期时间"
          @focus="setTimeFocus"
          @change="setTimeChange"
          >
        </el-date-picker>
        <!--:picker-options="pickerOptionsEnd"-->

      </li>

      <!--左侧展开卡片==左侧任务详情==任务描述-->
      <li
      id="teskDesc" class="three detail_li"
      :class="{'three': firstFlag === null, 'change_three_max': firstFlag, 'change_three_min': firstFlag === false}">
      <div id="oneTop" class="detail_top" @click="fileTopClick">
        <span class="fl">工作任务描述：</span>
        <span id="teskDescDown" class="fr cur" :title="firstFlag ? '收起' : '展开'" :class="{'el-icon-arrow-right': firstFlag === null, 'el-icon-arrow-down': firstFlag === true,'el-icon-arrow-up': firstFlag === false}" @click="upOrDown"></span>
        <span class="el-icon-edit-outline fr" title="追加描述" :class="{'forbid': !createdPower, 'cur': createdPower}" v-show="!pushDetailFlag" @click.stop="createdPower && pushIconClick()"></span>
      </div>

      <ul id="teskDescList" v-show="firstFlag === null || firstFlag === true" class="detail_text">
        <li class="every_text" v-for="(text, index) in nowCardDetail.AdditionalList" :key="index">
          <p class="text_time">{{text.CreateTime | dateSlice}}</p>
          <p class="text_content"><span></span> <span v-if="text.recall && createdPower" class="recall cur" @click="teskRecall(index,text)">{{text.recall}}</span></p>
        </li>

        <div id="teskDescListPush" class="push_detail_text" v-show="pushDetailFlag">
          <el-input class="push_detail_input" v-model="pushDetailText" :autofocus="true" placeholder="请输入追加内容"  type="textarea" autosize></el-input>
          <button type="button" class="button_push main_button_bg cur" @click="pushDetail('#teskDescList')">提交</button>
        </div>
      </ul>
    </li>

      <!--左侧展开卡片==左侧任务详情==任务文件-->
      <li
        id="teskFile" class="four detail_li"
        :class="{'four': secondFlag === null, 'change_four_max': secondFlag, 'change_four_min': secondFlag === false}">
        <div id="twoTop" class="files_top" @click="fileTopClick">
        <span class="fl">任务附件：</span>
        <span class="all_checked">
          <el-checkbox v-show="fileList.length && fileCheckedList.length === 0" v-model="fileAllChecked" @change="fileAllCheckedChange(fileAllChecked)">全选</el-checkbox>
          <el-checkbox v-show="fileList.length && fileCheckedList.length > 0" v-model="fileAllChecked" @change="fileAllCheckedChange(fileAllChecked)">{{fileCheckedList.length}}/{{fileList.length}}</el-checkbox>
        </span>
        <span id="teskFileDown" class="el_icon fr cur" :title="secondFlag ? '收起' : '展开'" :class="{'el-icon-arrow-right': secondFlag === null, 'el-icon-arrow-down': secondFlag === true,'el-icon-arrow-up': secondFlag === false}" @click="upOrDown"></span>
        <el-upload
          v-if="createdPower"
          class="div_upload fr"
          :action="'/File.ashx?publisher='+publishID+'&informationType=Pub&information='+teskId"
          :show-file-list="false"
          :multiple="true"
          :limit="9"
          :on-exceed="handleExceed"
          :on-success="uploadSuccess"
          :on-change="uploadChange"
          :on-progress="uploadProgress"
          :before-upload="beforeUpload">
          <span class="el_icon el-icon-upload2 fr cur" title="上传" @click="recoverSecond"></span>
        </el-upload>
          <span class="el_icon el-icon-upload2 fr forbid" v-if="!createdPower"></span>
          <span class="el_icon el-icon-download fr cur" title="下载" v-show="fileCheckedList.length" @click="batchDownload"></span>
        </div>

        <ul class="file_list"
        v-if="secondFlag === null || secondFlag === true"
        >
        <li class="file_li fl cur" v-for="(item,index) in fileList" :key="index" @mouseenter="fileMouseenter($event, item, index)">
          <div class="file_li_top">
            <span><el-checkbox :class="{'hide_show': item.checked}" class="fl hovers file_checked" v-model="item.checked" @change="fileChange(item)"></el-checkbox></span>
            <i class="el_icon hovers el-icon-delete fr" title="删除" v-show="item.delFlag && createdPower" @click="fileDel(index,item)"></i>
            <i class="el_icon hovers el-icon-download fr" title="下载"><a class="download_a" :href="item.YimageUrl" :download="item.Title+'.'+item.FileType"></a></i>
          </div>
          <span class="file_li_img" @click="filePreview(fileList,item,index)">
            <figure style="margin: 0" ref="figure" class="figure">
              <a v-if="item.FileTypeNum === 1" :src="item.Url" data-size="">
                <!--< img class="typeOne" :src="item.Titles ?item.Titles : item.Url"/>-->
                <img class="typeOne" v-if="item.FileTypeNum === 1" :src="item.Url">
              </a>
            </figure>
                    <!--< img class="typeOne" v-if="item.FileTypeNum === 1" :src="item.Url">-->
            <img class="typeTwo" v-if="item.FileTypeNum === 2" src="../../assets/img/icon2/2.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 3" src="../../assets/img/icon2/3.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 4" src="../../assets/img/icon2/4.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 5" src="../../assets/img/icon2/5.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 6" src="../../assets/img/icon2/6.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 7" src="../../assets/img/icon2/7.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 8" src="../../assets/img/icon2/8.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 9" src="../../assets/img/icon2/9.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 10" src="../../assets/img/icon2/10.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 11" src="../../assets/img/icon2/11.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 0" src="../../assets/img/icon2/0.png">
            <img class="typeTwo" v-if="item.FileTypeNum === -1" src="../../assets/img/LogoW.png">
                    <!--< img v-else :src="'../../assets/img/'+item.FileType+'.png'">-->
          </span>
          <div class="file_title_div" :title="item.Title + '.' + item.FileType">
          <span class="file_li_title">{{item.Title}}</span><span class="surffix">.{{item.FileType}}</span>
        </div>
          <!--<el-progress v-if="item.percentFile" class="file_progress" type="circle" :percentage="item.percentFile"></el-progress>-->

        </li>
        <el-upload
          v-if="createdPower"
          class="avatar-uploader fl"
          :action="'/File.ashx?publisher='+publishID+'&informationType=Pub&information='+teskId"
          :show-file-list="false"
          :multiple="true"
          :limit="9"
          :on-exceed="handleExceed"
          name="mulUp[]"
          :on-success="uploadSuccess"
          :on-change="uploadChange"
          :on-progress="uploadProgress"
          :before-upload="beforeUpload">
          <i class="el-icon-plus" title="上传"></i>
        </el-upload>
          <p v-if="!createdPower && !fileList.length && (secondFlag === null || secondFlag === true)" class="detail_empty">TA还没有上传任务附件</p>

        </ul>
      </li>

      <!--左侧展开卡片==左侧任务详情==标签-->
      <li
        id="label" class="five detail_li"
        :class="{'five': fifthFlag === null, 'change_five_max': fifthFlag}">
        <div class="label_out" v-if="fifthFlag === null">
          <ul class="label fl">
            <li v-if="teskLabelList.length" v-for="(lab, index) in teskLabelList" :key="index" class="label_li">{{lab.Title}}</li>
            <p v-if="!teskLabelList.length && createdPower && !labelListShow" class="label_empty cur" @click.stop="createdPower && addLabelIcon()">点击添加标签</p>
            <p v-if="!teskLabelList.length && !createdPower && !labelListShow" class="label_empty">TA还没有添加标签</p>
          </ul>
        </div>

        <span id="labelDown" class="el_icon fr cur" :title="fifthFlag ? '收起' : '展开'" :class="{'el-icon-arrow-right': fifthFlag === null, 'el-icon-arrow-down': fifthFlag === true}" @click="upOrDown"></span>
        <div class="add_lab_div fr">
          <i class="add_lab el-icon-circle-plus-outline cur" title="添加标签" :class="{'forbid': !createdPower, 'cur': createdPower}" @click.stop="createdPower && addLabelIcon()"></i>
          <div class="label_box" v-show="labelListShow">
            <ul class="lab_ul only_pop" v-if="!createdLabelFlag">
              <li class="j_top only_pop">
                <el-input  type="text" placeholder="搜索标签" class="search only_pop" v-model="searchLabelText" @keyup.native="searchLabel(searchLabelText)"></el-input>
                <i class="created_lab_icon el-icon-circle-plus-outline only_pop cur" title="新建标签" @click="createdLabelFlag = true"></i>
              </li>
              <div class="j_bottom only_pop">
                <li class="only_pop" v-for="(list, index) in labelList" :key="index" @click="addLabel(list,index, $event)">
                  <span class="texts only_pop">{{list.Title}}</span>
                  <el-checkbox class="only_pop" v-model="list.checked" @change="labelChange(list.checked, index)"></el-checkbox>

                </li>
                <p v-if="!labelList.length" class="only_pop search_empty">哎呀！没有搜到<br>可点击创建标签</p>
                <button v-if="!labelList.length" type="button" class="only_pop main_button_bg created_button" @click="createdLabel">创建</button>
              </div>

            </ul>
            <div class="only_pop created_lab" v-if="createdLabelFlag">
              <div class="only_pop created_top">
                <i class="only_pop el-icon-arrow-left fl" @click="returnCreated"></i>
                <span class="only_pop">创建标签</span>
                <i class="el-icon-close fr" @click="cancelCreated"></i>
              </div>
              <el-input  type="text"  placeholder="标签名称" class="only_pop created_input" v-model="createdLabelText"></el-input>
              <button type="button" class="only_pop main_button_bg created_button" @click="createdLabel">创建</button>
            </div>
          </div>
        </div>

        <ul class="label fl" v-if="fifthFlag">
          <li v-for="(lab, index) in teskLabelList" :key="index" class="label_li">{{lab.Title}}</li>
        </ul>

        </li>
    </ul>

    <!--左侧展开卡片==右侧分配任务详情-->
    <ul v-if="true" class="distribute fl">

      <!--左侧展开卡片==右侧分配任务详情==分配人员-->
      <li class="one distribute_li">
      <div id="everybody" class="everybody_div fl">
      <ul id="everybodyUl" ref="everyBody" class="everybody">
        <li class="every_li fl dis-in-bl cur" v-for="(every, index) in nowCardDetail.Coordination" :key="index">
          <span class="every_finish" :class="{'opacity_ban': every.disabled}"><el-checkbox v-model="every.State" :disabled="every.disabled" @change="finishChange(every)"></el-checkbox></span>
          <el-tooltip class="item" effect="dark" :content="every.UserName ? every.UserName : 'null'" placement="top">
            <span class="every_head" @click="nowEveryBody(index, every)">
              <img :src="every.Pic" alt=""/>
            </span>
          </el-tooltip>

          <span :class="{'every_bottom': nowBody === index}"></span>
        </li>

      </ul>

      <p class="everybody_none" v-if="nowCardDetail.Coordination && !nowCardDetail.Coordination.length">点击添加协助人员</p>

      </div>
      <div class="handle fr">
      <i class="all_every_icon el-icon-circle-plus-outline fr f-size-14" title="添加协助人员" :class="{'forbid': !createdPower, 'cur': createdPower}" @click.stop="createdPower && addStaffIcon()">
        <div class="label_box" v-show="addStaffShow">
          <ul class="lab_ul only_pop">
            <li class="j_top only_pop">
              <el-input  type="text" placeholder="搜索人员" class="search only_pop" v-model="searchStaffText" @keyup.native="searchStaff(searchStaffText)"></el-input>
            </li>
            <div class="j_bottom only_pop">
              <li class="only_pop" v-for="(list, index) in staffList" :key="index" @click="addStaff(list,index, $event)">
                <img class="staff_head only_pop" :src="list.Images" alt="">
                <span class="texts only_pop">{{list.Realname}}</span>
                <el-checkbox class="only_pop" v-model="list.checked" @change="addStaffChange(index,list)"></el-checkbox>
              </li>
              <p v-if="!staffList.length" class="only_pop search_empty">哎呀！没有搜到</p>
            </div>

          </ul>
        </div>

      </i>
      <span class="all_every fr f-size-14">{{allEvery}}人</span>
      <span class="pages fr">
        <i id="pageLeft" class="el-icon-d-arrow-left" @click="pageLeft()"></i><i id="pageRight" class="el-icon-d-arrow-right" @click="pageRight()"></i>
      </span>
      </div>

      </li>

      <!--左侧展开卡片==右侧分配任务详情==分配人员回复列表-->
      <li
      id="everyReply" class="two distribute_li"
      :class="{'two': thirdFlag === null, 'change_two_max': thirdFlag, 'change_two_min': thirdFlag === false}"
      >
      <div id="threeTop" class="detail_top" @click="fileTopClick">
      <span class="fl"></span>
      <span id="everyReplyDown" class="el_icon_right fr cur" :title="thirdFlag ? '收起' : '展开'" :class="{'el-icon-arrow-right': thirdFlag === null, 'el-icon-arrow-down': thirdFlag === true,'el-icon-arrow-up': thirdFlag === false}" @click="upOrDown"></span>
      <span class="el-icon-edit-outline fr" title="编辑回复" :class="{'forbid': !power, 'cur': power}" v-show="!everyPushDetailFlag && nowCardDetail.Coordination"  @click.stop="power && everyPushIconClick()"></span>
      </div>

      <ul id="everyDetailText" v-show="thirdFlag === null || thirdFlag === true" class="detail_text">
      <li class="every_text" v-for="(text, index) in everyDetailTextList" :key="index">
      <p class="text_time">{{text.CreateTime | dateSlice}}</p>
      <p class="text_content"><span></span> <span v-if="text.recall && power" class="recall cur" @click="everyRecall(index,text)">{{text.recall}}</span></p>
      </li>

      <div id="everyDetailTextPush" class="push_detail_text" v-if="everyPushDetailFlag">
      <el-input class="push_detail_input" v-model="everyPushDetailText" placeholder="请输入回复内容"  type="textarea" autosize></el-input>
      <button type="button" class="button_push main_button_bg cur" @click="everyPushDetail">提交</button>
      </div>

      </ul>
      <p class="detail_empty cur" v-if="!everyDetailTextList.length && !everyPushDetailFlag && thirdFlag !== false && power" @click.stop="power && everyPushIconClick()">点击输入工作结果描述</p>
        <p class="detail_empty" v-if="!everyDetailTextList.length && !everyPushDetailFlag && thirdFlag !== false && !power" >TA还没有添加工作结果描述</p>
      </li>

      <!--左侧展开卡片==右侧分配任务详情==分配人员回复文件-->
      <li id="everyFile" class="three distribute_li"
      :class="{'three': fourthFlag === null, 'change_three_max': fourthFlag, 'change_three_min': fourthFlag === false}"
      >
      <div id="fourTop" class="files_top" @click="fileTopClick">
      <span class="fl">工作附件：</span>
      <span class="all_checked">
         <el-checkbox v-show="everyFileList.length && everyFileCheckedList.length === 0" v-model="everyFileAllChecked" @change="everyFileAllCheckedChange(everyFileAllChecked)">全选</el-checkbox>
          <el-checkbox v-show="everyFileList.length && everyFileCheckedList.length > 0" v-model="everyFileAllChecked" @change="everyFileAllCheckedChange(everyFileAllChecked)">{{everyFileCheckedList.length}}/{{everyFileList.length}}</el-checkbox>
      </span>
      <span id="everyFileDown" class="el_icon el_icon_right fr cur" :title="fourthFlag ? '收起' : '展开'" :class="{'el-icon-arrow-right': fourthFlag === null, 'el-icon-arrow-down': fourthFlag === true,'el-icon-arrow-up': fourthFlag === false}" @click="upOrDown"></span>

      <span class="el_icon fr cur" title="版本选择" @click.stop="fileVisionIconClick">v{{nowSelectedEdition}}</span>
      <!--<span class="el_icon el-icon-upload2 fr cur"></span>-->
      <el-upload
      class="fr"
      :action="'/File.ashx?publisher='+userID+'&informationType=coll&edition='+(maxEdition+1)+'&information='+teskId+'&groupedition=1'"
      :show-file-list="false"
      :multiple="true"
      :limit="9"
      :on-exceed="handleExceed"
      :on-success="uploadSuccessAllReplace"
      :on-change="uploadChangeEvery"
      :on-progress="uploadProgress"
      :before-upload="beforeUpload">
      <span class="el_icon el-icon-refresh fr cur" title="版本替换" v-if="power" @click="fileAllReplace"></span>
      </el-upload>
      <span class="el_icon el-icon-refresh forbid fr" v-if="!power"></span>

      <el-upload
      class="fr"
      :action="'/File.ashx?publisher='+userID+'&informationType=coll&edition='+nowSelectedEdition+'&information='+teskId+'&groupedition=1'"
      :show-file-list="false"
      :multiple="true"
      :limit="9"
      :on-exceed="handleExceed"
      :on-success="uploadSuccessEvery"
      :on-change="uploadChangeEvery"
      :on-progress="uploadProgress"
      :before-upload="beforeUpload">
      <span class="el_icon el-icon-upload2 fr cur" title="上传" v-if="power" @click="recoverFourth"></span>
      </el-upload>
      <span class="el_icon el-icon-upload2 fr forbid" v-if="!power"></span>

      <span class="el_icon el-icon-download fr cur" title="下载" v-show="everyFileCheckedList.length" @click="everyBatchDownload()"></span>

      <ul class="file_version cur" v-if="fileVisionFlag">
      <li v-for="(ver, index) in fileVisionList" :key="index"  @click="fileVisionClick(ver)">v{{ver}}</li>
      </ul>
      </div>
      <ul v-if="fourthFlag === null || fourthFlag === true" class="file_list">
        <li class="file_li fl cur" v-for="(item,index) in everyFileList" :key="index" @mouseenter="fileMouseenter($event, item, index)" @mouseleave="fileMouseleave">
        <div class="file_li_top">
        <span><el-checkbox class="fl hovers file_checked" :class="{'hide_show': item.checked}"  v-model="item.checked" @change="everyFileChange(item)"></el-checkbox></span>
        <i class="el_icon hovers fr cur" title="版本" @click.stop="fileVisionIconClick(item, index)">v{{item.Selectgroupedition}}</i>
        <i class="el_icon hovers el-icon-delete fr" title="删除" :class="{'forbid': !power, 'cur': power}" v-if="item.delFlag" @click="power && everyFileDel(index,item)"></i>
        <el-upload
          class="fr file_replace"
          :action="'/File.ashx?publisher='+publishID+'&informationType=coll&edition='+nowSelectedEdition+'&information='+teskId+'&groupedition='+(groupEdition+1)"
          :show-file-list="false"
          :limit="9"
          :on-exceed="handleExceed"
          :on-success="uploadSuccessEveryReplace"
          :on-change="uploadChangeEveryReplace"
          :on-progress="uploadProgress"
          :before-upload="beforeUpload">
          <i class="el_icon hovers el-icon-refresh fr" title="文件替换" v-if="power" @click="fileEveryReplace(item,index)"></i>
        </el-upload>
        <i class="el_icon hovers el-icon-refresh forbid fr" v-if="!power"></i>
        <i class="el_icon hovers el-icon-download fr" title="下载"><a class="download_a" :href="item.YimageUrl" :download="item.Title+'.'+item.FileType"></a></i>
        <ul class="every_file_version cur" v-if="everyFileVisionFlag && nowFileMouseenterIndex === index">
        <li v-for="(ver, index) in everyFileVisionList" :key="index"  @click="everyFileVisionClick(ver)">v{{ver}}</li>
        </ul>
        </div>
          <span class="file_li_img" @click="filePreview(everyFileList,item,index)">
          <figure style="margin: 0" ref="figure" class="figure">
            <a v-if="item.FileTypeNum === 1" :src="item.Url" data-size="">
              <!--< img class="typeOne" :src="item.Titles ?item.Titles : item.Url"/>-->
              <img class="typeOne" v-if="item.FileTypeNum === 1" :src="item.Url">
            </a>
          </figure>
            <img class="typeTwo" v-if="item.FileTypeNum === 2" src="../../assets/img/icon2/2.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 3" src="../../assets/img/icon2/3.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 4" src="../../assets/img/icon2/4.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 5" src="../../assets/img/icon2/5.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 6" src="../../assets/img/icon2/6.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 7" src="../../assets/img/icon2/7.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 8" src="../../assets/img/icon2/8.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 9" src="../../assets/img/icon2/9.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 10" src="../../assets/img/icon2/10.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 11" src="../../assets/img/icon2/11.png">
            <img class="typeTwo" v-if="item.FileTypeNum === 0" src="../../assets/img/icon2/0.png">
            
        </span>
        <div class="file_title_div" :title="item.Title + '.' + item.FileType">
          <span class="file_li_title">{{item.Title}}</span><span class="surffix">.{{item.FileType}}</span>
        </div>
        <div class="file_li_hover">
        </div>
      </li>
        <p v-if="!power && !everyFileList.length && (fourthFlag === null || fourthFlag === true)" class="detail_empty">TA还没有上传工作附件</p>
      <el-upload
      class="avatar-uploader fl addfile"
      v-if="power"
      :action="'/File.ashx?publisher='+userID+'&informationType=coll&edition='+nowSelectedEdition+'&information='+teskId+'&groupedition=1'"
      :show-file-list="false"
      :multiple="true"
      :limit="9"
      :on-exceed="handleExceed"
      :on-success="uploadSuccessEvery"
      :on-change="uploadChangeEvery"
      :on-progress="uploadProgress"
      :before-upload="beforeUpload">
      <i class="el-icon-plus" title="上传"></i>
      </el-upload>

      </ul>
      </li>

      <!--左侧展开卡片==右侧分配任务详情==给分配人员评价-->
      <li class="four distribute_li">
        <ul class="star" id="star">
          <li v-for="(star, index) in starList" :key="index" class="el_star el-icon-star-on fl cur" :class="{'forbid': !createdPower, 'cur': createdPower, 'haveStar': index < comments}" @click="createdPower && starClick(index)">
          </li>
          <span class="icon_comment cur fr">
            <span class="self_comment cur fr" @click="commentPopShow">{{commentPopList.length ? commentPopList.length : '•••'}}</span>
            <div class="comment" v-if="commentPopFlag">
          <div class="comment_top">
            <p class="top_text fl">评价</p>
            <i class="top_close iconfont icon-guanbi cur fr"  @click="commentPopFlag = false"></i>
          </div>
          <div class="comment_center">
            <ul class="center_ul" :class="{'dis-ta': !commentPopList.length}">
              <li class="center_li" v-if="commentPopList.length" v-for="(list, index) in commentPopList" :key="index">
                <span class="comment_logo fl"><img :src="list.UserImages" :title="list.UserName"></span>
                <p class="text_content"><span>{{list.Content}}</span> <span v-if="false && list.recall && power" class="recall cur" @click="everyRecall(index,list)">{{list.recall}}</span></p>
                <p class="text_time">{{list.CreateTime | dateSlice}}</p>
              </li>
              <p class="content_empty" v-if="!commentPopList.length" >还没有评论~~<br />输入添加评论！</p>
            </ul>
          </div>
          <div class="comment_bottom">
            <el-input class="bottom_input" v-model="commentPopText" placeholder="请输入......"  type="textarea" autosize></el-input>
            <button type="button" class="bottom_send cur fr" @click="commentPopCommit">提交</button>
          </div>
        </div>

          </span>
        </ul>
        <span class="el_icon el-icon-share fr cur" title="分享" @click="teskShare()"></span>
      </li>
    </ul>
    
    <!--图片预览-->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="pswp__bg"></div>
      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui">
          <div class="pswp__top-bar">
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <!-- <button class="pswp__button pswp__button--share" title="Share"></button> -->
            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
            <!-- <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> -->
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

    <!--文件预览-->
    <div class="iframe" v-if="iframeFlag">
      <i class="close el-icon-error" @click="iframeFlag = false"></i>
      <iframe v-if="fileItem.FileTypeNum == 2 || fileItem.FileTypeNum == 3 || fileItem.FileTypeNum == 5 || fileItem.FileType == 'txt'" :src="fileItem.Url" width='90%' height='90%' frameborder='0'>
      </iframe>
      <div v-if="fileItem.FileTypeNum == 7 || fileItem.FileTypeNum == 8" class="iframe_div">
        <div class="iframe_title">{{fileItem.Title}}</div>
        <audio v-if="fileItem.FileTypeNum == 7" :src="fileItem.Url" controls="controls" autoplay="autoplay" preload="preload">亲 您的浏览器不支持html5的audio标签</audio>
        <video v-if="fileItem.FileTypeNum == 8" :src="fileItem.Url" controls="controls" autoplay="autoplay" preload="preload">亲 您的浏览器不支持html5的video标签</video>
      </div>
     
     
      <!-- <iframe src='https://view.officeapps.live.com/op/view.aspx?src=http%3a%2f%2fserver.apexgame.cn%2fupload%2ffile%2f20180713115849%2fa6041d78-77cb-445b-aec2-cc2d5e14ec08%2f5edfea73-ad67-436e-8254-4652cdcd1a3a.docx' width='90%' height='90%' frameborder='1'>
      </iframe>  -->
    
    <!--<iframe src='https://view.officeapps.live.com/op/view.aspx?src=http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls' width='90%' height='90%' frameborder='1'>-->
    <!--</iframe>-->
    <!--<c-pdf @closepdf="closepdf" v-show="isshowpdf" pdfurl="/upload/file/20180509073127/39ae16bd-cc5d-4259-a89d-5a7d01b613e5/01.pdf"></c-pdf>-->

    </div>
    <c-pdf @closepdf="closepdf" v-if="isshowpdf" :pdfurl="this.fileItem.Url"></c-pdf>
    <!-- 预览 -->

    <div> 

    </div>
    <popup-Preview v-if="previewFlag" @closepdf="closepdf" :allFileLists='everyFileList' :teskId="teskId" :personFilelist='personFilelist'  :clickIndex='clickIndex' @previewClose='previewClose'></popup-Preview>
    <popup-prompt v-if="delPopupFlag" :title="popupText" @isSure="isSure(parameter)" @isCancel="isCancel"></popup-prompt>
    <popup-share v-if="sharePopupFlag" :teskId="teskId" @shareClose="shareClose"></popup-share>
    <sharing-Process v-if="sharingProcessShow"  :teskId="teskId" :UserPkids='UserPkids' @shareClose="shareClose"></sharing-Process>
    
    <!-- 上传进度 -->
    <uploadProgress v-if="uploadProgressFlag" :fileProgressList="fileProgressList" @closeProgress="closeProgress"></uploadProgress>
  </div>
</template>
<script>
import popupPreview from "./popupPreview";
import sharingProcess from "./sharingProcess";
import popupPrompt from "./popupPrompt";
import popupShare from "./popupShare";
import uploadProgress from "./uploadProgress";

export default {
  components: {
    popupPrompt,
    popupShare,
    uploadProgress,
    popupPreview,
    sharingProcess
  },
  data() {
    return {
      iframeFlag: false, // 文件预览展示flag
      iframeUrl: "", // 文件预览地址
      isshowpdf: false, // pdf文件预览展示flag
      pdfurl: "", // pdf文件预览地址
      theProject: "offix", // 所属项目
      startTime: "", // 开始时间
      endTime: "", // 结束时间
      startTimeCopy: "", // 开始时间copy
      endTimeCopy: "", // 结束时间copy
      progressBar: 50, // 时间进度条
      detailTextList: [], // 任务描述+修改列表
      everyDetailTextList: [], // 每个分配人员任务描述+修改列表
      fileAllChecked: false, // 文件全选
      everyFileAllChecked: false, // 每个分配人员的文件全选
      fileAllChecked: false, // 文件全选
      everyFileCheckedList: [], // 分配人员的文件的选择列表
      fileCheckedList: [], // 文件的选择列表
      fileList: [], // 文件列表
      labelList: [], // 标签列表
      labelCList: [], // copy标签列表
      searchLabelText: "", // 搜索标签
      createdLabelFlag: false, // 创建标签标识
      createdLabelText: "", // 创建标签内容
      labelListShow: false, // 标签弹窗标识
      distributionList: [], // 分配人员列表
      nowBody: 0, // 现在选择的分配的员工
      allEvery: 0, // 一共分配任务人员数
      starList: [0, 1, 2, 3, 4], // 评价星星列表
      comments: 0, // 当前评价星星
      pushDetailText: "", // 任务描述追加
      pushDetailFlag: false, // 任务描述追加标识
      everyPushDetailFlag: false, // 每个分配人员的任务描述追加标识
      everyPushDetailText: "", // 每个分配人员的任务描述追加
      teskId: "", // 详细任务的ID
      everyId: "", // 点击当前分配人员的ID
      firstFlag: null, // 任务描述布局变化标识
      secondFlag: null, // 任务文件布局变化标识
      thirdFlag: null, // 每个分配人员的任务描述布局变化标识
      fourthFlag: null, // 每个分配人员的任务文件布局变化标识
      fifthFlag: null, // 任务标签布局变化标识
      userID: null, // 当前登录人的ID
      nowCardDetail: {}, // 当前选中的卡片详情
      screenWidth: document.body.clientWidth, // 浏览器窗口的变化
      maxEveryNumber: null, // 分配人员最大个数
      pageAddRight: 0,
      pageAddLeft: 0,
      createdLabelText: "", // 创建新标签的内容
      staffList: [], // 员工列表
      staffCList: [], // copy员工列表
      searchStaffText: "", // 员工搜索内容
      addStaffShow: false, //  添加协助人员
      pickerOptionsStart: {
        //日期
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      pickerOptionsEnd: {
        //日期
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      publishID: "", // 当前发布人的ID
      uploadListID: [], // 点击上传文件的list
      uploadListLength: 0, // 上传文件的个数
      fileVersion: 1, // 文件默认版本号
      everyFileList: [], // 每个分配人员的文件列表
      fileAllReplaceFLag: false, // 是否全部替换标识
      nowSelectedEdition: 1, // 当前选择人的文件版本号
      everySelectedId: "", //  当前选择人员的详情ID
      maxEdition: 1, // 当前选择人的文件版本号的最高版本
      fileVisionList: [], // 版本list
      everyFileVisionList: [], // 版本list
      nowReplaceIndex: 0, // 单个文件当前选择的index
      nowReplaceArticleFileId: "", // 单个文件当前选择组的ID
      nowFileMouseenterIndex: null, // 当前鼠标进入的文件列表index
      fileVisionFlag: false, // 版本展示标识
      everyFileVisionFlag: false, // 每个文件版本展示标识
      fileEveryReplaceFlag: null, // 当前选择人员的文件单个替换
      articleFilePkid: "", // 当前选择人员的文件单个要替换的ID
      fileEveryReplaceItem: "", // 当前选择人员的文件单个要替换的详情
      nowSelectedEditionReplace: 1, // 当前选择人的单个替换文件版本号
      maxEditionReplace: 1, // 当前选择人的单个替换文件版本号的最高版本
      fileVisionListReplace: [], // 版本list
      groupEdition: 1, // 单文件版本替换时当前版本
      power: true, // 点击分配人员是否有权限
      createdPower: true, // 发布者权限
      nowSelectedBodyFinished: false, // 当前选择分配人是否完成任务
      searchPath: false, // 判断当前是否是搜索页面的卡片
      delPopupFlag: false, // 确认删除弹窗flag
      popupText: "", // 弹窗提示信息
      parameter: [], // 文件/信息删除参数
      commentPopFlag: false, // 评价弹出气泡参数
      commentPopList: [], // 评价弹出气泡评价列表
      commentPopText: "", // 评价弹出气泡输入评价内容
      sharePopupFlag: false, // 分享弹窗显示隐藏flag
      sharingProcessShow: false, //分享流程弹窗显示隐藏
      teskLabelList: [], // 卡片展示标签的列表
      uploadProgressFlag: false, // 上传进度显示隐藏
      fileProgressList: [], // 上传进度列表
      items: [], // 图片预览列表,
      fileItem: null, // 文件预览对象,
      previewFlag: false,
      // 给子组件传值
      allFileLists: "", //所有人的数据列表
      personFilelist: "", //点击当前人的数据
      clickIndex: "", //点击的index
      UserPkids: "", //userid
      clickNum: 0, //点击次数
      myDate: ""
    };
  },
  filters: {
    dateSlice(value) {
      return value.slice(5);
    }
  },
  watch: {
    fileAllChecked(val) {
      if (val) {
        for (let ele of this.fileList) {
          ele.checked = val;
        }
      }
    },
    fileCheckedList(val) {
      if (val.length && val.length === this.fileList.length) {
        this.fileAllChecked = true;
      } else if (val.length && val.length <= this.fileList.length) {
        this.fileAllChecked = false;
      } else if (!val.length) {
        this.fileAllChecked = false;
      }
      // console.log('已选择的文件00', val);
    },

    everyFileAllChecked(val) {
      if (val) {
        for (let ele of this.everyFileList) {
          ele.checked = val;
        }
      }
    },
    everyFileCheckedList(val) {
      if (val.length && val.length === this.everyFileList.length) {
        this.everyFileAllChecked = true;
      } else if (val.length && val.length <= this.everyFileList.length) {
        this.everyFileAllChecked = false;
      } else if (!val.length) {
        this.everyFileAllChecked = false;
      }
      // console.log('分配人员已选择的文件11', val);
    },

    everyId(val) {
      if (val.toString() === this.userID) {
        this.power = true;
      } else {
        this.power = false;
      }
    }
  },

  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
        let everybodyWidth = $("#everybody").width();
        that.maxEveryNumber = Math.floor(everybodyWidth / 80);
        $("#everybody").css({
          maxHeight: 60 * that.maxEveryNumber + "px",
          overflow: "hidden"
        });
        this.allEvery = this.nowCardDetail.Coordination.length;
        if (this.allEvery <= this.maxEveryNumber) {
          $("#pageLeft").css({ display: "none" });
          $("#pageRight").css({ display: "none" });
        } else {
          $("#pageLeft").css({
            cursor: "not-allowed",
            display: "inline-block"
          });
          $("#pageRight").css({ cursor: "pointer", display: "inline-block" });
        }
      })();
    };
  },
  methods: {
    // 点击关闭pdf文件预览
    closepdf() {
      this.isshowpdf = false;
      this.iframeFlag = false;
    },

    // 点击文件预览
    filePreview(file, item, index) {
      // 判断如果不支持预览 就不跳转预览页面
      this.clickIndex = index;
      this.previewFlag = true;
      this.personFilelist = item;
      if (
        item.FileTypeNum == 2 ||
        item.FileTypeNum == 3 ||
        item.FileTypeNum == 5
      ) {
        let url1 = domain.url;
        let url2 = url1 + item.Url;
        url2 = encodeURIComponent(url2);
        let url3 = "https://view.officeapps.live.com/op/view.aspx?src=";
        this.fileItem.Url = url3 + url2;
        this.$nextTick(() => {
          this.iframeFlag = true;
        });
      }

      return false;
      // 1.图片: 1
      // 2.pdf: 6
      // 3.可以用office online预览的文件: 2 3 5
      // 4.音频: 7
      // 5.视屏: 8
      // 6 txt
      // 不可预览的文件: 其他
      // 组件显示

      this.fileItem = JSON.parse(JSON.stringify(item));
      if (item.FileTypeNum == 1) {
        this.items = [];
        var pswpElement = document.querySelectorAll(".pswp")[0];
        for (let i of file) {
          if (i.ImageWidth) {
            this.items.push({
              src: i.Url,
              w: i.ImageWidth,
              h: i.ImageHeight,
              Pkid: i.Pkid
            });
          }
        }
        let indexs = this.items.findIndex(ele => {
          return ele.Pkid == item.Pkid;
        });

        var options = {
          index: indexs,
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
      } else if (item.FileTypeNum === 6) {
        this.$nextTick(() => {
          this.isshowpdf = true;
        });
      } else if (
        item.FileTypeNum == 2 ||
        item.FileTypeNum == 3 ||
        item.FileTypeNum == 5
      ) {
        let url1 = domain.url;
        let url2 = url1 + item.Url;
        url2 = encodeURIComponent(url2);
        let url3 = "https://view.officeapps.live.com/op/view.aspx?src=";
        this.fileItem.Url = url3 + url2;
        this.$nextTick(() => {
          this.iframeFlag = true;
        });
      } else if (
        item.FileTypeNum == 7 ||
        item.FileTypeNum == 8 ||
        item.FileTypeNum == 11
      ) {
        this.$nextTick(() => {
          this.iframeFlag = true;
        });
      } else if (item.FileTypeNum === 0) {
        this.$nextTick(() => {
          this.iframeFlag = true;
        });
      } else {
        this.$message.warning("此文件类型暂不支持预览，可点击下载");
      }
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

    // 关闭文件上传视图
    closeProgress() {
      this.uploadProgressFlag = false;
      this.fileProgressList = [];
    },

    // 阻止冒泡
    stops(e) {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      } else if (window.event) {
        window.event.cancelBubble = true;
      }
    },

    // 清空文件选择
    clearCard(flag) {
      if (flag === 1) {
        // 全部清空
        this.fileAllChecked = false;
        this.everyFileAllChecked = false;
        this.fileCheckedList = [];
        this.everyFileCheckedList = [];
        this.pushDetailText = "";
        this.everyPushDetailText = "";
        $("#everybodyUl").css("marginLeft", 0);

        for (let ele of this.fileList) {
          ele.checked = false;
        }
        for (let ele of this.everyFileList) {
          ele.checked = false;
        }
        this.getLabelList(); // 获取标签列表
        this.getStaffList(); // 获取员工列表
      } else if (flag === 2) {
        // 左侧文件选择清空
        this.fileAllChecked = false;
        this.fileCheckedList = [];
        for (let ele of this.fileList) {
          ele.checked = false;
        }
      } else if (flag === 3) {
        // 右侧文件选择清空
        this.everyFileAllChecked = false;
        this.everyFileCheckedList = [];
        for (let ele of this.everyFileList) {
          ele.checked = false;
        }
      }
      this.uploadListID = [];
    },

    // 如果当前模块的视图处于缩略状态，点击模块的icon时 让缩略模块展开到正常视图
    recoverFirst() {
      if (this.firstFlag === false) {
        this.firstFlag = null;
        this.secondFlag = null;
        this.fifthFlag = null;
      }
    },
    recoverSecond() {
      if (this.secondFlag === false) {
        this.firstFlag = null;
        this.secondFlag = null;
        this.fifthFlag = null;
      }
    },
    recoverThird() {
      if (this.thirdFlag === false) {
        this.thirdFlag = null;
        this.fourthFlag = null;
      }
    },
    recoverFourth() {
      if (this.fourthFlag === false) {
        this.thirdFlag = null;
        this.fourthFlag = null;
      }
    },

    // 文件的选择全选
    fileAllCheckedChange(val) {
      this.recoverSecond();
      if (val) {
        this.fileCheckedList = this.fileList.concat();
      } else {
        for (let ele of this.fileList) {
          ele.checked = val;
        }
        this.fileCheckedList = [];
      }
    },

    // 任务文件选择改变
    fileChange(item) {
      let has = this.fileCheckedList.findIndex(ele => {
        return ele.Pkid === item.Pkid;
      });

      if (!item.checked && has !== -1) {
        // 取消 里面有 减掉
        this.fileCheckedList.splice(has, 1);
      } else if (item.checked && has === -1) {
        // 选中 里面没有 加上
        this.fileCheckedList.push(item);
      }
    },

    // 分配人员的文件的选择全选
    everyFileAllCheckedChange(val) {
      this.recoverFourth();
      if (val) {
        this.everyFileCheckedList = this.everyFileList.concat();
      } else {
        for (let ele of this.everyFileList) {
          ele.checked = val;
        }
        this.everyFileCheckedList = [];
      }
    },

    // 分配人员任务文件选择改变
    everyFileChange(item) {
      let has = this.everyFileCheckedList.findIndex(ele => {
        return ele.Pkid === item.Pkid;
      });

      if (!item.checked && has !== -1) {
        // 取消 里面有 减掉
        this.everyFileCheckedList.splice(has, 1);
      } else if (item.checked && has === -1) {
        // 选中 里面没有 加上
        this.everyFileCheckedList.push(item);
      }
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

    // 文件上传改变
    uploadChange(file, fileList) {
      // this.uploadListLength = fileList.length;
      // console.log('文件上传改变uploadChange',this.nowUploadSelectedList, fileList);
    },

    // 文件上传成功（返回文件ID）
    uploadSuccess(res, file, fileList) {
      this.fileUpload(res, file);
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

    // 文件上传
    fileUpload(fileIds, file) {
      let obj = { articlePkid: this.teskId, fileIds: fileIds };
      this.$HTTP("post", "/AppendTaskFile", obj)
        .then(res => {
          for (let ele of res.result) {
            this.$set(ele, "checked", false);
            this.$set(ele, "delFlag", false);
            this.$set(ele, "percentFile", null);
            this.$set(ele, "FileTypeNum", this.getFlieTyle(ele.FileType));
            // ele.FileType = this.getFlieTyle(ele.FileType);
          }

          this.fileList = res.result.concat(this.fileList);
          console.log("YYYYYY上传成功", this.fileList, res);

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
        })
        .catch(err => {
          console.log("上传错误", err);
        });
      this.clearCard(2);
    },

    // 文件删除
    fileDel(index, file) {
      if (Number(file.Groupedition) > Number(file.Selectgroupedition)) {
        this.$message.error("请先删除高版本");
        return;
      }
      this.delPopupFlag = true;
      this.popupText = "确定要删除此文件吗？";
      this.parameter = [1, index, file];
    },

    // 每个分配人员单个文件删除
    everyFileDel(index, file) {
      this.delPopupFlag = true;
      this.popupText = "确定要删除此文件吗？";
      this.parameter = [2, index, file];
    },

    // 确认删除
    isSure(params) {
      if (params[0] === 1) {
        // 发布任务文件删除
        let obj = { filemanagementPkid: params[2].Pkid };
        this.$HTTP("post", "/DeleteFilemanagement", obj)
          .then(res => {
            this.fileList.splice(params[1], 1);
            if (params[2].checked) {
              let haves = this.fileCheckedList.findIndex(ele => {
                return ele.checked === params[2].checked;
              });
              if (haves !== -1) {
                this.fileCheckedList.splice(haves, 1);
              }
            }

            this.$message.success("文件删除成功");
            // console.log('文件删除成功', res);
          })
          .catch(err => {
            this.$message.error("文件删除失败");
            // console.log('文件删除失败',err);
          });
      } else if (params[0] === 2) {
        // 分配人员上传的文件删除
        let obj = {
          filemanagementPkid: params[2].Pkid,
          articleFilePkid: params[2].ArticleFileId
        };
        this.$HTTP("post", "/DeleteFilemanagement2", obj)
          .then(res => {
            // console.log('单个文件版本替换成功',res);
            let results = res.result;
            if (params[2].checked) {
              let haves = this.everyFileCheckedList.findIndex(ele => {
                return ele.checked === params[2].checked;
              });
              if (haves !== -1) {
                this.everyFileCheckedList.splice(haves, 1);
              }
            }
            if (results === "true") {
              this.everyFileList.splice(params[1], 1);
            } else {
              this.$set(results, "checked", false);
              this.$set(results, "delFlag", false);
              this.$set(
                results,
                "FileTypeNum",
                this.getFlieTyle(results.FileType)
              );
              this.everyFileList[params[1]] = results;
            }
            this.everyFileList = this.everyFileList.concat();
          })
          .catch(err => {
            console.log("单个文件版本替换失败", err);
          });
      } else if (params[0] === 3) {
        // 任务描述追加删除
        this.$HTTP("post", "/DeleteArticleAdditional", {
          articleAdditionalPkid: params[2].Pkid
        })
          .then(res => {
            this.nowCardDetail.AdditionalList.splice(params[1], 1);
            this.$nextTick(() => {
              $("#teskDescList")
                .find(".every_text")
                .each((index, element) => {
                  $(element)
                    .find("span:first-child")
                    .html(this.nowCardDetail.AdditionalList[index].Content);
                });
            });
            console.log("删除追加描述成功", res);
          })
          .catch(err => {
            console.log("删除追加描述失败", err);
          });
        console.log(params, this.nowCardDetail.AdditionalList);
      } else if (params[0] === 4) {
        // 分配人员任务回复删除

        this.$HTTP("post", "/DeleteArticleContent", {
          articleContentPkid: params[2].Pkid
        })
          .then(res => {
            // console.log('删除回复成功', res);
            this.everyDetailTextList.splice(params[1], 1);
            this.$nextTick(() => {
              $("#everyDetailText")
                .find(".every_text")
                .each((index, element) => {
                  $(element)
                    .find("span:first-child")
                    .html(this.everyDetailTextList[index].Content);
                });
            });
          })
          .catch(err => {
            // console.log('删除回复失败', err);
          });
      }
      this.delPopupFlag = false;
      this.popupText = "";
      this.parameter = [];
    },

    // 取消删除
    isCancel() {
      this.delPopupFlag = false;
      this.popupText = "";
      this.parameter = [];
    },

    // 文件批量下载
    batchDownload() {
      this.recoverSecond();
      let link = "";
      if (this.fileCheckedList.length === 1) {
        link = $(
          '<a href="' +
            this.fileCheckedList[0].YimageUrl +
            '" download="' +
            this.fileCheckedList[0].Title +
            "." +
            this.fileCheckedList[0].FileType +
            '" target="_blank"></a>'
        );
        link.get(0).click(() => {
          this.clearCard(2);
        });
      } else {
        let batch = [];
        for (let li of this.fileCheckedList) {
          batch.push(Number(li.Pkid));
        }
        let ids = batch.join(",");
        link = $(
          '<a href="/AppServer2.0.asmx/ZipTask?filepkids=' +
            ids +
            '" download="' +
            this.fileCheckedList[0].Title +
            '....zip" target="_blank"></a>'
        );
      }

      link.get(0).click();
      for (let ele of this.fileList) {
        ele.checked = false;
      }
      this.clearCard(2);
    },

    // 分配人员文件批量下载
    everyBatchDownload() {
      this.recoverFourth();
      let link = "";
      if (this.everyFileCheckedList.length === 1) {
        link = $(
          '<a href="' +
            this.everyFileCheckedList[0].YimageUrl +
            '" download="' +
            this.everyFileCheckedList[0].Title +
            "." +
            this.everyFileCheckedList[0].FileType +
            '" target="_blank"></a>'
        );
        link.get(0).click(() => {
          this.clearCard(2);
        });
      } else {
        let batch = [];
        for (let li of this.everyFileCheckedList) {
          batch.push(Number(li.Pkid));
        }
        let ids = batch.join(",");
        link = $(
          '<a href="/AppServer2.0.asmx/ZipTask?filepkids=' +
            ids +
            '" download="' +
            this.everyFileCheckedList[0].Title +
            '....zip" target="_blank"></a>'
        );
      }

      link.get(0).click();
      for (let ele of this.everyFileList) {
        ele.checked = false;
      }
      this.clearCard(3);
    },

    // 文件任务鼠标移入
    fileMouseenter(e, ele, index) {
      this.nowFileMouseenterIndex = index;
      let nowDate = this.format(new Date());
      let createDate = ele.CreateTime + ":00";
      nowDate = nowDate.replace(/-/g, "/");
      let uploadTime = createDate.replace(/[\u4e00-\u9fa5]/g, "/");
      let d1 = new Date(uploadTime);
      let d2 = new Date(nowDate);
      let sub = parseInt(d2 - d1) / 1000 / 60; //两个时间相差的分钟数
      if (sub >= 5) {
        ele.delFlag = false;
      } else {
        ele.delFlag = true;
      }
      this.everyFileList = this.everyFileList.concat();
    },

    // 文件任务鼠标移移除
    fileMouseleave() {
      this.nowFileMouseenterIndex = null;
      if (this.everyFileVisionFlag) {
        this.everyFileVisionFlag = false;
      }
    },

    // 分配人员的文件上传
    fileUploadEvery(fileIds, file) {
      let obj = {
        articlePkid: this.teskId,
        userId: this.userID,
        fileIds: fileIds,
        selectedition: this.nowSelectedEdition
      };
      this.$HTTP("post", "/AddTaskFileList", obj)
        .then(res => {
          // console.log(1111,res.result);
          for (let ele of res.result) {
            this.$set(ele, "checked", false);
            this.$set(ele, "delFlag", false);
            this.$set(ele, "FileTypeNum", this.getFlieTyle(ele.FileType));
          }
          this.everyFileList = res.result.concat(this.everyFileList);

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
        })
        .catch(err => {
          this.$message.error("文件上传失败");

          console.log("上传错误", err);
        });
      this.clearCard(3);
    },

    // 分配人员的文件全部替换上传
    fileUploadEveryAllReplace(fileIds, file) {
      let obj = {
        articlePkid: this.teskId,
        CoordinationPkid: this.everySelectedId,
        userId: this.userID,
        fileIds: fileIds,
        edition: Number(this.maxEdition) + 1
      };
      this.$HTTP("post", "/UpDateTaskFileList", obj)
        .then(res => {
          for (let ele of res.result) {
            this.$set(ele, "checked", false);
            this.$set(ele, "delFlag", false);
            this.$set(ele, "FileTypeNum", this.getFlieTyle(ele.FileType));
          }
          this.everyFileList = res.result;
          this.maxEdition++;
          this.fileVisionList.push(this.maxEdition);
          this.nowSelectedEdition = this.maxEdition;

          this.$message.success("文件全部替换成功");
          console.log("全部替换成功", res);
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
        })
        .catch(err => {
          this.$message.error("文件全部替换失败");
          console.log("全部替换错误", err);
        });
      this.clearCard(3);
    },

    // 分配人员文件上传成功
    uploadSuccessEvery(res, file, fileList) {
      this.fileUploadEvery(res, file);
      this.clearCard(3);
    },

    // 文件全部替换上出现暗黄成功
    uploadSuccessAllReplace(res, file) {
      this.clearCard(3);

      this.fileUploadEveryAllReplace(res, file);
    },

    // 分配人员文件上传改变
    uploadChangeEvery(file, fileList) {
      // this.uploadListLength = fileList.length;
    },
    // 分配人员文件上传之前
    beforeUploadEvery(file, fileList) {
      // console.log('beforeUploadEvery', file);
    },

    // 分配人员的文件全部替换
    fileAllReplace() {
      this.recoverFourth();
      // this.fileAllReplaceFLag = true;
    },

    // 分配人员的文件单个替换上传
    fileUploadEveryReplace(fileId, file) {
      let obj = {
        articleFilePkid: this.articleFilePkid,
        fileId: fileId,
        edition: this.groupEdition + 1
      };
      this.$HTTP("post", "/UpdateOneTaskFileList", obj)
        .then(res => {
          let results = res.result;
          this.$set(results, "checked", false);
          this.$set(results, "delFlag", false);
          this.$set(results, "FileTypeNum", this.getFlieTyle(results.FileType));
          if (this.fileEveryReplaceFlag !== null) {
            this.everyFileList[this.fileEveryReplaceFlag] = results;
            this.fileEveryReplaceFlag = null;
          }
          if (this.fileEveryReplaceItem.checked) {
            let haves = this.everyFileCheckedList.findIndex(ele => {
              return ele.checked === this.fileEveryReplaceItem.checked;
            });
            if (haves !== -1) {
              this.everyFileCheckedList.splice(haves, 1);
            }
          }

          this.everyFileList = this.everyFileList.concat();
          console.log("文件单个替换上传成功", this.everyFileList, res.result);
          this.$message.success("文件单个替换上传成功");
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
        })
        .catch(err => {
          this.$message.error("文件单个替换上传失败");

          console.log("上传错误", err);
        });
    },
    // 分配人员文件单个替换上传成功
    uploadSuccessEveryReplace(res, file, fileList) {
      if (this.fileEveryReplaceFlag !== null) {
        this.fileUploadEveryReplace(res, file);
      }
    },
    // 分配人员文件单个替换上传改变
    uploadChangeEveryReplace(file, fileList) {},
    // 分配人员文件单个替换上传之前
    beforeUploadEveryReplace(file, fileList) {
      //        console.log('beforeUploadEvery', file);
    },

    // 分配人员的文件单个替换
    fileEveryReplace(item, index) {
      this.fileEveryReplaceItem = item;
      this.articleFilePkid = item.ArticleFileId;
      this.fileEveryReplaceFlag = index;
      this.groupEdition = Number(item.Groupedition);
    },

    // 文件类型判断
    getFlieTyle(surffix) {
      if (
        surffix === "png" ||
        surffix === "jpeg" ||
        surffix === "jpg" ||
        surffix === "gif" ||
        surffix === "bmp"
      ) {
        return 1; // 图片
      } else if (surffix === "doc" || surffix === "docx") {
        return 2; // 文档
      } else if (surffix === "xls" || surffix === "xlsx") {
        return 3; // 表格
      } else if (surffix === "psd") {
        return 4; // PS
      } else if (surffix === "ppt" || surffix === "pptx") {
        return 5; // ppt
      } else if (surffix === "pdf") {
        return 6; // pdf
      } else if (
        surffix === "mp3" ||
        surffix === "wma" ||
        surffix === "wav" ||
        surffix === "ogg" ||
        surffix === "ra"
      ) {
        return 7; // 音频
      } else if (
        surffix === "wmv" ||
        surffix === "avi" ||
        surffix === "mpg" ||
        surffix === "rmvb" ||
        surffix === "mp4"
      ) {
        return 8; //视频
      } else if (surffix === "zip" || surffix === "rar") {
        return 9; // 压缩包
      } else if (surffix === "ai") {
        return 10; // ai
      } else if (surffix === "txt") {
        return 11; //txt
      } else {
        return 0; // 其他
      }
    },

    // 点击文件版本图标
    fileVisionIconClick(item, index) {
      if (!item.ArticleFileId) {
        // 文件列表
        this.recoverFourth();
        if (Number(this.maxEdition) === 1) {
          return;
        }
        this.fileVisionFlag = true;
      } else {
        // 单个文件
        // 最高版本判断。。。。。。
        if (Number(item.Groupedition) === 1) {
          return;
        }
        this.nowReplaceIndex = index;
        this.nowReplaceArticleFileId = item.ArticleFileId;
        this.everyFileVisionList = [];
        for (var i = 1; i <= Number(item.Groupedition); i++) {
          this.everyFileVisionList.push(i);
        }
        this.everyFileVisionFlag = true;
      }

      let clickHide = e => {
        if (item === "top") {
          this.everyFileVisionFlag = false; // 隐藏
        } else {
          this.fileVisionFlag = false; // 隐藏
        }
        this.searchPath
          ? $("#testCard").unbind("click", clickHide)
          : $(document).unbind("click", clickHide);
      };
      this.searchPath
        ? $("#testCard").bind("click", clickHide)
        : $(document).bind("click", clickHide);
    },

    // 点击文件版本
    fileVisionClick(val) {
      this.nowSelectedEdition = val;
      let obj = {
        coordinationPkid: this.everySelectedId,
        selectEdition: this.nowSelectedEdition,
        articlePkid: this.teskId,
        userId: this.userID
      };
      this.$HTTP("post", "/UpdateSelectEdition", obj)
        .then(res => {
          this.everyFileList = res.result;
          for (let ele of this.everyFileList) {
            this.$set(ele, "checked", false);
            this.$set(ele, "delFlag", false);
            this.$set(ele, "FileTypeNum", this.getFlieTyle(ele.FileType));
          }
          this.fileVisionFlag = false;

          console.log("获取每个分配人员的版本任务文件成功", this.everyFileList);
        })
        .catch(err => {
          console.log("获取每个分配人员的版本任务文件失败", err);
        });
    },

    // 每个点击文件版本
    everyFileVisionClick(val) {
      let obj = { articleFilePkid: this.nowReplaceArticleFileId, edition: val };
      this.$HTTP("post", "/GetGroupEdition", obj)
        .then(res => {
          let results = res.result;
          this.$set(results, "checked", false);
          this.$set(results, "delFlag", false);
          this.$set(results, "FileTypeNum", this.getFlieTyle(results.FileType));
          this.everyFileList[this.nowReplaceIndex] = results;
          this.nowFileMouseenterIndex = null;
          this.everyFileVisionFlag = false;
          console.log("获取每个分配人员的版本任务文件成功", this.everyFileList);
        })
        .catch(err => {
          console.log("获取每个分配人员的版本任务文件失败", err);
        });
    },

    // 点击添加任务
    addPublish() {
      this.$router.push("/myTesk/myTeskPublish");
    },

    // 时间插件获取焦点
    setTimeFocus() {
      this.$nextTick(() => {
        let timeStart = (this.startTimeCopy = this.startTime);
        let timeEnd = (this.endTimeCopy = this.endTime);
        this.pickerOptionsStart = {
          //日期
          disabledDate(time) {
            return time.getTime() >= timeEnd - 8.64e7;
          }
        };
        this.pickerOptionsEnd = {
          //日期
          disabledDate(time) {
            return time.getTime() < timeStart - 8.64e7;
          }
        };
      });
    },

    setTimeChange() {
      // console.log(this.startTime, this.endTime);
      if (
        new Date(this.startTime).getTime() >= new Date(this.endTime).getTime()
      ) {
        this.$message.error("开始时间不能大于结束时间");
        this.startTime = this.startTimeCopy;
        this.endTime = this.endTimeCopy;
        return;
      }
      let obj = {
        articlepkid: this.teskId,
        startTime: this.startTime,
        endTime: this.endTime
      };
      this.$HTTP("post", "/UpdateArticleDate", obj)
        .then(res => {
          // 时间处理
          let start = res.result.StartTime;
          let end = res.result.EndTime;
          this.startTime = new Date(
            Number(start.slice(0, 4)),
            Number(start.slice(5, 7) - 1),
            Number(start.slice(8, 10)),
            Number(start.slice(12, 14)),
            Number(start.slice(15))
          );
          this.endTime = new Date(
            Number(end.slice(0, 4)),
            Number(end.slice(5, 7) - 1),
            Number(end.slice(8, 10)),
            Number(end.slice(12, 14)),
            Number(end.slice(15))
          );
          // console.log('change', res.result);
          this.nowCardDetail.StartTime = start.slice(5);
          this.nowCardDetail.EndTime = end.slice(5);

          // 进度条处理
          let percentage = Number(res.result.Proportional);
          this.nowCardDetail.Proportional = percentage > 100 ? 100 : percentage;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 点击是否完成
    finishChange(every) {
      if (every.UserId === this.userID.toString()) {
        let obj = {
          coordinationPkid: every.CoordinationPkid,
          state: every.State
        };

        this.$HTTP("post", "/UpdateCoordinationUser", obj)
          .then(res => {
            let state = res.result;
            let data = {
              teskId: this.teskId,
              State: state.State,
              TaskState: state.TaskState
            };
            this.$emit("cardFinishChange", JSON.stringify(data));
            this.nowSelectedBodyFinished = every.State;
            this.$message.success("任务完成状态更改成功");
          })
          .catch(err => {
            this.$message.error("任务完成状态更改失败");
            console.log(err);
          });
      }
    },

    // 对应卡片列表是否完成change
    cardFinishChange(userId, state) {
      let indexs = this.nowCardDetail.Coordination.findIndex(ele => {
        return userId === ele.UserId;
      });

      if (indexs !== -1) {
        this.nowCardDetail.Coordination[indexs].State = state;
      }
      this.nowCardDetail.Coordination = this.nowCardDetail.Coordination.concat();
    },

    // 当前选择分配的人 默认是自己
    nowEveryBody(index, every) {
      console.log("当前选择分配的人 默认是自己", every);
      this.commentPopFlag = false;
      this.commentPopList = [];
      this.commentPopText = "";
      this.nowSelectedBodyFinished = every.State;
      this.nowBody = index;
      this.everyId = every.UserId;
      this.everySelectedId = every.CoordinationPkid;
      this.nowSelectedEdition = every.SelectEdition;
      this.maxEdition = Number(every.Edition);
      this.fileVisionList = [];
      for (var i = 1; i <= this.maxEdition; i++) {
        this.fileVisionList.push(i);
      }
      this.getEveryDetail(this.teskId, this.everySelectedId);
      this.getEveryFileList(this.teskId, this.everyId, this.nowSelectedEdition);
      this.getEveryCommentList(this.teskId, this.everyId);
      // 每个分配人员的评价
      this.comments = every.Comment;
    },

    // 回复/追加描述鼠标移入
    recallMouseenter(ele) {
      let nowDate = this.format(new Date());
      let createDate = ele.CreateTime + ":00";
      nowDate = nowDate.replace(/-/g, "/");
      let uploadTime = createDate.replace(/[\u4e00-\u9fa5]/g, "/");
      let d1 = new Date(uploadTime);
      let d2 = new Date(nowDate);
      let sub = parseInt(d2 - d1) / 1000 / 60; //两个时间相差的分钟数
      if (sub >= 5) {
        return false;
      } else {
        return true;
      }
    },

    // 追加描述五分钟内删除
    teskRecall(index, tesk) {
      // console.log('teskRecall', tesk);
      if (!this.recallMouseenter(tesk)) {
        this.$message.warning("超过五分钟不可撤回");
        tesk.recall = "";
        return;
      }

      this.delPopupFlag = true;
      this.popupText = "确定要删除这条追加内容吗？";
      this.parameter = [3, index, tesk];
    },

    // 点击添加任务追加
    pushIconClick() {
      this.recoverFirst();
      this.pushDetailFlag = true;
      this.$nextTick(() => {
        console.log("top", $("#teskDescListPush").offset().top);
        $("#teskDescList").animate(
          { scrollTop: $("#teskDescListPush").offset().top },
          500
        );
      });
      let clickHide = e => {
        if (
          e.target.className === "push_detail_text" ||
          e.target.className.indexOf("button_push") !== -1 ||
          e.target.className === "el-textarea__inner"
        )
          return;
        this.pushDetailFlag = false; // 隐藏
        this.searchPath
          ? $("#testCard").unbind("click", clickHide)
          : $(document).unbind("click", clickHide);
      };
      this.searchPath
        ? $("#testCard").bind("click", clickHide)
        : $(document).bind("click", clickHide);
    },

    // 添加任务追加
    pushDetail(id) {
      if (!this.pushDetailText) {
        this.$message.warning("请输入追加内容");
        return;
      }
      let obj = {
        articlepkid: this.nowCardDetail.Pkid,
        userid: this.nowCardDetail.UserId,
        content: this.pushDetailText,
        pic: "",
        oldpic: "",
        time: new Date()
      };
      this.$HTTP("post", "/SetArticleAdditional", obj)
        .then(res => {
          let returnRes = res.result;
          this.$message.success("回复成功");
          let pushContent = {
            CreateTime: returnRes.CreateTime,
            Content: returnRes.Content,
            Pkid: returnRes.Pkid
          };
          if (this.recallMouseenter(pushContent)) {
            pushContent["recall"] = "删除";
          }
          this.nowCardDetail.AdditionalList.push(pushContent);
          this.$nextTick(() => {
            $(id)
              .find(".every_text")
              .each((index, element) => {
                $(element)
                  .find("span:first-child")
                  .html(this.nowCardDetail.AdditionalList[index].Content);
              });
          });

          console.log(
            $(id)
              .find(".every_text:last-child")
              .find("span:first-child")
          );
          this.pushDetailText = "";
        })
        .catch(err => {
          console.log(err);
          this.$message.error("追加发布失败");
        });
      this.pushDetailFlag = false;
    },

    // 每个分配人员点击添加任务追加
    everyPushIconClick() {
      this.recoverThird();
      this.everyPushDetailFlag = true;
      this.$nextTick(() => {
        $("#everyDetailText").animate(
          { scrollTop: $("#everyDetailTextPush").offset().top },
          500
        );
      });

      let clickHide = e => {
        if (
          e.target.className === "push_detail_text" ||
          e.target.className.indexOf("button_push") !== -1 ||
          e.target.className === "el-textarea__inner"
        )
          return;
        this.everyPushDetailFlag = false; // 隐藏
        this.searchPath
          ? $("#testCard").unbind("click", clickHide)
          : $(document).unbind("click", clickHide);
      };
      this.searchPath
        ? $("#testCard").bind("click", clickHide)
        : $(document).bind("click", clickHide);
    },

    // 每个分配人员的信息回复
    everyPushDetail() {
      if (!this.everyPushDetailText) {
        this.$message.warning("请输入追加内容");
        return;
      }
      let obj = {
        articlepkid: this.teskId,
        coordinationPkid: this.everySelectedId,
        userid: this.userID,
        content: this.everyPushDetailText,
        pic: "",
        oldpic: "",
        time: new Date()
      };
      this.$HTTP("post", "/SetArticleContent", obj)
        .then(res => {
          let returnRes = res.result;
          this.$message.success("回复成功");
          let pushContent = {
            CreateTime: returnRes.CreateTime,
            Content: returnRes.Content,
            Pkid: returnRes.Pkid
          };
          if (this.recallMouseenter(pushContent)) {
            pushContent["recall"] = "删除";
          }
          this.everyDetailTextList.push(pushContent);
          this.everyPushDetailText = "";
          this.$nextTick(() => {
            $("#everyDetailText")
              .find(".every_text")
              .each((index, element) => {
                $(element)
                  .find("span:first-child")
                  .html(this.everyDetailTextList[index].Content);
              });
          });
        })
        .catch(err => {
          console.log(err);
          this.$message.error("追加发布失败");
        });
      this.everyPushDetailFlag = false;
    },

    // 回复五分钟内删除
    everyRecall(index, tesk) {
      if (!this.recallMouseenter(tesk)) {
        this.$message.warning("超过五分钟不可撤回");
        tesk.recall = "";
        return;
      }
      this.delPopupFlag = true;
      this.popupText = "确定要删除这条回复内容吗？";
      this.parameter = [4, index, tesk];
    },

    // 点击评价
    starClick(index) {
      if (!this.nowSelectedBodyFinished) {
        this.$message.warning("任务还未完成，不能点击评价");
        return;
      }
      if (this.nowCardDetail.Coordination[this.nowBody].Comment != 0) {
        this.$message.warning("不能重复评价");
        return;
      }
      this.comments = index + 1;
      this.nowCardDetail.Coordination[this.nowBody].Comment = this.comments;

      let obj = { coordinationPkid: this.everySelectedId, comment: index + 1 };
      this.$HTTP("post", "/UpdateComment", obj)
        .then(res => {
          this.$message.success("评价成功");
        })
        .catch(err => {
          this.$message.error("评价失败");
        });
    },

    // 任务分享
    teskShare() {
      if (this.clickNum == 0) {
        this.myDate = new Date().valueOf();
      }
      this.clickNum++;
      if (
        new Date().valueOf() < this.myDate + 60 * 1000 &&
        this.clickNum > 10
      ) {
        this.$message("点击次数过多，3分钟稍后再来哦！");
        setTimeout(function() {
          this.clickNum = 0;
        }, 2000);
        return;
      } else {
        let obj = { articlePkid: this.teskId, author: this.userID };
        // 分享流程页面显示
        this.sharingProcessShow = true;
      }

      return;
  
      // 分享流程页面显示
      // this.$router.push({ name: "H5share", params: { obj } });
      // return;
      // this.sharePopupFlag = true;
      // this.$router.push('/sharePage');
    },

    // 点击任务气泡评价
    commentPopShow() {
      this.commentPopFlag = !this.commentPopFlag;
    },

    // 任务气泡评价提交
    commentPopCommit() {
      if (!this.commentPopText) {
        this.$message.warning("请输入评价！");
        return;
      }
      let obj = {
        userId: this.userID,
        CoordinationUserPkid: this.everyId,
        content: this.commentPopText,
        articleId: this.teskId
      };
      this.$HTTP("post", "/AddComment", obj)
        .then(res => {
          this.commentPopList.push(res.result);
          this.commentPopText = "";
          console.log("评价成功", res);
        })
        .catch(err => {
          console.log("评价失败", err);
        });
    },

    // 分享页面关闭
    shareClose() {
      this.sharingProcessShow = false;
      // this.sharePopupFlag = false;
    },
    // 文件预览页面关闭 -----ke
    previewClose() {
      this.previewFlag = false;
    },
    // 卡片展开或收起
    upOrDown(e) {
      let iconId = e.target.id;

      if (iconId === "teskDescDown") {
        // 任务描述
        if (this.firstFlag === null) {
          this.firstFlag = true;
          this.secondFlag = false;
        } else if (this.firstFlag) {
          this.firstFlag = null;
          this.secondFlag = null;
        } else if (this.firstFlag === false) {
          this.firstFlag = null;
          this.secondFlag = null;
          this.fifthFlag = null;
        }
      } else if (iconId === "teskFileDown") {
        // 任务文件
        if (this.secondFlag === null) {
          this.secondFlag = true;
          this.firstFlag = false;
        } else if (this.secondFlag) {
          this.secondFlag = null;
          this.firstFlag = null;
        } else if (this.secondFlag === false) {
          this.firstFlag = null;
          this.secondFlag = null;
          this.fifthFlag = null;
        }
      } else if (iconId === "everyReplyDown") {
        // 分配人员任务描述
        if (this.thirdFlag === null) {
          this.thirdFlag = true;
          this.fourthFlag = false;
          // console.log('innn',$('#everyReply').height());
        } else if (this.thirdFlag) {
          this.thirdFlag = null;
          this.fourthFlag = null;
        } else if (this.thirdFlag === false) {
          this.fourthFlag = null;
          this.thirdFlag = null;
        }
      } else if (iconId === "everyFileDown") {
        // 分配人员任务文件
        if (this.fourthFlag === null) {
          this.fourthFlag = true;
          this.thirdFlag = false;
        } else if (this.fourthFlag) {
          this.fourthFlag = null;
          this.thirdFlag = null;
        } else if (this.fourthFlag === false) {
          this.fourthFlag = null;
          this.thirdFlag = null;
        }
      } else if (iconId === "labelDown") {
        if (!this.fifthFlag) {
          this.fifthFlag = true;
          this.firstFlag = false;
          this.secondFlag = false;
        } else if (this.fifthFlag) {
          this.fifthFlag = null;
          this.firstFlag = null;
          this.secondFlag = null;
        } else if (this.fifthFlag === false) {
          this.firstFlag = null;
          this.secondFlag = null;
          this.thirdFlag = null;
        }
      }
    },

    fileTopClick(e) {
      let iconId = e.target.id;
      if (iconId === "oneTop" && this.firstFlag === false) {
        this.firstFlag = null;
        this.secondFlag = null;
        this.fifthFlag = null;
      } else if (iconId === "twoTop" && this.secondFlag === false) {
        this.firstFlag = null;
        this.secondFlag = null;
        this.fifthFlag = null;
      } else if (iconId === "threeTop" && this.thirdFlag === false) {
        this.fourthFlag = null;
        this.thirdFlag = null;
      } else if (iconId === "fourTop" && this.fourthFlag === false) {
        this.fourthFlag = null;
        this.thirdFlag = null;
      }
    },

    oldHeight() {
      let iconId = e.target.id;
      let teskDesc = $("#teskDesc"),
        teskFile = $("#teskFile"),
        everyReply = $("#everyReply"),
        everyFile = $("#everyFile");
      let teskDescH = teskDesc.outerHeight(true),
        teskFileH = teskFile.outerHeight(true),
        everyReplyH = everyReply.outerHeight(true),
        everyFileH = everyFile.outerHeight(true);
      if (iconId === "teskDescDown") {
        // 任务描述
        if (this.secondFlag) {
          this.secondFlag = false;
          console.log(
            "任务描述",
            teskDesc,
            teskDesc.height(),
            teskDesc.outerHeight(),
            teskDesc.outerHeight(true)
          );
          // teskDesc.outerHeight(teskDesc.outerHeight() + teskFile.outerHeight() - 52);
          // teskFile.outerHeight(52);
          // $('#teskDescDown').animate({transform:'rotate(90deg)'},200);

          $("#teskDescDown").css({ transform: "rotate(90deg)" });
          teskDesc.animate({ height: teskDescH + teskFileH - 52 + "px" }, 200);
          teskFile.animate({ height: 52 + "px" }, 200);
        } else {
          this.secondFlag = null;
          $("#teskDescDown").css({ transform: "rotate(0deg)" });

          let heights = (teskDescH + teskFileH) / 2;
          // teskDesc.outerHeight(heights);
          // teskFile.outerHeight(heights);

          teskDesc.animate({ height: heights + "px" }, 200);
          teskFile.animate({ height: heights + "px" }, 200);
        }
      } else if (iconId === "teskFileDown") {
        // 任务文件
        if (this.firstFlag) {
          this.firstFlag = false;
          $("#teskFileDown").css({ transform: "rotate(90deg)" });
          teskFile.animate({ height: teskDescH + teskFileH - 52 + "px" }, 200);
          teskDesc.animate({ height: 52 + "px" }, 200);
        } else {
          this.firstFlag = null;
          let heights = (teskDescH + teskFileH) / 2;
          $("#teskFileDown").css({ transform: "rotate(0deg)" });
          teskFile.animate({ height: heights + "px" }, 200);
          teskDesc.animate({ height: heights + "px" }, 200);
        }
      } else if (iconId === "everyReplyDown") {
        // 分配人员任务描述
        let heights = everyReplyH + everyFileH;
        if (this.fourthFlag) {
          this.fourthFlag = false;
          $("#everyReplyDown").css({ transform: "rotate(90deg)" });
          everyReply.animate({ height: heights - 52 + "px" }, 200);
          everyFile.animate({ height: 52 + "px" }, 200);
        } else {
          this.fourthFlag = true;
          $("#everyReplyDown").css({ transform: "rotate(0deg)" });
          everyFile.animate({ height: heights / 2 - 26 + "px" }, 200);
          everyReply.animate({ height: heights / 2 + 26 + "px" }, 200);
        }
      } else if (iconId === "everyFileDown") {
        // 分配人员任务文件
        let heights = everyReplyH + everyFileH;
        if (this.thirdFlag) {
          this.thirdFlag = false;
          $("#everyReplyDown").css({ transform: "rotate(0deg)" });
          everyFile.animate({ height: heights - 52 + "px" }, 200);
          everyReply.animate({ height: 52 + "px" }, 200);
        } else {
          this.thirdFlag = true;
          $("#everyReplyDown").css({ transform: "rotate(0deg)" });
          everyReply.animate({ height: heights / 2 + 26 + "px" }, 200);
          everyFile.animate({ height: heights / 2 - 26 + "px" }, 200);
        }
      }
    },

    // 人员向左
    pageLeft() {
      this.getStaffNums();

      if (parseInt($("#everybodyUl").css("marginLeft") === 0)) {
        $("#pageLeft").css({ cursor: "not-allowed" });
        return;
      }

      if ($("#pageLeft").css("cursor") === "not-allowed") {
        return;
      }

      if ($("#pageLeft").css("cursor") !== "not-allowed") {
        this.pageAddLeft++;
        this.pageAddRight--;

        $("#pageRight").css({ cursor: "pointer" });
        let marginLeft = parseInt($("#everybodyUl").css("marginLeft"));

        $("#everybodyUl").animate(
          { marginLeft: marginLeft + 80 * this.maxEveryNumber + "px" },
          200
        );
        let leftFlag = Math.abs(
          Math.round(
            $("#everybodyUl")
              .css("marginLeft")
              .replace("px", "")
          )
        );

        if (80 * this.maxEveryNumber === leftFlag) {
          $("#pageLeft").css({ cursor: "not-allowed" });
          $("#pageRight").css({ cursor: "pointer" });
        }
      }
    },
    // 人员向右
    pageRight() {
      this.getStaffNums();
      if ($("#pageRight").css("cursor") === "not-allowed") {
        return;
      }
      this.pageAddRight++;
      let marginLeft = parseInt($("#everybodyUl").css("marginLeft"));

      $("#pageLeft").css({ cursor: "pointer" });
      $("#everybodyUl").animate(
        { marginLeft: marginLeft - 80 * this.maxEveryNumber + "px" },
        200
      );
      let maxs = this.allEvery - this.pageAddRight * this.maxEveryNumber;
      if (maxs <= this.maxEveryNumber) {
        $("#pageRight").css({ cursor: "not-allowed" });
      }
    },

    //点击添加标签
    addLabelIcon() {
      this.labelList = this.labelCheckedJudge(0);
      this.labelListShow = true;
      let clickHide = e => {
        if (
          e.target.className.indexOf("only_pop") !== -1 ||
          e.target.className === "el-checkbox__inner" ||
          e.target.className === "el-checkbox__original" ||
          e.target.className === "el-input__inner"
        ) {
          return;
        }
        this.labelListShow = false;
        this.searchLabelText = "";
        this.returnCreated();
        this.searchPath
          ? $("#testCard").unbind("click", clickHide)
          : $(document).unbind("click", clickHide);
      };
      this.searchPath
        ? $("#testCard").bind("click", clickHide)
        : $(document).bind("click", clickHide);
    },

    // 标签已选择列表判断
    labelCheckedJudge(flag) {
      // 1是人员 0是标签
      if (flag) {
        for (var i = 0; i < this.nowCardDetail.Coordination.length; i++) {
          for (var j = 0; j < this.staffCList.length; j++) {
            if (
              this.staffCList[j].Pkid ===
              this.nowCardDetail.Coordination[i].UserId
            ) {
              this.staffCList[j].checked = true;
            }
          }
        }
        return this.staffCList;
      } else {
        for (var i = 0; i < this.teskLabelList.length; i++) {
          for (var j = 0; j < this.labelCList.length; j++) {
            if (this.labelCList[j].Pkid === this.teskLabelList[i].Pkid) {
              this.labelCList[j].checked = true;
            }
          }
        }
        return this.labelCList;
      }
    },
    // 添加标签
    addLabel(li, index, e) {
      if (!li.checked && e.target.className !== "el-checkbox__original") {
        let obj = { articlepkid: this.teskId, categorypkid: li.Pkid };
        this.$HTTP("get", "/UpdateCategory", obj)
          .then(res => {
            this.teskLabelList.push(li);
            li.checked = true;
          })
          .catch(err => {
            this.$message.warning("添加标签失败");
          });
      }
      //        let has = this.teskLabelList.findIndex( el => {
      //          return  el.Pkid === li.Pkid;
      //        });
      //        if(has === -1) {
      //          let obj = {articlepkid: this.teskId, categorypkid: li.Pkid};
      //          this.$HTTP('get', '/UpdateCategory', obj).then(res => {
      //            this.teskLabelList.push(li);
      //            li.checked = true;
      //          }).catch(err => {
      //            this.$message.warning('添加标签失败');
      //          });
      //
      //        }else {
      //          this.teskLabelList.splice(has, 1);
      //          this.labelList[index].checked = false;
      //        }
    },

    // 标签选择状态改变
    labelChange(val, index) {
      if (!val) {
        this.labelList[index].checked = true;
      }
    },

    // 搜索标签
    searchLabel(text) {
      // this.labelList = this.labelCheckedJudge();
      // if(!text) {return; }
      this.labelList = this.labelCList.filter(el => {
        return el.Title.indexOf(text) >= 0;
      });
    },

    // 创建标签
    createdLabel() {
      if (this.createdLabelFlag) {
        if (!this.createdLabelText) {
          this.$message.warning("请输入标签");
          return false;
        }
        let obj = { title: this.createdLabelText };
        this.$HTTP("post", "/SetCategory", obj).then(res => {
          let news = res.result;
          news.map(ele => {
            return (ele.checked = true);
          });

          this.teskLabelList = this.teskLabelList.concat(news);
          this.labelCList = this.labelCList.concat(news);
          this.labelList = this.labelList.concat(news);
          this.returnCreated();
          this.$message.warning("创建新标签成功");
        });
      } else {
        if (!this.searchLabelText) {
          this.$message.warning("请输入标签");
          return false;
        }
        let obj = { title: this.searchLabelText };
        this.$HTTP("post", "/SetCategory", obj).then(res => {
          let news = res.result;
          news.map(ele => {
            return (ele.checked = true);
          });
          this.teskLabelList = this.teskLabelList.concat(news);
          this.labelCList = this.labelCList.concat(news);
          this.labelList = this.labelCheckedJudge(0);
          this.searchLabelText = "";
          this.$message.warning("创建新标签成功");
        });
      }
    },

    // 创建标签返回
    returnCreated() {
      this.createdLabelFlag = false;
      this.createdLabelText = "";
    },

    // 创建标签取消
    cancelCreated() {
      this.labelListShow = false;
    },

    // 点击追加人员icon
    addStaffIcon() {
      this.staffList = this.labelCheckedJudge(1);
      this.addStaffShow = true;
      let clickHide = e => {
        if (
          e.target.className.indexOf("only_pop") !== -1 ||
          e.target.className === "el-checkbox__inner" ||
          e.target.className === "el-checkbox__original" ||
          e.target.className === "el-input__inner"
        ) {
          return;
        }
        this.addStaffShow = false;
        this.searchStaffText = "";
        this.searchPath
          ? $("#testCard").unbind("click", clickHide)
          : $(document).unbind("click", clickHide);
      };
      this.searchPath
        ? $("#testCard").bind("click", clickHide)
        : $(document).bind("click", clickHide);
    },

    // 添加人员
    addStaff(li, index, e) {
      let obj = { articlepkid: this.teskId, userpkid: li.Pkid };
      if (!li.checked && e.target.className !== "el-checkbox__original") {
        // 添加
        this.$HTTP("get", "/UpdateArticle", obj)
          .then(res => {
            let addStaff = res.result;
            let addObj = { addId: addStaff.UserId, teskId: this.teskId };
            this.$emit("cardAddStaff", JSON.stringify(addObj));
            if (addStaff.UserId === this.userID.toString()) {
              this.$set(addStaff, "disabled", false);
            } else {
              this.$set(addStaff, "disabled", true);
            }
            this.nowCardDetail.Coordination.push(addStaff);
            li.checked = true;
            this.getStaffNums();
            this.allEvery = this.nowCardDetail.Coordination.length;
            if (this.allEvery <= this.maxEveryNumber) {
              $("#pageLeft").css({ display: "none" });
              $("#pageRight").css({ display: "none" });
            } else {
              $("#pageLeft").css({
                cursor: "not-allowed",
                display: "inline-block"
              });
              $("#pageRight").css({
                cursor: "pointer",
                display: "inline-block"
              });
            }
          })
          .catch(err => {
            this.$message.warning("添加人员失败");
          });
      } else if (li.checked && e.target.className !== "el-checkbox__original") {
        // 删除
        if (this.nowCardDetail.Coordination.length === 1) {
          this.$message.warning("协助人员不能为空");
          return;
        }
        this.$HTTP("get", "/DeleteArticle_Subtract", obj)
          .then(res => {
            let finds = this.nowCardDetail.Coordination.findIndex(ele => {
              return ele.UserId === li.Pkid;
            });
            this.nowCardDetail.Coordination.splice(finds, 1);
            if (finds === this.nowBody) {
              this.nowEveryBody(0, this.nowCardDetail.Coordination[0]);
            }
            li.checked = false;
            this.getStaffNums();
            this.allEvery = this.nowCardDetail.Coordination.length;
            if (this.allEvery <= this.maxEveryNumber) {
              $("#pageLeft").css({ display: "none" });
              $("#pageRight").css({ display: "none" });
            } else {
              $("#pageLeft").css({
                cursor: "not-allowed",
                display: "inline-block"
              });
              $("#pageRight").css({
                cursor: "pointer",
                display: "inline-block"
              });
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.warning("删除人员失败");
          });
      }
    },

    // 点击追加人员change
    addStaffChange(index, list) {
      if (!list[index]) {
        this.staffList[index].checked = true;
      }
    },

    // 搜索人员
    searchStaff(text) {
      this.staffList = this.staffCList.filter(el => {
        return el.Realname.indexOf(text) >= 0;
      });
    },

    // 分配人员可展示个数的计算
    getStaffNums() {
      window.screenWidth = document.body.clientWidth;
      this.screenWidth = window.screenWidth;
      let everybodyWidth = $("#everybody").width();
      this.maxEveryNumber = Math.floor(everybodyWidth / 80);
      // console.log(222,everybodyWidth, this.maxEveryNumber);
      $("#everybody").css({
        maxHeight: 80 * this.maxEveryNumber + "px",
        overflow: "hidden"
      });
      this.allEvery = this.nowCardDetail.Coordination.length;
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

    // 获取员工列表
    getStaffList() {
      let obj = { pkid: 1, userID: 0, number: 0 };
      this.$HTTP("get", "/GetUserListByPkid", obj)
        .then(res => {
          res.result.map(ele => {
            return (ele.checked = false);
          });
          this.staffList = res.result;
          this.staffCList = [...this.staffList];
          // console.log('员工列表', res.result);
        })
        .catch(err => {
          console.log("获取员工列表失败", err);
        });
    },

    // 获取卡片详情
    getCardDetail(teskId) {
      this.clearCard(1);

      let obj = { articlePkid: teskId, userid: this.userID };
      this.$HTTP("post", "/GetArticle", obj, ".tesk_card")
        .then(res => {
          this.nowCardDetail = res.result;
          this.publishID = this.nowCardDetail.UserId;
          this.UserPkids = this.nowCardDetail.UserPkids;
          if (this.publishID.toString() === this.userID) {
            // 发布者权限
            this.createdPower = true;
          } else {
            this.createdPower = false;
          }

          // 时间处理
          let start = this.nowCardDetail.StartTime;
          let end = this.nowCardDetail.EndTime;
          this.startTime = new Date(
            Number(start.slice(0, 4)),
            Number(start.slice(5, 7) - 1),
            Number(start.slice(8, 10)),
            Number(start.slice(12, 14)),
            Number(start.slice(15))
          );
          this.endTime = new Date(
            Number(end.slice(0, 4)),
            Number(end.slice(5, 7) - 1),
            Number(end.slice(8, 10)),
            Number(end.slice(12, 14)),
            Number(end.slice(15))
          );
          this.nowCardDetail.StartTime = this.nowCardDetail.StartTime.slice(5);
          this.nowCardDetail.EndTime = this.nowCardDetail.EndTime.slice(5);

          // 进度条处理
          let percentage = Number(this.nowCardDetail.Proportional);
          this.nowCardDetail.Proportional = percentage > 100 ? 100 : percentage;

          // 任务详情处理
          this.nowCardDetail.AdditionalList = JSON.parse(
            this.nowCardDetail.AdditionalList
          );
          this.nowCardDetail.AdditionalList.map(el => {
            if (this.recallMouseenter(el)) {
              return (el.recall = "删除");
            }
          });
          this.nowCardDetail.AdditionalList.unshift({
            Content: this.nowCardDetail.Content,
            CreateTime: this.nowCardDetail.CreateTime
          });
          this.$nextTick(() => {
            $("#teskDescList")
              .find(".every_text")
              .each((index, element) => {
                $(element)
                  .find("span:first-child")
                  .html(this.nowCardDetail.AdditionalList[index].Content);
              });
          });

          // 任务文件列表处理
          this.fileList = this.nowCardDetail.PubFile
            ? JSON.parse(this.nowCardDetail.PubFile)
            : [];
          for (let ele of this.fileList) {
            this.$set(ele, "percentFile", null);
            this.$set(ele, "checked", false);
            this.$set(ele, "delFlag", false);
            this.$set(ele, "FileTypeNum", this.getFlieTyle(ele.FileType));

            // ele.FileType = this.getFlieTyle(ele.FileType);
          }
          // console.log('文件列表', this.fileList);

          // 任务标签处理
          this.teskLabelList = JSON.parse(this.nowCardDetail.Ccategorys);

          // this.teskLabelList = [{Pkid: '855', Title: '玩个游戏'},{Pkid: '856', Title: 'offix'}];

          // 分配人员处理
          this.nowCardDetail.Coordination = JSON.parse(res.result.Coordination);
          this.nowCardDetail.Coordination.map(ele => {
            if (ele.UserId === this.userID.toString()) {
              return (ele.disabled = false);
            } else {
              return (ele.disabled = true);
            }
          });

          // 每个分配人员的详情
          this.teskId = this.nowCardDetail.Pkid;
          if (this.nowCardDetail.Coordination.length) {
            this.nowEveryBody(0, this.nowCardDetail.Coordination[0]);
          } else {
            this.nowCardDetail.Coordination = [];
          }

          // 人员左右page
          this.getStaffNums();
          if (this.allEvery <= this.maxEveryNumber) {
            $("#pageLeft").css({ display: "none" });
            $("#pageRight").css({ display: "none" });
          } else {
            $("#pageLeft").css({
              cursor: "not-allowed",
              display: "inline-block"
            });
            $("#pageRight").css({ cursor: "pointer", display: "inline-block" });
          }

          console.log("卡片详情", res.result);
        })
        .catch(err => {
          console.log(err);
          this.$message.error("获取详情失败");
        });
    },

    // 获取每个分配人员的详情
    getEveryDetail(teskId, everySelectedId) {
      let obj = { articlePkid: teskId, coordinationPkid: everySelectedId };
      this.$HTTP("post", "/GetReplyInformationList", obj)
        .then(res => {
          this.everyDetailTextList = res.result;
          this.everyDetailTextList.map(el => {
            if (this.recallMouseenter(el)) {
              return (el.recall = "删除");
            }
          });
          this.$nextTick(() => {
            $("#everyDetailText")
              .find(".every_text")
              .each((index, element) => {
                $(element)
                  .find("span:first-child")
                  .html(this.everyDetailTextList[index].Content);
              });
          });
        })
        .catch(err => {
          console.log("获取每个人的回复详情失败", err);
        });
    },

    // 获取每个分配人员的任务文件
    getEveryFileList(teskId, everyId, edition) {
      let obj = { articlePkid: teskId, userId: everyId, edition: edition };
      this.$HTTP("post", "/GetStringTaskFileList", obj)
        .then(res => {
          this.everyFileList = res.result;
          for (let ele of this.everyFileList) {
            this.$set(ele, "checked", false);
            this.$set(ele, "delFlag", false);
            this.$set(ele, "FileTypeNum", this.getFlieTyle(ele.FileType));
          }
          console.log("获取每个分配人员的任务文件", res.result);
        })
        .catch(err => {
          console.log("获取每个分配人员的任务文件失败", err);
        });
    },

    // 获取每个分配人员的评价列表
    getEveryCommentList(teskId, everyId) {
      let obj = {
        articlePkid: teskId,
        CoordinationUserPkid: everyId,
        page: 0,
        number: 0
      };
      this.$HTTP("post", "/GetCommentList", obj)
        .then(res => {
          this.commentPopList = res.result;
          console.log("获取评价列表成功", res.result);
        })
        .catch(err => {
          console.log("获取评价列表失败", err);
        });
    }
  },
  created() {
    this.userID = JSON.parse(localStorage.getItem("staffInfo")).Pkid;
    // console.log(localStorage.getItem("staffInfo").Realname);
    this.userID = this.userID.toString();
    if (this.$route.path === "/Search") {
      this.searchPath = true;
    }
  }
};
</script>
<style lang="less">
@import "../../assets/css/base.less";
// .iframe {
//   position: fixed;
//   top: 0;
//   left: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   width: 100%;
//   height: 100vh;
//   z-index: 9999;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   iframe {
//     background-color: #ffffff;
//   }
//   .iframe_div {
//     width: 50%;
//     text-align: center;
//     background-color: #fff;
//     .iframe_title {
//       margin: 10px;
//     }
//     audio,
//     video {
//       width: 100%;
//       max-height: 90vh;
//     }
//   }

//   .close {
//     font-size: 40px;
//     position: absolute;
//     top: 20px;
//     right: 20px;
//     cursor: pointer;
//     color: #4064ff;
//   }
// }

.tesk_card {
  width: 100%;
  height: 100%;
  background-color: #ffffff;

  -webkit-box-shadow: inset 0 0 10px #444444;
  -moz-box-shadow: inset 0 0 10px #444444;
  -webkit-box-shadow: 0 0 10px rgba(68, 68, 68, 0.2);
  -moz-box-shadow: 0 0 10px rgba(68, 68, 68, 0.2);
  box-shadow: 0 0 16px rgba(68, 68, 68, 0.2);
  .border_radius(@br: 10px);

  .detail {
    width: 47%;
    height: 100%;

    /*width: 380px;*/
    border-right: 1px solid #dcdcdc;
    .box_sizing;

    .detail_li {
      width: 100%;
      border-top: 1px solid #dcdcdc;
      &:first-child {
        border-top: 0 solid #dcdcdc;
      }
      .box_sizing;
      &:not(:last-child) {
        overflow: hidden;
      }
    }

    .one,
    .two {
      height: 52px;
      line-height: 52px;
      padding: 0 20px;
      .box_sizing;
    }

    .one {
      .all_finish {
        .slected_checkbox;
      }

      .all_head {
        display: inline-block;
        width: 30px;
        height: 30px;
        vertical-align: middle;
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

      .theProject {
        font-size: 14px;
      }
    }

    .two {
      /*span:not(:nth-child(2)) {*/
      /*width: 100px;*/
      /*}*/
      .progress_bar {
        width: calc(~"(100% - 112px * 2)");
        text-align: center;
        margin-top: -4px;
        .el-progress {
          display: inline-block;
          width: 100%;
          max-width: 160px;
          padding: 0 10px;
          .box_sizing;
          /*@media screen and (max-width: 1280px) {*/
          /*width: 64px;*/

          /*}*/
          /*width: 106px;*/
        }
      }

      .start_time,
      .end_time {
        width: 112px;
        .el-input__inner {
          padding: 0 !important;
          border: 0 solid #ffffff;
          cursor: pointer;
        }

        .el-input__prefix {
          display: none;
        }

        .el-input__suffix {
          display: none;
        }
      }
    }

    .three {
      .transition_height;

      height: calc(~"(100% - 52px * 3) / 2");
      padding: 0 20px;
      .box_sizing;
      .detail_content;
      .detail_text {
        height: calc(~"100% - 16px - 20px");
      }
    }

    .change_three_max {
      .transition_height;
      height: calc(~"(100% - 52px * 4)");
      padding: 0 20px;
      .box_sizing;
      .detail_content;
      .detail_text {
        height: calc(~"100% - 16px - 20px");
      }
    }
    .change_three_min {
      .transition_height;
      height: 52px;
      line-height: 52px;
      padding: 0 20px;
      .detail_top {
        height: 52px;
        line-height: 52px;
        margin-bottom: 0;
        span {
          line-height: 52px;
        }
        span:first-child {
          font-size: 16px;
        }
        span:last-child {
          padding-right: 10px;
        }

        span:not(:first-child) {
          color: @grayNight;
        }
      }
    }

    .four {
      .transition_height;

      height: calc(~"(100% - 52px * 3) / 2");
      padding: 0 20px;
      .box_sizing;

      .detail_file;
      .file_list {
        position: relative;

        .detail_empty {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          .f-size-16;
          color: #b6b6b6;
          text-align: center;
          vertical-align: middle;
        }
        /*max-height: calc(~ '100% - 16px - 20px');*/
        height: calc(~"100% - 16px - 20px");
        min-height: 110px;
      }
    }
    .change_four_max {
      .transition_height;
      height: calc(~"(100% - 52px * 4)");
      padding: 0 20px;
      .box_sizing;
      .detail_file;
      .file_list {
        .detail_empty {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          .f-size-16;
          color: #b6b6b6;
          text-align: center;
          vertical-align: middle;
        }
        /*max-height: calc(~ '100% - 16px - 20px');*/
        height: calc(~"100% - 16px - 20px");
        min-height: 110px;
      }
    }
    .change_four_min {
      .transition_height;
      .div_upload {
        height: 52px;
      }
      height: 52px;
      line-height: 52px;
      padding: 0 20px;

      .files_top {
        height: 52px;
        line-height: 52px;
        .all_checked {
          .el-checkbox + .el-checkbox {
            margin-left: 0 !important;
          }
          .slected_checkbox;
        }
        span {
          line-height: 52px !important;
        }
        .el_icon {
          .dis-in-bl;
          font-size: 16px;
          line-height: 52px;
          color: @grayNight;
        }

        /*.el_icon.el-icon-upload2{*/
        /*padding: 0 10px;*/

        /*}*/
      }
    }

    .five {
      .transition_height;
      width: 100%;
      height: 52px;
      line-height: 52px;
      padding: 0 20px;
      .box_sizing;
      .label_out {
        display: inline-block;
        max-width: calc(~"100% - 20px * 3");
        min-width: 230px;
        height: 52px;
        overflow: hidden;
      }
      .label {
        height: 52px;
        width: 200%;

        .label_empty {
          width: 230px;
          height: 52px;
          color: #b6b6b6;
          text-align: center;
        }

        .label_li {
          .dis-in-bl;
          height: 20px;
          line-height: 20px;
          padding: 0px 10px;
          .border_radius(@br: 10px);
          border: 1px solid @grayNight;
          color: @grayNight;
          .f-size-12;
          margin-right: 10px;
        }
      }

      .add_lab_div {
        margin-right: 10px;
        position: relative;
        .dis-in-bl;
        width: 20px;
        height: 52px;
        .add_lab {
          .dis-in-bl;
          width: 20px;
          height: 52px;
          line-height: 52px;
          .f-size-16;
          color: @grayNight;
        }
      }
      .el_icon {
        line-height: 52px;
        color: @grayNight;
      }
    }

    .change_five_max {
      .transition_height;
      height: calc(~"100% - 52px * 4");
      padding: 0 20px;
      .box_sizing;
      .label {
        /*max-width: calc(~ '100% - 20px - 40px');*/
        /*height: calc(~ '100% - 40px - 32px');*/
        width: 100%;
        height: calc(~"100% - 52px");
        overflow-y: auto;
        line-height: 32px;
        .label_li {
          vertical-align: top;
          .dis-in-bl;
          height: 20px;
          line-height: 20px;
          padding: 0px 10px;
          .border_radius(@br: 10px);
          border: 1px solid @grayNight;
          color: @grayNight;
          .f-size-12;
          margin-right: 10px;
        }
      }
      .add_lab_div {
        position: relative;
        .dis-in-bl;
        width: 20px;
        height: 52px;

        .add_lab {
          .dis-in-bl;
          width: 20px;
          height: 52px;
          line-height: 52px;
          .f-size-16;
          color: @grayNight;
        }
        .label_box {
          top: 23px;
          left: 24px;
          height: 193px;
        }
      }
      .el_icon {
        line-height: 52px;
      }
    }
  }

  .distribute {
    width: 53%;

    height: 100%;
    .distribute_li {
      width: 100%;
      border-top: 1px solid #dcdcdc;
      &:first-child {
        border-top: 0 solid #dcdcdc;
      }
      .box_sizing;
      &:nth-child(2) {
        overflow: hidden;
      }
      &:nth-child(3) {
        overflow: hidden;
      }
    }

    .one,
    .four {
      height: 52px;
      line-height: 52px;
      padding: 0 20px;
    }

    .one {
      .everybody_div {
        height: 100%;
        width: calc(~"100% - 120px");
        overflow: hidden;
      }
      .everybody {
        height: 100%;
        .every_li {
          width: 60px;
          position: relative;
          margin-right: 20px;
          .every_finish {
            .self_checked(@pxone: 20px, @color: #999999);
          }

          .every_head {
            .dis-in-bl;
            width: 30px;
            height: 30px;
            vertical-align: middle;
            border-radius: 50%;
            background-color: @line;
            margin-left: 10px;
            img {
              .dis-in-bl;
              width: 100%;
              height: 100%;
              .border_radius(@br: 50%);
              border: 0 solid #ffffff;
            }
          }

          .every_bottom {
            position: absolute;
            width: 100%;
            height: 2px;
            background-color: @hoveBlue;
            bottom: 0;
            left: 0;
          }
        }
      }

      .handle {
        .all_every_icon {
          position: relative;
          .label_box {
            top: 26px;
            bottom: 0;
            left: 16px;
            height: 193px;
          }
        }

        .all_every {
          margin: 0 10px;
        }
        .all_every_icon,
        .all_every,
        .pages {
          color: @grayNight;
          .cur;
          font-size: 16px;
          line-height: 52px;
        }
        .pages {
          height: 52px;
          i {
            .dis-in-bl;
            height: 52px;
            line-height: 52px;
          }

          #pageLeft {
            cursor: not-allowed;
          }
        }
      }
    }

    .two {
      .transition_height;

      height: calc(~"(100% - 52px * 2) / 2 + 26px");

      padding: 0 20px;
      position: relative;
      .detail_content;
      .detail_text {
        height: calc(~"100% - 16px - 20px");
      }
    }
    .change_two_max {
      .transition_height;
      height: calc(~"(100% - 52px * 3)");

      padding: 0 20px;
      position: relative;
      .detail_content;
      .detail_text {
        height: calc(~"100% - 16px - 20px");
      }
    }

    .change_two_min {
      .transition_height;
      height: 52px;
      line-height: 52px;
      padding: 0 20px;

      .detail_top {
        height: 52px;
        line-height: 52px;
        margin-bottom: 0;
        span {
          line-height: 52px;
        }
        span:first-child {
          font-size: 16px;
        }
        span:last-child {
          padding-right: 10px;
        }

        span:not(:first-child) {
          color: @grayNight;
        }
      }
    }

    .three {
      .transition_height;

      height: calc(~"(100% - 52px * 2) / 2 - 26px");

      padding: 0 20px;

      .detail_file;
      .file_list {
        /*max-height: calc(~ '100% - 16px - 20px');*/
        height: calc(~"100% - 16px - 20px");
        min-height: 110px;
        position: relative;

        .detail_empty {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          .f-size-16;
          color: #b6b6b6;
          text-align: center;
          vertical-align: middle;
        }
      }
    }
    .change_three_max {
      .transition_height;
      height: calc(~"(100% - 52px * 3)");

      padding: 0 20px;

      .detail_file;
      .file_list {
        /*max-height: calc(~ '100% - 16px - 20px');*/
        height: calc(~"100% - 16px - 20px");
        min-height: 110px;
        position: relative;

        .detail_empty {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          .f-size-16;
          color: #b6b6b6;
          text-align: center;
          vertical-align: middle;
        }
      }
    }

    .change_three_min {
      .transition_height;
      height: 52px;
      line-height: 52px;
      padding: 0 20px;
      .files_top {
        height: 52px;
        line-height: 52px;
        .all_checked {
          .el-checkbox + .el-checkbox {
            margin-left: 0 !important;
          }
          .slected_checkbox;
        }
        span {
          line-height: 52px !important;
          padding-left: 10px;
        }
        .el_icon {
          .dis-in-bl;
          font-size: 16px;
          color: @grayNight;
          line-height: 52px;
        }

        /*.el_icon.el-icon-upload2{*/
        /*padding: 0 10px;*/

        /*}*/
      }
    }

    .four {
      position: relative;
      .star {
        height: 20px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .el_comment {
          position: absolute;
          line-height: 20px;
          right: -22px;
        }
        .icon_comment {
          position: absolute;
          top: 0;
          left: 130px;
          .self_comment {
            display: inline-block;
            line-height: 1;
            padding: 1px 2px;
            min-width: 16px;
            color: #4583f0;
            border: 1px solid #4583f0;
            position: relative;
            font-size: 12px;
            border-radius: 2px;
            background-color: #fff;
            text-align: center;
            .box_sizing;
            &:after {
              display: inline-block;
              content: "";
              width: 4px;
              height: 6px;

              position: absolute;
              bottom: -4px;
              left: 3px;
              border-right: 1px solid #4583f0;
              border-bottom: 1px solid #4583f0;
              transform: rotate(60deg);
              background-color: #fff;
            }
          }
        }
        .el_star {
          .dis-in-bl;
          font-size: 20px;
          width: 20px;
          height: 20px;
          color: #d5d5d5;
          padding-left: 6px;
          &:first-child {
            padding-left: 0px;
          }
        }
        .haveStar {
          color: #4583f0 !important;
        }
      }
      .el_icon {
        font-size: 16px;
        color: @grayNight;
        line-height: 52px;
      }
    }
  }

  .bgc {
    background-color: @hoveBlue;
    .border_radius(@br: 6px);
  }

  .el_icon_right {
    color: @grayNight;
    .f-size-16;
    .dis-in-bl;
  }

  .detail_content {
    line-height: 1;
    padding-top: 20px;
    padding-bottom: 10px;
    .box_sizing;

    .detail_top {
      margin-bottom: 10px;
      height: 16px;
      span {
        font-size: 16px;
      }
      span:last-child {
        padding-right: 10px;
      }

      span:not(:first-child) {
        color: @grayNight;
      }
    }

    .detail_text {
      overflow-y: auto;
      .every_text {
        .text_time {
          font-size: 12px;
          color: @grayNight;
        }
        .text_content {
          width: 100%;
          padding-top: 2px;
          padding-bottom: 6px;
          .box_sizing;
          span:first-of-type {
            line-height: 1.5;
            word-break: break-word;
          }

          .recall {
            color: @blue;
            text-decoration: underline;
          }
        }
      }
    }

    .detail_empty {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .f-size-16;
      color: #b6b6b6;
      text-align: center;
      vertical-align: middle;
    }

    .push_detail_text {
      margin-top: 10px;
      width: 96%;
      .push_detail_input {
        .el-textarea__inner {
          min-height: 32px;
          width: 100%;
          border: 1px solid #e5e5e5;
          .box_sizing;
          .border_radius(@br: 6px);
          padding-left: 4px;
          .box_sizing;
          resize: none;
        }
      }

      .button_push {
        margin-left: calc(~"100% - 70px");
        margin-top: 10px;
      }
    }
  }

  .detail_file {
    padding-top: 20px;
    .box_sizing;

    .files_top {
      position: relative;
      margin-bottom: 10px;
      height: 16px;
      span:first-child {
        font-size: 16px;
        line-height: 16px;
      }
      .all_checked {
        .slected_checkbox;
      }

      .el_icon {
        .dis-in-bl;
        font-size: 16px;
        color: @grayNight;
        padding-left: 10px;
      }

      .file_version {
        position: absolute;
        top: 10px;
        right: 24px;
        max-height: 150px;
        overflow-y: auto;
        -webkit-box-shadow: 0 1px 5px #444444;
        -moz-box-shadow: inset 0 1px 5px #444444;
        -webkit-box-shadow: 0 1px 5px rgba(68, 68, 68, 0.2);
        -moz-box-shadow: 0 1px 5px rgba(68, 68, 68, 0.2);
        box-shadow: 0 1px 5px rgba(68, 68, 68, 0.2);
        .border_radius(@br: 6px);
        z-index: 999;
        li {
          text-align: center;
          padding: 0 10px;
          height: 30px;
          line-height: 30px;
          background-color: #fff;
          z-index: 999;

          &:hover {
            background: rgba(242, 243, 249, 1);
          }
        }
      }
    }

    .file_list {
      overflow-y: auto;

      .file_li {
        width: 100px;
        height: 100px;
        border: 1px solid @line;
        .border_radius(@br: 6px);
        .box_sizing;
        background-color: #fff;
        margin: 0 10px 10px 0;
        padding: 4px;
        position: relative;

        &:hover {
          border: 1px solid #409eff;
          .file_li_top {
            .hovers {
              opacity: 1;
            }
          }
        }

        .file_progress {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -30px;
          margin-left: -30px;
          width: 60px;
          height: 60px;
          opacity: 0.7;
          background-color: #fff;
          .el-progress-circle {
            width: 60px !important;
            height: 60px !important;
          }
        }

        .file_li_top {
          width: 100%;
          height: 18px;
          line-height: 18px;
          position: relative;
          .hovers {
            opacity: 0;
          }

          .el_icon {
            line-height: 18px;
            color: @grayNight;
            padding-left: 3px;
          }

          /*.el-icon-delete, .el-icon-refresh{*/
          /*padding-left: 6px;*/
          /*}*/

          .file_checked {
            height: 18px;
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

          .every_file_version {
            position: absolute;
            top: 8px;
            right: -36px;
            max-height: 150px;
            overflow-y: auto;
            -webkit-box-shadow: 0 1px 5px #444444;
            -moz-box-shadow: inset 0 1px 5px #444444;
            -webkit-box-shadow: 0 1px 5px rgba(68, 68, 68, 0.2);
            -moz-box-shadow: 0 1px 5px rgba(68, 68, 68, 0.2);
            box-shadow: 0 1px 5px rgba(68, 68, 68, 0.2);
            .border_radius(@br: 6px);
            z-index: 999;
            li {
              text-align: center;
              padding: 0 10px;
              height: 30px;
              line-height: 30px;
              background-color: #fff;
              z-index: 999;

              &:hover {
                background: rgba(242, 243, 249, 1);
              }
            }
          }

          .file_replace {
            height: 18px;
          }
        }

        .file_li_img {
          .dis-in-bl;
          width: 100%;
          height: 50px;
          margin-top: 4px;
          text-align: center;
          .typeOne {
            max-width: 88px;
            height: 50px;
          }

          .typeTwo {
            width: 37px;
            height: 50px;
          }
        }

        .file_title_div {
          width: 100%;
          height: 14px;
          line-height: 14px;
          text-align: center;
          .file_li_title {
            .dis-in-bl;
            max-width: 52px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .f-size-12;
            .box_sizing;
            vertical-align: bottom;
            /*vertical-align: bottom;*/
          }

          .surffix {
            .f-size-12;
            .dis-in-bl;
            max-width: 36px;
            text-align: left;
          }
        }

        .file_li_hover {
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 100px;
          height: 100px;

          .border_radius(@br: 6px);
          .box_sizing;
        }
      }

      .el-icon-plus {
        width: 100px;
        font-weight: bold;
        font-size: 50px;
        color: #ebebeb;
        line-height: 100px;
      }
    }
  }

  .label_box {
    position: absolute;
    width: 207px;
    max-height: 193px;
    bottom: 40px;
    left: 8px;
    z-index: 999;
    cursor: pointer;
    color: rgba(153, 153, 153, 1);
    box-sizing: border-box;

    .created_lab {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      border-radius: 6px;

      -webkit-box-shadow: 0 1px 5px #444444;
      -moz-box-shadow: inset 0 1px 5px #444444;
      -webkit-box-shadow: 0 1px 5px rgba(68, 68, 68, 0.2);
      -moz-box-shadow: 0 1px 5px rgba(68, 68, 68, 0.2);
      box-shadow: 0 1px 5px rgba(68, 68, 68, 0.2);

      .created_top {
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        border-bottom: 1px solid rgba(220, 220, 220, 1);
        font-size: 16px;
        text-align: center;
        i {
          .dis-in-bl;
          line-height: 40px;
        }
      }

      .created_input {
        .el-input__inner {
          .dis-in-bl;
          margin: 20px 15px;
          height: 40px;
          width: 177px;
          line-height: 40px;
          .border_radius(@br: 6px);
          padding: 0 4px;
          .box_sizing;
          border: 1px solid rgba(220, 220, 220, 1);
          color: @grayNight;
        }
      }

      .created_button {
        width: 177px;
        margin: 0 15px 20px 15px;
      }
    }
    .lab_ul {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      border-radius: 6px;
      -webkit-box-shadow: 0 1px 5px #444444;
      -moz-box-shadow: inset 0 1px 5px #444444;
      -webkit-box-shadow: 0 1px 5px rgba(68, 68, 68, 0.2);
      -moz-box-shadow: 0 1px 5px rgba(68, 68, 68, 0.2);
      box-shadow: 0 1px 5px rgba(68, 68, 68, 0.2);
      .j_top {
        height: 31px;
        line-height: 31px;
        border-bottom: 1px solid rgba(220, 220, 220, 1);
        position: relative;

        .search {
          width: 100%;

          .el-input__inner {
            border: 0px solid #ffffff;
            width: 100%;
            height: 30px;
            line-height: 30px;
            color: @grayNight;
          }
        }

        .created_lab_icon {
          position: absolute;
          color: #4583f0;
          font-size: 16px;
          top: 50%;
          margin-top: -8px;
          right: 10px;
        }
      }
      .j_bottom {
        min-height: 50px;
        max-height: 150px;
        overflow: auto;

        .search_empty {
          line-height: 2;
          text-align: center;
          margin: 20px;
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

        li {
          height: 30px;
          line-height: 30px;
          padding: 0 20px 0 15px;
          box-sizing: border-box;

          .staff_head {
            display: inline-block;
            width: 24px;
            height: 24px;
            .border_radius(@br: 50%);
            margin-bottom: 3px;
          }

          .texts {
            display: inline-block;
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        li:hover {
          background: rgba(242, 243, 249, 1);
        }
      }
      button {
        margin: 20px;
        width: 166px;
        height: 32px;
        background: rgba(69, 131, 240, 1);
        border-radius: 6px;
        color: white;
        cursor: pointer;
      }
    }
  }

  .transition_height {
    /*transition: all 0.2s;*/
    /*-moz-transition: all 0.2s;	!* Firefox 4 *!*/
    /*-webkit-transition:all 0.2s;	!* Safari 和 Chrome *!*/
    /*-o-transition: all 0.2s;	!* Opera *!*/

    transition: height 0.2s, transform 0.2s;
    -moz-transition: height 0.2s, -moz-transform 0.2s; /* Firefox 4 */
    -webkit-transition: height 0.2s, -webkit-transform 0.2s; /* Safari 和 Chrome */
    -o-transition: height 0.2s, -o-transform 0.2s; /* Opera */
  }

  @deg: 90deg;
  .transition_rotate(@deg: 90deg) {
    transform: rotate(@deg);
    -ms-transform: rotate(@deg); /* IE 9 */
    -webkit-transform: rotate(@deg); /* Safari and Chrome */
    -o-transform: rotate(@deg); /* Opera */
    -moz-transform: rotate(@deg); /* Firefox */
    transform-origin: 50%;
    -ms-transform-origin: 50%; /* IE 9 */
    -webkit-transform-origin: 50%; /* Safari 和 Chrome */
    -moz-transform-origin: 50%; /* Firefox */
    -o-transform-origin: 50%; /* Opera */
  }

  .upload_Box {
    width: 498px;
    height: 100%;
    float: left;
    text-align: center;
    cursor: pointer;
    color: rgba(153, 153, 153, 1);
    overflow: scroll;
    .upload_warp_right {
      height: 100%;
      .upload_warp_img {
        padding: 15px 0 0 15px;
        height: 100%;
        box-sizing: border-box;
        .upload_warp_img_div {
          position: relative;
          height: 100px;
          width: 100px;
          border-radius: 6px;
          border: 1px solid rgba(220, 220, 220, 1);
          margin: 0 15px 10px 0;
          float: left;
          line-height: 100px;
          display: table-cell;
          text-align: center;
          cursor: pointer;
          .upload_warp_img_div_top {
            position: absolute;
            top: 0;
            width: 100%;
            height: 25px;
            line-height: 25px;
            text-align: right;
            font-size: 12px;
            padding-right: 5px;
            box-sizing: border-box;
          }
          img {
            width: 55px;
            max-height: 50px;
            vertical-align: middle;
          }
        }
        .upload_warp_img_div:hover {
          border: 1px solid #409eff;
        }
        .upload_warp_left {
          float: left;
          width: 100px;
          height: 100px;
          border: 1px solid #999;
          border-radius: 4px;
          cursor: pointer;
          font-size: 100px;
          text-align: center;
          line-height: 100px;
          color: rgba(235, 235, 235, 1);
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

  .avatar-uploader {
    width: 100px;
    height: 100px;
    margin: 0 10px 10px 0;
  }
  .avatar-uploader .el-upload {
    .dis-in-bl;
    border: 1px solid #d9d9d9;
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

  .download_a {
    .dis-in-bl;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .el-icon-download {
    position: relative;
  }

  .hide_show {
    opacity: 1 !important;
  }

  .forbid {
    cursor: not-allowed !important;
  }

  .slected_checkbox {
    height: 16px;
    line-height: 16px;
    position: relative;
    .el-checkbox + .el-checkbox {
      margin-left: 0 !important;
    }
    .el-checkbox {
      .el-checkbox__label {
        color: @grayNight;
        line-height: 16px;
        font-weight: normal !important;
      }
      .el-checkbox__input.is-checked {
        color: @grayNight;
      }

      .el-checkbox__inner {
        background-color: #fff;
        border-color: @grayNight;
      }
      .el-checkbox__inner::after {
        border: 2px solid #fff !important;
        border-left: 0 !important;
        border-top: 0 !important;
        border-color: #409eff !important;
      }
    }
  }

  .comment {
    width: 330px;
    height: 240px;
    background-color: #ffffff;
    position: absolute;
    bottom: 32px;
    left: -144px;
    -webkit-box-shadow: inset 0 0 10px #474747;
    -moz-box-shadow: inset 0 0 10px #474747;
    -webkit-box-shadow: 0 0 10px rgba(71, 71, 71, 0.4);
    -moz-box-shadow: 0 0 10px rgba(71, 71, 71, 0.4);
    box-shadow: 0 0 10px rgba(71, 71, 71, 0.4);
    .border_radius(@br: 6px);

    &:after {
      display: inline-block;
      content: "";
      width: 16px;
      height: 16px;
      position: absolute;
      bottom: -9px;
      left: 144px;
      border-right: 1px solid @line;
      border-bottom: 1px solid @line;
      transform: rotate(46deg);
      -ms-transform: rotate(46deg); /* IE 9 */
      -webkit-transform: rotate(46deg); /* Safari and Chrome */
      -o-transform: rotate(46deg); /* Opera */
      background-color: #fff;
    }
    .comment_top {
      width: 100%;
      height: 46px;
      line-height: 46px;
      position: relative;

      .top_text {
        width: 100%;
        font-size: 16px;
        text-align: center;
      }

      .top_close {
        font-size: 12px;
        font-weight: 700;
        color: #666666;
        position: absolute;
        right: 10px;
        line-height: 46px;
        &:hover {
          color: #4574df;
        }
      }
    }
    .comment_center {
      width: 100%;
      height: 140px;
      border-top: 1px solid @line;
      border-bottom: 1px solid @line;
      padding: 10px;
      .box_sizing;

      .center_ul {
        width: 100%;
        height: 120px;
        overflow-y: auto;
        .content_empty {
          color: @grayNight;
          text-align: center;
          vertical-align: middle;
          display: table-cell;
        }

        .center_li {
          &:not(:first-child) {
            padding-top: 5px;
          }
          .comment_logo {
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
            }
          }

          .text_content {
            width: 100%;
            padding-left: 40px;
            .box_sizing;
            word-break: break-word;
            line-height: 1.5;
            .recall {
              color: @blue;
              text-decoration: underline;
            }
          }

          .text_time {
            padding-left: 40px;
            .box_sizing;
            font-size: 12px;
            color: @grayNight;
            line-height: 1.5;
          }
        }
      }
    }
    .comment_bottom {
      width: 100%;
      height: 52px;
      line-height: 52px;
      padding: 10px;
      .box_sizing;
      display: table;
      .bottom_input {
        width: 256px;
        vertical-align: middle;
        display: table-cell;
        .el-textarea__inner {
          max-height: 32px;
          line-height: 1;
          overflow: auto;
          width: 256px;
          border: 0px solid #e5e5e5;
          .box_sizing;
          padding: 0px !important;
          .box_sizing;
          resize: none;
        }
      }

      .bottom_send {
        display: block;
        padding: 0 10px;
        margin-top: 5px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background-color: @blue;
        color: #ffffff;
        .border_radius(@br:6px);
        border: 1px solid #4583f0;
        cursor: pointer;
        font-size: 12px;
        &:hover {
          background-color: @hoveBlue;
        }
      }
    }
  }

  .el_icon_arrow {
    position: relative;
    &:before {
      position: absolute;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      top: 8px;
      padding-top: 12px;
    }
  }

  /* pswp__ui--idle class is added when mouse isn't moving for several seconds (JS option timeToIdle) */
  .pswp__ui--idle .pswp__top-bar {
    opacity: 1 !important;
  }

  .pswp__ui--idle .pswp__button--arrow--left,
  .pswp__ui--idle .pswp__button--arrow--right {
    opacity: 1 !important;
  }

  .pswp__button--fs:before {
    content: "\e824";
    font-family: "iconfont";
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    font-size: 20px;
    color: #fff;
    position: absolute;
    top: 11px;
    left: 13px;
  }
}
</style>
