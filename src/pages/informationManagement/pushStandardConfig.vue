<template>
  <div class='pushStandard'>
    <div class='pushStandard-head'>
      <span>推送策略配置</span>
      <el-divider></el-divider>
      <div class='pushStandard-head-content'>
        <div class='pushStandard-head-one'>
          <span>是否复审：</span>
          <el-switch v-model='form.check'></el-switch>
        </div>
        <div class='pushStandard-head-one pushStandard-head-one-z'>

          <div class=''>
            <el-tag
                :key='index'
                v-for='(tag,index) in dynamicTags'
                closable
                :disable-transitions='false'
                @close='handleClose(tag)'>
              {{ tag }}
            </el-tag>
            <el-input
                class='input-new-tag'
                v-if='inputVisible'
                v-model='inputValue'
                ref='saveTagInput'
                size='small'
                @keyup.enter.native='handleInputConfirm'
                @blur='handleInputConfirm'
            >
            </el-input>
            <el-button v-else class='button-new-tag' size='small' @click='showInput'>+ 身份码</el-button>
          </div>
        </div>
        <el-button type='primary' @click='submitForm'>
          提交更新
        </el-button>
      </div>
    </div>
    <div class='pushStandard-content'>
      <el-form class='pushStandard-form' ref='form' :rules='rules' :model='form' label-width='80px'>
        <div class='pushStandard-content-one'>
          <div class='pushStandard-content-title'>APP推送渠道
            <el-tooltip class="item" effect="dark" content="此推送渠道数据达到以下限制时，推送后台无法选中此渠道" placement="top">
              <i class="el-icon-warning-outline" style="color: #2A79EE"></i>
            </el-tooltip>
            <div class='pushStandard-content-title-right'>开启渠道：
              <el-switch v-model='form.appChannel.isOpen'></el-switch>
            </div>
          </div>

          <el-form-item label='标题最长' prop='appChannel.title'>
            <el-input-number class='pushStandard-cont-input' v-model='form.appChannel.title'
                             controls-position='right' placeholder='请输入标题' :min='0'></el-input-number>
          </el-form-item>
          <el-form-item label='摘要最长' prop='appChannel.desc'>
            <el-input-number class='pushStandard-cont-input' v-model='form.appChannel.desc'
                             controls-position='right' placeholder='请输入摘要最长' :min='0'></el-input-number>
          </el-form-item>
          <el-form-item label='推送条数' prop='appChannel.maxNum'>
            <el-input-number class='pushStandard-cont-inp' v-model='form.appChannel.maxNum'
                             controls-position='right' placeholder='最低推送条数' :min='0'></el-input-number>
            <el-input-number class='pushStandard-cont-inp' v-model='form.appChannel.minNum'
                             controls-position='right' placeholder='最高推送条数' :min='0'></el-input-number>
          </el-form-item>
          <el-form-item label='开启后缀' prop='isMark'>
            <el-switch v-model='form.appChannel.isMark'></el-switch>
          </el-form-item>
          <el-form-item label='后缀内容' prop='mark'>
            <el-input type='textarea' :autosize='{ minRows: 14, maxRows: 16 }'
                      v-model='form.appChannel.mark'></el-input>
          </el-form-item>

        </div>
        <div class='pushStandard-content-one'>
          <div class='pushStandard-content-title'>APP弹窗渠道
            <el-tooltip class="item" effect="dark" content="此推送渠道数据达到以下限制时，推送后台无法选中此渠道" placement="top">
              <i class="el-icon-warning-outline" style="color: #2A79EE"></i>
            </el-tooltip>
            <div class='pushStandard-content-title-right'>开启渠道：
              <el-switch v-model='form.modalChannel.isOpen'></el-switch>
            </div>
          </div>

          <el-form-item label='标题最长' prop='modalChannel.title'>
            <el-input-number class='pushStandard-cont-input' v-model='form.modalChannel.title'
                             controls-position='right' placeholder='请输入标题' :min='0'></el-input-number>
          </el-form-item>
          <el-form-item label='摘要最长' prop='modalChannel.desc'>
            <el-input-number class='pushStandard-cont-input' v-model='form.modalChannel.desc'
                             controls-position='right' placeholder='请输入摘要最长' :min='0'></el-input-number>
          </el-form-item>
          <el-form-item label='推送条数' prop='modalChannel.maxNum'>
            <el-input-number class='pushStandard-cont-inp' v-model='form.modalChannel.maxNum'
                             controls-position='right' placeholder='最低推送条数' :min='0'></el-input-number>
            <el-input-number class='pushStandard-cont-inp' v-model='form.modalChannel.minNum'
                             controls-position='right' placeholder='最高推送条数' :min='0'></el-input-number>
          </el-form-item>
          <el-form-item label='开启后缀' prop='isMark'>
            <el-switch v-model='form.modalChannel.isMark'></el-switch>
          </el-form-item>
          <!--          <el-form-item label='后缀内容' prop='mark'>-->
          <!--            <el-input type='textarea' :autosize='{ minRows: 14, maxRows: 16 }'-->
          <!--                      v-model='form.modalChannel.mark'></el-input>-->
          <!--          </el-form-item>-->

        </div>
        <div class='pushStandard-content-one'>
          <div class='pushStandard-content-title'>短信推送渠道
            <el-tooltip class="item" effect="dark" content="此推送渠道数据达到以下限制时，推送后台无法选中此渠道" placement="top">
              <i class="el-icon-warning-outline" style="color: #2A79EE"></i>
            </el-tooltip>
            <div class='pushStandard-content-title-right'>开启渠道：
              <el-switch v-model='form.msgChannel.isOpen'></el-switch>
            </div>
          </div>

          <el-form-item label='标题最长' prop='msgChannel.title'>
            <el-input-number class='pushStandard-cont-input' v-model='form.msgChannel.title'
                             controls-position='right' placeholder='请输入标题最长' :min='0'></el-input-number>
          </el-form-item>
          <el-form-item label='摘要最长' prop='msgChannel.desc'>
            <el-input-number class='pushStandard-cont-input' v-model='form.msgChannel.desc'
                             controls-position='right' placeholder='请输入摘要最长' :min='0'></el-input-number>
          </el-form-item>
          <el-form-item label='推送条数' prop='msgChannel.maxNum'>
            <el-input-number class='pushStandard-cont-inp' v-model='form.msgChannel.maxNum'
                             controls-position='right' placeholder='最低推送条数' :min='0'></el-input-number>
            <el-input-number class='pushStandard-cont-inp' v-model='form.msgChannel.minNum'
                             controls-position='right' placeholder='最高推送条数' :min='0'></el-input-number>
          </el-form-item>
          <el-form-item label='开启后缀' prop='isMark'>
            <el-switch v-model='form.msgChannel.isMark'></el-switch>
          </el-form-item>
          <el-form-item label='后缀内容' prop='mark'>
            <el-input type='textarea' :autosize='{ minRows: 14, maxRows: 16 }'
                      v-model='form.msgChannel.mark'></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>

