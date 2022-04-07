<template>
  <div class="allPushData">
    <el-row :gutter="10">
      <el-col :span="8">
        <cardTemplate :titleName="allDate.title">
          <div class="contentTop">
            <div class="contentTopLeft">
              <div class="firstContent">今日推送数总量</div>
              <div class="numContent">{{allDate.total}}</div>
              <div class="unitContent">条</div>
            </div>
            <div class="contentTopCenter">环比昨日</div>
            <div class="contentTopRight">
              <div class="rightText">
                <span v-if="allDate.increaseData >= '0'">增长</span>
                <span v-else>减少</span>
                {{ allDate.increaseData }}%
              </div>
              <img v-if="allDate.increaseData >= '0'" src="../../../assets/img/up.png" alt="">
              <img v-else src="../../../assets/img/down.png" alt="">
            </div>
          </div>
          <div class="charts">
            <div id="pushAll" :style="{width: '400px'},{height: '210px'}"></div>
            <div class="dataDetails">
              <div class="textLine" v-for="(item,index) in allDate.pieChartData" :key="index">
                <div class="chartTitle">
                  <div class="colorT" :style="{background:item.itemStyle.color}"></div>
                  <div class="chartTitleName">{{ item.name }}</div>
                </div>
                <div class="chartData">{{ item.value }} 条</div>
              </div>
              <div class="textLine">
                <div class="chartTitle">
                  <div class="colorT transparent"></div>
                  <el-tooltip class="item" effect="dark" content="多个渠道用户存在一致的情况，合计值不等同于渠道值相加" placement="bottom">
                    <div class="chartTitleName"><i class="el-icon-warning-outline"></i>合计</div>
                  </el-tooltip>
                </div>
                <div class="chartData">{{ allDate.total }} 条</div>
              </div>
            </div>
          </div>
        </cardTemplate>
      </el-col>
      <el-col :span="8">
        <cardTemplate :titleName="userData.title">
          <div class="contentTop">
            <div class="contentTopLeft">
              <div class="firstContent">今日推送用户量</div>
              <div class="numContent">{{userData.total}}</div>
              <div class="unitContent">人</div>
            </div>
            <div class="contentTopCenter">环比昨日</div>
            <div class="contentTopRight">
              <div class="rightText">
                <span v-if="userData.increaseData >= '0'">增长</span>
                <span v-else>减少</span>
                {{ userData.increaseData }}%
              </div>
              <img src="../../../assets/img/up.png" alt="" v-if="userData.increaseData >= '0'">
              <img src="../../../assets/img/down.png" alt="" v-else>
            </div>
          </div>
          <div class="charts">
            <div id="pushUser" :style="{width: '400px'},{height: '210px'}"></div>
            <div class="dataDetails">
              <div class="textLine" v-for="(item,index) in allDate.pieChartData" :key="index">
                <div class="chartTitle">
                  <div class="colorT" :style="{background:item.itemStyle.color}"></div>
                  <div class="chartTitleName">{{ item.name }}</div>
                </div>
                <div class="chartData">{{ item.value }} 人</div>
              </div>
              <div class="textLine">
                <div class="chartTitle">
                  <div class="colorT transparent"></div>
                  <el-tooltip class="item" effect="dark" content="多个渠道用户存在一致的情况，合计值不等同于渠道值相加" placement="bottom">
                    <div class="chartTitleName"><i class="el-icon-warning-outline"></i>合计</div>
                  </el-tooltip>
                </div>
                <div class="chartData">{{ userData.total }} 人</div>
              </div>
            </div>
          </div>
        </cardTemplate>
      </el-col>
      <el-col :span="8">
        <cardTemplate :titleName="clickData.title">
          <div class="contentTop">
            <div class="contentTopLeft">
              <div class="firstContent">今日点击用户数</div>
              <div class="numContent">{{clickData.total}}</div>
              <div class="unitContent">人</div>
            </div>
            <div class="contentTopCenter">环比昨日</div>
            <div class="contentTopRight">
              <div class="rightText">
                <span v-if="clickData.increaseData >= '0'">增长</span>
                <span v-else>减少</span>
                {{ clickData.increaseData }}%
              </div>
              <img src="../../../assets/img/up.png" alt="" v-if="clickData.increaseData >= '0'">
              <img src="../../../assets/img/down.png" alt="" v-else>
            </div>
          </div>
          <div class="charts">
            <div id="userClick" :style="{width: '400px'},{height: '210px'}"></div>
            <div class="dataDetails">
              <div class="textLine" v-for="(item,index) in clickData.pieChartData" :key="index">
                <div class="chartTitle">
                  <div class="colorT" :style="{background:item.itemStyle.color}"></div>
                  <div class="chartTitleName">{{ item.name }}</div>
                </div>
                <div class="chartData">{{ item.value }} 人</div>
              </div>
              <div class="textLine">
                <div class="chartTitle">
                  <div class="colorT transparent"></div>
                  <el-tooltip class="item" effect="dark" content="多个渠道用户存在一致的情况，合计值不等同于渠道值相加" placement="bottom">
                    <div class="chartTitleName"><i class="el-icon-warning-outline"></i>合计</div>
                  </el-tooltip>
                </div>
                <div class="chartData">{{ clickData.total }} 人</div>
              </div>
            </div>
          </div>
        </cardTemplate>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :span="8">
        <cardTemplate :titleName="historyData.title">
          <div class="chartsWrap">
            <div id="hisAllData" :style="{width:width,height:'250px'}"></div>
            <div class="datePicker">
              <el-date-picker
                  style="width: 100%;"
                  v-model="hisAllDataPicker"
                  type="daterange"
                  @change="hisAllDataChange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
        </cardTemplate>
      </el-col>
      <el-col :span="8">
        <cardTemplate :titleName="historyUserData.title">
          <div class="chartsWrap">
            <div id="hisUserData" :style="{width:width,height:'250px'}"></div>
            <div class="datePicker">
              <el-date-picker
                  style="width: 100%;"
                  v-model="hisUserDataPicker"
                  type="daterange"
                  @change="hisUserDataChange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
        </cardTemplate>
      </el-col>
      <el-col :span="8">
        <cardTemplate :titleName="historyClickData.title">
          <div class="chartsWrap">
            <div id="hisClickData" :style="{width:width,height:'250px'}"></div>
            <div class="datePicker">
              <el-date-picker
                  style="width: 100%;"
                  v-model="hisClickDataPicker"
                  type="daterange"
                  @change="hisClickDataChange"
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
import {allPushDataTop,allHisLineData, userHisLineData, clickHisLineData} from "../../../api/getData"
import echarts from 'echarts'
import common from '../../../utils/common'

