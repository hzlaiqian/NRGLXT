<template>
  <div class="pushBackground">
    <div class="pushBackground-head">
      <div class="pushBackground-one">
        <i class="el-icon-mobile pushBackground-one-l"></i>
        <div class="pushBackground-one-m">
          <div class="text1">APP推送
          </div>
          <div class="text2">数量范围：{{ `${topDetail.appCount.minNum}～${topDetail.appCount.maxNum}条` }}</div>
        </div>
        <div class="pushBackground-one-r"
        >
          <span style="color: #2A79EE "
          >{{
              topDetail.appCount.nums
            }}</span> 条
          <!--          <el-tooltip class="item" effect="light" content="此推送渠道数量触及最大限制，推送后台无法选中此渠道。" placement="top">-->
          <!--            <i class="el-icon-warning-outline" v-if="topDetail.appCount.maxNum<=topDetail.appCount.title"></i>-->
          <!--          </el-tooltip>-->
          <div class="tMax" v-if="topDetail.appCount.maxNum<=topDetail.appCount.nums">* 推送达到最大值</div>
          <div class="tMin" v-if="topDetail.appCount.maxNum>topDetail.appCount.nums">* 推送未达到最小值</div>
        </div>
      </div>
      <div class="pushBackground-one">
        <i class="el-icon-copy-document pushBackground-one-l" style="color: #FFB03A "></i>
        <div class="pushBackground-one-m">
          <div class="text1">
            App弹窗推送
          </div>
          <div class="text2">数量范围：{{ `${topDetail.modalCount.minNum}～${topDetail.modalCount.maxNum}条` }}</div>
        </div>
        <div class="pushBackground-one-r"
        >
          <span style="color: #FFB03A "
          >{{
              topDetail.modalCount.nums
            }}</span> 条
          <!--          <el-tooltip class="item" effect="light" content="此推送渠道数量触及最大限制，推送后台无法选中此渠道。" placement="top">-->
          <!--            <i class="el-icon-warning-outline" v-if="topDetail.modalCount.maxNum<=topDetail.modalCount.title"></i>-->
          <!--          </el-tooltip>-->
          <div class="tMax" v-if="topDetail.modalCount.maxNum<=topDetail.modalCount.nums">* 推送达到最大值</div>
          <div class="tMin" v-if="topDetail.modalCount.maxNum>topDetail.modalCount.nums">* 推送未达到最小值</div>
        </div>
      </div>
      <div class="pushBackground-one">
        <i class="el-icon-chat-dot-square pushBackground-one-l" style="color: #67C23A "></i>
        <div class="pushBackground-one-m">
          <div class="text1">短信推送</div>
          <div class="text2">数量范围：{{ `${topDetail.msgCount.minNum}～${topDetail.msgCount.maxNum}条` }}</div>
        </div>
        <div class="pushBackground-one-r">

          <span style="color: #67C23A "
          >{{
              topDetail.msgCount.nums
            }}</span> 条
          <div class="tMax" v-if="topDetail.msgCount.maxNum<=topDetail.msgCount.nums">* 推送达到最大值</div>
          <div class="tMin" v-if="topDetail.msgCount.maxNum>topDetail.msgCount.nums">* 推送未达到最小值</div>

          <!--          <el-tooltip class="item" effect="light" content="此推送渠道数量触及最大限制，推送后台无法选中此渠道。" placement="top">-->
          <!--            <i class="el-icon-warning-outline" v-if="topDetail.msgCount.maxNum<=topDetail.msgCount.title"></i>-->
          <!--          </el-tooltip>-->
        </div>
      </div>
    </div>

    <div class="pushBackground-body">
      <div class="pushBackground-info">
        <div class="pushBackground-info-1">
          <el-input class="inp" v-model="searchParams.title" placeholder="请输入标题"></el-input>
          <el-input class="inp" v-model="searchParams.source" placeholder="请输入来源"></el-input>
          <el-input class="inp" v-model="searchParams.cUser" placeholder="请输入创建人"></el-input>
          <el-select class="inp" v-model="searchParams.pushStatus" placeholder="请选择推送状态">
            <el-option
                v-for="item in optionsState"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker
              class="inps"
              v-model="searchParams.beginDate"
              type="daterange"

              range-separator="至"
              start-placeholder="请选择开始推送时间"
              end-placeholder="请选择结束推送时间">
          </el-date-picker>
          <!--          <el-input class="inp" v-model="searchParams.beginDate" placeholder="请选择推送时间"></el-input>-->
          <el-select class="inp" v-model="searchParams.pushType" placeholder="请选择推送类型">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>

          <span class="inp">自动刷新 :
            <el-switch v-model="turnOn" @change="changeGetList"></el-switch>  18s</span>
        </div>
        <div class="pushBackground-info-2">
          <el-button type="primary" @click="addNew" plain>新建</el-button>
          <el-button type="primary" @click="search()">查询</el-button>
        </div>
      </div>

      <div style="margin-top: 5px">
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column
              fixed
              prop="id"
              label="序号"
              width="50">
          </el-table-column>
          <el-table-column
              fixed
              prop="title"
              label="标题"
          >
          </el-table-column>
          <el-table-column
              fixed
              prop="articleSource"
              label="来源"
          >
          </el-table-column>
          <el-table-column
              fixed
              prop="cName"
              label="创建人"
          >
          </el-table-column>
          <el-table-column
              fixed
              label="推送类型"
          >
            <template slot-scope="scope">
              <span>{{ optionsObj[scope.row.pushType] }}</span>
            </template>
          </el-table-column>
          <el-table-column
              fixed
              label="推送状态"
          >
            <template slot-scope="scope">
              <span>{{ optionsStateObj[scope.row.pushStatus] }}</span>
            </template>
          </el-table-column>
          <el-table-column
              fixed
              label="创建/推送时间"
              width="250"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.setDate }}/{{ scope.row.cDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
              fixed
              prop="date"
              label="操作"
              width="250"
          >
            <template slot-scope="scope">
              <div class="ete">
                <span @click="detail(scope.row)">查看详情</span>
                <span @click="edit(scope.row)">编辑推送</span>
<!--                data-clipboard-action="copy"-->
<!--                :data-clipboard-text="scope.row.pushUrl"-->
                <span @click="copyLink($event,scope.row.pushUrl)">复制地址</span>
                <span @click="delThis(scope.row)">删除</span>
              </div>


            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>
      </div>
    </div>


    <el-dialog
        title="新建内容推送"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose">
      <div v-if="dialogVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="推送url">
            <el-input placeholder="请输入推送url" style="width: 350px" v-model="ruleForm.checkUrl"></el-input>
            <span style="color: #2A79EE;display: inline-block;margin-left: 10px;cursor: pointer" @click="getCheckByUrl">提取生成</span>
          </el-form-item>
          <el-form-item label="推送标题" prop="title">
            <el-input placeholder="请输入推送标题" v-model="ruleForm.title"></el-input>
            <!--            show-word-limit  maxlength="10"-->
          </el-form-item>
          <el-form-item label="推送摘要" prop="desc">
            <el-input placeholder="请输入推送摘要" type="textarea" :autosize="{ minRows: 6, maxRows: 8 }"
                      v-model="ruleForm.desc"></el-input>
          </el-form-item>

          <el-form-item label="推送渠道" prop="typeList">
            <el-checkbox-group v-model="ruleForm.typeList">
              <el-checkbox label="APP推送" name="type"></el-checkbox>
              <el-checkbox label="APP弹窗推送" name="type"></el-checkbox>
              <el-checkbox label="短信推送" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="推送类型" prop="pushType">
                <el-select class="sels" v-model="ruleForm.pushType" placeholder="请选择推送类型">
                  <el-option label="固定推送" :value=2>固定推送</el-option>
                  <el-option label="热点推送" :value=1>热点推送</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="setDate" label="推送时间">
                <el-date-picker
                    class="sels"
                    v-model="ruleForm.setDate"
                    format="yyyy-MM-dd HH:mm"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="用户选择" prop="pushUser">
            <el-select class="sels" v-model="ruleForm.pushUser" placeholder="请选择用户">
              <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">提交</el-button>
  </span>
    </el-dialog>


    <el-dialog
        title="推送明细"
        :visible.sync="dialogVisibleDetail"
        width="550px"
    >
      <div>
        <el-table :data="detailData"     height="250">
          <el-table-column property="nodeDate" label="时间" width="180"></el-table-column>
          <el-table-column property="nodeUserMame" label="执行人"></el-table-column>
          <el-table-column property="nodeStatusName" label="操作"></el-table-column>
          <el-table-column property="nodeMsg" label="修改意见"></el-table-column>
        </el-table>
      </div>

    </el-dialog>

  </div>

</template>

<script>
import {
  getPushList,
  getProcessByID,
  pushAdd,
  getPushByID,
  getPushCount, getPushUserList, getCommon, getCheckByUrl, deleteByID, deleteByIDPush

} from '../../api/getData.js';

export default {
  name: 'pushBackground',
  data() {
    return {
      tableData: [],
      detailData: [],
      currentPage3: 1,
      total: 1,
      dialogVisible: false,
      dialogVisibleDetail: false,
      turnOn: false,
      turnOnData: null,
      limit: {},
      userList: [],
      userListStatus: {},
      optionsObj: {
        1: 'APP', 2: 'APP弹窗', 3: '短信'
      },
      optionsStateObj: {
        1: '待录入', 2: '审核中', 3: '已拒绝', 4: '已通过', 5: '已推送',
      },
      options: [
        {value: 1, label: 'APP'},
        {value: 2, label: 'APP弹窗'},
        {value: 3, label: '短信'},
      ],
      optionsState: [
        {value: 1, label: '待录入'},
        {value: 2, label: '审核中'},
        {value: 3, label: '已拒绝'},
        {value: 4, label: '已通过'},
        {value: 5, label: '已推送'},

      ],
      searchParams: {
        title: '',
        source: '',
         cName: '',
        pushStatus: null,
        beginDate: '',
        endDate: '',
        pushChannel: null,
        pushType: null,
        page: 1,
        size: 10
      },
      langTitle: '新建内容推送',
      topDetail: {
        appCount: {
          title: 0,
          maxNum: 0,
          minNum: 0
        },
        modalCount: {
          title: 0,
          maxNum: 0,
          minNum: 0
        },
        msgCount: {
          title: 0,
          maxNum: 1,
          minNum: 0
        }
      },
      ruleForm: {
        id: '',
        checkUrl: '',
        title: '',
        desc: '',
        pushType: '',
        setDate: '',
        isApp: '',
        isModal: '',
        isMsg: '',
        pushUser: '',
        typeList: [],

      },
      rules: {
        title: [
          {validator: this.checkTitle, trigger: 'blur'}
        ],
        desc: [
          {validator: this.checkDesc, trigger: 'blur'}
        ],
        typeList: [
          {type: 'array', required: true, message: '请选择推送渠道', trigger: 'change'}
        ],
        setDate: [
          {required: true, message: '请选择用户日期', trigger: 'change'}
        ],
        pushUser: [
          {required: true, message: '请选择用户选择', trigger: 'change'}
        ],
        pushType: [
          {required: true, message: '请选择推送渠道', trigger: 'change'}
        ],
      }

    }
  },
  methods: {
    //检查标题
    checkTitle(rule, value, callback) {
      let titleLen = this.ruleForm.title.length
      if (titleLen == 0) {
        callback(new Error('标题为空，无法提交'))
        return;
      }
      let errCall
      for (let i = 0; i < this.ruleForm.typeList.length; i++) {
        let item = this.ruleForm.typeList[i]
        if (item == 'APP推送') {
          if (titleLen > this.limit.isApp[0]) {

            errCall = true
            callback(new Error(`当前标题字数超过app最大字数限制${this.limit.isApp[0]}条，无法提交`))
          }
        } else if (item == 'APP弹窗推送') {
          if (titleLen > this.limit.isModal[0]) {

            errCall = true
            callback(new Error(`当前标题字数超过app弹窗推送最大字数限制${this.limit.isModal[0]}条，无法提交`))
          }
        } else if (item == '短信推送') {
          if (titleLen > this.limit.isMsg[0]) {

            errCall = true
            callback(new Error(`当前标题字数超过短信推送最大字数限制${this.limit.isMsg[0]}条，无法提交`))
          }
        }
      }
      if(!errCall ){
        callback()
      }
    },
    //检查摘要
    checkDesc(rule, value, callback) {
      let desLen = this.ruleForm.desc.length
      if (desLen == 0) {
        callback(new Error('摘要为空，无法提交'))
        return;
      }
      let errCall
      for (let i = 0; i < this.ruleForm.typeList.length; i++) {
        let item = this.ruleForm.typeList[i]
        if (item == 'APP推送') {
          if (desLen > this.limit.isApp[1]) {

            errCall = true
            callback(new Error(`当前摘要字数超过app最大字数限制${this.limit.isApp[1]}条，无法提交`))
          }
        } else if (item == 'APP弹窗推送') {
          if (desLen > this.limit.isModal[1]) {

            errCall = true
            callback(new Error(`当前摘要字数超过app弹窗推送最大字数限制${this.limit.isModal[1]}条，无法提交`))
          }
        } else if (item == '短信推送') {
          if (desLen > this.limit.isMsg[1]) {

            errCall = true
            callback(new Error(`当前摘要字数超过短信推送最大字数限制${this.limit.isMsg[1]}条，无法提交`))
          }
        }
      }
      if(!errCall ){
        callback()
      }
    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {
      this.searchParams.page = val
      this.getPushList(this.searchParams)
    },
    //复制链接
    copyLink(e, text) {
      let _this = this;
      let clipboard = new this.clipboard(e.target,{ text: () => text });
      clipboard.on('success', function () {
        _this.$message.success('复制成功')
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      });
      clipboard.on('error', function () {
        _this.$message.error('复制失败')
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      });
      clipboard.onClick(e)
    },
    handleClose() {
      this.dialogVisible = false
    },
    addNew() {
      this.langTitle = '新建内容推送'
      Object.keys(this.ruleForm).forEach(key => {
        if (key == 'typeList') {
          this.ruleForm[key] = []
        } else {
          this.ruleForm[key] = ''
        }
      })
      this.dialogVisible = true
    },
    handleCloseDetail() {
      this.dialogVisibleDetail = false
    },
    //查看详情
    detail(row) {
      getProcessByID({id: row.id}).then(res => {
        if (res.code == 200) {
          this.dialogVisibleDetail = true
          this.detailData = res.data
        } else {
          this.$message.error(res.msg)
        }

      })
    },
    //编辑详情
    edit(row) {
      this.langTitle = '编辑内容推送'
      this.dialogVisible = true
      getPushByID({id: row.id}).then(res => {
        if (res.code == 200) {
          this.ruleForm = res.data
          this.ruleForm.typeList = []
          if(res.data.isApp){
            this.ruleForm.typeList.push('APP推送')
          }
          if(res.data.isModal){
            this.ruleForm.typeList.push('APP弹窗推送')
          }
          if(res.data.isMsg){
            this.ruleForm.typeList.push('短信推送')
          }
          this.dialogVisible = true
        } else {
          this.$message.error(res.msg)
        }

      })
    },
    delThis(row) {
      this.$confirm('是否删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteByIDPush({id:row.id}).then(res=>{
          if (res.code == 200) {
            this.$message.success('删除成功')
            this.getPushList(this.searchParams)
          } else {
            this.$message.error(res.msg)
          }
        })
        //点击确定的操作(调用接口)
      }).catch(() => {
        //几点取消的提示
      });
    },
    getCheckByUrl(){
      if(this.ruleForm.checkUrl == ''){
        this.$message.warning('文章链接不可为空')
        return
      }
      getCheckByUrl({checkUrl:this.ruleForm.checkUrl}).then(res=>{
        if (res.code == 200) {
          this.ruleForm.title= res.data.title
          this.ruleForm.desc= res.data.desc
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //新增数据
    submit() {
      console.log(this.ruleForm)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let param = {
            checkUrl: this.ruleForm.checkUrl,
            title: this.ruleForm.title,
            desc: this.ruleForm.desc,
            pushType: this.ruleForm.pushType,
            setDate: this.$moment(this.ruleForm.setDate).format('YYYY-MM-DD hh:mm:ss'),
            isApp: this.ruleForm.typeList.includes('APP推送') ? true : false,
            isModal: this.ruleForm.typeList.includes('APP弹窗推送') ? true : false,
            isMsg: this.ruleForm.typeList.includes('短信推送') ? true : false,
            pushUser: this.ruleForm.pushUser,
          }
          if (this.ruleForm.id) {
            //编辑
            param.id = this.ruleForm.id
            getPushByID(param).then(res => {
              if (res.code == 200) {
                this.dialogVisible = false
                this.$message.success(res.msg)
                this.getPushList(this.searchParams)
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            //新增
            pushAdd(param).then(res => {
              if (res.code == 200) {
                this.$message.success(res.msg)
                this.getPushList(this.searchParams)
                this.dialogVisible = false
              } else {
                this.$message.error(res.msg)
              }

            })
          }



        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    search() {
      console.log(this.searchParams)
      this.getPushList({
        title: this.searchParams.title,
        source: this.searchParams.source,
         cName: this.searchParams.cName,
        pushStatus: this.searchParams.pushStatus,
        beginDate: this.searchParams.beginDate[0],
        endDate: this.searchParams.beginDate[1],
        pushChannel: this.searchParams.pushChannel,
        pushType: this.searchParams.pushType,
        page: 1,
        size: 10
      })
    },
    changeGetList() {
      if (this.turnOn) {
        this.turnOnData = setInterval(() => {
          this.search()
        }, 18000)
      } else {
        clearInterval(this.turnOnData)
      }
    },
    //获取后台数据
    getPushList(param) {
      getPushList(param).then(res => {
        if (res.code == 200) {
          this.tableData = res.data
          this.total = res.total
        } else {
          this.$message.error(res.msg)
        }

      })
    },
    //获取用户数据
    getPushUserList() {
      getPushUserList().then(res => {
            if (res.code == 200) {
              this.userList = res.data
              this.userListStatus = {}
              this.userList.forEach(item => {
                this.userListStatus[item.id] = item.name
              })


            } else {
              this.$message.error(res.msg)
            }
          }
      )
    },
    getCommon() {
      getCommon().then(res => {
        if (res.code == 200) {
          this.limit = {
            isApp: [res.data.appChannel.title, res.data.appChannel.desc],
            isModal: [res.data.modalChannel.title, res.data.modalChannel.desc],
            isMsg: [res.data.msgChannel.title, res.data.msgChannel.desc],
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {

      })
    }
  },
  mounted() {
    this.getPushList(this.searchParams)
    this.getPushUserList()
    this.getCommon()
    //推送列表统计
    getPushCount().then(res => {

      if (res.code == 200) {
        this.topDetail = res.data
      } else {
        this.$message.error(res.msg)
      }


    })

  }
};
</script>

<style scoped lang="scss">
.pushBackground {
  .ete {
    span {
      display: inline-block;
      margin: 3px;
      color: #2d8cf0;
      cursor: pointer;
      font-size: 10px;
    }
  }

  .pushBackground-head {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .pushBackground-one {
      width: calc(32% - 40px);
      display: flex;

      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #EAEDF7;
      padding: 20px;
      flex-wrap: wrap;
      justify-content: space-around;

      .pushBackground-one-l {
        font-size: 33px;
        color: #2A79EE;
        margin-top: 13px;

      }

      .pushBackground-one-m {
        .text1 {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #2F343D;
          line-height: 22px;
        }

        .text2 {
          margin-top: 12px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #677287;
          line-height: 22px;
        }
      }

      .pushBackground-one-r {
        font-size: 14px;

        span {
          font-size: 30px;
        }

        .tMax {
          width: 95px;
          height: 12px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #F74E4E;
          line-height: 12px;
          margin-top: 5px;
        }

        .tMin {
          margin-top: 5px;
          width: 107px;
          height: 12px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #2A79EE;
          line-height: 12px;
        }

      }
    }
  }

  .pushBackground-body {
    background-color: #fff;
    padding: 10px;
    margin-top: 10px;

    .pushBackground-info {
      display: flex;

      .pushBackground-info-1 {
        display: flex;
        flex-wrap: wrap;
        font-size: 12px;
        //justify-content: space-between;
        .inp {
          width: 240px;
          margin-left: 10px;
          margin-top: 5px;
          line-height: 32px;

        }

        .inps {
          margin-left: 10px;
          margin-top: 5px;
        }
      }

      .pushBackground-info-2 {
        width: 300px;

      }

    }


  }

  .sels {
    width: 190px;
  }
}

</style>
