<template>
    <div class='system-monitoring'>
        <div class='system-monitoring-top'>
            <div class='monitoring-top-header flex items-center'>
                <div class='flex items-center ml-15'>
                    <img style='width: 22px;height: 21px' src='../../assets/img/mark.png'>
                </div>
                <h3 class='ml-5'>接入数据业务监控</h3>
            </div>
            <div class='top-hint mt-20 box-sizing' v-if='showAlert'>
                <el-alert
                    title='提示：2022-3-8 15:31 微信账号（wxid_t3j2u5c10ik312）下线'
                    type='warning'
                    @close='alertClose'
                    show-icon>
                </el-alert>
            </div>
            <div class='data-monitoring mt-20'>
                <div class='title ml-20'>单位区间数据监控</div>
                <div class='flex data mt-20'>
                    <div class='ml-20'>22:01-07:00</div>
                    <div class='ml-20'>正常值：1条/10min</div>
                    <div class='ml-20'>报警值：0条/10min</div>
                </div>
                <div class='flex data mt-20'>
                    <div class='ml-20'>22:01-07:00</div>
                    <div class='ml-20'>正常值：1条/10min</div>
                    <div class='ml-20'>报警值：0条/10min</div>
                </div>
            </div>
            <div class='echarts mt-20'>
                <div class='title ml-20'>数量：条</div>
                <div id='dataEcharts'></div>
            </div>
        </div>
        <div class='system-monitoring-bottom mt-10' >
            <div class='monitoring-bottom-header flex items-center'>
                <div class='flex items-center ml-15'>
                    <img style='width: 22px;height: 21px' src='../../assets/img/mark.png'>
                </div>
                <h3 class='ml-5'>Kafka集群监控</h3>
            </div>
            <div class='data-monitoring mt-20'>
                <div class='title ml-20'>消费延时监控</div>
                <div class='box flex ml-20'>
                    <div class='normal mr-20 flex items-center'>
                        <div></div>
                        <span>正常值：10ms</span>
                    </div>
                    <div class='police flex items-center'>
                        <div></div>
                        <span>报警值：2000ms</span>
                    </div>
                </div>
                <div class='mt-20 ml-20 text'>延时（ms）</div>
            </div>
            <div id='echarts1'></div>
            <div class='data-monitoring mt-20' >
                <div class='title ml-20'>消费积压监控</div>
                <div class='box flex ml-20'>
                    <div class='normal mr-20 flex items-center'>
                        <div></div>
                        <span>正常值：1条以内</span>
                    </div>
                    <div class='police flex items-center'>
                        <div></div>
                        <span>报警值：10条</span>
                    </div>
                </div>
                <div class='mt-20 ml-20 text'>积压（条）</div>
            </div>
            <div id='echarts2' style='margin-bottom: 100px'></div>
        </div>

        <el-dialog
            title='提示'
            :visible.sync='dialogVisible'
            width='360px'
            top='30vh'
            :show-close='false'
            :close-on-press-escape='false'
            :close-on-click-modal='false'
            :center='true'
            :before-close='handleClose'>
            <div slot='title'>
                <div class='flex items-center dialog-title'>
                    <div><img style='width: 28px;margin-top: 5px' src='../../assets/img/info-circle@2x.png' alt=''>
                    </div>
                    <div>2022-03-09 3:00 爬虫数量异常</div>
                    <div>短信已推</div>
                </div>

            </div>
            <div class='dialog-content mb-20'>
                <div>当时数据量（2条/10min)</div>
                <div class='mt-20'>触及报警值（2条/10min)</div>
            </div>
            <span slot='footer' class='dialog-footer'>
             <el-button type='primary' @click='dialogVisible = false'>确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>

<script>
import { dataEcharts, dataEcharts1, dataEcharts2 } from '@/pages/statistics/echartsOption';

export default {
    name: 'systemMonitoring',
    data() {
        return {
            showAlert: true,
            dialogVisible: true
        };
    },
    mounted() {
        this.initDataEcharts();
        this.initEcharts1();
        this.initEcharts2();
    },
    methods: {
        handleClose() {
            this.dialogVisible = false;
        },
        initEcharts2() {
            let echarts = this.$echarts.init(document.getElementById('echarts2'));
            echarts.setOption(dataEcharts2);
        },
        initEcharts1() {
            let echarts = this.$echarts.init(document.getElementById('echarts1'));
            echarts.setOption(dataEcharts1);
        },
        alertClose() {
            this.showAlert = false;
        },
        initDataEcharts() {
            let echarts = this.$echarts.init(document.getElementById('dataEcharts'));
            echarts.setOption(dataEcharts);
        }
    }
};
</script>

<style scoped lang='scss'>
.system-monitoring {
    width: 100%;
    height: 100%;

    .system-monitoring-top {
        height: 550px;
        width: 100%;
        background-color: #fff;
        border-radius: 4px;

        .monitoring-top-header {
            height: 50px;
            border-bottom: 1px solid #EAEDF7;
        }

        .top-hint {
            padding: 0 20px;
        }

        .data-monitoring {
            .title {
                font-size: 14px;
                font-weight: 500;
                color: #3C4556;
                line-height: 20px;
            }

            .data {
                div:nth-child(1) {
                    color: #3C4556;
                }

                div:nth-child(2) {
                    color: #67C23A;
                }

                div:nth-child(3) {
                    color: #F74E4E;
                }
            }
        }

        .echarts {
            .title {
                font-size: 12px;
                font-weight: 400;
                color: #2F343D;
            }

            #dataEcharts {
                height: 280px;
                width: 100%;
            }
        }
    }

    .system-monitoring-bottom {
        background-color: #fff;
        width: 100%;
        height: calc(100% - 560px);
        overflow-y: auto;

        .monitoring-bottom-header {
            height: 50px;
            border-bottom: 1px solid #EAEDF7;
        }

        .data-monitoring {
            .title {
                font-size: 14px;
                font-weight: 500;
                color: #3C4556;
                line-height: 20px;
            }

            .box {
                margin-top: 31px;

                .normal {
                    color: #67C23A;
                    font-size: 14px;

                    div:nth-child(1) {
                        width: 40px;
                        height: 0;
                        margin-right: 8px;
                        border: 2px dashed #67C23A;
                    }
                }

                .police {
                    color: #F74E4E;
                    font-size: 14px;

                    div:nth-child(1) {
                        width: 40px;
                        height: 0;
                        margin-right: 8px;
                        border: 2px dashed #F74E4E;
                    }
                }
            }

            .text {
                color: #2F343D
            }

            .delayed {
                font-size: 12px;
                color: #2F343D;
            }
        }

        #echarts1 {
            height: 330px;
        }

        #echarts2 {
            height: 380px;
        }
    }

    .dialog-title {
        font-size: 14px;

        div:nth-child(2) {
            color: #F74E4E;
            font-weight: 500;
            margin-left: 6px;
            margin-right: 8px;
        }

        div:nth-child(3) {
            width: 56px;
            height: 20px;
            background: rgba(22, 131, 255, 0.11);
            border-radius: 2px;
            color: #2A79EE;
            font-size: 12px;
            text-align: center;
            line-height: 20px;
        }
    }

    .dialog-content {
        font-size: 14px;
        font-weight: 400;
        color: #3C4556;
        margin-left: 52px;
    }
}
</style>
<style>
.system-monitoring .el-alert--warning.is-light {
    background: rgba(247, 78, 78, 0.06);
    color: #F74E4E;
}

.system-monitoring .el-dialog__body {
    padding: 0;
}
</style>
