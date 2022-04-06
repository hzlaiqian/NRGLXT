<template>
  <div class="messageDataDetails">
    <cardTemplate :titleName="titleNames">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-input v-model="params.title" placeholder="请输入标题"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="params.userName" placeholder="请输入创建人"></el-input>
        </el-col>
        <el-col :span="4">
          <el-date-picker
            style="width: 100%"
            type="daterange"
            range-separator="至"
            v-model="datePicker"
            @change="datePickerChange"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="4">
          <el-select v-model="params.groupId" placeholder="请选择用户群">
            <el-option
              v-for="item in userGrout"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="submit">查询</el-button>
        </el-col>
      </el-row>
      <div class="tableWrap">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="num"
            width="50"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="title"
            width="600"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="creator"
            label="创建人">
          </el-table-column>
          <el-table-column
            prop="date"
            label="创建/推送时间">
          </el-table-column>
          <el-table-column
            prop="group"
            label="所选用户群">
          </el-table-column>
          <el-table-column
            prop="rate"
            width="90"
            sortable
            label="退订率">
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="tablePageSize"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </cardTemplate>
  </div>
</template>

<script>
  import common from '../../../utils/common'
  import cardTemplate from "../../../components/cardTemplate";
  import {getMsgTable,getPushUserList} from '../../../api/getData'
  export default {
    name: "messageDataDetails",
    components:{
      cardTemplate
    },
    data() {
      return {
        datePicker:'',
        titleNames: '短信推送详情',
        userGrout: [],
        tableData: [],
        currentPage:1,
        tablePageSize:10,
        params:{
          title:null,
          startTime:null,
          endTime:null,
          userName:null,
          groupId:null,
          page:1,
          size:5
        },
        total:5,
      }
    },
    mounted() {
      this.getAppOrBoxTableInfo()
      this.getUserGroup()
    },
    methods: {
      datePickerChange(val){
        this.params.startTime = common.dateFormatter(val[0])
        this.params.endTime = common.dateFormatter(val[1])
      },
      getUserGroup(){
        getPushUserList().then((res) => {
          console.log('用户列表',res.data)
          this.userGrout = res.data
        })
      },
      submit() {
        this.getAppOrBoxTableInfo()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getAppOrBoxTableInfo();
        console.log(`当前页: ${val}`);
      },
      getAppOrBoxTableInfo(){
        this.tableData = []
        getMsgTable(this.params).then((res) =>{
          res.data.forEach((val,index)=>{
            this.tableData.push({
              num:index + 1,
              title:val.title,
              creator:val.userName,
              date:val.pushDate,
              group:val.groupName,
              rate:val.unsubscribe + '%',
            })
          })
          this.total = res.total

          console.log(res)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .messageDataDetails {
    .tableWrap {
      margin-top: 20px;
      .pagination{
        text-align: center;
      }
    }
  }
</style>
