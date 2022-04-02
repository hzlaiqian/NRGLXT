const color =['#81ADFF', '#FCCA6A', '#FF9E9E', '#78CBEF', '#FFB980', '#78E1CD']
const legend = {
    top: 'bottom',
    left: 'center',
    itemHeight: 4
}
const MediaNumberOption = {
    tooltip: {
        trigger: 'item'
    },
    legend:legend ,
    color: color,
    gradientColor: color,
    graphic: [{
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
            text: '媒体数据量',
            textAlign: 'center',
            fill: '#2F343D',
            width: 50,
            height: 50,
            fontSize: 20
        }
    }],
    series: [
        {
            name: '媒体数据量',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: true,
            label: {
                position: 'outer',
                alignTo: 'none',
                bleedMargin: 5
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: true
            },
            data: [
                { value: 1048, name: '财联社 21%' },
                { value: 735, name: '上海证券报 14%' },
                { value: 580, name: '中国证券报 10%' },
                { value: 484, name: '证券财报 8%' },
                { value: 300, name: '证券日报 11%' },
                { value: 300, name: '其他 23%' }
            ]
        }
    ]
};

const contentDistributionOption = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7']
    },
    yAxis: {
        type: 'value'
    },
    color: color,
    gradientColor: color,
    legend: legend,
    //     {
    //     left: 'center',
    //     top: 'bottom',
    //     itemHeight: 4,
    //     data: [
    //         '接入量',
    //         '审核量',
    //         '通过量',
    //         '打标量',
    //         '个股资讯量'
    //     ]
    // },
    series: [
        {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
            smooth: true,
            name: '接入量',
            showSymbol: false
        },
        {
            data: [180, 290, 294, 298, 195, 197, 200],
            type: 'line',
            smooth: true,
            name: '审核量',
            showSymbol: false
        },
        {
            data: [180, 290, 294, 98, 195, 197, 200],
            type: 'line',
            smooth: true,
            name: '通过量',
            showSymbol: false
        },
        {
            data: [180, 290, 294, 298, 195, 17, 200],
            type: 'line',
            smooth: true,
            name: '打标量',
            showSymbol: false
        },
        {
            data: [180, 290, 294, 298, 195, 197, 20],
            type: 'line',
            smooth: true,
            name: '个股资讯量',
            showSymbol: false
        }
    ]
};

const processingOption = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        left: 'center',
        top: 'bottom',
        itemHeight: 4,
        data: [
            '本周数据',
            '上周数据'
        ]
    },
    color: ['rgba(22, 131, 255, 0.3)', 'rgba(255, 185, 128, 0.3)'],
    gradientColor: ['#1683FF', '#FFB980'],
    radar: [
        {
            indicator: [{
                text: '分发量',
                max: 3000
            }, {
                text: '通过量',
                max: 3000,
                axisLabel: { show: false }
            }, {
                text: '打标量',
                max: 6000,
                axisLabel: { show: false }
            }, {
                text: '机器审',
                max: 3000,
                axisLabel: { show: false }
            }, {
                text: '人工审',
                max: 3000,
                axisLabel: { show: false }
            }, {
                text: '接入量',
                max: 3000,
                axisLabel: { show: false }
            }],
            axisLabel: {
                show: true,
                color: '#919AAD',
                align: 'center'
            },
            center: ['50%', '50%'],
            radius: 130
        }
    ],
    series: [
        {
            type: 'radar',
            tooltip: {
                trigger: 'item'
            },
            areaStyle: {},
            data: [
                {
                    value: [600, 730, 850, 400, 500, 290],
                    name: '本周数据'
                }
            ]
        },
        {
            type: 'radar',
            tooltip: {
                trigger: 'item'
            },
            areaStyle: {},
            data: [
                {
                    value: [1000, 1130, 1850, 1400, 1500, 1290],
                    name: '上周数据'
                }
            ]
        }
    ]
};
let img = 'data:image/png;base64,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'
const dataEcharts = {
    // title: {
    //     text: 'Temperature Change in the Coming Week'
    // },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        top: 'top'
    },
    dataZoom: [{
        type: 'slider',
        show: true,
        start: 0,
        end: 50,
    }],
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}'
        }
    },
    color: color,
    gradientColor: color,
    series: [
        {
            // name: 'Lowest',
            type: 'line',
            showSymbol: false,
            data: [0, 1, 4, 6, 8, 4, 0],
            markPoint: {
                symbol: 'image://' + img,
                symbolSize: 50,
                symbolOffset: [0,'30%'],
                silent: true,
                data: [{ name: '周最低', xAxis: 1, yAxis: 2 }]
            },
            markLine: {
                //
                // lineStyle: {
                //     color: '#F74E4E',
                //     width: 2
                // },
                symbol: 'none',
                data: [
                    {
                        name: '报警值',
                        yAxis: 2,
                        lineStyle: {
                            color: '#F74E4E',
                            width: 2
                        }
                    },
                    {
                        name: '正常值',
                        yAxis: 5,
                        lineStyle: {
                            color: '#67C23A',
                            width: 2
                        }
                    }

                ]
            }
        }
    ]
};

