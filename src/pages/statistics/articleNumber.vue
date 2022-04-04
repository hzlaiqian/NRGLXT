<template>
    <div class='article-number'>
        <div class='article-number-header flex items-center'>
            <div class='flex items-center ml-15'>
                <img style='width: 22px;height: 21px' src='../../assets/img/mark.png'>
            </div>
            <h3 class='ml-5'>今日数据</h3>
        </div>
        <div class='number-tag'>
            <ul class='box-sizing flex items-center'>
                <li class='relative pointer mr-20'>
                    <div class='absolute title'>接入量</div>
                    <div class='absolute number'>3500条</div>
                    <img style='width: 130px;bottom: -35px;right: -39px' class='absolute'
                         src='../../assets/img/chart-circle-fil@2x.png'>
                </li>
                <li class='relative pointer mr-20'>
                    <div class='absolute title'>审核量</div>
                    <div class='absolute number'>3450条</div>
                    <img style='width: 130px;bottom: -35px;right: -39px' class='absolute'
                         src='../../assets/img/certificate-f@2x.png'>
                </li>
                <li class='relative pointer mr-20'>
                    <div class='absolute title'>通过量</div>
                    <div class='absolute number'>2100条</div>
                    <img style='width: 100px;bottom: -20px;right: -20px' class='absolute'
                         src='../../assets/img/check-circle-fill@2x.png'>
                </li>
                <li class='relative pointer mr-20'>
                    <div class='absolute title'>打标量</div>
                    <div class='absolute number'>8500条</div>
                    <img style='width: 100px;bottom: -20px;right: -10px' class='absolute'
                         src='../../assets/img/signal-fill@2x.png'>
                </li>
                <li class='relative pointer mr-20'>
                    <div class='absolute title'>个股资讯量</div>
                    <div class='absolute number'>1100条</div>
                    <img style='width: 118px;bottom: -26px;right: -18px' class='absolute'
                         src='../../assets/img/sliders-fill@2x.png'>
                </li>
            </ul>
        </div>
        <div class='echarts-box mt-20'>
            <div class='echarts-box-header flex items-center'>
                <div class='flex items-center ml-15'>
                    <img style='width: 22px;height: 21px' src='../../assets/img/mark.png'>
                </div>
                <h3 class='ml-5'>本周数据</h3>
            </div>
            <div class='query-time ml-20'>
                <el-date-picker
                    style='width: 230px'
                    v-model='query.time'
                    type='daterange'
                    align='right'
                    unlink-panels
                    range-separator='~'
                    start-placeholder='开始日期'
                    end-placeholder='结束日期'
                    :default-time='defaultTime'
                    :picker-options='pickerOptions'>
                </el-date-picker>
            </div>
            <div style='padding: 0 20px' class='box-sizing mt-20'>
                <el-row style='width: 100%' type='flex' justify='space-between'>
                    <el-col class='echarts-content'>
                        <div class='flex items-center mt-20'>
                            <div class='flex items-center ml-20'>
                                <img style='width: 22px;height: 21px' src='../../assets/img/mark.png'>
                            </div>
                            <h3 class='ml-5'>内容分步数据</h3>
                        </div>
                        <div id='contentDistribution'></div>
                    </el-col>
                    <el-col class='echarts-content'>
                        <div class='flex items-center mt-20'>
                            <div class='flex items-center ml-20'>
                                <img style='width: 22px;height: 21px' src='../../assets/img/mark.png'>
                            </div>
                            <h3 class='ml-5'>后台处理能力模型</h3>
                        </div>
                        <div id='processing'></div>
                    </el-col>
                </el-row>
                <el-row class='mt-20' style='width: 100%;padding-bottom: 20px' type='flex' justify='space-between'>
                    <el-col class='echarts-content'>
                        <div class='flex items-center mt-20'>
                            <div class='flex items-center ml-20'>
                                <img style='width: 22px;height: 21px' src='../../assets/img/mark.png'>
                            </div>
                            <h3 class='ml-5'>内容类型数据</h3>
                        </div>
                        <div id='contentType'></div>
                    </el-col>
                    <el-col class='echarts-content'>
                        <div class='flex items-center mt-20'>
                            <div class='flex items-center ml-20'>
                                <img style='width: 22px;height: 21px' src='../../assets/img/mark.png'>
                            </div>
                            <h3 class='ml-5'>媒体数据量分布</h3>
                        </div>
                        <div id='mediaNumber'></div>
                    </el-col>
                </el-row>
            </div>

        </div>

    </div>

