<template>
  <div class="appPushData">
    <el-row :gutter="10" class="cardLittleWrap">
      <el-col :span="6">
        <div class="cardLittle">
          <div class="cardLittleTop">今日推送数总量 <span>{{topData.totalNum}}</span> <span class="unit">条</span></div>
          <div class="cardLittleBottom">
            <div class="compare">环比昨日</div>
            <div class="num">
              <span v-if="topData.totalRt>=0">增长</span>
              <span v-else>减少</span>{{topData.totalRt}}%
              <img v-if="topData.totalRt>=0" src="../../../assets/img/up.png" alt="">
              <img v-else src="../../../assets/img/down.png" alt="">
            </div>
          </div>
          <div class="img">
            <img width="85px" height="68px" src="../../../assets/img/littleCard1.png" alt="">
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="cardLittle">
          <div class="cardLittleTop">今日推送用户量 <span>{{topData.userNum}}</span> <span class="unit">人</span></div>
          <div class="cardLittleBottom">
            <div class="compare">环比昨日</div>
            <div class="num">
              <span v-if="topData.userRt>=0">增长</span>
              <span v-else>减少</span>{{topData.userRt}}%
              <img v-if="topData.userRt>=0" src="../../../assets/img/up.png" alt="">
              <img v-else src="../../../assets/img/down.png" alt="">
            </div>
          </div>
          <div class="img">
            <img width="80px" height="62px" src="../../../assets/img/littleCard2.png" alt="">
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="cardLittle">
          <div class="cardLittleTop">今日点击用户数 <span>{{topData.clickNum}}</span> <span class="unit">人</span></div>
          <div class="cardLittleBottom">
            <div class="compare">环比昨日</div>
            <div class="num">
              <span v-if="topData.totalRt>=0">增长</span>
              <span v-else>减少</span>{{topData.clickRt}}%
              <img v-if="topData.totalRt>=0" src="../../../assets/img/up.png" alt="">
              <img v-else src="../../../assets/img/down.png" alt="">
            </div>
          </div>
          <div class="img">
            <img width="51px" height="68px" src="../../../assets/img/littleCard3.png" alt="">
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="cardLittle">
          <div class="cardLittleTop">今日点击率 <span>{{topData.clickRate}}</span> <span class="unit">%</span></div>
          <div class="cardLittleBottom">
            <div class="compare">环比昨日</div>
            <div class="num">
              <span v-if="topData.totalRt>=0">增长</span>
              <span v-else>减少</span>{{topData.clickRateRt}}%
              <img v-if="topData.totalRt>=0" src="../../../assets/img/up.png" alt="">
              <img v-else src="../../../assets/img/down.png" alt="">
            </div>
          </div>
          <div class="img">
            <img width="72px" height="72px" src="../../../assets/img/littleCard4.png" alt="">
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :span="12">
        <cardTemplate :titleName="hisNumAndClickD.title">
          <div class="chartWrap">
            <div id="hisNumAndClick" :style="{width: width},{height: '350px'}"></div>
            <div class="datePicker">
              <el-date-picker
                style="width: 100%;"
                v-model="hisNumAndClickDatePicker"
                type="daterange"
                @change="hisNumAndClickDatePickerChange"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
        </cardTemplate>
      </el-col>
      <el-col :span="12">
        <cardTemplate :titleName="hisUserNumAndUserClickD.title">
          <div class="chartWrap">
            <div id="hisUserNumAndUserClick" :style="{width: width},{height: '350px'}"></div>
            <div class="datePicker">
              <el-date-picker
                style="width: 100%;"
                v-model="hisUserNumAndUserClickDatePicker"
                type="daterange"
                @change="hisUserNumAndUserClickDatePickerChange"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
        </cardTemplate>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :span="12">
        <cardTemplate :titleName="hisHotClickAndPushClickD.title">
          <div class="chartWrap">
            <div id="hisHotClickAndPushClick" :style="{width: width},{height: '350px'}"></div>
            <div class="datePicker">
              <el-date-picker
                style="width: 100%;"
                v-model="hisHotClickAndPushClickDatePicker"
                type="daterange"
                @change="hisHotClickAndPushClickDateChange"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
        </cardTemplate>
      </el-col>
      <el-col :span="12">
        <cardTemplate :titleName="userGroupClickD.title">
          <div class="chartWrap">
            <div id="userGroupClick" :style="{width: width},{height: '350px'}"></div>
            <div class="datePicker">
              <el-date-picker
                style="width: 100%;"
                v-model="userGroupClickDatePicker"
                type="daterange"
                @change="userGroupClickDatePickerChange"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
        </cardTemplate>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import cardTemplate from "../../../components/cardTemplate";
  import echarts from 'echarts'
  import common from '../../../utils/common'
  import {getAppPushTopData,getHisAndClick,getHisUserAndClick,getHotClickAndGu,getUserGroup} from '../../../api/getData'
  export default {
    name: "appPushData",
    components: {
      cardTemplate
    },
    data() {
      return {
        width: document.getElementsByClassName('chartWrap').offsetWidth + 'px',
        hisNumAndClickDatePicker: '',
        hisUserNumAndUserClickDatePicker: '',
        hisHotClickAndPushClickDatePicker: '',
        userGroupClickDatePicker: '',
        //头部数据
        topData:{
          totalNum:0,
          totalRt:0,
          userNum:0,
          userRt:0,
          clickNum:0,
          clickRt:0,
          clickRate:0,
          clickRateRt:0

        },
        //1
        hisNumAndClickD: {
          title: '历史推送量&点击率',
          chartData: {
            data: [
              {
                name: '推送量',
                type: 'bar',
                itemStyle: {
                  color: '#2A79EE'
                },
                barWidth: '16px',
                data: [
                  10000, 40900, 7000, 23200, 25600, 76700, 13560, 16220, 32600, 20000, 6400, 3300
                ]
              },
              {
                name: '点击率',
                type: 'line',
                itemStyle: {
                  color: '#FFB03A'
                },
                yAxisIndex: 1,
                data: [20, 22, 33, 45, 63, 102, 203, 234, 230, 165, 120, 62]
              }
            ],
            date: ['8-22', '8-25', '9-3', '9-14', '9-28', '10-1', '10-16']
          }
        },
        //2
        hisUserNumAndUserClickD: {
          title: '历史推送用户数&点击用户数',
          chartData: {
            data: [
              {
                name: '推送用户数',
                type: 'bar',
                itemStyle: {
                  color: '#2A79EE'
                },
                barWidth: '16px',
                data: [10000, 40900, 7000, 23200, 25600, 76700, 13560, 16220, 32600, 20000, 6400, 3300]
              },
              {
                name: '点击用户数',
                type: 'bar',
                itemStyle: {
                  color: '#FFB03A'
                },
                barWidth: '16px',
                data: [13000, 20900, 17000, 2200, 35600, 6700, 18560, 26220, 12600, 30000, 16400, 13300]
              }
            ],
            date: ['8-22', '8-25', '9-3', '9-14', '9-28', '10-1', '10-16']
          }
        },
        //3
        hisHotClickAndPushClickD: {
          title: '历史热点推送点击率&固定推送点击率',
          chartData: {
            data: [
              {
                name: '热点推送点击率',
                type: 'line',
                symbol:'none',
                itemStyle: {
                  color: '#2A79EE'
                },
                barWidth: '16px',
                data: [
                  10, 40, 70, 23, 25, 76, 13, 16, 32, 20, 64, 33
                ]
              },
              {
                name: '固定推送点击率',
                type: 'line',
                symbol:'none',
                itemStyle: {
                  color: '#FFB03A'
                },
                data: [20, 22, 33, 45, 63, 10.2, 20.3, 23.4, 23, 16.5, 12, 62]
              }
            ],
            date: ['8-22', '8-25', '9-3', '9-14', '9-28', '10-1', '10-16']
          }
        },
        //4
        userGroupClickD: {
          title: '用户群点击率',
          chartData: {
            data: [
              // {
              //   name: '用户群1',
              //   symbol:'none',
              //   type: 'line',
              //   itemStyle: {
              //     color: '#2A79EE'
              //   },
              //   barWidth: '16px',
              //   data: [
              //     10, 49, 70, 32, 56, 67, 35, 62, 26, 20, 64, 33
              //   ]
              // },
              // {
              //   name: '用户群2',
              //   type: 'line',
              //   symbol:'none',
              //   itemStyle: {
              //     color: '#FFB03A'
              //   },
              //   data: [20, 22, 33, 45, 63, 102, 203, 234, 230, 165, 120, 62]
              // }
            ],
            date: ['8-22', '8-25', '9-3', '9-14', '9-28', '10-1', '10-16']
          }
        }
      };
    },
    computed: {

    },
    mounted() {
      this.initCharts()
    },
    methods: {
      initCharts() {
        this.getAppPushTopData()
        //app推送统计历史推送量和历史点击率
        this.getHisNumAndClick()
        this.getHisUserNumAndUserClick()
        this.getHisHotClickAndPushClick()
        this.getUserGroupClick()
      },
      //获取头部卡片数据
      getAppPushTopData(){
        getAppPushTopData({channel:3}).then((res) =>{
          this.topData.totalNum = res.data.totalCount
          this.topData.totalRt = res.data.totalCountRate
          this.topData.userNum = res.data.totalUserCount
          this.topData.userRt = res.data.totalUserCountRate
          this.topData.clickNum = res.data.totalUserClickCount
          this.topData.clickRt = res.data.totalUserClickCountRate
          this.topData.clickRate = res.data.clickRate
          this.topData.clickRateRt = res.data.clickRateChange
        })
      },
      //app推送统计历史推送量和历史点击率
      getHisNumAndClick(beginDate,endDate){
        let hisNumAndClick = this.$echarts.init(document.getElementById('hisNumAndClick'))
        getHisAndClick({channel:3,beginDate:beginDate,endDate:endDate}).then((res) =>{
          this.hisNumAndClickD.chartData.data[0].data = res.data.pushNum
          this.hisNumAndClickD.chartData.data[1].data = res.data.clickRate
          this.hisNumAndClickD.chartData.date = res.data.date
          this.hisNumAndClick(hisNumAndClick, this.hisNumAndClickD.chartData.data, res.data.date)
        })
      },
      //app推送统计 历史推送用户数和点击数
      getHisUserNumAndUserClick(beginDate,endDate){
        let hisUserNumAndUserClick = this.$echarts.init(document.getElementById('hisUserNumAndUserClick'))
        getHisUserAndClick({channel:3,beginDate:beginDate,endDate:endDate}).then((res) =>{
          this.hisUserNumAndUserClickD.chartData.data[0].data = res.data.pushUserNum
          this.hisUserNumAndUserClickD.chartData.data[1].data = res.data.clickNum
          this.hisUserNumAndUserClickD.chartData.date = res.data.date
          this.hisUserNumAndUserClick(hisUserNumAndUserClick, this.hisUserNumAndUserClickD.chartData.data,res.data.date)
        })
      },
      //app推送统计 历史热点推送点击率和固定推送点击率
      getHisHotClickAndPushClick(beginDate,endDate){
        let hisHotClickAndPushClick = this.$echarts.init(document.getElementById('hisHotClickAndPushClick'))
        getHotClickAndGu({channel:3,beginDate:beginDate,endDate:endDate}).then((res) => {
          this.hisHotClickAndPushClickD.chartData.data[0].data = res.data.hotPush
          this.hisHotClickAndPushClickD.chartData.data[1].data = res.data.fixedPush
          this.hisHotClickAndPushClickD.chartData.date = res.data.date
          this.hisHotClickAndPushClick(hisHotClickAndPushClick, this.hisHotClickAndPushClickD.chartData.data,res.data.date)
        })
      },
      //app推送统计 用户组区分
      getUserGroupClick(beginDate,endDate){
        let userGroupClick = this.$echarts.init(document.getElementById('userGroupClick'))
        getUserGroup({channel:3,beginDate:beginDate,endDate:endDate}).then((res) =>{
          if(res.data.name){
            res.data.name.forEach((val,index) =>{
              this.userGroupClickD.chartData.data.push({
                name: val,
                symbol:'none',
                type: 'line',
                itemStyle: {
                  color: '#2A79EE'
                },
                barWidth: '16px',
                data:res.data.rate[index]
              })
            })
          }
          this.userGroupClickD.chartData.date = res.data.date
          this.userGroupClick(userGroupClick, this.userGroupClickD.chartData.data, res.data.date)
        })
      },
      //1
      hisNumAndClick(chartSet, data, date) {
        chartSet.setOption(
          {
            grid: {
              top: '15%',
              left: '3%',
              right: '4%',
              bottom: '25',
              containLabel: true
            },
            legend: {
              bottom: 0,
              icon: 'rect',
              itemHeight: 2,
              itemWidth: 12,
              data: ['推送量', '点击率']
            },
            xAxis: [
              {
                type: 'category',
                data: date,
                axisPointer: {
                  type: 'shadow'
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false
                },
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '推送量&点击率',
                nameGap: 30,
                nameTextStyle: {
                  color: '#2F343D'
                },
                splitLine: {
                  lineStyle: {
                    type: 'dashed',
                    color: '#eee'
                  }
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#D6DEF8',
                  },
                },
                axisLabel: {
                  formatter: function (value) {
                    return value
                  },
                  textStyle: {
                    color: '#2F343D',
                  }
                }
              },
              {
                type: 'value',
                name: '',
                nameTextStyle: {
                  color: '#2F343D'
                },
                splitLine: {
                  lineStyle: {
                    type: 'dashed',
                    color: '#eee'
                  }
                },
                // axisLine: {
                //   show:true,
                //   lineStyle:{
                //     color:'#D6DEF8',
                //   },
                // },
                axisLabel: {
                  formatter: function (value) {
                    return value + '%'
                  }
                }
              }
            ],
            series: data
          }
        );
      },
      //2
      hisUserNumAndUserClick(chartSet, data, date) {
        chartSet.setOption(
          {
            grid: {
              top: '15%',
              left: '3%',
              right: '4%',
              bottom: '25',
              containLabel: true
            },
            legend: {
              bottom: 0,
              icon: 'rect',
              itemHeight: 2,
              itemWidth: 12,
              data: ['推送用户数', '点击用户数']
            },
            xAxis: [
              {
                type: 'category',
                data: date,
                axisPointer: {
                  type: 'shadow'
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false
                },
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '用户数',
                nameGap: 30,
                nameTextStyle: {
                  color: '#2F343D'
                },
                splitLine: {
                  lineStyle: {
                    type: 'dashed',
                    color: '#eee'
                  }
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#D6DEF8',
                  },
                },
                axisLabel: {
                  formatter: function (value) {
                    return value
                  },
                  textStyle: {
                    color: '#2F343D',
                  }
                }
              },
            ],
            series: data
          }
        );
      },
      //3
      hisHotClickAndPushClick(chartSet, data, date) {
        chartSet.setOption(
          {
            grid: {
              top: '15%',
              left: '3%',
              right: '4%',
              bottom: '25',
              containLabel: true
            },
            legend: {
              bottom: 0,
              icon: 'rect',
              itemHeight: 2,
              itemWidth: 12,
              data: ['热点推送点击率', '固定推送点击率']
            },
            xAxis: [
              {
                type: 'category',
                data: date,
                axisPointer: {
                  type: 'shadow'
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false
                },
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '点击率',
                nameGap: 30,
                nameTextStyle: {
                  color: '#2F343D'
                },
                splitLine: {
                  lineStyle: {
                    type: 'dashed',
                    color: '#eee'
                  }
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#D6DEF8',
                  },
                },
                axisLabel: {
                  formatter: function (value) {
                    return value + '%'
                  },
                  textStyle: {
                    color: '#2F343D',
                  }
                }
              }
            ],
            series: data
          }
        );
      },
      //4
      userGroupClick(chartSet, data, date) {
        chartSet.setOption(
          {
            grid: {
              top: '15%',
              left: '3%',
              right: '4%',
              bottom: '25',
              containLabel: true
            },
            legend: {
              bottom: 0,
              icon: 'rect',
              itemHeight: 2,
              itemWidth: 12,
              data: ['用户群1', '用户群2']
            },
            xAxis: [
              {
                type: 'category',
                data: date,
                axisPointer: {
                  type: 'shadow'
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false
                },
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '点击率',
                nameGap: 30,
                nameTextStyle: {
                  color: '#2F343D'
                },
                splitLine: {
                  lineStyle: {
                    type: 'dashed',
                    color: '#eee'
                  }
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#D6DEF8',
                  },
                },
                axisLabel: {
                  formatter: function (value) {
                    return value + '%'
                  },
                  textStyle: {
                    color: '#2F343D',
                  }
                }
              },
            ],
            series: data
          }
        );
      },
      hisNumAndClickDatePickerChange(val){
        console.log('1',val)
        if(val){
          this.getHisNumAndClick(common.dateFormatter(val[0]),common.dateFormatter(val[1]))
        }
      },
      hisUserNumAndUserClickDatePickerChange(val){
        console.log('2',val)
        if(val){
          this.getHisUserNumAndUserClick(common.dateFormatter(val[0]),common.dateFormatter(val[1]))
        }
      },
      hisHotClickAndPushClickDateChange(val){
        console.log('3',val)
        if(val){
          this.getHisHotClickAndPushClick(common.dateFormatter(val[0]),common.dateFormatter(val[1]))
        }
      },
      userGroupClickDatePickerChange(val){
        console.log('4',val)
        if(val){
          this.getUserGroupClick(common.dateFormatter(val[0]),common.dateFormatter(val[1]))
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .appPushData {
    .chartWrap {
      width: 100%;
      position: relative;

      .datePicker {
        width: 230px;
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    .cardLittleWrap {
      margin-top: 10px;

      .cardLittle {
        background: #fff;
        padding: 16px;
        border-radius: 4px;
        border: 1px solid #EAEDF7;
        line-height: 24px;
        position: relative;

        .img {
          position: absolute;
          bottom: -6px;
          right: 10px;
        }

        .cardLittleTop {
          color: #2F343D;
          font-size: 14px;

          span {
            font-size: 20px;
            color: #2A79EE;
          }

          .unit {
            font-size: 14px;
            color: #677287;
            margin-left: 4px;
          }
        }

        .cardLittleBottom {
          display: flex;
          justify-content: left;
          margin-top: 24px;
          font-size: 14px;
          line-height: 24px;

          .compare {
            margin-right: 10px;
            color: #677287;
          }

          .num {
            color: #2F343D;

            img {
              width: 8px;
              height: 4px;
              line-height: 24px;
              vertical-align: middle;
            }
          }
        }
      }
    }

  }
</style>