export default {
  name: "allPushData",
  components: {
    cardTemplate
  },
  data() {
    return {
      width: document.getElementsByClassName('content').offsetWidth + 'px',
      hisAllDataPicker:'',
      hisUserDataPicker:'',
      hisClickDataPicker:'',
      allDate: {
        title: '今日推送数总量',
        increaseStatus: true,
        increaseData: '0',
        pieChartData: [
          {
            value: 0,
            itemStyle: {
              color: '#2A79EE',
            },
            name: 'APP推送'
          },
          {
            value: 0,
            itemStyle: {
              color: '#FFB03A',
            },
            name: 'APP弹窗推送'
          },
          {
            value: 0,
            itemStyle: {
              color: '#F56C6C',
            },
            name: '短信推送'
          },
        ],
        total: 0
      },
      userData: {
        title: '今日推送用户量',
        increaseStatus: true,
        increaseData: '0',
        pieChartData: [
          {
            value: 0,
            itemStyle: {
              color: '#2A79EE',
            },
            name: 'APP推送'
          },
          {
            value: 0,
            itemStyle: {
              color: '#FFB03A',
            },
            name: 'APP弹窗推送'
          },
          {
            value: 0,
            itemStyle: {
              color: '#F56C6C',
            },
            name: '短信推送'
          },
        ],
        total: 0
      },
      clickData: {
        title: '今日点击用户量',
        increaseStatus: false,
        increaseData: '0',
        pieChartData: [
          {
            value: 0,
            itemStyle: {
              color: '#2A79EE',
            },
            name: 'APP推送'
          },
          {
            value: 0,
            itemStyle: {
              color: '#FFB03A',
            },
            name: 'APP弹窗推送'
          },
          {
            value: 0,
            itemStyle: {
              color: '#F56C6C',
            },
            name: '短信推送'
          },
        ],
        total: 0
      },
      historyData: {
        title: '历史推送数据总量',
        lineChartData: [
          {
            name: 'app推送',
            type: 'line',
            stack: 'Total',
            symbol: 'none',
            areaStyle: {
              normal: {
                color: '#d4e4fc'
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          },
          {
            name: 'app弹窗推送',
            type: 'line',
            stack: 'Total',
            symbol: 'none',
            areaStyle: {
              normal: {
                color: '#ffefd8'
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          },
          {
            name: '短信推送',
            type: 'line',
            stack: 'Total',
            symbol: 'none',
            areaStyle: {
              normal: {
                color: '#fddcdc'
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          }
        ],
        date: []
      },
      historyUserData: {
        title: '历史推送用户分布',
        lineChartData: [
          {
            name: 'app推送',
            type: 'line',
            stack: 'Total',
            symbol: 'none',
            areaStyle: {
              normal: {
                color: '#d4e4fc'
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          },
          {
            name: 'app弹窗推送',
            type: 'line',
            stack: 'Total',
            symbol: 'none',
            areaStyle: {
              normal: {
                color: '#ffefd8'
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          },
          {
            name: '短信推送',
            type: 'line',
            stack: 'Total',
            symbol: 'none',
            areaStyle: {
              normal: {
                color: '#fddcdc'
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          }
        ],
        date: []
      },
      historyClickData: {
        title: '历史点击用户数',
        lineChartData: [
          {
            name: 'app推送',
            type: 'line',
            stack: 'Total',
            symbol: 'none',
            areaStyle: {
              normal: {
                color: '#d4e4fc'
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          },
          {
            name: 'app弹窗推送',
            type: 'line',
            stack: 'Total',
            symbol: 'none',
            areaStyle: {
              normal: {
                color: '#ffefd8'
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          }
        ],
        date: []
      },
      beginDate:'',
      endDate:''
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    //数据初始化
    initCharts() {
      this.getTopData()
      this.getAllHisLineData()
      this.getHistoryUserData()
      this.getHistoryClickData()
    },
    //获取页面头部环形图数据
    getTopData(){
      let pushAll = this.$echarts.init(document.getElementById('pushAll'))
      let pushUser = this.$echarts.init(document.getElementById('pushUser'))
      let userClick = this.$echarts.init(document.getElementById('userClick'))
      allPushDataTop().then((res) =>{
        //今日推送数总量
        this.allDate.pieChartData[0].value = res.data.todayPush.appPush
        this.allDate.pieChartData[1].value = res.data.todayPush.appModelPush
        this.allDate.pieChartData[2].value = res.data.todayPush.msgCount
        this.allDate.total = res.data.topResult.totalCount
        this.allDate.increaseData = res.data.topResult.totalCountRate
        //今日推送用户量
        this.userData.pieChartData[0].value = res.data.todayUserPush.appPush
        this.userData.pieChartData[1].value = res.data.todayUserPush.appModelPush
        this.userData.pieChartData[2].value = res.data.todayUserPush.msgCount
        this.userData.total = res.data.topResult.totalUserCount
        this.userData.increaseData = res.data.topResult.totalUserCountRate
        //今日点击用户量
        this.clickData.pieChartData[0].value = res.data.todayUserClickPush.appPush
        this.clickData.pieChartData[1].value = res.data.todayUserClickPush.appModelPush
        this.clickData.pieChartData[2].value = res.data.todayUserClickPush.msgCount
        this.clickData.total = res.data.topResult.totalUserClickCount
        this.clickData.increaseData = res.data.topResult.totalUserClickCountRate
        this.pieChartTemplate(pushAll, '推送数分布', this.allDate.pieChartData)
        this.pieChartTemplate(pushUser, '推送用户分布', this.userData.pieChartData)
        this.pieChartTemplate(userClick, '点击用户分布', this.clickData.pieChartData)
      })
    },
    //获取历史推送折线图数据
    getAllHisLineData(beginDate,endDate){
      let hisAllData = this.$echarts.init(document.getElementById('hisAllData'))
      allHisLineData({beginDate:beginDate,endDate:endDate}).then((res) =>{
        this.historyData.lineChartData[0].data = res.data.appPush
        this.historyData.lineChartData[1].data = res.data.appModelPush
        this.historyData.lineChartData[2].data = res.data.msgPush
        this.lineChartTemplate(hisAllData, '推送量分布', this.historyData.lineChartData, res.data.date)
      })
    },
    //获取历史推送用户折线图数据
    getHistoryUserData(beginDate,endDate){
      let hisUserData = this.$echarts.init(document.getElementById('hisUserData'))
      userHisLineData({beginDate:beginDate,endDate:endDate}).then((res) =>{
        this.historyUserData.lineChartData[0].data = res.data.appPush
        this.historyUserData.lineChartData[1].data = res.data.appModelPush
        this.historyUserData.lineChartData[2].data = res.data.msgPush
        this.lineChartTemplate(hisUserData, '用户量分布', this.historyUserData.lineChartData, res.data.date)
      })

    },
    //获取历史点击用户折线图数据
    getHistoryClickData(beginDate,endDate){
      let hisClickData = this.$echarts.init(document.getElementById('hisClickData'))
      clickHisLineData({beginDate:beginDate,endDate:endDate}).then((res) =>{
        this.historyClickData.lineChartData[0].data = res.data.appPush
        this.historyClickData.lineChartData[1].data = res.data.appModelPush
        this.lineChartTemplate(hisClickData, '点击量分布', this.historyClickData.lineChartData, res.data.date)
      })

    },
    //环形图模板
    pieChartTemplate(chartSet, pieChartName, pieChartData) {
      chartSet.setOption(
          {
            legend: {
              show: false,
              orient: 'vertical',
              right: '35%',
              top: 40,
            },
            title: {  //饼图的title设置
              text: pieChartName,
              x: '17%',
              y: '95px',
              textStyle: {
                color: '#2F343D',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: 12,
              }
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: ['55%', '75%'],
                left: '-50%',
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 0,
                  borderColor: '#fff',
                  borderWidth: 2
                },
                label: {
                  show: false,
                  position: 'left'
                },
                emphasis: {
                  selectorLabel: {
                    show: false
                  },
                  label: {
                    show: false,
                    fontSize: '40',
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: pieChartData
              }
            ]
          }
      );
    },
    //折线图模板
    lineChartTemplate(chartSet, lineChartName, lineChartData, date) {
      chartSet.setOption(
          {
            title: {
              text: lineChartName,
              textStyle: {
                fontWeight: 'normal',
                fontSize: 14,
                textBorderDashOffset: 1
              }
            },
            color: ['#6099ee', '#ffbe60', '#f74e4e'],
            legend: {
              icon: 'rect',
              itemHeight: 2,
              itemWidth: 12,
              bottom: '0',
              data: ['app推送', 'app弹窗推送', '短信推送',]
            },
            grid: {
              top: '18%',
              left: '0',
              right: '4%',
              bottom: '30',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: date,
                nameTextStyle: {
                  fontStyle: 'italic'
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
                    if (value !== 0) {
                      return value
                    } else {
                      return value
                    }

                  },
                  textStyle: {
                    color: '#2F343D',
                  }
                },
              }
            ],
            series: lineChartData
          }
      )
    },
    hisAllDataChange(val){
      console.log('历史推送数据总量日期',val)
      if(val){
        this.getAllHisLineData(common.dateFormatter(val[0]),common.dateFormatter(val[1]))
      }
    },
    hisUserDataChange(val){
      if(val){
        this.getHistoryUserData(common.dateFormatter(val[0]),common.dateFormatter(val[1]))
      }
      console.log('历史推送用户分布日期',val)
    },
    hisClickDataChange(val){
      if(val){
        this.getHistoryClickData(common.dateFormatter(val[0]),common.dateFormatter(val[1]))
      }
      console.log('历史点击用户数日期',val)
    },
  }
}
</script>

<style scoped lang="scss">
.allPushData {
  margin-top: 10px;

  .contentTop {
    display: flex;
    justify-content: space-between;
    height: 22px;
    line-height: 22px;

    .contentTopLeft {
      display: flex;
      justify-content: space-between;

      .firstContent {
        font-size: 14px;
        color: #2F343D;
      }

      .numContent {
        font-size: 20px;
        color: #2A79EE;
        margin-right: 4px;
        margin-left: 8px;
        font-weight: 600;
      }

      .unitContent {
        font-size: 14px;
        color: #677287;
      }
    }

    .contentTopCenter {
      font-size: 14px;
      color: #677287;
    }

    .contentTopRight {
      display: flex;
      justify-content: space-between;

      .rightText {
        font-size: 14px;
      }

      img {
        margin-top: 7px;
        margin-left: 4px;
        width: 8px;
        height: 4px;
      }
    }
  }

  .chartsWrap {
    position: relative;

    .datePicker {
      width: 230px;
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .charts {
    position: relative;

    .dataDetails {
      position: absolute;
      top: 50px;
      right: 0;

      .textLine {
        display: flex;
        justify-content: space-between;
        width: 180px;
        min-width: 180px;
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        margin-bottom: 10px;

        .chartTitle {
          display: flex;
          justify-content: space-between;

          .chartTitleName {
            color: #677287;
            i{
              margin-right: 4px;
              color: #3F87F0;
            }
          }

          .colorT {
            width: 8px;
            height: 8px;
            border-radius: 2px;
            background: #2A79EE;
            margin-top: 5px;
            margin-right: 8px;
          }

          .yellow {
            background: #FFB03A;
          }

          .red {
            background: #F56C6C;
          }

          .transparent {
            background: transparent;
          }
        }

        .chartData {
          font-weight: 600;
        }
      }
    }
  }
}
</style>