</template>

<script>
import { MediaNumberOption,
    contentDistributionOption,
    processingOption} from './echartsOption'
export default {
    name: 'articleNumber',
    data() {
        return {
            query: {
                time: ''
            },
            defaultTime: [],
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }
        };
    },
    created() {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

        this.query.time = [start, end];
        console.log(this.defaultTime);
    },
    mounted() {
        this.initProcessing()
        this.initContentDistribution()
        this.initContentType()
        this.initMediaNumber()
    },
    methods: {
        async initMediaNumber() {
            let MediaNumber = this.$echarts.init(document.getElementById('mediaNumber'));
            MediaNumber.setOption(MediaNumberOption)
        },
       async initContentType() {
           let contentDistribution = this.$echarts.init(document.getElementById('contentType'));
           contentDistribution.setOption(contentDistributionOption)
       },
       async initContentDistribution() {
           let contentDistribution = this.$echarts.init(document.getElementById('contentDistribution'));
           contentDistribution.setOption(contentDistributionOption)
        },
      async initProcessing() {
            let processing = this.$echarts.init(document.getElementById('processing'));
          processing.setOption(processingOption);
        }
    }
};
</script>

<style scoped lang='scss'>
.article-number {
    width: 100%;
    height: 100%;


    .article-number-header {
        height: 50px;
        border-bottom: 1px solid #EAEDF7;
        background-color: #fff;
        border-radius: 4px 4px 0 0;
    }

    .number-tag {
        border-radius: 0 0 4px 4px;
        background-color: #fff;
        height: 154px;

        ul {
            width: 100%;
            height: 100%;
            padding: 0 20px;

            li {
                width: 220px;
                height: 120px;
                background: linear-gradient(180deg, #429BFF 0%, #91C5FF 100%);
                overflow: hidden;

                .title {
                    font-size: 14px;
                    font-weight: 500;
                    color: #fff;
                    left: 20px;
                    top: 24px;
                }

                .number {
                    font-size: 32px;
                    color: #fff;
                    font-weight: 500;
                    left: 20px;
                    top: 52px;
                }
            }

            li:nth-child(2) {
                background: linear-gradient(180deg, #93A6CA 0%, #65789B 100%);
            }

            li:nth-child(3) {
                background: linear-gradient(180deg, #6EDAE5 0%, #4BA5BD 100%);
            }

            li:nth-child(4) {
                background: linear-gradient(180deg, #FFC89B 0%, #FFB980 100%);
            }

            li:nth-child(5) {
                background: linear-gradient(180deg, #B1A8FF 0%, #7A6BFF 100%);
            }
        }
    }

    .echarts-box {
        background-color: #fff;
        height: calc(100% - 224px);
        overflow-y: auto;
        .echarts-box-header {
            height: 50px;
            border-bottom: 1px solid #EAEDF7;
        }

        .query-time {
            margin-top: 16px;
        }

        .echarts-content {
            width: 49%;
            height: 435px;
            border: 1px solid #EAEDF7;
            #processing {
                width: 100%;
                height: calc(100% - 50px);
            }
            #contentDistribution {
                width: 100%;
                height: calc(100% - 50px);
            }
            #contentType {
                width: 100%;
                height: calc(100% - 50px);
            }
            #mediaNumber {
                width: 100%;
                height: calc(100% - 50px);
            }
        }
    }


}

</style>
