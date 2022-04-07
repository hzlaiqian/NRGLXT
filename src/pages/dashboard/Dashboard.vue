<template>
  <div class="ds-body">
    <el-row>
      <el-col :span="6">
        <div class="card-one"  ref="col1">
          <el-card shadow="hover" :style="heightCol1">
            <barChart :type="1" />
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-one" >
          <el-card shadow="hover" :style="heightCol1">
            <barChart :type="2" />
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-one" >
          <el-card shadow="hover" :style="heightCol1">
            <barChart :type="3" />
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-one" >
          <el-card shadow="hover" :style="heightCol1">
            <barChart :type="4" />
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="card-one"  ref="col2">
          <el-card shadow="hover" :style="heightCol2">
            <Title :title="'内容流数据'" :type="'ri'"></Title>
            <funnelDiagram ></funnelDiagram>
          </el-card>

        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-one">
          <el-card shadow="hover" :style="heightCol2">
            <Title :title="'内容标签TOP20'" :type="'ri'"></Title>
            <contentLabel></contentLabel>
          </el-card>

        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-one">
          <el-card shadow="hover" :style="heightCol2">
            <Title :title="'精推点击率'" :type="'ri'"></Title>
            <accurateRate></accurateRate>
          </el-card>

        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12"  ref="col3">
        <div class="card-one">
          <el-card shadow="hover" :style="heightCol3">
            <Title :title="'运营位更新量'" :type="'ri'"></Title>
            <perationUpdate></perationUpdate>
          </el-card>

        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-one">
          <el-card shadow="hover" :style="heightCol3">
            <Title :title="'点击用户分布'" :type="'ri'"></Title>
            <clickUserDistribution></clickUserDistribution>
          </el-card>

        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-one">
          <el-card shadow="hover" :style="heightCol3">
            <Title :title="'通知栏'" ></Title>
            <noticeBar></noticeBar>
          </el-card>

        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="card-one"  ref="col4">
          <el-card shadow="hover" :style="heightCol4">
            <Title :title="'通知栏'" :type="'zhou'"></Title>
            <userSatisfaction></userSatisfaction>
          </el-card>

        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../../components/bus.js';

export default {
  name: 'dashboard',
  components: {
    //最上面柱状图
    barChart: () => import('./component/barChart'),
    //内容流量数据
    funnelDiagram: () => import('./component/funnelDiagram'),
    //内容标签
    contentLabel: () => import('./component/contentLabel'),
    //精推点击率
    accurateRate: () => import('./component/accurateRate'),
    //运营位更新量
    perationUpdate: () => import('./component/perationUpdate'),
    //点击用户分布
    clickUserDistribution: () => import('./component/clickUserDistribution'),
    //通知栏
    noticeBar: () => import('./component/noticeBar'),
    //推送用户满意度分布
    userSatisfaction: () => import('./component/userSatisfaction'),
    Schart,
    Title:()=>import('./component/dTitle')
  },
  data() {
    return {
      name: localStorage.getItem('ms_username'),
      heightCol1: {
        height: '178px'
      },
      heightCol2: {
        height: '320px'
      },
      heightCol3: {
        height: '334px'
      },
      heightCol4: {
        height: '361px'
      },


    };
  },
  mounted() {
    this.setHeight()

  },

  computed: {
    role() {
      return this.name === 'admin' ? '超级管理员' : '普通用户';
    }
  },

  methods: {
    setHeight(){
      this.heightCol1.height = this.$refs.col1.clientWidth / 297 * 178 + 'px'
      this.heightCol2.height = this.$refs.col2.clientWidth / 605 * 320 + 'px'
      this.heightCol3.height = this.$refs.col3.clientWidth / 605 * 334 + 'px'
      this.heightCol4.height = this.$refs.col4.clientWidth / 1220 * 361 + 'px'
    },
    changeDate() {
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000);
        item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      });
    }
    // handleListener() {
    //     bus.$on('collapse', this.handleBus);
    //     // 调用renderChart方法对图表进行重新渲染
    //     window.addEventListener('resize', this.renderChart);
    // },
    // handleBus(msg) {
    //     setTimeout(() => {
    //         this.renderChart();
    //     }, 200);
    // },
    // renderChart() {
    //     this.$refs.bar.renderChart();
    //     this.$refs.line.renderChart();
    // }
  }
};
</script>


<style  lang="scss">


.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}

.ds-body {
  background-color: #F5F5F5;

  .card-one {
    background: #FFFFFF;
    border-radius: 4px;
    margin: 10px;
    .el-card__body{
      height: calc(100% - 40px);
    }
  }
}
</style>
