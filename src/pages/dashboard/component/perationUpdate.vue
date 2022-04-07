<template>
  <div class="chartBody">
    <div class="chart" id="perationUpdate"></div>
  </div>

</template>

<script>
export default {
  name: "perationUpdate",
  mounted() {
    this.charts()
  },
  methods: {
    charts() {
      let myChart = this.$echarts.init(document.getElementById('perationUpdate'));
      let option = {



        grid: {
          left: '0',
          right: '0',
          bottom: '0',
          top:"0",
          containLabel: true
        },
        xAxis: {
          type: 'value',
          show:false,
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['要闻', '头条', '焦点图', ],
          axisLine:{
            lineStyle:{color:'rgb(150,150,150)',width:0} , //y轴坐标轴颜色
          },
          axisTick:{
            lineStyle:{color:'#fff' }  //y轴坐标刻度颜色
          },

        },
        series: [
          {
            name: '2011',
            type: 'bar',
            data: [18203, 23489, 29034, ],
            itemStyle: {
              normal: {
                label: {
                  formatter: "{c}",
                  show: true,
                  position: "right",
                  textStyle: {
                    fontWeight: "bolder",
                    fontSize: "12",
                    color: "#677287"
                  }
                },
                color: '#81ADFF',
                opacity: 1
              }
            }


          },
          {
            name: '2012',
            type: 'bar',
            data: [19325, 23438, 31000, ],
            itemStyle: {
              normal: {
                label: {
                  formatter: "{c}",
                  show: true,
                  position: "right",
                  textStyle: {
                    fontWeight: "bolder",
                    fontSize: "12",
                    color: "#677287"
                  }
                },
                color: '#FCCA6A',
                opacity: 1
              }
            }
          }
        ]
      };


      myChart.setOption(option)




    }
  }
}
</script>

<style scoped lang="scss">
.chartBody {
  height: calc(100% - 10px);
  width: 100%;

.chart {
  height: 100%;
  width: 65%;
  margin: 0 auto;
}
}
</style>
