<template>
  <div class="chartBody">
    <div class="chart" id="clickUserDistribution">
    </div>
    <span>点击用户分布</span>
    <div class="chart-lable">
      <div class="label-one"><div><i class="acolor"></i> APP推送</div><div class="people">1400人</div>  </div>
      <div class="label-one"><div><i class="bcolor"></i> APP弹窗推送</div><div class="people">1400人</div>  </div>
      <div class="label-one"><div><i class="el-icon-warning-outline"></i> 合计</div><div class="people">1400人</div>  </div>

    </div>
  </div>

</template>

<script>
export default {
  name: "clickUserDistribution",
  mounted() {
    this.charts()
  },
  methods: {
    charts() {
      let myChart = this.$echarts.init(document.getElementById('clickUserDistribution'));
      let option = {

        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['75%', '90%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'outside'
            },
            // emphasis: {
            //   itemStyle: {
            //     shadowBlur: 10,
            //     shadowOffsetX: 0,
            //     shadowColor: 'rgba(0, 0, 0, 0.5)'
            //   }
            // },

            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },

            ]
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
  height: calc(100% - 50px);
  width: 100%;
  position: relative;

  .chart {
    height: 60%;
    width: 100%;
    margin: 0 auto;
  }
  span{
    position: absolute;
    left: 50%;
    display: inline-block;
    width: 100px;
    text-align: center;
    margin-left: -50px;
    top: 30%;
    height: 30px;
    line-height: 30px;
    margin-top: -15px;
  }
  .chart-lable{
    width: 60%;
    margin: 0 auto;
    .label-one{
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #677287;
      line-height: 18px;
      margin-top: 10px;
      .people{
        color: #2F343D;
      }
      .acolor{
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #81ADFF;
        border-radius: 2px;
        margin-right: 4px;
      }
      .bcolor{
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #FCCA6A;
        border-radius: 2px;
        margin-right: 4px;
      }
      .el-icon-warning-outline{
        font-size: 12px;
        color: #919AAD;;

      }
    }

  }
}
</style>
