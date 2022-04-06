<template>
  <div class="noticeBar">
    <div class="noticeBar-top">
      <div class="noticeBar-j">
        <div class="noticeBar-title">系统介绍</div>
        <div>
          <span class="noticeBar-j-upload"> <i class="el-icon-upload2"></i> 上传文件</span>
          <span class="noticeBar-j-download"> <i class="el-icon-download"></i>下载文件</span>
        </div>
      </div>
      <div class="noticeBar-j">
        <div class="noticeBar-title">运营文档</div>
        <div>
          <span class="noticeBar-j-upload"> <i class="el-icon-upload2"></i> 上传文件</span>
          <span class="noticeBar-j-download"> <i class="el-icon-download"></i>下载文件</span>
        </div>
      </div>
    </div>
    <div class="noticeBar-bottom">
      <div class="noticeBar-con">
        <i class="el-icon-warning-outline"></i>
        <span class="time">2022.03.21</span>
        <i></i>
        <span class="noticeBar-text">可跳转的消息通知可跳转的消息通知可跳转的消可跳转的消息通知可跳转的消可跳转的消息通知可跳转的消可跳转的消息通知可跳转的消可跳转的消息通知可跳转的消可跳转的消息通知可跳转的消可跳转的消息通知可跳转的消可跳转的消息通知可跳转的消可跳转的消…</span>
      </div>
      <div class="noticeBar-con">
        <i class="el-icon-warning-outline"></i>
        <span class="time">2022.03.21</span>
        <i></i>
        <span class="noticeBar-text">可跳转的消息通知可跳转的消可跳转的消息通知可跳转的消可跳转的消息通知可跳转的消可跳转的消息通知可跳转的消…</span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "noticeBar"
}
</script>

<style scoped lang="scss">
.noticeBar{
  height: calc(100% - 50px);
  width: 100%;
  .noticeBar-top{
    margin-top: 20px;
    .noticeBar-title{
      font-size: 14px;
      font-weight: 400;
      color: #2F343D;
      line-height: 20px;
    }
    .noticeBar-j{
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #2A79EE;
      line-height: 18px;
      .noticeBar-j-upload{
        margin-right: 10px;
        cursor: pointer;

      }
      .noticeBar-j-download{
        cursor: pointer;
      }
    }

  }
  .noticeBar-bottom{
    .noticeBar-con{
      margin-bottom: 16px;
      height: 18px;
      overflow: hidden;
      line-height: 18px;

      .el-icon-warning-outline{
        color:#2A79EE;
        font-size: 12px;
        margin-right: 8px;
      }
      .time{
        font-size: 12px;
        font-weight: 400;
        color: #919AAD;
        line-height: 18px;
        margin-right: 8px;
      }
      .noticeBar-text{
        vertical-align: middle;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #2F343D;
        line-height: 18px;
        width: calc(100% - 89px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        cursor: pointer;

      }
      .noticeBar-text:hover{
        color:#2A79EE;
      }

    }

  }

}
</style>