const dataEcharts1 = {
    // title: {
    //     text: 'Temperature Change in the Coming Week'
    // },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        top: 'top'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            showMaxLabel: true,
            formatter: '{value}'
        }
    },
    dataZoom: [{
        type: 'slider',
        show: true,
        start: 0,
        end: 50
    }],
    color: color,
    gradientColor: color,
    series: [
        {
            name: '客户A',
            type: 'line',
            showSymbol: false,
            data: [0, 1, 4, 6, 8, 4, 10],
            markLine: {
                symbol: 'none',
                data: [
                    {
                        name: '报警值',
                        yAxis: 2000,
                        lineStyle: {
                            color: '#F74E4E',
                            width: 2
                        }
                    },
                    {
                        name: '正常值',
                        yAxis: 10,
                        lineStyle: {
                            color: '#67C23A',
                            width: 2
                        }
                    }

                ]
            }
        },{
            name: '客户B',
            type: 'line',
            showSymbol: false,
            data: [1, 3, 7, 9, 20, 6, 1],
            markLine: {
                //
                // lineStyle: {
                //     color: '#F74E4E',
                //     width: 2
                // },
                symbol: 'none',
                data: [
                    {
                        name: '报警值',
                        yAxis: 2000,
                        lineStyle: {
                            color: '#F74E4E',
                            width: 2
                        }
                    },
                    {
                        name: '正常值',
                        yAxis: 10,
                        lineStyle: {
                            color: '#67C23A',
                            width: 2
                        }
                    }

                ]
            }
        }
    ]
};


const dataEcharts2 = {
    // title: {
    //     text: 'Temperature Change in the Coming Week'
    // },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        top: 'top'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00','8:30','5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00','8:30']
    },
    dataZoom: [{
        type: 'slider',
        show: true,
        start: 0,
        end: 50
    }],
    yAxis: {
        type: 'value',
        axisLabel: {
            showMaxLabel: true,
            formatter: '{value}'
        }
    },
    color: ['#81ADFF', '#FCCA6A', '#FF9E9E', '#78CBEF', '#FFB980', '#78E1CD'],
    gradientColor: ['#81ADFF', '#FCCA6A', '#FF9E9E', '#78CBEF', '#FFB980', '#78E1CD'],
    series: [
        {
            name: '客户A',
            type: 'line',
            showSymbol: false,
            data: [0, 1, 4, 6, 8, 4, 10],
            markLine: {
                symbol: 'none',
                data: [
                    {
                        name: '报警值',
                        yAxis: 2000,
                        lineStyle: {
                            color: '#F74E4E',
                            width: 2
                        }
                    },
                    {
                        name: '正常值',
                        yAxis: 10,
                        lineStyle: {
                            color: '#67C23A',
                            width: 2
                        }
                    }

                ]
            }
        },{
            name: '客户B',
            type: 'line',
            showSymbol: false,
            data: [1, 3, 7, 9, 20, 6, 1],
            markLine: {
                //
                // lineStyle: {
                //     color: '#F74E4E',
                //     width: 2
                // },
                symbol: 'none',
                data: [
                    {
                        name: '报警值',
                        yAxis: 10,
                        lineStyle: {
                            color: '#F74E4E',
                            width: 2
                        }
                    },
                    {
                        name: '正常值',
                        yAxis: 1,
                        lineStyle: {
                            color: '#67C23A',
                            width: 2
                        }
                    }

                ]
            }
        }
    ]
};
export {
    MediaNumberOption,
    contentDistributionOption,
    processingOption,
    dataEcharts,
    dataEcharts1,
dataEcharts2
};
