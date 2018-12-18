<template>
  <div class="popup">
    <div class="popup_content">
      <div class="top clearfix">
        <p class="popup_text fl">提示</p>
        <i class="popup_close iconfont icon-guanbi cur fr cancelIcon" @click="popupCancel"></i>
      </div>
      <div class="center">
       <p class="copy_writer">{{title}}</p>
      </div>
      <div class="bottom">
        <button class="sure main_button_bg fr" type="button" @click="popupSure">确定</button>
        <button class="cancle main_button_color fr" type="button" @click="popupCancel">取消</button>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
      props: ['title'],
        data() {
            return {}
        },
        methods: {
          // 点击确定
          popupSure() {
            this.$emit('isSure', true);
          },

          // 点击确定
          popupCancel() {
            this.$emit('isCancel', false);
          },
        }
    }
</script>
<style lang="less">
  .box_sizing {
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
  }
  @br: 6px;
  .border_radius(@br:6px) {
    -webkit-border-radius: @br;
    -moz-border-radius: @br;
    border-radius: @br;
  }

  .popup {
    .popup_content {
      width:420px;
      height:240px;
      .box_sizing;
      -webkit-box-shadow: inset 0 0 10px #474747;
      -moz-box-shadow: inset 0 0 10px #474747;
      -webkit-box-shadow: 0 0 10px rgba(71, 71, 71, 0.4);
      -moz-box-shadow: 0 0 10px rgba(71, 71, 71, 0.4);
      box-shadow: 0 0 10px rgba(71, 71, 71, 0.4);
      .border_radius(@br: 6px);
      background-color: #FFFFFF;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -210px;
      margin-top: -120px;
      animation:popup 0.2s ease;
      -webkit-animation:popup 0.2s ease;
      -moz-animation: popup 0.2s ease;
      -o-animation: popup 0.2s ease;
      .top {
        height: 55px;
        line-height: 55px;
        border-bottom: 1px solid #DCDCDC;
        position: relative;

        .popup_text {
          width: 100%;
          font-size: 16px;
          text-align: center;
        }

        .popup_close {
          font-size: 12px;
          color: #666666;
          position: absolute;
          right: 20px;
          &:hover {
            color: #4574DF;
          }

        }
      }

      .center {
        width: 100%;
        padding-left: 20px;
        padding-right: 20px;
        .box_sizing;
        line-height: 114px;
        height: 114px;
        text-align: center;
        display: table;
        .copy_writer {
          word-break: break-word;
          line-height: 1.5;
          max-height: 114px;
          vertical-align: middle;
          display: table-cell;
          font-size: 14px;
        }
      }

      .bottom {
        height: 70px;
        margin-right: 20px;
        .sure {
          margin-left: 20px;
        }
      }
    }

    @keyframes popup {
      0% {
        -webkit-transform: scale(0);
        -moz-transform: scale(0);
        -ms-transform: scale(0);
        -o-transform: scale(0);
        transform: scale(0);
      }
      100%{
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
      }
    }

  }

</style>
