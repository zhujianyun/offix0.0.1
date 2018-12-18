<template>
    <!-- 上传进度 -->
    <transition name="fade">
        <div class="upload_progress">
        <p class="upload_progress_title">上传进度</p>
        <i class="upload_progress_close el-icon-close" @click="close"></i>
        <ul class="upload_progress_ul">
            <li class="upload_progress_li" v-for="(progress, index) in fileProgressList" :key="index">
            <span class="upload_progress_img">
                <img v-if="progress.FileTypeNum == 1" :src="progress.imgUrl" alt="">
                <img v-else :filetype="progress.FileTypeNum" :src="progress.FileTypeNum > 0 ? fileTypeImg[progress.FileTypeNum - 2].src : fileTypeImg[fileTypeImg.length - 1].src">
                </span>
            <span class="upload_progress_name">{{progress.name}}</span>
            <span class="upload_progress_percent"><el-progress :stroke-width="4" :percentage="Number(progress.progress)" :show-text="false"></el-progress></span>
            <span class="upload_progress_size">{{progress.size}}</span>
            <i v-if="progress.status" class="el-icon-check"></i>
            </li>
        </ul>
        </div>
    </transition>
</template>
<script>
export default {
    props: ['fileProgressList'],
    data() {
        return {
            fileTypeImg: [
            {
                src: require("../../assets/img/icon2/2.png")
            }, {
                src: require("../../assets/img/icon2/3.png")
            }, {
                src: require("../../assets/img/icon2/4.png")
            }, {
                src: require("../../assets/img/icon2/5.png")
            }, {
                src: require("../../assets/img/icon2/6.png")
            }, {
                src: require("../../assets/img/icon2/7.png")
            }, {
                src: require("../../assets/img/icon2/8.png")
            }, {
                src: require("../../assets/img/icon2/9.png")
            }, {
                src: require("../../assets/img/icon2/10.png")
            }, {
                src: require("../../assets/img/icon2/0.png")
            },
            ], // 文件类型图片
        }
    },
    methods: {
      // 关闭文件上传视图
      close() {
        this.$emit('closeProgress');
      },
    },
    cerated() {
        
    }

}
</script>

