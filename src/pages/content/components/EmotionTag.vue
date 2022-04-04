<template>
    <div>
        <div class='flex items-center'>
            <div class='flex items-center'>
                <img style='width: 22px;height: 21px' src='../../../assets/img/mark.png'>
            </div>
            <h3 class='ml-5'>情绪标签：</h3>
        </div>
        <div class='flex my-20'>
            <button :class='{"front-active": frontActive === "正面"}' @click='click("正面")' class='front mr-8 pointer'>
                正面
            </button>
            <button :class='{"neutral-active": frontActive === "中性"}' @click='click("中性")'
                    class='neutral mr-8 pointer'>中性
            </button>
            <button :class='{"negative-active": frontActive === "负面"}' @click='click("负面")' class='negative pointer'>
                负面
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'emotionTag',
    props: {
        list: {
            type: Array,
            default: []
        },
        activeName: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            frontActive: this.activeName
        };
    },
    watch: {
        activeName(newValue,oldValue) {
            this.frontActive = newValue
        }
    },
    methods: {
        click(name) {
            this.frontActive = name;
            this.$emit('click', this.list.filter(q => q.name === name));
        }
    }
};
</script>

<style scoped>
.front {
    width: 58px;
    height: 28px;
    background: #FFFFFF;
    border-radius: 2px;
    border: 1px solid rgba(247, 78, 78, 0.3);
    font-size: 12px;
    font-weight: 400;
    color: #F74E4E;
    line-height: 16px;
}

.front-active {
    background: #F74E4E;
    border-radius: 2px;
    color: #fff;
    transition-duration: 0.5s;
}

.neutral {
    width: 58px;
    height: 28px;
    background: #FFFFFF;
    border-radius: 2px;
    border: 1px solid rgba(230, 162, 60, 0.3);
    font-size: 12px;
    font-weight: 400;
    color: #FFB03A;
    line-height: 16px;
}

.neutral-active {
    background: #F69B40;
    border-radius: 2px;
    color: #fff;
    transition-duration: 0.5s;
}

.negative {
    width: 58px;
    height: 28px;
    background: #FFFFFF;
    border-radius: 2px;
    border: 1px solid rgba(103, 194, 58, 0.3);
    font-size: 12px;
    font-weight: 400;
    color: #67C23A;
    line-height: 16px;
}

.negative-active {
    background: #67C23A;
    border-radius: 2px;
    color: #fff;
    transition-duration: 0.5s;
}

.mr-8 {
    margin-right: 8px;
}

</style>
