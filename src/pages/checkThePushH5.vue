<template>
  <div class="checkThePushH5">
    <div class="title">{{title}}</div>
    <div class="time">{{time}}</div>
    <div class="content">
      <div class="content_wrap">
        <div class="statusSuccess" v-if="status === 4">{{statusSuccess}}</div>
        <div class="statusReview" v-if="status === 3">{{statusReview}}</div>
        <div class="C_title">{{C_title}}</div>
        <div class="tag_wrap">
          <div class="tag" v-if="isApp">APP推送</div>
          <div class="tag" v-if="isModal">APP短信推送</div>
          <div class="tag" v-if="isMsg">短信推送</div>
        </div>
        <div class="info">
          {{info}}
        </div>
        <div class="sub_info" v-if="isAppOpen && isApp">
          {{appSub_info}}
        </div>
        <div class="sub_info" v-if="isModalOpen && isModal">
          {{modalSub_info}}
        </div>
        <div class="sub_info" v-if="isMsgOpen && isMsg">
          {{msgSub_info}}
        </div>
        <div class="operation">
          <div class="view"><img width="16" height="16" src='../assets/img/link.png' alt=""><a :href="url" target="_blank">查看原文</a></div>
          <div class="source">来源：{{source}}</div>
        </div>
      </div>
    </div>
    <div class="footer" v-if="status !== 4">
      <div class="footer_wrap">
        <div class="inputContent">
          <input type="text" placeholder="请输入修改意见" v-model="verifyMessage">
        </div>
        <div class="review" @click="verifyInfo(false)">驳回</div>
        <div class="confirm" @click="acceptPush">接收</div>
      </div>
    </div>
    <div class="box" :style="{height:boxHeight,width:boxWidth}" v-if="verifyForm">
      <div class="box_border">
        <div class="box_content_wrap">
          <div class="box_title">请输入身份码</div>
          <div class="user_code"><input type="text" v-model="verifyCode"></div>
          <div class="code_error" v-if="verifyCodeStatus">请输入正确的身份码</div>
          <div class="confirm" :class="verifyCodeStatus ? '' : 'confirmTOP'" @click="submitVerifyCode">确认</div>
        </div>
        <div class="close" @click="verifyClose"><img src="../assets/img/close-circle@2x.png" alt=""></div>
      </div>
    </div>
    <div class="box_tip" :style="{height:boxHeight,width:boxWidth}" v-if="verifySuccess">
      <div class="box_border_tip">
        <div class="box_content_wrap_tip">
          <img src="../assets/img/check-circle@2x.png" alt="">
          <div class="box_title_tip">
            验证成功
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {checkPushH5,submitPushH5} from '../api/getData'
  export default {
    name: "checkThePushH5",
    data() {
      return {
        title:'热点推送',
        time:'2022-03-18 18:18:18',
        statusSuccess:'推送成功',
        statusReview:'驳回修改',
        status:'',
        C_title:'美油布油均涨超5%',
        isApp:false,
        isModal:false,
        isMsg:false,
        isAppOpen: false,
        isModalOpen: false,
        isMsgOpen: false,
        info:'美、布两油持续上涨，日内涨幅均扩大至5%以上，分别报125.34美元/桶、129.72美元/桶。',
        appSub_info:'App推送：详情>>【不构成投资建议，股市有风险，投资需谨慎】',
        modalSub_info:'弹窗推送:【欢迎拨打95336进行咨询，股市有风险，投资需谨慎。 回复TD退订】',
        msgSub_info:'短信推送：详情>> 【不构成投资建议，股市有风险，投资需谨慎】',
        source:'财联社',
        boxHeight:document.body.offsetHeight + 'px',
        boxWidth:document.body.offsetWidth + 'px',
        verifyForm:false,
        verifySuccess:false,
        verifyCode:'',
        verifyMessage:'',
        verifyCodeStatus:false,
        pushID:'',
        isPaSS:true,
        params:{
          id:'',
          code:'',
          isPass:true,
          msg:''
        },
        url:''
      };
    },
    mounted() {
      this.checkPushH5(3)
    },
    methods:{
      //获取推送审核页面内容
      checkPushH5(id){
        checkPushH5({id:id}).then((res) =>{
          let data = res.data
          this.C_title = data.push.title
          this.title = data.push.pushType === 1 ? '热点推送' : '固定推送'
          this.isApp = data.app.isMark
          this.isModal = data.modal.isMark
          this.isMsg = data.msg.isMark
          this.isAppOpen = data.app.isOpen
          this.isModalOpen  = data.modal.isOpen
          this.isMsgOpen  = data.msg.isOpen
          this.info = data.push.desc
          this.appSub_info = data.app.mark
          this.modalSub_info = data.modal.mark
          this.msgSub_info = data.msg.mark
          this.status = data.push.pushStatus
          this.params.id = data.push.id
          this.url = data.push.checkUrl
          this.pushID = data.push.id
          console.log(res)
        })
      },
      //提交公共方法
      submitPushH5Common(params){
        submitPushH5(params).then((res) =>{
          console.log(res)
          if(res.code === 200){
            this.verifyCodeStatus = false
            this.verifyForm = false
            this.verifySuccess = true
            setTimeout(()=>{
              this.verifySuccess = false
              this.verifyMessage = ''
              this.verifyCode = ''
              this.checkPushH5(this.pushID)
            },2000)
          } else {
            console.log(res)
            this.verifyCodeStatus = true
          }
        })
      },
      //接收操作
      acceptPush(){
        this.verifyForm = true
        this.params.isPass = true
        this.verifyInfo(true)
      },
      //修改意见
      verifyInfo(isPass){
        if(isPass){
          this.verifyForm = true
        } else {
          if(!this.verifyMessage){
            this.$message({
              showClose: true,
              message: '请输入修改意见',
              type: 'error'
            });
          } else {
            this.verifyForm = true
            this.params.isPass = false
          }
        }
      },
      //关闭验证弹框
      verifyClose(){
        this.verifyMessage = ''
        this.verifyForm = false
      },
      //提交验证公共方法
      submitVerifyCode(){
        if(!this.verifyCode){
          this.verifyCodeStatus = true
        } else {
          this.params.code = this.verifyCode
          this.params.msg = this.verifyMessage
          this.submitPushH5Common(this.params)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .checkThePushH5{
    width: auto;
    height: 900px;
    background: url("../assets/img/h5BG.png") no-repeat;
    background-size: 100% 100%;
    padding: 0 20px;
    position: relative;
    .title{
      text-align: center;
      font-style: italic;
      font-size: 40px;
      color: #F7CCA9;
      padding-top: 55px;
    }
    .time{
      background: url("../assets/img/timeWraper.png") no-repeat;
      background-size: 100% 100%;
      width: 130px;
      height: 20px;
      color: #ccc;
      font-size: 12px;
      text-align: center;
      margin: 20px auto;
      line-height: 20px;
    }
    .content{
      margin-top: 40px;
      width: auto;
      height: 400px;
      border-radius: 8px;
      border: 1px solid;
      background: linear-gradient(180deg, rgba(255, 241, 228, 1), rgba(4, 4, 1, 1));
      backdrop-filter: blur(4px);
      padding: 1px;
      position: relative;
      overflow: hidden;
      .content_wrap{
        height: 400px;
        width: auto;
        background: #040401;
        border-radius: 8px;
        padding: 20px;
        .statusSuccess{
          color: #21212F;
          font-size: 12px;
          text-align: center;
          line-height: 20px;
          width: auto;
          height: 20px;
          padding: 2px 10px;
          background: #F7D0AF;
          border-radius: 20px 8px 0px 20px;
          position: absolute;
          top: 0;
          right: 0;
        }
        .statusReview{
          color: #FF7070;
          font-size: 12px;
          text-align: center;
          line-height: 20px;
          width: auto;
          height: 20px;
          padding: 2px 10px;
          background: #FFE5E5;
          border-radius: 20px 8px 0px 20px;
          position: absolute;
          top: 0;
          right: 0;
        }
        .C_title{
          color: #fff;
          font-size: 20px;
          font-weight: 500;
          margin-bottom: 15px;
        }
        .tag_wrap{
          display: flex;
          justify-content: left;
          margin-bottom: 20px;
          flex-wrap: wrap;
          .tag{
            height: 24px;
            line-height: 24px;
            text-align: center;
            padding: 2px 10px;
            background: #f7d0af4f;
            border-radius: 4px;
            font-size: 10px;
            color: #cfcfcf;
            margin-right: 10px;
            margin-bottom: 10px;
          }
        }
        .info{
          font-size: 16px;
          font-weight: 400;
          color: #e9e9e9;
          line-height: 28px;
          margin-bottom: 20px;
        }
        .sub_info{
          font-size: 12px;
          font-weight: 400;
          color: #ffffff66;
          line-height: 28px;
        }
        .operation{
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          .view{
            height: 18px;
            display: flex;
            justify-content: space-between;
            a{
              color: #F7D0AF;
              line-height: 18px;
            }
            img{
              margin-right: 6px;
              line-height: 18px;
            }
          }
          .source{
            color: #fff;
          }
        }
      }
    }
    .footer{
      width: 90%;
      position: fixed;
      bottom: 60px;
      .footer_wrap{
        display: flex;
        justify-content: space-between;
        .inputContent{
          padding: 12px 20px;
          border: 1px solid #666666;
          width: 120px;
          color: #666666;
          border-radius: 25px;
          input{
            width: 100%;
            border: none;
            background: transparent;
            font-size: 14px;
            outline: transparent;
            color: #fff;
          }
        }
        .review{
          padding: 12px 30px;
          border: 1px solid #F7D0AF;
          border-radius: 25px;
          color: #F7D0AF;
          background: transparent;
        }
        .confirm{
          padding: 12px 30px;
          border: 1px solid #F7D0AF;
          border-radius: 25px;
          color: #000;
          background: #F7D0AF;
        }
      }
    }
    .box{
      position: absolute;
      top: 0;
      left: 0;
      background: #000000c9;
      display: flex;
      justify-content: center;
      align-items: center;
      .box_border{
        width: 100%;
        padding: 0 30px;
        .box_content_wrap{
          height: 230px;
          width: auto;
          padding: 20px 40px;
          background: #232323;
          border-radius: 20px;
          .box_title{
            color: #fff;
            font-size: 18px;
            margin-bottom: 30px;
            text-align: center;
          }
          .user_code{
            padding: 12px 20px;
            border: 1px solid #F7D0AF;
            border-radius: 25px;
            margin-bottom: 14px;
            input{
              outline: transparent;
              border: none;
              font-size: 16px;
              background: transparent;
              color: #fff;
            }
          }
          .code_error{
            color: #fff;
            margin-left: 20px;
          }
          .confirm{
            margin-top: 8px;
            padding: 12px 20px;
            border: 1px solid #F7D0AF;
            border-radius: 25px;
            background: #F7D0AF;
            text-align: center;
          }
          .confirmTOP{
            margin-top: 43px;
          }
        }
        .close{
          margin: 20px;
          text-align: center;
          img{
            height: 32px;
            width: 32px;
          }
        }
      }
    }
    .box_tip{
      position: absolute;
      top: 0;
      left: 0;
      background: #000000c9;
      display: flex;
      justify-content: center;
      align-items: center;
      .box_border_tip{
        padding: 0 30px;
        .box_content_wrap_tip{
          padding: 50px 60px;
          background: #232323;
          border-radius: 20px;
          text-align: center;
          img{
            width: 60px;
            height: 60px;
          }
          .box_title_tip{
            margin-top: 10px;
            color: #fff;
            text-align: center;
          }
        }
      }
    }
  }
</style>
