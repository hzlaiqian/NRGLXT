<template>
  <div class="rkl">
    <div class="title">日入库量</div>
    <h3 class="rkl-num">10，420</h3>
    <div class="rkl-chart" :id="'rkl-chart'+type"></div>
    <div class="rkl-bottom">
      <div class="rkl-ri">环比昨日 <span>增长40% <i class="el-icon-caret-bottom"></i></span></div>
      <div class="rkl-ri">环比上周日均 <span>下降40% <i class="el-icon-caret-top"></i></span></div>
    </div>

  </div>

</template>

<script>
export default {
  name: "barChart",
  props:['type'],
  mounted() {
    this.charts()
  },
  methods:{
    charts(){
      let myChart = this.$echarts.init(document.getElementById('rkl-chart'+this.type));
      let option
      if(this.type == 1||this.type == 3){
        let color  = this.type==1?'#81ADFF':'#FF9E9E'
        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '0',
            right: '0',
            bottom: '0',
            top:"0",
            containLabel: true
          },
          color: [color],
          xAxis: [
            {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              show:false
            }
          ],
          yAxis: [
            {
              type: 'value',
              show:false
            }
          ],
          series: [
            {
              name: 'Direct',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 220],
              itemStyle: {
                emphasis: {
                  barBorderRadius: 4
                },
                normal: {
                  barBorderRadius: 4,
                  // color: new echarts.graphic.LinearGradient(
                  //     0, 0, 1, 0,
                  //     [
                  //       {offset: 0, color: '#3977E6'},
                  //       {offset: 1, color: '#37BBF8'}
                  //
                  //     ]
                  // )
                }
              }
            }
          ]
        };
      }else{
        let color  = this.type==2?'#FCCA6A':'#78CBEF';
        option = {
          color: [color],
          grid: {
            left: '0',
            right: '0',
            bottom: '0',
            top:"0",
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              show:false
            }
          ],
          yAxis: [
            {
              type: 'value',
              show:false
            }
          ],
          series: [
            {
              name: 'Search Engine',
              type: 'line',
              stack: 'Total',
              smooth: 0.5,
              areaStyle: {},
              symbol: 'none',
              data: [15, 932, 901, 934, 1290, 1330, 99]
            }
          ]
        };
      }

      myChart.setOption(option)

    }
  }

}
</script>

<style scoped lang="scss">
.rkl{
  height: 100%;
  .title{
    font-weight: 400;
    color: #919AAD;
    line-height: 16px;
    font-size: 12px;
    margin-bottom: 8px;
  }
  .rkl-num{
    font-size: 32px;
    color: #2F343D;
    line-height: 32px;
  }
  .rkl-chart{
    height: calc(100% - 60px);
  }
  .rkl-bottom{
    display: flex;
    height: 16px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #677287;
    line-height: 16px;
    justify-content:  space-between ;
    .rkl-ri{

    }
    span{
      color: #2F343D;
    }
    .el-icon-caret-bottom{
      color: #67C23A;

    }
    .el-icon-caret-top{
      color: #F74E4E;

    }
  }
}

</style>
