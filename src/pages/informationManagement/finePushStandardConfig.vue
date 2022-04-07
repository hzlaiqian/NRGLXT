<template>
  <div class='finePushStandardConfig'>
    <div class='fineConfig-left'>
      <div class='fineConfigTitle'>
        <img src="../../assets/img/mark.png" class="fineConfigTitle-img" alt=""> 策略名称
        <span class="fineConfig-icon" @click="edit=!edit" v-if="!edit"><span
            class="el-icon-edit-outline"></span>编辑</span>
        <span class="fineConfig-icon" @click="edit=!edit" v-if="edit"><span
            class="el-icon-edit-outline"></span>完成</span>
        <span class="fineConfig-icon" v-if="!edit" @click="addStrategy">
          <span class="el-icon-circle-plus-outline"></span>新建</span>
      </div>
      <el-divider class='line'></el-divider>
      <div class='fineConfig-left-cont'>
        <el-input v-model="fliterName"  placeholder='输入策略名称'>
          <el-button slot='append' @click="fliterSearch" icon='el-icon-search'/>
        </el-input>
        <div class='fineConfig-left-list'>
          <div class='fineConfig-left-list-one' :class="item.checked?'fineConfig-left-list-one-check':''"
               v-for="(item,index) in strategyList" :key="index" @click="checkStrategy(item,index)">
            <span class='fineConfig-left-text fontFlow'>{{ item.name }}</span>
            <span class='fineConfig-left-del' v-if="edit" @click="delThis(item)">
              <i class="el-icon-delete"></i>删除
            </span>
            <span class='fineConfig-left-bull' v-else>
              <span v-if="item.isOpen"> <i class="green-bull">&bull;</i> 开启中</span>
              <span v-else> <i class="red-bull">&bull;</i> 关闭</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="fineConfig-right">
      <div class='fineConfig-middle-l'>
        <div class='fineConfigTitle'>
          <img src="../../assets/img/mark.png" class="fineConfigTitle-img" alt=""> 推送策略配置
          <el-button :disabled="btnDisabled" @click="finsh" type="primary" class="save" size="small">保存</el-button>
        </div>
        <el-divider class='line'></el-divider>
        <div class="fineConfig-middle-cont">
          <div class="fineConfig-middle-title">策略名称</div>
          <div class="fineConfig-middle-name">
            <el-input class="fineConfig-middle-inp" v-model="name"></el-input>
            <span>开启策略：</span>
            <el-switch v-model='isOpen'></el-switch>
          </div>
          <div class="fineConfig-middle-one">
            <h3><span class="el-icon-tickets icon"></span> 内容筛选</h3>
            <div class="add-role" @click="addRole('contentRules')">+ 添加规则</div>
            <el-collapse v-model="activeNames" class="fineConfig-middle-collapse">
              <el-collapse-item :name="index" :disabled="item.edit" :key="index" v-for="(item,index) in contentRules">
                <template slot="title" class="titles">
                <span v-if="!item.edit">{{ item.name }} <span class="el-icon-edit-outline"
                                                              @click.stop="item.edit=!item.edit"
                                                              style="color: #2A79EE"></span></span>
                  <span class="editIcon" @focus.stop="ee" v-if="item.edit">
                  <el-input v-model="item.name" style="width: 150px"></el-input>
                  <span class="sure" @click.stop="editThis(index,'contentRules')">确定</span>
                </span>

                  <span @click.stop="addNew(index,'contentRules')" class="add"><span
                      class="el-icon-circle-plus-outline"></span> 新建</span>
                  <span @click.stop="deleteRole(index,'contentRules')" class="delete"><span
                      class="el-icon-delete"></span> 删除</span>
                </template>
                <div class="collapse-one-body">
                  <div class="line" v-if="item.rules.length>1">
                    <span class="qie">且</span></div>
                  <div class="collapse-one" :key="childIndex" v-for="(one,childIndex) in item.rules">
                    <span class="qie-hui">
                      <span v-if="item.rules.length==1">
                        且
                      </span>
                    </span>
                    <el-select size="mini" class="sel" v-model="one.labelType" placeholder="请选择"
                               @change="changesel(index,childIndex,'contentRules')">
                      <el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select size="mini" class="sel" v-model="one.relation" placeholder="请选择">
                      <el-option
                          label="包含"
                          :value=1>
                      </el-option>
                      <el-option
                          label="不包含"
                          :value=0>
                      </el-option>
                    </el-select>
                    <el-select
                        v-model="one.label"
                        multiple
                        collapse-tags
                        class="m-sel"
                        style="margin-left: 10px;"
                        placeholder="请选择">
                      <el-option v-for="ones in one.labOption" :key="ones.id" :label="ones.name"
                                 :value="ones.id"></el-option>
                    </el-select>
                    <i class="el-icon-delete" @click="deleteThis(index,childIndex,'contentRules')"></i>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="fineConfig-middle-one">
            <h3><span class="el-icon-user icon"></span> 用户筛选</h3>
            <div class="add-role" @click="addRole('userRules')">+ 添加规则</div>
            <el-collapse v-model="activeName" class="fineConfig-middle-collapse">
              <el-collapse-item :name="index" :disabled="item.edit" :key="index" v-for="(item,index) in userRules">
                <template slot="title" class="titles">
                <span v-if="!item.edit">{{ item.name }} <span class="el-icon-edit-outline"
                                                              @click.stop="item.edit=!item.edit"
                                                              style="color: #2A79EE"></span></span>
                  <span class="editIcon" @focus.stop="ee" v-if="item.edit">
                  <el-input v-model="item.name" style="width: 150px"></el-input>
                  <span class="sure" @click.stop="editThis(index,'userRules')">确定</span>
                </span>

                  <span @click.stop="addNew(index,'userRules')" class="add"><span
                      class="el-icon-circle-plus-outline"></span> 新建</span>
                  <span @click.stop="deleteRole(index,'userRules')" class="delete"><span class="el-icon-delete"></span> 删除</span>
                </template>
                <div class="collapse-one-body">
                  <div class="line" v-if="item.rules.length>1">
                    <span class="qie">且</span>
                  </div>
                  <div class="collapse-one" :key="childIndex" v-for="(one,childIndex) in item.rules">
                    <span class="qie-hui">
                      <span v-if="item.rules.length==1">
                        且
                      </span>
                    </span>
                    <el-select size="mini" class="sel" v-model="one.labelType" placeholder="请选择"
                               @change="changesel(index,childIndex,'userRules')">
                      <el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select size="mini" class="sel" v-model="one.relation" placeholder="请选择">
                      <el-option
                          label="包含"
                          :value=1>
                      </el-option>
                      <el-option
                          label="不包含"
                          :value=0>
                      </el-option>
                    </el-select>
                    <el-select
                        v-model="one.label"
                        multiple
                        class="m-sel"
                        collapse-tags
                        style="margin-left: 10px;"
                        placeholder="请选择">
                      <el-option v-for="ones in one.labOption" :key="ones.id" :label="ones.name"
                                 :value="ones.id"></el-option>
                    </el-select>
                    <i class="el-icon-delete" @click="deleteThis(index,childIndex,'userRules')"></i>
                  </div>

                </div>

              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>

      <div class='fineConfig-middle-r'>
        <div class='fineConfigTitle'>
          <img src="../../assets/img/mark.png" class="fineConfigTitle-img" alt=""> 推送策略配置
        </div>
        <el-divider class='line'></el-divider>
        <div class="fineConfigChartC">
          <div>
            <div class="fineConfigChartC-title">
              <div class="r">日均打开率 <span>（打开次数/推送用户数）</span></div>
              <el-date-picker
                  class="timepick"
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="getClickRate">
              </el-date-picker>
            </div>
            <div id="myChart" class="fineConfigChart" :style="chartStyle"></div>
          </div>
          <div>
            <div class="fineConfigChartC-title">
              <div class="r">人均停留时间 <span>（总访问时间/访问次数）</span></div>
              <el-date-picker
                  class="timepick"
                  v-model="value2"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="getKeepRate">
              </el-date-picker>
            </div>
            <div id="myCharts" class="fineConfigChart" :style="chartStyle"></div>
          </div>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