</template>

<script>
import {savaCommon,getCommon} from "../../api/getData";

export default {
  name: 'pushStandardConfig',
  data() {
    return {
      form: {
        check: false,
        code: '',
        appChannel: {
          isOpen:false,
          title: '',
          desc: '',
          maxNum: '',
          minNum: '',
          isMark: false,
          mark: ''
        },
        modalChannel: {
          isOpen:false,
          title: '',
          desc: '',
          maxNum: '',
          minNum: '',
          isMark: false,
          mark: ''

        },
        msgChannel: {
          isOpen:false,
          title: '',
          desc: '',
          maxNum: '',
          minNum: '',
          isMark: false,
          mark: ''

        }
      },
      delivery: 0,
      isChek: 0,
      vCode: '',

      rules: {
        'appChannel.title': [
          {required: true, type: 'number', message: '请输入标题最长', trigger: 'blur'}
        ],
        'appChannel.desc': [
          {required: true, type: 'number', message: '请输入摘要最长', trigger: 'blur'}
        ],
        'appChannel.maxNum': [
          {type: 'number', required: true, message: '请输入最高推送条数', trigger: 'blur'}
        ],
        'appChannel.minNum': [
          {type: 'number', required: true, message: '请输入最低推送条数', trigger: 'blur'}
        ],
        'modalChannel.title': [
          {required: true, type: 'number', message: '请输入标题最长', trigger: 'blur'}
        ],
        'modalChannel.desc': [
          {required: true, type: 'number', message: '请输入摘要最长', trigger: 'blur'}
        ],
        'modalChannel.maxNum': [
          {type: 'number', required: true, message: '请输入最高推送条数', trigger: 'blur'}
        ],
        'modalChannel.minNum': [
          {type: 'number', required: true, message: '请输入最低推送条数', trigger: 'blur'}
        ],
        'msgChannel.title': [
          {required: true, type: 'number', message: '请输入标题最长', trigger: 'blur'}
        ],
        'msgChannel.desc': [
          {required: true, type: 'number', message: '请输入摘要最长', trigger: 'blur'}
        ],
        'msgChannel.maxNum': [
          {type: 'number', required: true, message: '请输入最高推送条数', trigger: 'blur'}
        ],
        'msgChannel.minNum': [
          {type: 'number', required: true, message: '请输入最低推送条数', trigger: 'blur'}
        ]
      },
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    };

  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.savaCommon()
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    savaCommon() {
       this.form.code = this.dynamicTags
      savaCommon(this.form).then(res => {
        if(res.code == 200){
          this.$message.success(res.msg)
        }else{
          this.$message.error(res.msg)
        }


      })

    }
  },
  mounted() {
    getCommon().then(res=>{
      if(res.code == 200){
        if(!res.data.code){
          res.data.code = []
        }else{
          res.data.code = JSON.parse(res.data.code)
        }
        this.form = res.data
        this.dynamicTags = res.data.code
      }else{
        this.$message.error(res.msg)
      }
    }).catch(err=>{

    })
  }
};
</script>

<style>
.pushStandard {
  background-color: #f5f5f5;
}

.pushStandard-head {
  margin-bottom: 10px;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #EAEDF7;
  padding: 17px 20px;
}

.pushStandard-head-content {

}

.pushStandard-head-one {
  display: inline-block;
  margin-right: 20px;
}

.pushStandard-head-text {
  display: inline-block;
}

.pushStandard-head-input {
  display: inline-block;
  width: 240px;
}

.pushStandard-content {

}

.pushStandard-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between
}

.pushStandard-content-one {
  width: calc(33% - 40px);
  height: 590px;
  padding: 16px 20px;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #EAEDF7;
  margin-bottom: 10px;
}

.pushStandard-content-title {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #2F343D;
  line-height: 20px;
  margin-bottom: 30px;
}

.pushStandard-content-title-right {
  float: right;
}

.pushStandard-cont-inp {
  width: 43%;
  margin-right: 5px;
}

.pushStandard-cont-input {
  width: 90%;
}

.pushStandard-content-one .el-input-number .el-input__inner {
  text-align: left;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin: 0 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.pushStandard-head-one-z {
  padding: 2px 10px;
  height: 32px;
  border-radius: 2px;
  border: 1px solid #EAEDF7;
}
</style>
