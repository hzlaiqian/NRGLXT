<template>
  <div class="chartBody">
    <div class="chart" id="funnelDiagram"></div>
  </div>
</template>

<script>
export default {
  name: "funnelDiagram",
  mounted() {
    this.charts()
  },
  methods: {
    charts() {
      let myChart = this.$echarts.init(document.getElementById('funnelDiagram'));
      let option = {
        tooltip : {
          trigger: 'item',
          show:false,
        },
        color:['#81ADFF','#78CBEF'],
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 15,
            bottom: 15,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: "none",
            gap: 4,
            label: {
              show: true,
              position: 'inside',
              color:'#fff'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              {value: 60, name: 'Visit 1200条'},
              {value: 40, name: 'Inquiry'},
              {value: 20, name: 'Order'},
              {value: 80, name: 'Click'},

            ]
          },
          {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 15,
            bottom: 15,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: "none",

            gap: 2,
            label: {
              show: true,
              position: 'outside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              {value: 60, name: ' 60条'},
              {value: 40, name: '40条'},
              {value: 20, name: '20条'},
              {value: 80, name: '80条'},
            ]
          }
        ]
      }


      myChart.setOption(option)




    }
  }
}
</script>

<style scoped lang="scss">
.chartBody {
  height: calc(100% - 50px);
  width: 100%;

  .chart {
    height: 100%;
    width: 65%;
    margin: 0 auto;
  }
}
</style>