import {
  getStrategyList,
  getRuleByID,
  getClickRate,
  getKeepRate,
  getPushUserList,
  getPushList,
  getRootList,
  getListByRootIdeaID,
  getPreciseByID, addPrecise, savePrecise, deleteByID
} from "../../api/getData";


import echarts from 'echarts'

export default {
  name: 'finePushStandardConfig',

  data() {
    return {
      edit: false,
      type: 'add',
      btnDisabled:true,
      contentRules: [],
      fliterName:'',
      userRules: [],
      name: '',
      activeNames: [],
      activeName: [],
      isOpen: false,
      chartStyle: {
        width: '',
        height: ''
      },
      list:[],
      strategyList: [],
      value1: '',
      value2: '',
      tagList: [],
      id: null
    }
  },
  methods: {
    finsh() {
      if (this.name == '') {
        this.$message.warning('请输入策略名称')
        return
      }

      let form = {
        contentRules: [],
        userRules: [],
        name: this.name,
        isOpen: this.isOpen
      }
      this.contentRules.forEach((item, index) => {
        let arrOne = item.rules.map(one => {
          return {
            label: one.label,
            labelType: one.labelType,
            relation: one.relation,
          }
        })

        form.contentRules.push({
          name: item.name,
          rules: arrOne
        })

      })
      this.userRules.forEach((item, index) => {
        let arrOne = item.rules.map(one => {
          return {
            label: one.label,
            labelType: one.labelType,
            relation: one.relation,
          }
        })
        form.userRules.push({
          name: item.name,
          rules: arrOne
        })
      })
      this.btnDisabled = true
      if(this.type == 'add'){

        addPrecise(form).then(res => {
          if (res.code == 200) {
            this.$message.success('新增数据成功')
            this.getStrategyList()
            this.btnDisabled = false
          } else {
            this.$message.error(res.msg)
          }
        })
      }else{
        form.id = this.id
        savePrecise(form).then(res => {
          if (res.code == 200) {
            this.$message.success('数据修改成功')
            this.getStrategyList()
            this.btnDisabled = false


          } else {
            this.$message.error(res.msg)
          }
        })
      }

    },

    addStrategy() {
      this.strategyList.forEach((item, index) => {
        this.strategyList[index].checked = false
      })
      this.contentRules = []
      this.userRules = []
      this.name = ''
      this.isOpen = false
      this.type ='add'
      this.btnDisabled = false
    },
    ee() {


    },
    checkStrategy(item, indexs) {
      this.strategyList.forEach((item, index) => {
        this.strategyList[index].checked = false
      })
      item.checked = true
      this.id = item.id
      this.getClickRate()
      this.getKeepRate()
      getPreciseByID({id: item.id}).then(res => {
        if (res.code == 200) {
          let param = res.data
          this.name = param.name
          this.isOpen = param.isOpen
          this.contentRules = []
          this.userRules = []
          param.contentRules.forEach((item, index) => {
            item.edit = false
            item.rules.forEach((one, childIndex) => {
              item.rules[childIndex].label = JSON.parse(one.label)
              this.getListByRootIdeaID(index, childIndex, 'contentRules', one.labelType)
            })
            this.contentRules.push(item)
          })
          param.userRules.forEach((item, index) => {
            item.edit = false
            item.rules.forEach((one, childIndex) => {
              item.rules[childIndex].label = JSON.parse(one.label)
              this.getListByRootIdeaID(index, childIndex, 'userRules', one.labelType)
            })
            this.userRules.push(item)
          })
          this.type = 'edit'
          this.btnDisabled = false
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
        //点击确定的操作(调用接口)
        deleteByID({id:row.id}).then(res=>{
          if (res.code == 200) {
            this.$message.success('删除数据成功')
            this.getStrategyList()

          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        //几点取消的提示
      });
    },
    editThis(index, type) {
      let flag
      if (this[type][index].name == '') {
        this.$message.warning('请输入修改的名字');
        flag = true
      }
      this.contentRules.forEach((item, indexs) => {
        if (item.name == this[type][index].name && indexs != index) {
          this.$message.warning('名称重复');
          flag = true
        }
      })
      if (flag) {
        return;
      }

      this[type][index].edit = !this[type][index].edit

    },
    //新增规则小类
    addNew(index, type) {
      this[type][index].rules.push(
          {
            relation: '',//关系条件
            labelType: '',//标签分类
            label: [],
            labOption: []
          },
      )
    },
    //新增规则
    addRole(type) {
      this[type].push(
          {
            id: null,
            name: `规则${this[type].length + 1}`,
            edit: false,
            rules: []
          }
      )
    },
    //删除规则
    deleteRole(index, type) {
      this[type].splice(index, 1)
    },
    //删除规则小类
    deleteThis(index, childIndex, type) {
      this[type][index].rules.splice(childIndex, 1)
    },
    getStrategyList() {
      getStrategyList().then(res => {
        if (res.code == 200) {
          //加checked 是否选中
          this.list = res.data
          this.fliterSearch()
          this.list = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    fliterSearch(){

      if(this.fliterName == ''){
        this.strategyList = this.list
      }else{
        this.strategyList =[]
         this.list.forEach(item=>{
          if(item.name.includes(this.fliterName)){
            this.strategyList.push(item)
          }
        })
        console.log(this.strategyList)
      }
    },
    dchart(data,type) {
      let myChart
      if(type == 1){
         myChart = this.$echarts.init(document.getElementById('myChart'))
      }else{
        myChart = this.$echarts.init(document.getElementById('myCharts'))

      }
      // 绘制图表
      myChart.setOption(
          {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            legend: {
              data: ['当前策略推送', '常规推送',],
              left:'center',
              top:'bottom'
            },

            grid: {
              left: '3%',
              right: '4%',
              bottom: '10%',
              top:'3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#D6DEF8',
                  },
                },
                data: data.generalCount.time
              }
            ],
            yAxis: [
              {
                type: 'value',
                splitLine: {
                  lineStyle: {
                    type: 'dashed',
                    color: '#D6DEF8'
                  }
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#D6DEF8',
                  },
                },
                axisLabel: {
                  formatter: type==1?'{value} %':'{value} S'
                },
              }
            ],
            series: [
              {
                name: '当前策略推送',
                type: 'line',
                stack: 'Total',
                symbol: false,
                areaStyle: {
                  normal: {
                    color: '#2A79EE'
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#2A79EE',
                    lineStyle: {
                      color: '#2A79EE'
                    }
                  }
                },
                emphasis: {
                  focus: 'series'
                },
                data: data.strategyCount.data
              },
              {
                name: '常规推送',
                type: 'line',
                stack: 'Total',
                symbol: false,

                areaStyle: {
                  normal: {
                    color: '#FFB980'
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#FFB980',
                    lineStyle: {
                      color: '#FFB980'
                    }
                  }
                },
                emphasis: {
                  focus: 'series'
                },
                data: data.generalCount.data
              },
            ]
          });
    },
    getClickRate() {
      let param = {
        beginDate: '',
        endDate: '',
        id: this.id
      }
      if (!this.value1) {
        param.endDate = this.$moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        param.beginDate = this.$moment(new Date()).subtract(1, "month").format('YYYY-MM-DD hh:mm:ss')
      } else {
        param.beginDate = this.$moment(this.value1[0]).format('YYYY-MM-DD hh:mm:ss')
        param.endDate = this.$moment(this.value1[1]).format('YYYY-MM-DD hh:mm:ss')
      }

      getClickRate(param).then(res => {
        if (res.code == 200) {
          let chartObj = {
            generalCount: {
              time: [],
              data: []
            },
            strategyCount: {
              time: [],
              data: []
            }

          }
          res.data.generalCount.forEach(item => {
            chartObj.generalCount.time.push(item.date)
            chartObj.generalCount.data.push(item.value)
          })
          res.data.strategyCount.forEach(item => {
            chartObj.strategyCount.time.push(item.date)
            chartObj.strategyCount.data.push(item.value)
          })
          console.log(chartObj)
          this.dchart(chartObj,1)
        } else {
          this.$message.error(res.msg)
        }
      })

    },
    getKeepRate() {
      let param = {
        beginDate: '',
        endDate: '',
        id: this.id
      }
      if (!this.value2) {
        param.endDate = this.$moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        param.beginDate = this.$moment(new Date()).subtract(1, "month").format('YYYY-MM-DD hh:mm:ss')
      } else {
        param.beginDate = this.$moment(this.value2[0]).format('YYYY-MM-DD hh:mm:ss')
        param.endDate = this.$moment(this.value2[1]).format('YYYY-MM-DD hh:mm:ss')
      }
      getKeepRate(param).then(res => {
        if (res.code == 200) {
          let chartObj = {
            generalCount: {
              time: [],
              data: []
            },
            strategyCount: {
              time: [],
              data: []
            }

          }
          res.data.generalCount.forEach(item => {
            chartObj.generalCount.time.push(item.date)
            chartObj.generalCount.data.push(item.value)
          })
          res.data.strategyCount.forEach(item => {
            chartObj.strategyCount.time.push(item.date)
            chartObj.strategyCount.data.push(item.value)
          })

          this.dchart(chartObj,2)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //获取用户数据
    getPushUserList() {
      getPushList().then(res => {
        if (res.code == 200) {
          this.userList = res.data
        } else {
          this.$message.error(res.msg)
        }

      })

    },
    getRootList() {
      getRootList().then(res => {
        if (res.code == 200) {
          this.tagList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    changesel(index, childIndex, type) {
      getListByRootIdeaID({id: this[type][index].rules[childIndex].labelType}).then(res => {
        if (res.code == 200) {
          this[type][index].rules[childIndex].labOption = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getListByRootIdeaID(index, childIndex, type, id) {
      getListByRootIdeaID({id: id}).then(res => {
        if (res.code == 200) {
          this[type][index].rules[childIndex].labOption = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  mounted() {
    this.getStrategyList()
    this.getRootList()
    let width = (document.body.clientWidth - 500) / 2

    this.chartStyle.width = `${width}px`
    this.chartStyle.height = `${width * 0.5}px`



  },

};
</script>

<style lang='scss'>
.line {
  margin: 0;
}

.finePushStandardConfig {
  background-color: #f5f5f5;

  position: relative;
  height: 100%;
  .fineConfigTitle {
    padding: 20px 20px;
    height: 20px;
    font-size: 16px;
    line-height: 21px;
    font-weight: 500;
    color: #2F343D;
    font-family: PingFangSC-Medium, PingFang SC;
    position: relative;

    .fineConfigTitle-img {
      display: inline-block;
      vertical-align: middle;
    }
    .save{
      position: absolute;
      right: 10px;
    }


    .fineConfig-icon {
      font-size: 12px;
      color: #2A79EE;
      float: right;
      margin-left: 5px;
      cursor: pointer;
    }
  }

  .fineConfig-left {

    width: 240px;
    height: 100%;
    background: #FFFFFF;
    border-radius: 4px;
    border: 1px solid #EAEDF7;

    .fineConfig-left-cont {
      padding: 12px;
      height: calc(100% - 87px);
    }


    .fineConfig-left-list {
      overflow-y: scroll;
      height: calc(100% - 30px);

    }


    .fineConfig-left-list::-webkit-scrollbar {
      /*滚动条整体样式*/
      width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .fineConfig-left-list::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 3px;
      box-shadow   : inset 0 0 3px rgba(0, 0, 0, 0.2);
      background   : #535353;
    }
    .fineConfig-left-list::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow   : inset 0 0 3px rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      background   : #ededed;
    }

    .fineConfig-left-list-one {
      margin-top: 12px;
      width: 206px;
      height: 32px;
      background: #FFFFFF;
      border-radius: 2px;
      border: 1px solid #EAEDF7;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #2F343D;
      line-height: 32px;
    }

    .fineConfig-left-list-one-check {
      margin-top: 12px;
      width: 206px;
      height: 32px;
      background: rgba(42, 121, 238, 0.1);
      border-radius: 2px;
      border: 1px solid #2A79EE;
      color: #2A79EE;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 32px;
    }

    .fineConfig-left-text {
      width: 130px;
      display: inline-block;
      padding: 0 10px;
    }

    .fineConfig-left-del {
      cursor: pointer;
      display: inline-block;
      line-height: 32px;
      vertical-align: top;
      color: #2A79EE;
      font-size: 12px;
    }

    .fineConfig-left-bull {
      cursor: pointer;
      display: inline-block;
      line-height: 32px;
      vertical-align: top;
      color: #2F343D;
      font-size: 12px;
    }

    .green-bull {
      //display: inline-block;
      //width: 6px;
      //height: 6px;
      //border-radius: 3px;
      //background: #67C23A;
      color: #67C23A;
      font-size: 13px;
    }

    .red-bull {
      //display: inline-block;
      //width: 6px;
      //height: 6px;
      //border-radius: 3px;
      //background: red;
      color: red;
      font-size: 13px;

    }
  }

  .fineConfig-right {
    width: calc(100% - 245px);
    height: 100%;
    position: absolute;
    top: 0;
    left: 240px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;




    .fineConfig-middle-l::-webkit-scrollbar {
      /*滚动条整体样式*/
      width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .fineConfig-middle-l::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 3px;
      box-shadow   : inset 0 0 3px rgba(0, 0, 0, 0.2);
      background   : #535353;
    }
    .fineConfig-middle-l::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow   : inset 0 0 3px rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      background   : #ededed;
    }



    .fineConfig-middle-l {
      width: calc(50% - 15px);
      height: 100%;
      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #EAEDF7;
      overflow: scroll;

      .fineConfig-middle-cont {
        padding: 20px;

        .fineConfig-middle-title {
          height: 18px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #2F343D;
          line-height: 18px;
          margin-bottom: 5px;
        }

        .fineConfig-middle-name {
          color: #2F343D;
          line-height: 18px;
          font-size: 12px;

          span {
            display: inline-block;
            margin-left: 10px;
          }

          .fineConfig-middle-inp {
            width: calc(100% - 130px);
          }
        }

        .fineConfig-middle-one {
          margin-top: 20px;
          border-radius: 2px;
          border: 1px solid #EAEDF7;

          h3 {
            font-size: 14px;
            font-weight: 400;
            color: #2F343D;
            height: 36px;
            line-height: 36px;
            background: #F7F8F9;
            box-shadow: inset 0px -1px 0px 0px #EAEDF7;
            border-radius: 2px 2px 0px 0px;

            .icon {
              margin-left: 8px;
            }
          }

          .add-role {
            margin-top: 16px;
            margin-left: 12px;
            width: calc(100% - 24px);
            height: 32px;
            border-radius: 2px;
            border: 1px dashed #919AAD;
            font-size: 12px;
            text-align: center;
            line-height: 32px;
            color: #2F343D;
            cursor: pointer;
          }

          .fineConfig-middle-collapse {
            margin: 16px 12px;

            .el-collapse-item {
              .editIcon {
                .sure {
                  color: rgb(42, 121, 238);
                  display: inline-block;
                  cursor: pointer;
                  width: 60px;
                  text-align: center;
                }

              }
            }


            .el-collapse {
              border: 0;
            }

            .el-collapse-item__header {
              border: 0;
              position: relative;
            }

            .add {
              color: rgb(42, 121, 238);
              position: absolute;
              right: 80px;
              cursor: pointer;
            }

            .delete {
              color: rgb(42, 121, 238);
              position: absolute;
              right: 30px;
              cursor: pointer;
            }

            .collapse-one-body {
              position: relative;

              .line {
                position: absolute;
                height: 100%;
                background: #2A79EE99;
                width: 2px;
                top: 0;
                left: 10px;
              }
            }

            .collapse-one {

              margin-bottom: 6px;
            }
          }

          .qie {
            font-size: 12px;
            display: inline-block;
            width: 20px;
            background: #E9F1FD;
            text-align: center;
            z-index: 2;
            padding: initial;
            color: #2A79EE;
            position: absolute;
            top: 50%;
            right: -10px;
            margin-top: -10px;
            border: 1px dashed #2A79EE;

          }

          .qie-hui {
            width: 20px;
            display: inline-block;
            margin-right: 6px;

            span {
              width: 20px;
              display: inline-block;
              border: 1px dashed #919AAD;
              font-size: 12px;
              background-color: #f7f8f9;
              color: #9aa2b4;
              text-align: center;

            }
          }

          .sel {
            width: 65px;
            margin-right: 5px;

            .el-input--suffix .el-input__inner {
              padding: 5px;
            }
          }

          .m-sel {
            width: calc(100% - 200px);

          }

          .tagCont {
            display: inline-block;
            overflow: hidden;
            width: 225px;
            height: 32px;
            line-height: 32px;
            border-radius: 2px;
            padding-left: 5px;
            border: 1px solid #EAEDF7;
            vertical-align: middle;

            .el-tag + .el-tag {
              margin-left: 10px;
            }
          }

          .el-icon-delete {
            color: #2A79EE;
            margin-left: 10px;
            cursor: pointer;

          }
        }

      }

    }

    .fineConfig-middle-r {
      width: calc(50% - 15px);

      height: 100%;
      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #EAEDF7;

      .fineConfigChartC {
        padding: 20px;

        .fineConfigChartC-title {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #2F343D;

          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .r {
            width: 270px;
            line-height: 32px;
          }

          span {
            color: #919AAD;
            font-size: 12px;
            line-height: 32px;
          }

          .timepick {
            width: 220px;
            float: right;
          }
        }

        .fineConfigChart {
          margin: 10px auto;
        }
      }

    }
  }


}


.fontFlow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
