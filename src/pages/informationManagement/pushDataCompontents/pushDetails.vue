<template>
  <div class="pushDetails">
    <cardTemplate :titleName="titleNames">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-input v-model="title" placeholder="请输入标题"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="creator" placeholder="请输入创建人"></el-input>
        </el-col>
        <el-col :span="4">
          <el-date-picker
            style="width: 100%"
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="4">
          <el-select v-model="userSelect" placeholder="请选择用户群">
            <el-option
              v-for="item in userGrout"
              :key="item.value"
              :label="item.label"
              :value="item.value">
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
            :total="this.tableData.length">
          </el-pagination>
        </div>
      </div>
    </cardTemplate>
  </div>
</template>

<script>
  import cardTemplate from "../../../components/cardTemplate";

  export default {
    name: "pushDetails",
    components: {
      cardTemplate
    },
    data() {
      return {
        titleNames: '',
        title: '',
        creator: '',
        time: '',
        userSelect: '',
        userGrout: [
          {
            value: 1,
            label: '用户群1'
          },
          {
            value: 2,
            label: '用户群2'
          },
          {
            value: 3,
            label: '用户群3'
          },
        ],
        tableData: [
          {
            num: '1',
            title: '美联储加息25基点靴子落地 预计年内还有6次联储加息25还有6次联基点还有储加息256次联靴子…',
            creator: '财联社财',
            date: '2022-03-04',
            group: '用户1群、用户2群',
            rate: '80%'
          }, {
            num: '2',
            title: '美联储加息25基点靴子落地 预计年内还有6次联储加息25还有6次联基点还有储加息256次联靴子…',
            creator: '财联社财',
            date: '2022-03-04',
            group: '用户1群、用户2群',
            rate: '60%'
          }, {
            num: '3',
            title: '美联储加息25基点靴子落地 预计年内还有6次联储加息25还有6次联基点还有储加息256次联靴子…',
            creator: '财联社财',
            date: '2022-03-04',
            group: '用户1群、用户2群',
            rate: '55%'
          }, {
            num: '4',
            title: '美联储加息25基点靴子落地 预计年内还有6次联储加息25还有6次联基点还有储加息256次联靴子…',
            creator: '财联社财',
            date: '2022-03-04',
            group: '用户1群、用户2群',
            rate: '23%'
          }, {
            num: '5',
            title: '美联储加息25基点靴子落地 预计年内还有6次联储加息25还有6次联基点还有储加息256次联靴子…',
            creator: '财联社财',
            date: '2022-03-04',
            group: '用户1群、用户2群',
            rate: '14%'
          }, {
            num: '6',
            title: '美联储加息25基点靴子落地 预计年内还有6次联储加息25还有6次联基点还有储加息256次联靴子…',
            creator: '财联社财',
            date: '2022-03-04',
            group: '用户1群、用户2群',
            rate: '80%'
          }, {
            num: '7',
            title: '美联储加息25基点靴子落地 预计年内还有6次联储加息25还有6次联基点还有储加息256次联靴子…',
            creator: '财联社财',
            date: '2022-03-04',
            group: '用户1群、用户2群',
            rate: '58%'
          }, {
            num: '8',
            title: '美联储加息25基点靴子落地 预计年内还有6次联储加息25还有6次联基点还有储加息256次联靴子…',
            creator: '财联社财',
            date: '2022-03-04',
            group: '用户1群、用户2群',
            rate: '80%'
          }, {
            num: '9',
            title: '美联储加息25基点靴子落地 预计年内还有6次联储加息25还有6次联基点还有储加息256次联靴子…',
            creator: '财联社财',
            date: '2022-03-04',
            group: '用户1群、用户2群',
            rate: '35%'
          }, {
            num: '10',
            title: '美联储加息25基点靴子落地 预计年内还有6次联储加息25还有6次联基点还有储加息256次联靴子…',
            creator: '财联社财',
            date: '2022-03-04',
            group: '用户1群、用户2群',
            rate: '80%'
          }, {
            num: '11',
            title: '美联储加息25基点靴子落地 预计年内还有6次联储加息25还有6次联基点还有储加息256次联靴子…',
            creator: '财联社财',
            date: '2022-03-04',
            group: '用户1群、用户2群',
            rate: '80%'
          }, {
            num: '12',
            title: '美联储加息25基点靴子落地 预计年内还有6次联储加息25还有6次联基点还有储加息256次联靴子…',
            creator: '财联社财',
            date: '2022-03-04',
            group: '用户1群、用户2群',
            rate: '80%'
          }
        ],
        currentPage:1,
        tablePageSize:5
      }
    },
    props: {
      titleNames: {
        type: String,
        default: ''
      }
    },
    mounted() {
      console.log(this.titleNames)
    },
    methods: {
      submit() {
        console.log(this.title,
          this.creator,
          this.time,
          this.userSelect,
        )
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.tableData = this.tableData
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

    }
  }
</script>

<style scoped lang="scss">
  .pushDetails {
    .tableWrap {
      margin-top: 20px;
      .pagination{
        text-align: center;
      }
    }
  }
</style>
